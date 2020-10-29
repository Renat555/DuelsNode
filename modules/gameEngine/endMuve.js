const { createPlayers } = require("./createPlayers");
const isHaveDependences = require("./isHaveDependences");
const sendGameInformation = require("./sendGameInformation");
const savePlayers = require("./savePlayers").savePlayers;

function processingEffects(user, enemy) {
  for (let i = 0; i < user["buffs"].length; i++) {
    processingEffect(user["buffs"][i], user);
  }

  for (let i = 0; i < user["debuffs"].length; i++) {
    processingEffect(user["debuffs"][i], user);
  }

  for (let i = 0; i < enemy["buffs"].length; i++) {
    processingEffect(enemy["buffs"][i], enemy);
  }

  for (let i = 0; i < enemy["debuffs"].length; i++) {
    processingEffect(enemy["debuffs"][i], enemy);
  }
}

function processingEffect(effect, player) {
  for (let i = 0; i < player["buffs"].length; i++) {
    if (!isHaveDependences(player["buffs"][i], effect)) continue;

    switch (player["buffs"][i]["spellName"]) {
      case "fireshild":
        player["buffs"][i].decreaseSpellDamage(effect);
        break;
      case "watercrown":
        player["buffs"][i].decreaseSpellDamage(effect);
        break;
      case "watersphere":
        player["buffs"][i].decreaseSpellDamage(effect);
        break;
      case "earthshild":
        player["buffs"][i].decreaseSpellDamage(effect);
        break;
    }
  }

  for (let i = 0; i < player["debuffs"].length; i++) {
    if (!isHaveDependences(player["debuffs"][i], effect)) continue;

    switch (player["debuffs"][i]["spellName"]) {
      case "deathsphere":
        player["debuffs"][i].increaseSpellDamage(effect);
        break;
    }
  }
}

function applyEffects(user, enemy) {
  for (let i = 0; i < user["buffs"].length; i++) {
    applyEffect(user["buffs"][i], user, enemy);
  }

  for (let i = 0; i < user["debuffs"].length; i++) {
    applyEffect(user["debuffs"][i], user, enemy);
  }

  for (let i = 0; i < enemy["buffs"].length; i++) {
    applyEffect(enemy["buffs"][i], enemy, user);
  }

  for (let i = 0; i < enemy["debuffs"].length; i++) {
    applyEffect(enemy["debuffs"][i], enemy, user);
  }
}

function applyEffect(effect, user, enemy) {
  switch (effect["spellName"]) {
    case "fireshild":
      effect.decreaseDuration(1, user);
      break;
    case "firecrown":
      effect.decreaseDuration(1, user);
      break;
    case "firesource":
      effect.decreasePlayerHealth(user);
      effect.decreaseDuration(1, user);
      break;
    case "watershild":
      effect.decreaseDuration(1, user);
      break;
    case "watercrown":
      effect.decreaseDuration(1, user);
      break;
    case "watersphere":
      effect.decreaseDuration(1, user);
      break;
    case "waterstamp":
      effect.decreaseDuration(1, user);
      break;
    case "earthshild":
      effect.decreaseDuration(1, user);
      break;
    case "earthcrown":
      effect.decreaseDuration(1, user);
      break;
    case "earthsource":
      effect.decreaseDuration(1, user);
      break;
    case "earthsphere":
      effect.decreaseDuration(1, user);
      break;
    case "earthstamp":
      effect.decreaseDuration(1, user);
      break;
    case "earthpower":
      effect.decreaseDuration(1, user);
      break;
    case "airshild":
      effect.decreaseDuration(1, user);
      break;
    case "aircrown":
      effect.decreaseDuration(1, user);
      break;
    case "airsource":
      effect.decreaseDuration(1, user);
      break;
    case "airsphere":
      effect.decreaseDuration(1, user);
      break;
    case "airstamp":
      effect.decreaseDuration(1, user);
      break;
    case "lifesphere":
      effect.increasePlayerHealth(user);
      effect.decreaseDuration(1, user);
      break;
    case "lifestamp":
      effect.decreaseDuration(1, user);
      break;
    case "lifeflow":
      effect.increasePlayerHealth(user);
      effect.decreaseDuration(1, user);
      break;
    case "deathshild":
      effect.decreaseDuration(1, user);
      break;
    case "deathsphere":
      effect.decreaseDuration(1, user);
      break;
    case "deathstamp":
      effect.decreaseDuration(1, user);
      break;
    case "deathkey":
      effect.decreaseDuration(1, user);
      break;
    case "deathflow":
      effect.deathflowEffect(user, enemy);
      effect.decreaseDuration(1, user);
      break;
  }
}

function endMuve(collection, ws, wss) {
  createPlayers(collection, ws).then((result) => {
    let { user, enemy } = result;
    processingEffects(user, enemy);
    applyEffects(user, enemy);
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

module.exports.endMuve = endMuve;
module.exports.processingEffects = processingEffects;
module.exports.processingEffect = processingEffect;
