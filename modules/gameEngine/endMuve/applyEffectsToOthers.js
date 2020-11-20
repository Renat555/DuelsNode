const applyEffect = require("./applyEffect");

function applyEffectsToOthers(user, enemy) {
  for (let i = 0; i < user["buffs"].length; i++) {
    applyEffect(user["buffs"][i], user);
  }

  for (let i = 0; i < user["debuffs"].length; i++) {
    applyEffect(user["debuffs"][i], user);
  }

  for (let i = 0; i < enemy["buffs"].length; i++) {
    applyEffect(enemy["buffs"][i], enemy);
  }

  for (let i = 0; i < enemy["debuffs"].length; i++) {
    applyEffect(enemy["debuffs"][i], enemy);
  }
}

module.exports = applyEffectsToOthers;
