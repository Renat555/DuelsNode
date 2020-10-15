
const WebSocket = require('ws');
const MongoClient = require("mongodb").MongoClient;

const config = require('config');

const createGame = require('./modules/createGame');
const processingSpell = require('./modules/gameEngine/processingSpell').processingSpell;
const endMuve = require('./modules/gameEngine/endMuve').endMuve;


const url = config.get('mongo')['url'];
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

const port = config.get('socket')['port'];
const wss = new WebSocket.Server({ port: port, clientTracking: true });

mongoClient.connect(function(err, client) {
      const db = client.db("duelsdb");
      const collection = db.collection("duels");

  wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {

        console.log("WebSocket run");

        let request = JSON.parse(message);
        switch (request['header']) {
          case 'createGame':
            createGame(request['user'], collection, ws, wss);
            break;
          case 'spell':
            processingSpell(request, collection, ws, wss);
            break;
          case 'restoreGame':
            request['header'] = 'createGame';
            ws['id'] = request['user']['id'];
            ws.send(JSON.stringify(request));
            break;
          case 'endMuve':
            endMuve(collection, ws, wss);
            break;
        }

      });
      ws.on('close', function close() {
        collection.deleteOne({'id': ws['id']}, function (err, result) {
        });
      });

    });

  wss.on('close', function close() {
    client.close();
  });

});
