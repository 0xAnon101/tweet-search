'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (callback) {

    return new Promise(function (resolve, reject) {

        callback = callback || function () {};
        var oauth2 = new OAuth2(key.twitterkey, 'h6gOQ8675iE3nfHzCVUDdX025cJzUec1jX3Z7onzXPYaubh19m', 'https://api.twitter.com/', null, 'oauth2/token', null);

        oauth2.getOAuthAccessToken('', {
            'grant_type': 'client_credentials'
        }, function (e, access_token) {

            setrequest(access_token);
        });

        function setrequest(access_token) {
            var options = {
                hostname: 'api.twitter.com',
                path: '/1.1/search/tweets.json?q=nasa&result_type=popular',
                headers: {
                    Authorization: 'Bearer ' + access_token
                }
            };
            show(options);
        }

        function show(options) {
            https.get(options, function (result) {
                var buffer = '';
                result.setEncoding('utf8');
                result.on('data', function (data) {
                    buffer += data;
                });
                result.on('end', function () {
                    var tweets = buffer.toString();
                    // console.log(tweets)
                    fs.writeFile('tweets.json', tweets, function (err) {
                        if (err) {
                            console.error(err);
                            reject("it is not being resolved");
                            callback("it is not being resolved");
                        }
                        console.log("File is written...");
                        resolve("it is being resolved");
                        callback(null, "it is being resolved");
                    });
                });
            });
        }
    });
};

var express = require('express');
var router = express.Router();
var https = require("https");
var fs = require('fs');
var expressSession = require("express-session");
var key = require('../twitterkey.json');
var OAuth2 = require('OAuth').OAuth2;
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('container/index', {
        title: 'Twitter'
    });
});

// router.get('/tweets/gettweets', function(req, res, next) {
//     res.json({
//         name:"asas",
//         class:"six"
//     })
//  });

module.exports.routers = router;