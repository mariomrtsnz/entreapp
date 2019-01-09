import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Supercategory, { schema } from './model'

const router = new Router()
const { name, categories } = schema.tree

/**
 * @api {post} /supercategories Create supercategory
 * @apiName CreateSupercategory
 * @apiGroup Supercategory
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Supercategory's name.
 * @apiParam categories Supercategory's categories.
 * @apiSuccess {Object} supercategory Supercategory's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Supercategory not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, categories }),
  create)

/**
 * @api {get} /supercategories Retrieve supercategories
 * @apiName RetrieveSupercategories
 * @apiGroup Supercategory
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of supercategories.
 * @apiSuccess {Object[]} rows List of supercategories.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /supercategories/:id Retrieve supercategory
 * @apiName RetrieveSupercategory
 * @apiGroup Supercategory
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} supercategory Supercategory's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Supercategory not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /supercategories/:id Update supercategory
 * @apiName UpdateSupercategory
 * @apiGroup Supercategory
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Supercategory's name.
 * @apiParam categories Supercategory's categories.
 * @apiSuccess {Object} supercategory Supercategory's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Supercategory not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, categories }),
  update)

/**
 * @api {delete} /supercategories/:id Delete supercategory
 * @apiName DeleteSupercategory
 * @apiGroup Supercategory
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Supercategory not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
