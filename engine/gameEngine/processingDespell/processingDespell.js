const createPlayers = require("../createPlayers");
const createEffect = require("../createSpells/createEffect");
const createDespell = require("../createSpells/createDespell");
const applyUserEffectsOnDespell = require("../processingDespell/applyUserEffectsOnDespell");
const applyEnemyEffectsOnDespell = require("../processingDespell/applyEnemyEffectsOnDespell");
const applyDespell = require("./applyDespell");
const sendGameInformation = require("../sendGameInformation");
const savePlayers = require("../savePlayers");

function processingDespell(request, collection, ws, wss) {
  createPlayers(collection, ws).then((result) => {
    let { user, enemy } = result;
    let effect = createEffect(request["despell"]);
    let despell = createDespell(request["spell"], effect);
    applyUserEffectsOnDespell(user, despell);
    applyEnemyEffectsOnDespell(enemy, despell);
    applyDespell(despell, user, enemy);
    savePlayers(user, enemy, collection, ws).then((result) => {
      let response = { header: "processingSpell" };
      sendGameInformation(response, collection, ws, wss);
    });
  });
}

module.exports = processingDespell;
