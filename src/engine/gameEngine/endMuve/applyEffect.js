const isHaveDependences = require("../isHaveDependences");

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

module.exports = applyEffect;
