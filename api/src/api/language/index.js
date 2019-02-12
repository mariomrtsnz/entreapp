import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Language, { schema } from './model'

const router = new Router()
const { name, isoCode } = schema.tree

/**
 * @api {post} /languages Create language
 * @apiName CreateLanguage
 * @apiGroup Language
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Language's name.
 * @apiParam isoCode Language's isoCode.
 * @apiSuccess {Object} language Language's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Language not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, isoCode }),
  create)

/**
 * @api {get} /languages Retrieve languages
 * @apiName RetrieveLanguages
 * @apiGroup Language
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of languages.
 * @apiSuccess {Object[]} rows List of languages.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /languages/:id Retrieve language
 * @apiName RetrieveLanguage
 * @apiGroup Language
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} language Language's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Language not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /languages/:id Update language
 * @apiName UpdateLanguage
 * @apiGroup Language
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Language's name.
 * @apiParam isoCode Language's isoCode.
 * @apiSuccess {Object} language Language's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Language not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, isoCode }),
  update)

/**
 * @api {delete} /languages/:id Delete language
 * @apiName DeleteLanguage
 * @apiGroup Language
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Language not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
