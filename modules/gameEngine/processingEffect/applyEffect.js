function saveOrMergeEffect(spell, player) {
  let mark = 0;

  for (let i = 0; i < player["buffs"].length; i++) {
    if (player["buffs"][i]["spellName"] == spell["spellName"]) {
      player["buffs"][i]["duration"] += spell["duration"];
      mark = 1;
    }
  }

  for (let i = 0; i < player["debuffs"].length; i++) {
    if (player["debuffs"][i]["spellName"] == spell["spellName"]) {
      player["debuffs"][i]["duration"] += spell["duration"];
      mark = 1;
    }
  }

  if (mark == 0) spell.saveEffect(player);
}

function applyEffect(spell, user, enemy) {
  user.actionPoints = user.actionPoints - spell.actionPoints;
  user.energyPoints = user.energyPoints - spell.energyPoints;

  switch (spell["spellName"]) {
    case "firespear":
      spell.decreasePlayerHealth(enemy);
      break;
    case "fireshild":
      saveOrMergeEffect(spell, user);
      break;
    case "firecrown":
      saveOrMergeEffect(spell, user);
      break;
    case "firesource":
      saveOrMergeEffect(spell, enemy);
      break;
    case "firesphere":
      saveOrMergeEffect(spell, enemy);
      break;
    case "firestamp":
      spell.increaseSpellDuration(enemy);
      break;
    case "fireflow":
      spell.decreasePlayerHealth(enemy);
      break;
    case "firepower":
      saveOrMergeEffect(spell, user);
      break;
    case "waterspear":
      spell.decreasePlayerHealth(enemy);
      break;
    case "watershild":
      saveOrMergeEffect(spell, user);
      break;
    case "watercrown":
      saveOrMergeEffect(spell, user);
      break;
    case "watersphere":
      saveOrMergeEffect(spell, user);
      break;
    case "waterstamp":
      saveOrMergeEffect(spell, user);
      break;
    case "waterflow":
      spell.decreasePlayerHealth(enemy);
      break;
    case "waterpower":
      saveOrMergeEffect(spell, user);
      break;
    case "earthspear":
      spell.decreasePlayerHealth(enemy);
      break;
    case "earthshild":
      saveOrMergeEffect(spell, user);
      break;
    case "earthcrown":
      saveOrMergeEffect(spell, user);
      break;
    case "earthsource":
      saveOrMergeEffect(spell, user);
      break;
    case "earthsphere":
      saveOrMergeEffect(spell, enemy);
      break;
    case "earthstamp":
      saveOrMergeEffect(spell, user);
      break;
    case "earthflow":
      spell.decreasePlayerHealth(enemy);
      break;
    case "earthpower":
      saveOrMergeEffect(spell, user);
      break;
    case "airspear":
      spell.decreasePlayerHealth(enemy);
      break;
    case "airshild":
      saveOrMergeEffect(spell, enemy);
      break;
    case "aircrown":
      saveOrMergeEffect(spell, enemy);
      break;
    case "airsource":
      saveOrMergeEffect(spell, user);
      break;
    case "airsphere":
      saveOrMergeEffect(spell, enemy);
      break;
    case "airstamp":
      saveOrMergeEffect(spell, enemy);
      break;
    case "airflow":
      spell.decreasePlayerHealth(enemy);
      break;
    case "airpower":
      saveOrMergeEffect(spell, user);
      break;
    case "lifeshild":
      saveOrMergeEffect(spell, user);
      break;
    case "lifecrown":
      spell.increasePlayerMaxHealth(user);
      break;
    case "lifesource":
      spell.increasePlayerHealth(user);
      break;
    case "lifesphere":
      saveOrMergeEffect(spell, user);
      break;
    case "lifestamp":
      saveOrMergeEffect(spell, user);
      break;
    case "lifeflow":
      saveOrMergeEffect(spell, user);
      break;
    case "lifepower":
      saveOrMergeEffect(spell, user);
      break;
    case "deathshild":
      saveOrMergeEffect(spell, enemy);
      break;
    case "deathcrown":
      spell.decreasePlayerMaxHealth(enemy);
      break;
    case "deathsource":
      spell.decreasePlayerHealth(enemy);
      break;
    case "deathsphere":
      saveOrMergeEffect(spell, enemy);
      break;
    case "deathstamp":
      saveOrMergeEffect(spell, enemy);
      break;
    case "deathkey":
      saveOrMergeEffect(spell, user);
      break;
    case "deathflow":
      saveOrMergeEffect(spell, enemy);
      break;
  }
}

module.exports = applyEffect;
