import { Router } from 'express'
const v1 = Router()
import user from './user'
import article from './article'

// 用户路由
v1.use('/user', user)

// 文章路由
v1.use('/article', article)

module.exports = v1
