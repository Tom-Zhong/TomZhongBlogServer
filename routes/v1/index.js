import { Router } from 'express'
const v1 = Router()
import user from './user'

// 用户路由
v1.use('/user', user)

module.exports = v1
