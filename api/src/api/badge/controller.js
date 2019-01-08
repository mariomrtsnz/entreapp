import { success, notFound } from '../../services/response/'
import { Badge } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Badge.create(body)
    .then((badge) => badge.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Badge.count(query)
    .then(count => Badge.find(query, select, cursor)
      .then((badges) => ({
        count,
        rows: badges.map((badge) => badge.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Badge.findById(params.id)
    .then(notFound(res))
    .then((badge) => badge ? badge.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Badge.findById(params.id)
    .then(notFound(res))
    .then((badge) => badge ? Object.assign(badge, body).save() : null)
    .then((badge) => badge ? badge.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Badge.findById(params.id)
    .then(notFound(res))
    .then((badge) => badge ? badge.remove() : null)
    .then(success(res, 204))
    .catch(next)
