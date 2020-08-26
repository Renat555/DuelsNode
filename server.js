
const express = require('express');
const app = express();
const fs = require("fs");
const config = require('config');

app.use(express.static('public'));

app.get('/', function (req, res) {
  fs.readFile('./pages/createHero.html', function(error, data){
    res.end(data);
  });
});

app.get('/game', function (req, res) {
  fs.readFile('./pages/game.html', function(error, data){
    res.end(data);
  });
});

app.get('/help', function (req, res) {
  fs.readFile('./pages/help.html', function(error, data){
    res.end(data);
  });
});

const port = config.get('server')['port'];
app.listen(port, function () {
  console.log("server run");
});