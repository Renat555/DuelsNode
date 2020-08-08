
const express = require('express');
const app = express();
const fs = require("fs");

app.use(express.static('public'));

app.get('/', function (req, res) {
  fs.readFile('./routes/createHero.html', function(error, data){
    res.end(data);
  });
});

app.get('/game', function (req, res) {
  fs.readFile('./routes/game.html', function(error, data){
    res.end(data);
  });
});

app.get('/help', function (req, res) {
  fs.readFile('./routes/help.html', function(error, data){
    res.end(data);
  });
});

app.listen(3000, function () {
  console.log("server run");
});
