import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Like, { schema } from './model'

const router = new Router()
const { name } = schema.tree

/**
 * @api {post} /likes Create like
 * @apiName CreateLike
 * @apiGroup Like
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Like's name.
 * @apiSuccess {Object} like Like's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Like not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name }),
  create)

/**
 * @api {get} /likes Retrieve likes
 * @apiName RetrieveLikes
 * @apiGroup Like
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of likes.
 * @apiSuccess {Object[]} rows List of likes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /likes/:id Retrieve like
 * @apiName RetrieveLike
 * @apiGroup Like
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} like Like's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Like not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /likes/:id Update like
 * @apiName UpdateLike
 * @apiGroup Like
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Like's name.
 * @apiSuccess {Object} like Like's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Like not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name }),
  update)

/**
 * @api {delete} /likes/:id Delete like
 * @apiName DeleteLike
 * @apiGroup Like
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Like not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
