const isHaveDependences = require("../isHaveDependences");

function applyUserEffectsOnDespell(player, spell) {
  for (let i = 0; i < player["buffs"].length; i++) {
    if (!isHaveDependences(player["buffs"][i], spell)) continue;

    switch (player["buffs"][i]["spellName"]) {
    }
  }

  for (let i = 0; i < player["debuffs"].length; i++) {
    if (!isHaveDependences(player["debuffs"][i], spell)) continue;

    switch (player["debuffs"][i]["spellName"]) {
    }
  }
}

module.exports = applyUserEffectsOnDespell;
