var express = require('express');
var router = express.Router();
var https = require("https");
var fs =  require('fs');
var expressSession = require("express-session");
const key = require('../twitterkey.json');
var OAuth2 = require('OAuth').OAuth2;

export default function() {


    var oauth2 = new OAuth2(key.twitterkey, 'h6gOQ8675iE3nfHzCVUDdX025cJzUec1jX3Z7onzXPYaubh19m', 'https://api.twitter.com/', null, 'oauth2/token', null);

    oauth2.getOAuthAccessToken('', {
        'grant_type': 'client_credentials'
    }, function(e, access_token) {
        //console.log(access_token); //string that we can use to authenticate request

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
        https.get(options, function(result) {
            var buffer = '';
            result.setEncoding('utf8');
            result.on('data', function(data) {
                buffer += data;
            });
            result.on('end', function() {
                var tweets = JSON.parse(buffer);
                console.log(tweets.js)
                fs.writeFile('tweets.json',tweets.js,(err)=>{
                  if(err)  console.error(err);
                  console.log("File is written...");
                })
                 
            });
        });
    }
}



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('container/index', {
        title: 'Twitter'
    });
});

// module.exports.routers = router;