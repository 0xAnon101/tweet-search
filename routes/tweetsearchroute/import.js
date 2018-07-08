var  hello =  require('./index').hello;
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var indexRouter = require('./index').routers;
const fs = require("fs");

router.use('/', indexRouter);



var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

router.get('/tweets/gettweets', function(req, res, next) {

    hello(req.query.qtr, function(err, res) {

        if (err) throw err;
        console.log(res);

    }).then((data) => {

        fs.readFile(__dirname + "/tweets.json", "utf-8", (err, data) => {
            if (err) throw err;
            data = JSON.parse(data);

            function populate(data) {
                let obj =  {};
                console.log(obj);
                let i = 0;
                for (var desc of data) {
                    obj[i] = desc.text;
                    i++;
                }
                return obj;

            }
            let result = populate(data.statuses);
            // console.log(result);
            res.render('container/result', {
                title: "Twitter",
                labelhead: "Tweets feed",
                resultstyle: "/assets/css/styleResultpage.css",
                feed: result

            });
        });

    })

})


module.exports = router;