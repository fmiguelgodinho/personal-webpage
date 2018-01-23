var express = require("express");
var https = require('https');
var app = express();
var router = express.Router();
var path = require('path');
var fs = require('fs');
var forceSSL = require('express-force-ssl');

var key = fs.readFileSync('crt/fgodinho.key');
var cert = fs.readFileSync( 'crt/fgodinho.crt' );
var ca = fs.readFileSync( 'crt/ca.crt' );
var options = {
  key: key,
  cert: cert,
  ca: ca
};

//app.use(forceSSL);
app.use(express.static(path.join(__dirname, 'public')));
//https.createServer(options, app).listen(4443);

var http = require('http');
http.createServer(app).listen(3000);


router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.get("/pgp",function(req,res) {
  var filepath = path.join(__dirname, 'pgp.pub');
  var content = fs.readFileSync(filepath, 'utf8');
  res.send(content);
});

router.get("/travelmap",function(req,res){
  res.sendFile(path.join(__dirname, 'travelmap.html'));
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path.join(__dirname, '404.html'));
});
