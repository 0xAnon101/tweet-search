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
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/tweets/gettweets', function (req, res, next) {

    (0, _index2.default)(req.query.qtr, function (err, res) {

        if (err) throw err;
        console.log(res);
    }).then(function (data) {

        fs.readFile(__dirname + "/tweets.json", "utf-8", function (err, data) {
            if (err) throw err;
            data = JSON.parse(data);

            function populate(data) {
                var obj = obj || {};
                var i = 0;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var desc = _step.value;

                        obj[i] = desc.text;
                        i++;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return obj;
            }
            var result = populate(data.statuses);
            // console.log(result);
            res.render('container/result', {
                title: "Twitter",
                labelhead: "Tweets feed",
                resultstyle: "/assets/css/styleResultpage.css",
                feed: result

            });
        });
    });
});

module.exports = router;