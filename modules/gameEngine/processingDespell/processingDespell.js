const createPlayers = require("../createPlayers");
const createDespell = require("../createSpells/createDespell");
const applyUserEffectsOnDespell = require("../processingDespell/applyUserEffectsOnDespell");
const applyEnemyEffectsOnDespell = require("../processingDespell/applyEnemyEffectsOnDespell");
const applyDespell = require("./applyDespell");
const sendGameInformation = require("../sendGameInformation");
const savePlayers = require("../savePlayers");

function processingDespell(request, collection, ws, wss) {
  createPlayers(collection, ws).then((result) => {
    let { user, enemy } = result;
    let spell = createDespell(request["spell"]);
    applyUserEffectsOnDespell(user, spell);
    applyEnemyEffectsOnDespell(enemy, spell);
    applyDespell(spell, user, enemy);
    savePlayers(user, enemy, collection, ws).then((result) => {
      let response = { header: "processingSpell" };
      sendGameInformation(response, collection, ws, wss);
    });
  });
}

module.exports = processingDespell;
