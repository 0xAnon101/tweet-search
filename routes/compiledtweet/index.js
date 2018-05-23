'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (searching, callback) {

    console.log("searching ::::::::::::::::::::::::::::::::::::" + searching);
    return new Promise(function (resolve, reject) {

        var oauth2 = new OAuth2(key.twitterkey, 'h6gOQ8675iE3nfHzCVUDdX025cJzUec1jX3Z7onzXPYaubh19m', 'https://api.twitter.com/', null, 'oauth2/token', null);

        oauth2.getOAuthAccessToken('', {
            'grant_type': 'client_credentials'
        }, function (e, accesstoken) {

            setrequest(accesstoken);
        });

        function setrequest(accesstoken) {
            console.log("searching :::::::::::::" + searching);
            var options = {
                hostname: 'api.twitter.com',
                path: '/1.1/search/tweets.json?q=' + searching + '&result_type=popular',
                headers: {
                    Authorization: 'Bearer ' + accesstoken
                }

            };
            console.log(options.path);
            show(options);
        }

        function show(options) {
            https.get(options, function (result) {
                var buffer = '';
                result.setEncoding('utf8');
                var tweets = fs.createWriteStream(__dirname + '/tweets.json', { encoding: "utf-8" });
                result.on('data', function (data) {

                    tweets.write(data);
                });
                result.on('end', function () {

                    console.log("File is written to tweets");
                    resolve("it is being resolved");
                    return callback(null, "it is being resolved");
                }).on('error', function (e) {
                    console.log("File is not written...");
                    reject("it is being rejected");
                    return callback("it is being rejected");
                    console.error('Got error: ' + e.message);
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
        title: 'Twitter',
        mainstyle: '/assets/css/styleMainpage.css'
    });
});

module.exports.routers = router;