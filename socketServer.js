const WebSocket = require("ws");
const MongoClient = require("mongodb").MongoClient;

const createGame = require("./modules/createGame");
const processingSpell = require("./modules/gameEngine/processingSpell/processingSpell");
const processingEffect = require("./modules/gameEngine/processingEffect/processingEffect");
const processingDespell = require("./modules/gameEngine/processingDespell/processingDespell");
const muveHero = require("./modules/gameEngine/processingMuve/muveHero");
const endMuve = require("./modules/gameEngine/endMuve/endMuve");
const processingBattlefieldSpell = require("./modules/gameEngine/processingBattlefieldSpell/processingBattlefieldSpell");

const mongoClient = new MongoClient("mongodb://duelsnode:27017/duelsdb", {
  useUnifiedTopology: true,
});

const wss = new WebSocket.Server({ port: 3000, clientTracking: true });

mongoClient.connect(function (err, client) {
  const db = client.db("duelsdb");
  const collection = db.collection("duels");

  wss.on("connection", function connection(ws) {
    ws.on("message", function (message) {
      let request = JSON.parse(message);
      switch (request["header"]) {
        case "createGame":
          createGame(request["user"], collection, ws, wss);
          break;
        case "spell":
          processingSpell(request, collection, ws, wss);
          break;
        case "despell":
          processingDespell(request, collection, ws, wss);
          break;
        case "effect":
          processingEffect(request, collection, ws, wss);
          break;
        case "battlefieldSpell":
          processingBattlefieldSpell(request, collection, ws, wss);
          break;
        case "muveHero":
          muveHero(request, collection, ws, wss);
          break;
        case "endMuve":
          endMuve(collection, ws, wss);
          break;
      }
    });

    ws.on("close", function close(event, message) {
      if (message == "gameOver") {
        collection.deleteOne({ id: ws["id"] });
      }

      collection.deleteOne({ id: ws["id"] }, function (err, doc) {
        wss.clients.forEach(function each(client) {
          if (client.readyState == 1 && client["id"] == ws["idEnemy"]) {
            client.send(JSON.stringify({ header: "enemyIsLeft" }));
          }
        });
      });
    });
  });
});

wss.on("close", function close() {
  client.close();
});
