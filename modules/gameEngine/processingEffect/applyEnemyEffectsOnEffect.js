function applyEnemyEffectsOnEffect(player, spell) {
  for (let i = 0; i < player["buffs"].length; i++) {
    if (!isHaveDependences(player["buffs"][i], spell)) continue;

    switch (player["buffs"][i]["spellName"]) {
      case "lifeshild":
        player["buffs"][i].decreaseSpellHitProbability(spell);
        break;
      case "lifestamp":
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
      case "earthsphere":
        player["debuffs"][i].increaseSpellHitProbability(spell);
        break;
    }
  }
}

module.exports = applyEnemyEffectsOnEffect;
