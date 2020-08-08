
const WebSocket = require('ws');

let session = require('express-session');
const redisStorage = require('connect-redis')(session);
const redis   = require('redis');
const client  = redis.createClient();

const createGame = require('./modules/createGame');

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

const wss = new WebSocket.Server({ port: 8080 });

session({
 store: new redisStorage({
   host: '127.0.0.1',
   port: 6379,
   client: client
 }),
 secret: 'you secret key',
 resave: true,
 saveUninitialized: true
});

session['test'] = {
  'test': 123,
  'test2': 'ttttt'
};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log("WebSocket run");

    mongoClient.connect(function(err, client) {
      const db = client.db("duelsdb");
      const collection = db.collection("duels");

      let objMessage = JSON.parse(message);

      switch (objMessage['header']) {
        case 'createPlayer':
          createGame(objMessage, collection, session, ws);
          break;
      }

    });
  });
});
