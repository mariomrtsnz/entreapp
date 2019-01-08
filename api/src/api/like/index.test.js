import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Like } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, like

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  like = await Like.create({})
})

test('POST /likes 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
})

test('POST /likes 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /likes 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /likes 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /likes 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /likes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${like.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(like.id)
})

test('GET /likes/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${like.id}`)
  expect(status).toBe(401)
})

test('GET /likes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /likes/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${like.id}`)
    .send({ access_token: adminSession, name: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(like.id)
  expect(body.name).toEqual('test')
})

test('PUT /likes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${like.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /likes/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${like.id}`)
  expect(status).toBe(401)
})

test('PUT /likes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test' })
  expect(status).toBe(404)
})

test('DELETE /likes/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${like.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /likes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${like.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /likes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${like.id}`)
  expect(status).toBe(401)
})

test('DELETE /likes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
