import { sign } from '../../services/jwt'
import { success } from '../../services/response/'
import {User} from '../user/index'
import { stringify } from 'querystring';
import { Badge } from '../badge/index'

export const login = ({ user }, res, next) =>{
  let badges =  {
    name: String,
    points: Number,
    description: String,
    icon: String
  }
  
  console.log(user)
  sign(user.id)
  .then((token) => ({
    token, user: user.view(true)
  }))
  .then(success(res, 201))
  .catch(next)
}
 