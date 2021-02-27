const createPlayers = require("../createPlayers");
const createEffect = require("../createSpells/createEffect");
const applyBattlefieldSpell = require("./applyBattlefieldSpell");
const savePlayers = require("../savePlayers");
const sendGameInformation = require("../sendGameInformation");

function processingBattlefieldSpell(request, collection, ws, wss) {
  createPlayers(collection, ws).then((result) => {
    let { user, enemy } = result;
    let spell = createEffect(request["spell"][0], request["spell"][1]);
    let spellCoordinates = request["spell"].slice(2);
    applyBattlefieldSpell(spell, spellCoordinates, user, enemy);
    savePlayers(user, enemy, collection, ws).then((result) => {
      let response = { header: "processingBattlefieldSpell" };
      sendGameInformation(response, collection, ws, wss);
    });
  });
}

module.exports = processingBattlefieldSpell;
