import { success, notFound } from '../../services/response/'
import { Route } from '.'
import mongoose from '../../services/mongoose'

export const create = ({ bodymen: { body } }, res, next) => {
  let objectIdPoisArray = body.pois.map(s => mongoose.Types.ObjectId(s))
  let correctBody = {
    name: body.name,
    pois: objectIdPoisArray
  }
  Route.create(correctBody)
    .then((route) => route.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Route.count(query)
    .then(count => Route.find(query, select, cursor).populate('pois', 'id name')
      .then((routes) => ({
        count,
        rows: routes.map((route) => route.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Route.findById(params.id)
    .then(notFound(res))
    .then((route) => route ? route.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Route.findById(params.id)
    .then(notFound(res))
    .then((route) => route ? Object.assign(route, body).save() : null)
    .then((route) => route ? route.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Route.findById(params.id)
    .then(notFound(res))
    .then((route) => route ? route.remove() : null)
    .then(success(res, 204))
    .catch(next)
