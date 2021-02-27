function applyEffect(spell, user, enemy) {
  user.actionPoints = user.actionPoints - spell.actionPoints;
  user.energyPoints = user.energyPoints - spell.energyPoints;

  spell.saveEffect(user, enemy);
}

module.exports = applyEffect;
