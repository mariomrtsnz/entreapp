import { success, notFound } from '../../services/response/'
import { Like } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Like.create(body)
    .then((like) => like.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Like.count(query)
    .then(count => Like.find(query, select, cursor)
      .then((likes) => ({
        count,
        rows: likes.map((like) => like.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Like.findById(params.id)
    .then(notFound(res))
    .then((like) => like ? like.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Like.findById(params.id)
    .then(notFound(res))
    .then((like) => like ? Object.assign(like, body).save() : null)
    .then((like) => like ? like.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Like.findById(params.id)
    .then(notFound(res))
    .then((like) => like ? like.remove() : null)
    .then(success(res, 204))
    .catch(next)
