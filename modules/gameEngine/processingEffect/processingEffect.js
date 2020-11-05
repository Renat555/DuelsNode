const createPlayers = require("../createPlayers");
const createEffect = require("../createSpells/createEffect");
const applyUserEffectsOnEffect = require("../processingEffect/applyUserEffectsOnEffect");
const applyEnemyEffectsOnEffect = require("../processingEffect/applyEnemyEffectsOnEffect");
const applyEffect = require(".");
const sendGameInformation = require("../sendGameInformation");
const savePlayers = require("../savePlayers");

function processingSpell(request, collection, ws, wss) {
  createPlayers(collection, ws).then((result) => {
    let { user, enemy } = result;
    let spell = createEffect(request["spell"]);
    applyUserEffectsOnEffect(user, spell);
    applyEnemyEffectsOnEffect(enemy, spell);
    applySpell(spell, user, enemy);
    savePlayers(user, enemy, collection, ws).then((result) => {
      let response = { header: "processingSpell" };
      sendGameInformation(response, collection, ws, wss);
    });
  });
}

module.exports = processingSpell;
