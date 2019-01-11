import jwt from 'jsonwebtoken'
import Promise from 'bluebird'
import { jwtSecret } from '../../config'

const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

const jwtSign = Promise.promisify(jwt.sign)
const jwtVerify = Promise.promisify(jwt.verify)
const jwtOptions = { expiresIn: requireProcessEnv('TOKEN_LIFE') }

export const sign = (id, options = jwtOptions, method = jwtSign) =>
  method({ id }, jwtSecret, options)
  

export const signSync = (id, options) => sign(id, options, jwt.sign)

export const verify = (token) => jwtVerify(token, jwtSecret)
