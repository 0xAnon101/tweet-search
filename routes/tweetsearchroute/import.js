import hello from './index';
var bodyParser =  require('body-parser');
var express = require('express');
var router = express.Router();
var indexRouter = require('./index').routers;
const fs =  require("fs");

router.use('/',indexRouter);



  var jsonParser = bodyParser.json()
  var urlencodedParser = bodyParser.urlencoded({ extended: false })

 router.get('/tweets/gettweets', function(req, res, next){
  
  hello().then((data)=>{
   
   // console.log(data);
    fs.readFile("tweets.json",(err,data)=>{
        if(err)  throw err;
      console.log(JSON.parse(data.toString()));
    })
    res.json(
      data
     )
    
 })


 hello(function(err,res){
     
     if(err) throw err; 
        console.log(res);
 })
 })
 

module.exports  = router;