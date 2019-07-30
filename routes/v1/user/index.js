var express = require('express');
var user = express.Router();

user.get('/', function (req, res, next) {
  res.end('<h1>Here is API to get User Info from Tom Zhong\'s Blog!</h1>')
});
user.get('/:id', function (req, res, next) {
  res.json('{id: 1, name:tom}')
});

module.exports = user;