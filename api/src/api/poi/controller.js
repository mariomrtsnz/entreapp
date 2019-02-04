import { success, notFound } from '../../services/response/'
import { Poi } from '.'

export const create = ({ bodymen: { body } }, res, next) => {
  body.coverImage = body.images[0];
  Poi.create(body)
    .then((poi) => poi.view(2))
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
export const showTranslated = ({ params }, res, next) =>
  Poi.findById(params.id)
        .then(notFound(res))
        .then((poi) => poi ? poi.view(2) : null)
        .then(success(res))
        .catch(next)
export const show = ({ params }, res, next) =>
  Poi.findById(params.id).populate('categories', 'id name')
    .then(notFound(res))
    .then((poi) => poi ? poi.view(1) : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Poi.findById(params.id)
    .then(notFound(res))
    .then((poi) => poi.coverImage == null ? poi.coverImage = poi.images[0] : null)
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
