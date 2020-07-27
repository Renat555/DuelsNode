
const express = require('express');
const app = express();
const fs = require("fs");

app.get('/', function (req, res) {
  fs.readFile('./createHero/createHero.html', function(error, data){
    res.end(data);
  });
});

app.get('/createHero.css', function (req, res) {
  fs.readFile('./createHero/createHero.css', function(error, data){
    res.end(data);
  });
});

app.listen(3000, function () {});
