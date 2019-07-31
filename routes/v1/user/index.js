import { Router } from 'express'
import mongoose from 'mongoose'
import User from '../../../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import checkAuth from '../../../plugin/check-auth'
const user = Router()

user.get('/', checkAuth, function (req, res, next) {
  User.find().exec().then(docs => {
    // console.log(docs)
    const response = {
      count: docs.length,
      products: docs.map(doc => {
        return {
          name: doc.name,
          age: doc.age,
          _id: doc._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/v1/user/" + doc._id
          }
        }
      })
    }
    res.status(200).json(response)
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    })
  })
})
user.get('/:id', checkAuth, function (req, res, next) {
  let id = req.params.id
  console.log(id)
  User
    .findById(id)
    .select('name age')
    .exec()
    .then(result => {
      // console.log(result)
      const response = {
        role: result.role,
        name: result.name,
        age: result.age
      }
      res.status(200).json(response)
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})
user.post('/signup', function (req, res, next) {
  let name = req.body.name
  let age = req.body.age
  let email = req.body.email
  let pwd = req.body.pwd

  User.find({ email: email })
    .exec()
    .then(user => {
      // console.log(user)
      if (user.length >= 1) {
        res.status(409).json({
          message: 'Mail exists!'
        })
      } else {
        bcrypt.hash(pwd, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            })
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: name,
              age: age,
              email: email,
              pwd: hash
            })

            user.save().then(result => {
              console.log(result)
              res.status(201).json({
                message: 'Handling Create User',
                createUser: result
              })
            }).catch(err => {
              console.log(err)
              res.status(500).json({
                error: err
              })
            })
          }
        })
      }
    })
})
user.post('/login', (req, res, next) => {
  let email = req.body.email
  let pwd = req.body.pwd
  User.find({ email: email })
    .exec()
    .then(userInfo => {
      if (userInfo.length < 1) {
        return res.status(401).json({
          message: 'Auth failed'
        })
      }

      bcrypt.compare(pwd, userInfo[0].pwd, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed'
          })
        }

        if (result) {

          const token = jwt.sign(
            {
              email: userInfo[0].email,
              userId: userInfo[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1h'
            })
          return res.status(200).json({
            token: token,
            message: 'Auth successful'
          })
        }

        return res.status(401).json({
          message: 'Auth failed'
        })
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})
user.delete('/:userId', checkAuth, (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'User deleted!'
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})
export default user