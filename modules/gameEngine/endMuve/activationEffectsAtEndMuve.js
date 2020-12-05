function activationEffectsAtEndMuve(user, enemy) {
  for (let i = 0; i < user["buffs"].length; i++) {
    activationEffect(user["buffs"][i], user, enemy);
  }

  for (let i = 0; i < user["debuffs"].length; i++) {
    activationEffect(user["debuffs"][i], user, enemy);
  }

  for (let i = 0; i < enemy["buffs"].length; i++) {
    activationEffect(enemy["buffs"][i], enemy, user);
  }

  for (let i = 0; i < enemy["debuffs"].length; i++) {
    activationEffect(enemy["debuffs"][i], enemy, user);
  }
}

function activationEffect(effect, user, enemy) {
  switch (effect["spellName"]) {
    case "fireshild":
      effect.decreaseDuration(1, user);
      break;
    case "firecrown":
      effect.decreaseDuration(1, user);
      break;
    case "firesource":
      effect.decreasePlayerHealth(user, enemy);
      effect.decreaseDuration(1, user);
      break;
    case "watershild":
      effect.decreaseDuration(1, user);
      break;
    case "watercrown":
      effect.decreaseDuration(1, user);
      break;
    case "watersphere":
      effect.decreaseDuration(1, user);
      break;
    case "waterstamp":
      effect.decreaseDuration(1, user);
      break;
    case "earthshild":
      effect.decreaseDuration(1, user);
      break;
    case "earthcrown":
      effect.decreaseDuration(1, user);
      break;
    case "earthsource":
      effect.decreaseDuration(1, user);
      break;
    case "earthsphere":
      effect.decreaseDuration(1, user);
      break;
    case "earthstamp":
      effect.decreaseDuration(1, user);
      break;
    case "earthpower":
      effect.decreaseDuration(1, user);
      break;
    case "airshild":
      effect.decreaseDuration(1, user);
      break;
    case "aircrown":
      effect.decreaseDuration(1, user);
      break;
    case "airsource":
      effect.decreaseDuration(1, user);
      break;
    case "airsphere":
      effect.decreaseDuration(1, user);
      break;
    case "airstamp":
      effect.decreaseDuration(1, user);
      break;
    case "lifesphere":
      effect.increasePlayerHealth(user, enemy);
      effect.decreaseDuration(1, user);
      break;
    case "lifestamp":
      effect.decreaseDuration(1, user);
      break;
    case "lifeflow":
      effect.increasePlayerHealth(user, enemy);
      effect.decreaseDuration(1, user);
      break;
    case "deathshild":
      effect.decreaseDuration(1, user);
      break;
    case "deathsphere":
      effect.decreaseDuration(1, user);
      break;
    case "deathstamp":
      effect.decreaseDuration(1, user);
      break;
    case "deathkey":
      effect.decreaseDuration(1, user);
      break;
    case "deathflow":
      effect.deathflowEffect(user, enemy);
      effect.decreaseDuration(1, user);
      break;
  }
}

module.exports = activationEffectsAtEndMuve;
