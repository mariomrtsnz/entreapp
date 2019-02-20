import _ from 'lodash';

import { User } from '.';
import { sign } from '../../services/jwt';
import { notFound, success } from '../../services/response/';
import { Language } from '../language';
import { roles } from './model';

export const index = ({ querymen: { query, select, cursor }, res, next}) =>
  User.count(query)
    .then(count => User.find(query, select, cursor)
      .populate('badges', 'points').populate('likes', 'id name').populate('language')
      .then(users => ({
        rows: users.map((user) => user.view(true)),
        count
      }))
    )
    .then(success(res))
    .catch(next)
/* Comment.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((comment) => comment ? comment.view() : null)
    .then(success(res))
    .catch(next)*/
export const show = ({ params }, res, next) =>
  User.findById(params.id)
    .populate('badges language likes')
    .then(notFound(res))
    .then((user) => user ? user.view("true") : null)
    .then(success(res))
    .catch(next)

export const allUsersAndFriended = ({ params }, res, next) => {
  const userLogged = res.req.user;
  User.find().populate('badges', 'id points').populate('likes', 'id name').populate('language').then(users => {
    return new Promise(function (res, rej) {
      users.map((user) => {
        if (userLogged.friends.length != 0) {
          userLogged.friends.forEach(userFriend => {
            if (_.isEqual(userFriend.toString(), user.id))
              user.set('friended', true)
            else
              user.set('friended', false)
          });
        } else {
          user.set('friended', false)
        }
      });
      res(users);
    });
  }).then(success(res)).catch(next);
}

export const showMe = ({ user }, res) =>
  res.json(user.view("full"))

export const obtainRoles = (req, res) => {
  res.status(200).send({
    roles
  });
}
export const create = ({ bodymen: { body }, res, next}) => {
  if (body.language == undefined || body.language == null) {
    Language.findOne({
      isoCode: 'en'
    }).then(language => {
      body.language = language.id;
      User.create(body).then(user => {
        sign(user.id).then((token) => ({
          token,
          user: user.view(true)
        })).then(success(res, 201))
      }).catch((err) => {
        /* istanbul ignore else */
        if (err.name === 'MongoError' && err.code === 11000) {
          res.status(409).json({
            valid: false,
            param: 'email',
            message: 'email already registered'
          })
        } else {
          next(err)
        }
      })
    });
  } else {
    User.create(body)
      .then(user => {
        sign(user.id)
          .then((token) => ({
            token,
            user: user.view(true)
          }))
          .then(success(res, 201))
      }).catch((err) => {
        /* istanbul ignore else */
        if (err.name === 'MongoError' && err.code === 11000) {
          res.status(409).json({
            valid: false,
            param: 'email',
            message: 'email already registered'
          })
        } else {
          next(err)
        }
      })
  }
}

export const update = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isAdmin = user.role === 'admin'
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other user\'s data'
        })
        return null
      }
      return result
    })
    .then((user) => user ? Object.assign(user, body).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const updateRole = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((user) => user ? user.set({
      role: body.role
    }).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

/*export const updateLikes = ({
    bodymen: {
      body
    },
    params,
    user
  }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
  .then(notFound(res))
  .then((user) => user ? user.set({
    likes: body.likes
  }).save() : null)
  .then((user) => user ? user.view(true) : null)
  .then(success(res))
  .catch(next)

*/
export const updatePassword = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: 'You can\'t change other user\'s password'
        })
        return null
      }
      return result 
    })
    .then((user) => user ? user.set({ password: body.password }).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const editPoiFavs = ({ params, user }, res, next) => {
  const found = user.favs.indexOf(params.id);
  if (found != -1)
    user.favs.splice(found, 1);
  else
    user.favs.push(params.id);
  user.save()
    .then(success(res, 204))
    .catch(next);
}

export const editUserFriends = ({ params, user }, res, next) => {
  const found = user.friends.indexOf(params.id);
  if (found != -1)
    user.friends.splice(found, 1);
  else
    user.friends.push(params.id);
  user.save()
    .then(success(res))
    .catch(next);
}