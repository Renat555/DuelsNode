const isHaveDependences = require("../isHaveDependences");

function applyUserEffectsOnSpell(player, spell) {
  for (let i = 0; i < player["buffs"].length; i++) {
    if (!isHaveDependences(player["buffs"][i], spell)) continue;

    switch (player["buffs"][i]["spellName"]) {
      case "firecrown":
        player["buffs"][i].increaseSpellDamage(spell);
        break;
      case "firepower":
        player["buffs"][i].increaseSpellDamage(spell);
        break;
      case "earthcrown":
        player["buffs"][i].increaseSpellHitProbability(spell);
        break;
      case "earthsource":
        player["buffs"][i].increaseSpellDamage(spell);
        break;
      case "airsource":
        player["buffs"][i].increaseSpellHitProbability(spell);
        break;
    }
  }

  for (let i = 0; i < player["debuffs"].length; i++) {
    if (!isHaveDependences(player["debuffs"][i], spell)) continue;

    switch (player["debuffs"][i]["spellName"]) {
      case "airshild":
        player["debuffs"][i].decreaseSpellHitProbability(spell);
        break;
    }
  }
}

module.exports = applyUserEffectsOnSpell;
