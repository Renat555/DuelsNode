function applyDespell(spell, user, enemy) {
  user.actionPoints = user.actionPoints - spell.actionPoints;
  user.energyPoints = user.energyPoints - spell.energyPoints;

  switch (spell["spellName"]) {
    case "firekey":
      spell.deleteEffect(user, enemy);
      break;
    case "watersource":
      spell.deleteEffect(user, enemy);
      break;
    case "waterkey":
      spell.deleteEffect(user, enemy);
      break;
    case "earthkey":
      spell.deleteEffect(user, enemy);
      break;
    case "airkey":
      spell.deleteEffect(user, enemy);
      break;
    case "lifespear":
      spell.deleteEffect(user, enemy);
      break;
    case "lifekey":
      spell.deleteEffect(user, enemy);
      break;
    case "deathspear":
      spell.deleteEffect(user, enemy);
      break;
    case "deathpower":
      spell.deleteEffect(user, enemy);
      break;
  }
}

module.exports = applyDespell;
