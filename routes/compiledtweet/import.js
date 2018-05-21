'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var indexRouter = require('./index').routers;
var fs = require("fs");

router.use('/', indexRouter);

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/tweets/gettweets', function (req, res, next) {

  (0, _index2.default)().then(function (data) {

    // console.log(data);
    fs.readFile("tweets.json", function (err, data) {
      if (err) throw err;
      console.log(JSON.parse(data.toString()));
    });
    res.json(data);
  });

  (0, _index2.default)(function (err, res) {

    if (err) throw err;
    console.log(res);
  });
});

module.exports = router;