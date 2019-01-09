import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Route, { schema } from './model'

const router = new Router()
const { pois, name } = schema.tree

/**
 * @api {post} /routes Create route
 * @apiName CreateRoute
 * @apiGroup Route
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam pois Route's pois.
 * @apiParam name Route's name.
 * @apiSuccess {Object} route Route's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Route not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ pois, name }),
  create)

/**
 * @api {get} /routes Retrieve routes
 * @apiName RetrieveRoutes
 * @apiGroup Route
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of routes.
 * @apiSuccess {Object[]} rows List of routes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /routes/:id Retrieve route
 * @apiName RetrieveRoute
 * @apiGroup Route
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} route Route's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Route not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /routes/:id Update route
 * @apiName UpdateRoute
 * @apiGroup Route
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam pois Route's pois.
 * @apiParam name Route's name.
 * @apiSuccess {Object} route Route's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Route not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ pois, name }),
  update)

/**
 * @api {delete} /routes/:id Delete route
 * @apiName DeleteRoute
 * @apiGroup Route
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Route not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
