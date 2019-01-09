import { success, notFound } from '../../services/response/'
import { Supercategory } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Supercategory.create(body)
    .then((supercategory) => supercategory.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Supercategory.count(query)
    .then(count => Supercategory.find(query, select, cursor)
      .then((supercategories) => ({
        count,
        rows: supercategories.map((supercategory) => supercategory.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Supercategory.findById(params.id)
    .then(notFound(res))
    .then((supercategory) => supercategory ? supercategory.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Supercategory.findById(params.id)
    .then(notFound(res))
    .then((supercategory) => supercategory ? Object.assign(supercategory, body).save() : null)
    .then((supercategory) => supercategory ? supercategory.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Supercategory.findById(params.id)
    .then(notFound(res))
    .then((supercategory) => supercategory ? supercategory.remove() : null)
    .then(success(res, 204))
    .catch(next)
