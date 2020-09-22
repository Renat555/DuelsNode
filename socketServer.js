
const WebSocket = require('ws');
const MongoClient = require("mongodb").MongoClient;

const config = require('config');

const createGame = require('./modules/createGame');
const processingSpell = require('./modules/gameEngine/processingSpell').processingSpell;


const url = config.get('mongo')['url'];
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

const port = config.get('socket')['port'];
const wss = new WebSocket.Server({ port: port });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {

    console.log("WebSocket run");

    mongoClient.connect(function(err, client) {
      const db = client.db("duelsdb");
      const collection = db.collection("duels");

      let request = JSON.parse(message);
      switch (request['header']) {
        case 'createGame':
          createGame(request, collection, ws);
          break;
        case 'spell':
          processingSpell(request, collection, ws);
          break;
        case 'restoreGame':
          request['header'] = 'createGame';
          ws.send(JSON.stringify(request));
          break;
        case 'endMuve':
          endMuve(request, collection, ws);
          break;
      }

    });
  });
});
