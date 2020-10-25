function randomString() {
  let string = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
  let result = "";

  for (let i = 0; i < 10; i++) {
    result += string[Math.floor(Math.random() * Math.floor(62))];
  }

  return result;
}

function savePlayer(player, mongoCollection, ws) {
  return new Promise((resolve, reject) => {
    ws["id"] = player["id"];
    mongoCollection.insertOne(player, function (err, doc) {
      resolve();
    });
  });
}

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
  let userHealth, enemyHealth, userMuve, enemyMuve;
  if (Math.random() < 0.5) {
    userHealth = 250;
    enemyHealth = 200;
    userMuve = 0;
    enemyMuve = 1;
  } else {
    userHealth = 200;
    enemyHealth = 250;
    userMuve = 1;
    enemyMuve = 0;
  }

  mongoCollection
    .findOneAndUpdate(
      { id: player["id"] },
      { $set: { health: userHealth, maxHealth: userHealth, muve: userMuve } }
    )
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
            health: enemyHealth,
            maxHealth: enemyHealth,
            muve: enemyMuve,
          },
        }
      );
    });
}

function createBattlefield(ws, mongoCollection) {
  let battlefield = [];

  for (let i = 0; i < 5; i++) {
    battlefield[i] = [];
    for (let j = 0; j < 5; j++) {
      battlefield[i][j] = ["free", ""];
    }
  }

  let doc = {
    idGame: ws["idGame"],
    battlefield: battlefield,
  };

  mongoCollection.insertOne(doc);
}

function searchEnemy(user, mongoCollection, ws, wss) {
  mongoCollection
    .findOneAndUpdate(
      { $and: [{ id: { $not: { $eq: user["id"] } } }, { idGame: "" }] },
      { $set: { idGame: randomString() } },
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
          createBattlefield(ws, mongoCollection);
          setMuve(user, mongoCollection);
          sendGameInformation(user, mongoCollection, ws, wss);
        });
    });
}

function createGame(player, mongoCollection, ws, wss) {
  savePlayer(player, mongoCollection, ws).then((result) => {
    searchEnemy(player, mongoCollection, ws, wss);
  });
}

module.exports = createGame;
