const createPlayers = require("../createPlayers");
const applyBattlefieldSpell = require("./applyBattlefieldSpell");
const savePlayers = require("../savePlayers");
const sendGameInformation = require("../sendGameInformation");

function processingBattlefieldSpell(request, collection, ws, wss) {
  createPlayers(collection, ws).then((result) => {
    let { user, enemy } = result;
    applyBattlefieldSpell(request["spell"], user, enemy);
    savePlayers(user, enemy, collection, ws).then((result) => {
      let response = { header: "processingSpell" };
      sendGameInformation(response, collection, ws, wss);
    });
  });
}

module.exports = processingBattlefieldSpell;
