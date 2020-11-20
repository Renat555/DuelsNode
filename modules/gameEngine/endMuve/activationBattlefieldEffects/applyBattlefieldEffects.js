function applyBattlefieldEffects(effects, player) {
  for (let i = 0; i < effects.length; i++) {
    switch (effects[i]["spellName"]) {
      case "watersphere":
        effects[i].decreasePlayerHealth(player);
    }
  }
}

module.exports = applyBattlefieldEffects;
