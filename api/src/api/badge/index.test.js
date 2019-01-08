import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Badge } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, badge

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  badge = await Badge.create({})
})

test('POST /badges 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', points: 'test', description: 'test', icon: 'test', pois: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.points).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.icon).toEqual('test')
  expect(body.pois).toEqual('test')
})

test('POST /badges 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /badges 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /badges 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /badges 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /badges/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${badge.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(badge.id)
})

test('GET /badges/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${badge.id}`)
  expect(status).toBe(401)
})

test('GET /badges/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /badges/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${badge.id}`)
    .send({ access_token: adminSession, name: 'test', points: 'test', description: 'test', icon: 'test', pois: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(badge.id)
  expect(body.name).toEqual('test')
  expect(body.points).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.icon).toEqual('test')
  expect(body.pois).toEqual('test')
})

test('PUT /badges/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${badge.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /badges/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${badge.id}`)
  expect(status).toBe(401)
})

test('PUT /badges/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', points: 'test', description: 'test', icon: 'test', pois: 'test' })
  expect(status).toBe(404)
})

test('DELETE /badges/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${badge.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /badges/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${badge.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /badges/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${badge.id}`)
  expect(status).toBe(401)
})

test('DELETE /badges/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
