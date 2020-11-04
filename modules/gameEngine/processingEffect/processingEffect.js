const createPlayers = require("../createPlayers");
const createEffect = require("../createSpells/createEffect");
const applyUserEffectsOnSpell = require("../processingSpell/applyUserEffectsOnSpell");
const applyEnemyEffectsOnSpell = require("../processingSpell/applyEnemyEffectsOnSpell");
const applySpell = require("./applySpell");
const sendGameInformation = require("../sendGameInformation");
const savePlayers = require("../savePlayers");

function processingSpell(request, collection, ws, wss) {
  createPlayers(collection, ws).then((result) => {
    let { user, enemy } = result;
    let spell = createEffect(request["spell"]);
    applyUserEffectsOnSpell(user, spell);
    applyEnemyEffectsOnSpell(enemy, spell);
    applySpell(spell, user, enemy);
    savePlayers(user, enemy, collection, ws).then((result) => {
      let response = { header: "processingSpell" };
      sendGameInformation(response, collection, ws, wss);
    });
  });
}

module.exports = processingSpell;
