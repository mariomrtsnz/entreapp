import { sign } from '../../services/jwt'
import { success } from '../../services/response/'

/*export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Comment.count(query)
    .then(count => Comment.find(query, select, cursor)
      .populate('user')
      .then((comments) => ({
        count,
        rows: comments.map((comment) => comment.view())
      }))
    )
    .then(success(res))
    .catch(next)
*/
/*export const login = ({ user }, res, next) =>
  sign(user.id)
    .then((token) => ({ token, user: user.view(true) }))
    .then(success(res, 201))
    .catch(next)
*/
export const login = ({ user }, res, next) =>
  sign(user.id)
    .then((token) => ({ token, user: user.view(true) }))
    .then(success(res, 201))
    .catch(next)