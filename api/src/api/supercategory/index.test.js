import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Supercategory } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, supercategory

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  supercategory = await Supercategory.create({})
})

test('POST /supercategories 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', categories: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.categories).toEqual('test')
})

test('POST /supercategories 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /supercategories 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /supercategories 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /supercategories 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /supercategories/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${supercategory.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(supercategory.id)
})

test('GET /supercategories/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${supercategory.id}`)
  expect(status).toBe(401)
})

test('GET /supercategories/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /supercategories/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${supercategory.id}`)
    .send({ access_token: adminSession, name: 'test', categories: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(supercategory.id)
  expect(body.name).toEqual('test')
  expect(body.categories).toEqual('test')
})

test('PUT /supercategories/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${supercategory.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /supercategories/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${supercategory.id}`)
  expect(status).toBe(401)
})

test('PUT /supercategories/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', categories: 'test' })
  expect(status).toBe(404)
})

test('DELETE /supercategories/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${supercategory.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /supercategories/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${supercategory.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /supercategories/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${supercategory.id}`)
  expect(status).toBe(401)
})

test('DELETE /supercategories/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
