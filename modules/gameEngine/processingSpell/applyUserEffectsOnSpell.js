const isHaveDependences = require("../isHaveDependences");

function applyUserEffectsOnSpell(spell, user, enemy) {
  for (let i = 0; i < user["buffs"].length; i++) {
    if (!isHaveDependences(user["buffs"][i], spell)) continue;

    switch (user["buffs"][i]["spellName"]) {
      case "firecrown":
        user["buffs"][i].increaseSpellDamage(spell);
        break;
      case "firepower":
        user["buffs"][i].increaseSpellDamage(spell);
        break;
      case "earthcrown":
        user["buffs"][i].increaseSpellHitProbability(spell);
        break;
      case "earthsource":
        user["buffs"][i].increaseSpellDamage(spell);
        break;
      case "airsource":
        user["buffs"][i].increaseSpellHitProbability(spell);
        break;
    }
  }

  for (let i = 0; i < user["debuffs"].length; i++) {
    if (!isHaveDependences(user["debuffs"][i], spell)) continue;

    switch (user["debuffs"][i]["spellName"]) {
      case "airshild":
        user["debuffs"][i].decreaseSpellHitProbability(spell);
        break;
    }
  }
}

module.exports = applyUserEffectsOnSpell;
