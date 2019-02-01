import { success, notFound } from '../../services/response/'
import { Language } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Language.create(body)
    .then((language) => language.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Language.count(query)
    .then(count => Language.find(query, select, cursor)
      .then((languages) => ({
        count,
        rows: languages.map((language) => language.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Language.findById(params.id)
    .then(notFound(res))
    .then((language) => language ? language.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Language.findById(params.id)
    .then(notFound(res))
    .then((language) => language ? Object.assign(language, body).save() : null)
    .then((language) => language ? language.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Language.findById(params.id)
    .then(notFound(res))
    .then((language) => language ? language.remove() : null)
    .then(success(res, 204))
    .catch(next)
