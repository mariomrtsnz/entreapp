import _ from 'lodash';
import QRCode from 'qrcode';

import { Poi } from '.';
import mongoose from '../../services/mongoose';
import { notFound, success } from '../../services/response/';

export const create = ({ bodymen: { body } }, res, next) => {
  body.coverImage = body.images[0];
  Poi.create(body)
    .then((poi) => {
      poi.view(2);
      var opts = {
        color: {
          dark: '#000',  // Black dots
          light: '#0000' // Transparent background
        },
        type: 'svg'
      }
      QRCode.toString(`https://entreapp.herokuapp.com/pois/${poi.id}`, opts).then(string => {
        Poi.findByIdAndUpdate({ _id: poi.id }, { $set: { qrCode: string.split('\n')[0] } }, { new: true }).then(success(res, 200)).catch(next);
      }).then(success(res, 200)).catch(next);
    })
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  const userLogged = res.req.user;
  let lat;
  let lng;
  if (query['loc.coordinates']) {
    lat = query['loc.coordinates']['$near']['$geometry'].coordinates[0];
    lng = query['loc.coordinates']['$near']['$geometry'].coordinates[1];
  }
  Poi.count(query)
    .then(count => Poi.find(query, select, cursor).populate('categories', 'id name')
      .then((pois) => ({
        count,
        rows: pois.map((poi) => {
          if (query['loc.coordinates'])
            poi.set('distance', distance(lat, lng, poi.loc.coordinates[0], poi.loc.coordinates[1]))
          else
            poi.set('distance', -1);
          if (userLogged.favs.length != 0) {
            userLogged.favs.forEach(userFav => {
              if (_.isEqual(userFav.toString(), poi.id))
                poi.set('fav', true)
              else
                poi.set('fav', false)
            });
          } else 
            poi.set('fav', false)
          if (userLogged.visited.length != 0) {
            userLogged.visited.forEach(userVisited => {
              if (_.isEqual(userVisited.toString(), poi.id))
                poi.set('visited', true)
              else
                poi.set('visited', false)
            });
          } else 
            poi.set('visited', false)
          return poi;
        })
      }))
    )
    .then(success(res))
    .catch(next)
    }

export const showTranslated = ({ params }, res, next) => {
  let query = {
    id: (mongoose.Types.ObjectId(params.id)),
    idUserLanguage: (mongoose.Types.ObjectId(params.idUserLanguage))
  }
  Poi.findOne({ id: query.id, "description.translations.language": query.idUserLanguage })
    .then(notFound(res))
    .then((poi) => poi ? poi.view(2) : null)
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Poi.findById(params.id).populate('categories', 'id name')
    .then(notFound(res))
    .then((poi) => poi ? poi.view(1) : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Poi.findById(params.id)
    .then(notFound(res))
    .then((poi) => poi ? Object.assign(poi, body).save() : null)
    .then((poi) => poi ? poi.view(1) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Poi.findById(params.id)
    .then(notFound(res))
    .then((poi) => poi ? poi.remove() : null)
    .then(success(res, 204))
    .catch(next)

/* export const allPOIsAndFavAndVisited = ({ params }, res, next) => {
  let userLogged = null;
  User.findById(params.id).then(user => userLogged = user)
  .then( user => {
    Poi.find().populate('categories', 'id name').then(pois => {
      return new Promise(function(res, rej) {
        pois.map((poi) => {
          if (userLogged.favs.length != 0) {
            userLogged.favs.forEach(userFav => {
              if (_.isEqual(userFav.toString(), poi.id))
                poi.set('fav', true)
              else
                poi.set('fav', false)
            });
          } else {
            poi.set('fav', false)
          }
          if (userLogged.visited.length != 0) {
            userLogged.visited.forEach(userVisited => {
              if (_.isEqual(userVisited.toString(), poi.id))
                poi.set('visited', true)
              else
                poi.set('visited', false)
            });
          } else {
            poi.set('visited', false)
          }
        });
        res(pois);
      });
    }).then(success(res)).catch(next);
  })
} */

  function distance(lat1, lon1, lat2, lon2) {
    var p = Math.PI / 180;
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2;
  
    return 12742 * Math.asin(Math.sqrt(a)) * Math.PI * 360; // 2 * R; R = 6371 km
  }