function decreaseDurationBattlefieldEffets(user, enemy) {
  for (let i = 0; i < user.battlefield.length; i++) {
    user.battlefield[i][1] = user.battlefield[i][1] - 1;
    if (user.battlefield[i][1] <= 0) {
      user.battlefield.splice(i, 1);
    }
  }

  for (let i = 0; i < enemy.battlefield.length; i++) {
    enemy.battlefield[i][1] = enemy.battlefield[i][1] - 1;
    if (enemy.battlefield[i][1] <= 0) {
      enemy.battlefield.splice(i, 1);
    }
  }
}

module.exports = decreaseDurationBattlefieldEffets;
