function applySpell(spell, user, enemy) {
  user.actionPoints = user.actionPoints - spell.actionPoints;
  user.energyPoints = user.energyPoints - spell.energyPoints;

  switch (spell["spellName"]) {
    case "firespear":
      spell.decreasePlayerHealth(enemy);
      break;
    case "firestamp":
      spell.increaseSpellDuration(enemy);
      break;
    case "fireflow":
      spell.decreasePlayerHealth(enemy);
      break;
    case "waterspear":
      spell.decreasePlayerHealth(enemy);
      break;
    case "waterflow":
      spell.decreasePlayerHealth(enemy);
      break;
    case "earthspear":
      spell.decreasePlayerHealth(enemy);
      break;
    case "earthflow":
      spell.decreasePlayerHealth(enemy);
      break;
    case "airspear":
      spell.decreasePlayerHealth(enemy);
      break;
    case "airflow":
      spell.decreasePlayerHealth(enemy);
      break;
    case "lifecrown":
      spell.increasePlayerMaxHealth(user);
      break;
    case "lifesource":
      spell.increasePlayerHealth(user);
      break;
    case "deathcrown":
      spell.decreasePlayerMaxHealth(enemy);
      break;
    case "deathsource":
      spell.decreasePlayerHealth(enemy);
      break;
  }
}

module.exports = applySpell;
