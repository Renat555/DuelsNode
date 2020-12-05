const express = require("express");
const app = express();
const fs = require("fs");
const config = require("config");

let favicon = require("serve-favicon");
app.use(favicon(__dirname + "/public/img/favicon.ico"));

app.get("/", function (req, res) {
  fs.readFile("./pages/createHero.html", function (error, data) {
    res.end(data);
  });
});

app.get("/game", function (req, res) {
  fs.readFile("./pages/game.html", function (error, data) {
    res.end(data);
  });
});

app.get("/help", function (req, res) {
  fs.readFile("./pages/help.html", function (error, data) {
    res.end(data);
  });
});

const port = config.get("server")["port"];
app.listen(port, function () {});
