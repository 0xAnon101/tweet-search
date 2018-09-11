var express = require('express');
var router = express.Router();
var https = require("https");
var fs =  require('fs');
var expressSession = require("express-session");
const key = require('../twitterkey.json');
var OAuth = require('oauth');
var bodyParser =  require('body-parser');

var OAuth2 = OAuth.OAuth2;  
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var hello=  function(searching,callback) {

    console.log("searching ::::::::::::::::::::::::::::::::::::" +searching)
        return new Promise(function(resolve,reject) {


            var oauth2 = new OAuth2(key.twitterkey, 'h6gOQ8675iE3nfHzCVUDdX025cJzUec1jX3Z7onzXPYaubh19m', 'https://api.twitter.com/', null, 'oauth2/token', null);
        
            oauth2.getOAuthAccessToken('', {
                'grant_type': 'client_credentials'
            }, function(e, accesstoken) {
        
                setrequest(accesstoken);
            });
        
            function setrequest(accesstoken) {
                console.log("searching :::::::::::::" + searching);
                var options = {
                    hostname: 'api.twitter.com',
                    path: '/1.1/search/tweets.json?q='+encodeURI(searching)+'&result_type=popular',
                    headers: {
                        Authorization: 'Bearer ' + accesstoken
                    }
                    
                };
                console.log(options.path);
                show(options);
            }
        
            function show(options) {
                https.get(options, function(result) {
                    var buffer = '';
                    result.setEncoding('utf8');
                    var tweets = fs.createWriteStream(__dirname+'/tweets.json',{encoding:"utf-8"});
                    result.on('data', function(data) {
                       
                        tweets.write(data);
                    });
                    result.on('end', function() {
                       
                          console.log("File is written to tweets");
                          resolve("it is being resolved");
                          return callback(null,"it is being resolved");

                        }).on('error', (e) => {
                            console.log("File is not written...");
                            reject("it is being rejected");
                           return  callback("it is being rejected");
                            console.error(`Got error: ${e.message}`);
                          });
                });
            }
        })

}



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('container/index', {
        title: 'Twitter',
        mainstyle: '/assets/css/styleMainpage.css'
    });
});



 module.exports.routers = router;
 module.exports.hello = hello;