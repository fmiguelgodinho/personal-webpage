var express = require("express");
var app = express();
var router = express.Router();
var path = require('path');

app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use("/",router);

/*app.use("*",function(req,res){
  res.sendFile(__dirname + "404.html");
});*/

app.listen(3000,function(){
  console.log("Live at Port 3000");
});