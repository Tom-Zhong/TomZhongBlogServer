import {Router} from 'express'
const user = Router()

user.get('/', function (req, res, next) {
  res.end('<h1>Here is API to get User Info from Tom Zhong\'s Blog!</h1>')
})
user.get('/:id', function (req, res, next) {
  res.json('{id: 1, name:tom}')
})

export default user