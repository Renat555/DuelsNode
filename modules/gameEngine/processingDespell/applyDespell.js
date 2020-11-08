function applyDespell(spell, user, enemy) {
  user.actionPoints = user.actionPoints - spell.actionPoints;
  user.energyPoints = user.energyPoints - spell.energyPoints;

  switch (spell["spellName"]) {
    case "firekey":
      spell.deleteEffect(enemy);
      break;
    case "watersource":
      spell.deleteEffect(user);
      break;
    case "waterkey":
      spell.deleteEffect(user);
      break;
    case "earthkey":
      spell.deleteEffect(user);
      break;
    case "airkey":
      spell.deleteEffect(enemy);
      break;
    case "lifespear":
      spell.deleteEffect(user);
      break;
    case "lifekey":
      spell.deleteEffect(user);
      break;
    case "deathspear":
      spell.deleteEffect(enemy);
      break;
    case "deathpower":
      spell.deleteEffect(enemy);
      break;
  }
}

module.exports = applyDespell;
