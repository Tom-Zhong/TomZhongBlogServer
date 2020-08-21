var express = require('express');
var router = express.Router();
import render from '../plugin/render';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '仿模板编辑 - by Tom Zhong' });
});


const testStr = `
//- layout.pug
html
  head
    meta(charset="UTF-8")
    title 我的站点 - #{title}
    block scripts
      script(src='/jquery.js')
  body
    block content
    block foot
      #footer
        p 模板引擎测试`;

/** 测试模板引擎 */
router.get('/test-view-engine', function(req, res, next) {
  res.send(render(
    testStr,
    { title: '你做主' }
  ));
});

module.exports = router;
