import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Language } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, language

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  language = await Language.create({})
})

test('POST /languages 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', isoCode: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.isoCode).toEqual('test')
})

test('POST /languages 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /languages 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /languages 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /languages 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /languages/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${language.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(language.id)
})

test('GET /languages/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${language.id}`)
  expect(status).toBe(401)
})

test('GET /languages/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /languages/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${language.id}`)
    .send({ access_token: adminSession, name: 'test', isoCode: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(language.id)
  expect(body.name).toEqual('test')
  expect(body.isoCode).toEqual('test')
})

test('PUT /languages/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${language.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /languages/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${language.id}`)
  expect(status).toBe(401)
})

test('PUT /languages/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', isoCode: 'test' })
  expect(status).toBe(404)
})

test('DELETE /languages/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${language.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /languages/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${language.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /languages/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${language.id}`)
  expect(status).toBe(401)
})

test('DELETE /languages/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
