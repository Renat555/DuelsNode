const generatingRandomString = require("./generatingRandomString");
const savePlayer = require("./savePlayer");

function sendGameInformation(user, mongoCollection, ws, wss) {
  let response = { header: "createGame" };
  mongoCollection.findOne({ id: user["id"] }, function (err, doc) {
    response["user"] = doc;
    mongoCollection.findOne(
      {
        $and: [
          { id: { $not: { $eq: user["id"] } } },
          { idGame: doc["idGame"] },
        ],
      },
      function (err, doc) {
        response["enemy"] = doc;
        ws.send(JSON.stringify(response));
        wss.clients.forEach(function each(client) {
          if (client.readyState == 1 && client["id"] == doc["id"]) {
            let responseForEnemy = { header: "createGame" };
            responseForEnemy["user"] = response["enemy"];
            responseForEnemy["enemy"] = response["user"];
            client["idGame"] = response["enemy"]["idGame"];
            client["idEnemy"] = response["user"]["id"];
            client.send(JSON.stringify(responseForEnemy));
          }
        });
      }
    );
  });
}

function setMuve(player, mongoCollection) {
  return new Promise((resolve, reject) => {
    let userMuve, enemyMuve;
    if (Math.random() < 0.5) {
      userMuve = 0;
      enemyMuve = 1;
    } else {
      userMuve = 1;
      enemyMuve = 0;
    }

    mongoCollection
      .findOneAndUpdate({ id: player["id"] }, { $set: { muve: userMuve } })
      .then((res) => {
        mongoCollection.updateOne(
          {
            $and: [
              { id: { $not: { $eq: res["value"]["id"] } } },
              { idGame: res["value"]["idGame"] },
            ],
          },
          {
            $set: {
              muve: enemyMuve,
            },
          },
          function (err, result) {
            resolve();
          }
        );
      });
  });
}

function searchEnemy(user, mongoCollection, ws, wss) {
  mongoCollection
    .findOneAndUpdate(
      { $and: [{ id: { $not: { $eq: user["id"] } } }, { idGame: "" }] },
      { $set: { idGame: generatingRandomString() } },
      { returnOriginal: false }
    )
    .then((res) => {
      if (res["value"] === null) return;
      ws["idGame"] = res["value"]["idGame"];
      ws["idEnemy"] = res["value"]["id"];
      mongoCollection
        .findOneAndUpdate(
          { id: user["id"] },
          { $set: { idGame: res["value"]["idGame"] } },
          { returnOriginal: false }
        )
        .then((res) => {
          setMuve(user, mongoCollection).then((res) => {
            sendGameInformation(user, mongoCollection, ws, wss);
          });
        });
    });
}

function createGameWithHuman(player, mongoCollection, ws, wss) {
  savePlayer(player, mongoCollection, ws).then(() => {
    searchEnemy(player, mongoCollection, ws, wss);
  });
}

module.exports = createGameWithHuman;
