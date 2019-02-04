import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, showTranslated } from './controller'
import { schema } from './model'
export Poi, { schema } from './model'

const router = new Router()
const { name, categories, coordinates, qrCode, audioguides, description, coverImage, images, year, creator, status, schedule, price } = schema.tree

/**
 * @api {post} /pois Create poi
 * @apiName CreatePoi
 * @apiGroup Poi
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Poi's name.
 * @apiParam categories Categories's ids.
 * @apiParam coordinates Poi's coordinates.
 * @apiParam qrCode Poi's qrCode.
 * @apiParam audioguides Poi's audioguides.
 * @apiParam description Poi's description.
 * @apiParam coverImage Poi's images.
 * @apiParam images Poi's images.
 * @apiParam year Poi's year.
 * @apiParam creator Poi's creator.
 * @apiParam status Poi's status.
 * @apiParam schedule Poi's schedule.
 * @apiParam price Poi's price.
 * @apiSuccess {Object} poi Poi's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Poi not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, categories, coordinates, qrCode, audioguides, description, coverImage, images, year, creator, status, schedule, price }),
  create)

/**
 * @api {get} /pois Retrieve pois
 * @apiName RetrievePois
 * @apiGroup Poi
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of pois.
 * @apiSuccess {Object[]} rows List of pois.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /pois/:id Retrieve poi
 * @apiName RetrievePoi
 * @apiGroup Poi
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} poi Poi's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Poi not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)
router.get('/:id/:isocode',
  token({ required: true }),
  showTranslated)

/**
 * @api {put} /pois/:id Update poi
 * @apiName UpdatePoi
 * @apiGroup Poi
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Poi's name.
 * @apiParam categories Categories's ids.
 * @apiParam coordinates Poi's coordinates.
 * @apiParam qrCode Poi's qrCode.
 * @apiParam audioguides Poi's audioguides.
 * @apiParam description Poi's description.
 * @apiParam coverImage Poi's images.
 * @apiParam images Poi's images.
 * @apiParam year Poi's year.
 * @apiParam creator Poi's creator.
 * @apiParam status Poi's status.
 * @apiParam schedule Poi's schedule.
 * @apiParam price Poi's price.
 * @apiSuccess {Object} poi Poi's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Poi not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, categories, coordinates, qrCode, audioguides, description, coverImage, images, year, creator, status, schedule, price }),
  update)

/**
 * @api {delete} /pois/:id Delete poi
 * @apiName DeletePoi
 * @apiGroup Poi
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Poi not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
