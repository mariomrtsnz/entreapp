import { success, notFound } from '../../services/response/'
import { Poi } from '.'
import mongoose from '../../services/mongoose'
import QRCode from 'qrcode'

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

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Poi.count(query)
    .then(count => Poi.find(query, select, cursor).populate('categories', 'id name')
      .then((pois) => ({
        count,
        rows: pois.map((poi) => poi.view(0))
      }))
    )
    .then(success(res))
    .catch(next)

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

export const nearIndex = (req, res, next) =>
  Poi.aggregate([
    {
      $geoNear: {
        near: { type: "Point", coordinates: req.query.near.split(',').map(Number) },
        spherical: true,
        key: "loc",
        maxDistance: parseInt(req.query.maxDistance),
        distanceField: "loc.distance"
      }
    }
  ])
  .then((poi) => Poi.populate( poi, {path: 'categories', select: 'id name'}))
  .then(success(res))
  .catch(next)