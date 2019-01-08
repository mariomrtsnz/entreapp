import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Poi } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, poi

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  poi = await Poi.create({})
})

test('POST /pois 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', categories: 'test', coordinates: 'test', comments: 'test', badges: 'test', qrCode: 'test', audioguides: 'test', description: 'test', images: 'test', year: 'test', creator: 'test', likes: 'test', status: 'test', schedule: 'test', price: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.categories).toEqual('test')
  expect(body.coordinates).toEqual('test')
  expect(body.comments).toEqual('test')
  expect(body.badges).toEqual('test')
  expect(body.qrCode).toEqual('test')
  expect(body.audioguides).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.images).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.creator).toEqual('test')
  expect(body.likes).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.schedule).toEqual('test')
  expect(body.price).toEqual('test')
})

test('POST /pois 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /pois 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /pois 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /pois 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /pois/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${poi.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(poi.id)
})

test('GET /pois/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${poi.id}`)
  expect(status).toBe(401)
})

test('GET /pois/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /pois/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${poi.id}`)
    .send({ access_token: adminSession, name: 'test', categories: 'test', coordinates: 'test', comments: 'test', badges: 'test', qrCode: 'test', audioguides: 'test', description: 'test', images: 'test', year: 'test', creator: 'test', likes: 'test', status: 'test', schedule: 'test', price: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(poi.id)
  expect(body.name).toEqual('test')
  expect(body.categories).toEqual('test')
  expect(body.coordinates).toEqual('test')
  expect(body.comments).toEqual('test')
  expect(body.badges).toEqual('test')
  expect(body.qrCode).toEqual('test')
  expect(body.audioguides).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.images).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.creator).toEqual('test')
  expect(body.likes).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.schedule).toEqual('test')
  expect(body.price).toEqual('test')
})

test('PUT /pois/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${poi.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /pois/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${poi.id}`)
  expect(status).toBe(401)
})

test('PUT /pois/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', categories: 'test', coordinates: 'test', comments: 'test', badges: 'test', qrCode: 'test', audioguides: 'test', description: 'test', images: 'test', year: 'test', creator: 'test', likes: 'test', status: 'test', schedule: 'test', price: 'test' })
  expect(status).toBe(404)
})

test('DELETE /pois/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${poi.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /pois/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${poi.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /pois/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${poi.id}`)
  expect(status).toBe(401)
})

test('DELETE /pois/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
