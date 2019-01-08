import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Route } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, route

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  route = await Route.create({})
})

test('POST /routes 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, pois: 'test', name: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.pois).toEqual('test')
  expect(body.name).toEqual('test')
})

test('POST /routes 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /routes 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /routes 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /routes 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /routes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${route.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(route.id)
})

test('GET /routes/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${route.id}`)
  expect(status).toBe(401)
})

test('GET /routes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /routes/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${route.id}`)
    .send({ access_token: adminSession, pois: 'test', name: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(route.id)
  expect(body.pois).toEqual('test')
  expect(body.name).toEqual('test')
})

test('PUT /routes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${route.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /routes/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${route.id}`)
  expect(status).toBe(401)
})

test('PUT /routes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, pois: 'test', name: 'test' })
  expect(status).toBe(404)
})

test('DELETE /routes/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${route.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /routes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${route.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /routes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${route.id}`)
  expect(status).toBe(401)
})

test('DELETE /routes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
