const isHaveDependences = require("../isHaveDependences");

function applyEnemyEffectsOnSpell(spell, user, enemy) {
  for (let i = 0; i < enemy["buffs"].length; i++) {
    if (!isHaveDependences(enemy["buffs"][i], spell)) continue;

    switch (enemy["buffs"][i]["spellName"]) {
      case "watershild":
        enemy["buffs"][i].decreaseSpellDamage(spell);
        break;
      case "waterstamp":
        enemy["buffs"][i].decreaseSpellDamage(spell);
        break;
      case "earthshild":
        enemy["buffs"][i].decreaseSpellDamage(spell);
        break;
      case "earthstamp":
        enemy["buffs"][i].decreaseSpellDamage(spell);
        break;
      case "airpower":
        enemy["buffs"][i].decreaseSpellHitProbability(spell);
        break;
      case "lifeshild":
        enemy["buffs"][i].decreaseSpellHitProbability(spell);
        break;
      case "lifepower":
        enemy["buffs"][i].decreaseSpellHitProbability(spell);
        break;
      case "deathkey":
        enemy["buffs"][i].deathKeyEffect(spell, enemy);
        break;
    }
  }

  for (let i = 0; i < enemy["debuffs"].length; i++) {
    if (!isHaveDependences(enemy["debuffs"][i], spell)) continue;

    switch (enemy["debuffs"][i]["spellName"]) {
      case "firesphere":
        enemy["debuffs"][i].decreasePlayerHealth(user, enemy);
        break;
      case "earthsphere":
        enemy["debuffs"][i].increaseSpellHitProbability(spell);
        break;
    }
  }
}

module.exports = applyEnemyEffectsOnSpell;
