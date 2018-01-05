var express = require("express");
var https = require('https');
var app = express();
var router = express.Router();
var path = require('path');
var fs = require('fs');

var key = fs.readFileSync('crt/fgodinho.key');
var cert = fs.readFileSync( 'crt/fgodinho.crt' );
var ca = fs.readFileSync( 'crt/ca.crt' );
var options = {
  key: key,
  cert: cert,
  ca: ca
};

app.use(express.static(path.join(__dirname, 'public')));
https.createServer(options, app).listen(443);

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