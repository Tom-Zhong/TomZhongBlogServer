var express = require('express');
var v1 = express.Router();
var user = require('./user/index')
/* GET home page. */
v1.use('/user', user);

module.exports = v1;
