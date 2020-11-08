function applyEnemyEffectsOnDespell(player, spell) {
  for (let i = 0; i < player["buffs"].length; i++) {
    if (!isHaveDependences(player["buffs"][i], spell)) continue;

    switch (player["buffs"][i]["spellName"]) {
      case "lifepower":
        player["buffs"][i].decreaseSpellHitProbability(spell);
        break;
    }
  }

  for (let i = 0; i < player["debuffs"].length; i++) {
    if (!isHaveDependences(player["debuffs"][i], spell)) continue;

    switch (player["debuffs"][i]["spellName"]) {
    }
  }
}

module.exports = applyEnemyEffectsOnDespell;
