const createPlayers = require("../createPlayers");
const activationBattlefieldEffects = require("./activationBattlefieldEffects/activationBattlefieldEffects");
const applyEffectsToOthers = require("../endMuve/applyEffectsToOthers");
const activationEffectsAtEndMuve = require("../endMuve/activationEffectsAtEndMuve");
const sendGameInformation = require("../sendGameInformation");
const savePlayers = require("../savePlayers");

function endMuve(collection, ws, wss) {
  createPlayers(collection, ws).then((result) => {
    let { user, enemy } = result;
    activationBattlefieldEffects(user, enemy);
    applyEffectsToOthers(user, enemy);
    activationEffectsAtEndMuve(user, enemy);

    if (ws["enemyType"] == "computer" && ws["muve"] == 0) {
      ws["muve"] = 1;
      user["muve"] = 1;
      enemy["muve"] = 0;
      user["actionPoints"] = 5;
      user["energyPoints"] = 5;
    } else {
      ws["muve"] = 0;
      user["muve"] = 0;
      enemy["muve"] = 1;
      enemy["actionPoints"] = 5;
      enemy["energyPoints"] = 5;
    }

    savePlayers(user, enemy, collection, ws).then((result) => {
      let response = { header: "changeMuve" };
      sendGameInformation(response, collection, ws, wss);
    });
  });
}

module.exports = endMuve;
