'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
// require and use "multer"...
var multer = require("multer")

var app = express();
var upload = multer({dest : './public'})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

/*routes*/
app.route("/api/fileanalyse").post(upload.single('upfile'),(req,res,next) =>{
  res.json({
    name : req.file.originalname,
    type : req.file.mimetype,
    size : req.file.size
  })
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
