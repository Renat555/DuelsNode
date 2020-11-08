const isHaveDependences = require("../isHaveDependences");

function applyEffectsToOthers(user, enemy) {
  for (let i = 0; i < user["buffs"].length; i++) {
    applyEffect(user["buffs"][i], user);
  }

  for (let i = 0; i < user["debuffs"].length; i++) {
    applyEffect(user["debuffs"][i], user);
  }

  for (let i = 0; i < enemy["buffs"].length; i++) {
    applyEffect(enemy["buffs"][i], enemy);
  }

  for (let i = 0; i < enemy["debuffs"].length; i++) {
    applyEffect(enemy["debuffs"][i], enemy);
  }
}

function applyEffect(effect, player) {
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

module.exports = applyEffectsToOthers;
