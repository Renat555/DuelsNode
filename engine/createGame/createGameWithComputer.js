const generatingRandomString = require("./generatingRandomString");
const savePlayer = require("./savePlayer");

function createEnemy(user, mongoCollection, ws) {
  let idGame = generatingRandomString();
  let idEnemy = generatingRandomString();

  let userMuve, enemyMuve;
  if (Math.random() < 0.5) {
    userMuve = 0;
    enemyMuve = 1;
  } else {
    userMuve = 1;
    enemyMuve = 0;
  }

  let enemy = {
    id: idEnemy,
    name: "AI",
    enemyType: "human",
    idGame: idGame,
    actionPoints: 5,
    energyPoints: 5,
    position: {
      user: [],
      enemy: [],
    },
    battlefield: [],
    maxHealth: "200",
    health: "200",
    muve: enemyMuve,
    elements: ["fire", "earth", "water"],
    forms: ["spear", "shild", "crown", "source", "sphere"],
    buffs: [],
    debuffs: [],
  };

  ws["enemyType"] = user["enemyType"];
  ws["idEnemy"] = enemy["id"];
  ws["muve"] = userMuve;

  let response = { header: "createGame" };
  response["enemy"] = enemy;

  mongoCollection
    .findOneAndUpdate(
      { id: user["id"] },
      { $set: { muve: userMuve, idGame: idGame } },
      { returnOriginal: false }
    )
    .then((doc) => {
      response["user"] = doc["value"];
      mongoCollection.insertOne(enemy).then(() => {
        ws.send(JSON.stringify(response));
      });
    });
}

function createGameWithComputer(player, mongoCollection, ws) {
  savePlayer(player, mongoCollection, ws).then(() => {
    createEnemy(player, mongoCollection, ws);
  });
}

module.exports = createGameWithComputer;
