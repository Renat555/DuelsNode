const createPlayers = require("../createPlayers");
const applyEffectsToOthers = require("../endMuve/applyEffectsToOthers");
const activationEffectsAtEndMuve = require("../endMuve/activationEffectsAtEndMuve");
const sendGameInformation = require("../sendGameInformation");
const savePlayers = require("../savePlayers");

function endMuve(collection, ws, wss) {
  createPlayers(collection, ws).then((result) => {
    let { user, enemy } = result;
    applyEffectsToOthers(user, enemy);
    activationEffectsAtEndMuve(user, enemy);
    user["muve"] = 0;
    enemy["muve"] = 1;
    enemy["actionPoints"] = 5;
    enemy["energyPoints"] = 5;
    savePlayers(user, enemy, collection, ws).then((result) => {
      let response = { header: "changeMuve" };
      sendGameInformation(response, collection, ws, wss);
    });
  });
}

module.exports = endMuve;
