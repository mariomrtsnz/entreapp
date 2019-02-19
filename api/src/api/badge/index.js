import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, allBadgesAndEarned, earnedBadgesFiltered } from './controller'
import { schema } from './model'
export Badge, { schema } from './model'

const router = new Router()
const { name, points, description, icon, pois } = schema.tree

/**
 * @api {post} /badges Create badge
 * @apiName CreateBadge
 * @apiGroup Badge
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Badge's name.
 * @apiParam points Badge's points.
 * @apiParam description Badge's description.
 * @apiParam icon Badge's icon.
 * @apiParam pois Badge's pois.
 * @apiSuccess {Object} badge Badge's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Badge not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, points, description, icon, pois }),
  create)

/**
 * @api {get} /badges Retrieve badges
 * @apiName RetrieveBadges
 * @apiGroup Badge
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of badges.
 * @apiSuccess {Object[]} rows List of badges.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

router.get('/earned',
  token({required: true}),
  query(),
  allBadgesAndEarned)

  router.get('/earned/filtered',
  token({required: true}),
  query(),
  earnedBadgesFiltered)

/**
 * @api {get} /badges/:id Retrieve badge
 * @apiName RetrieveBadge
 * @apiGroup Badge
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} badge Badge's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Badge not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /badges/:id Update badge
 * @apiName UpdateBadge
 * @apiGroup Badge
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Badge's name.
 * @apiParam points Badge's points.
 * @apiParam description Badge's description.
 * @apiParam icon Badge's icon.
 * @apiParam pois Badge's pois.
 * @apiSuccess {Object} badge Badge's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Badge not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, points, description, icon, pois }),
  update)

/**
 * @api {delete} /badges/:id Delete badge
 * @apiName DeleteBadge
 * @apiGroup Badge
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Badge not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
