import { Router } from 'express'
import mongoose from 'mongoose'
import User from '../../../models/user'

const user = Router()

user.get('/', function (req, res, next) {
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
user.get('/:id', function (req, res, next) {
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
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    age: age,
    email: email,
    pwd: pwd
  })

  user.save().then(result => {
    // console.log(result)
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
})

export default user