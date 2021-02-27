function applyBattlefieldEffects(userEffects, enemyEffects, user, enemy) {
  for (let i = 0; i < userEffects.length; i++) {
    switch (userEffects[i]["spellName"]) {
      case "watersphere":
        userEffects[i].decreasePlayerHealth(user, enemy);
    }
  }

  for (let i = 0; i < enemyEffects.length; i++) {
    switch (enemyEffects[i]["spellName"]) {
      case "watersphere":
        enemyEffects[i].decreasePlayerHealth(enemy, user);
    }
  }
}

module.exports = applyBattlefieldEffects;
