const isHaveDependences = require("../isHaveDependences");

function applyEnemyEffectsOnSpell(player, spell) {
  for (let i = 0; i < player["buffs"].length; i++) {
    if (!isHaveDependences(player["buffs"][i], spell)) continue;

    switch (player["buffs"][i]["spellName"]) {
      case "watershild":
        player["buffs"][i].decreaseSpellDamage(spell);
        break;
      case "waterstamp":
        player["buffs"][i].decreaseSpellDamage(spell);
        break;
      case "earthshild":
        player["buffs"][i].decreaseSpellDamage(spell);
        break;
      case "earthstamp":
        player["buffs"][i].decreaseSpellDamage(spell);
        break;
      case "airpower":
        player["buffs"][i].decreaseSpellHitProbability(spell);
        break;
      case "lifeshild":
        player["buffs"][i].decreaseSpellHitProbability(spell);
        break;
      case "lifepower":
        player["buffs"][i].decreaseSpellHitProbability(spell);
        break;
      case "deathkey":
        player["buffs"][i].incrasePlayerHealth(player, spell);
        break;
    }
  }

  for (let i = 0; i < player["debuffs"].length; i++) {
    if (!isHaveDependences(player["debuffs"][i], spell)) continue;

    switch (player["debuffs"][i]["spellName"]) {
      case "firesphere":
        player["debuffs"][i].decreasePlayerHealth(player);
        break;
      case "earthsphere":
        player["debuffs"][i].increaseSpellHitProbability(spell);
        break;
    }
  }
}

module.exports = applyEnemyEffectsOnSpell;
