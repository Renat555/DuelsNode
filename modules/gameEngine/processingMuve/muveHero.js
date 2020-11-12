const createPlayers = require("../createPlayers");
const makeMuve = require("./makeMuve");
const savePlayers = require("../savePlayers");
const sendGameInformation = require("../sendGameInformation");

function muveHero(request, collection, ws, wss) {
  createPlayers(collection, ws).then((result) => {
    let { user, enemy } = result;
    makeMuve(request, user, enemy);
    savePlayers(user, enemy, collection, ws).then((result) => {
      let response = { header: "processingMuve" };
      sendGameInformation(response, collection, ws, wss);
    });
  });
}

module.exports = muveHero;
