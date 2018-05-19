var sass =  require("sass");
var fs  = require("fs");
const path = './public/stylesheets/scss/style.scss';

sass.render({file: path},(err,data)=>{
    fs.writeFile('./public/stylesheets/css/style.css',data.css,(err,data)=> { 
        if(err)  console.error(err);
   })
});