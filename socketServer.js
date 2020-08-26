
const WebSocket = require('ws');
const MongoClient = require("mongodb").MongoClient;

const config = require('config');

const createGame = require('./modules/createGame');

const url = config.get('mongo')['url'];
const port = config.get('mongo')['port'];
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

const wss = new WebSocket.Server({ port: port });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {

    console.log("WebSocket run");

    mongoClient.connect(function(err, client) {
      const db = client.db("duelsdb");
      const collection = db.collection("duels");

      let request = JSON.parse(message);
      switch (request['header']) {
        case 'createPlayer':
          createGame(request, collection, ws);
          break;
        case 'spell':
          console.log(request);
          break;
      }

    });
  });
});
