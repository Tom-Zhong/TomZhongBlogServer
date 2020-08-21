var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '仿模板编辑 - by Tom Zhong' });
});

module.exports = router;
