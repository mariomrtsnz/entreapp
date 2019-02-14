import { sign } from '../../services/jwt'
import { success } from '../../services/response/'
import {User} from '../user/index'
import { stringify } from 'querystring';
import { Badge } from '../badge/index'

export const login = ({ user }, res, next) => {
  let thetoken = ''
  sign(user.id)
  .then((token) => {  
    thetoken = token
    return ({token, user: user.view(true)
  })
  
})
  .then((data) => {
    return User.findById(data.user.id)
    .populate('badges language likes');
  })
  .then(completeUser => 
    ({token: thetoken, user: completeUser})
  )
  
  .then(success(res, 201))
  .catch(next)
}
 