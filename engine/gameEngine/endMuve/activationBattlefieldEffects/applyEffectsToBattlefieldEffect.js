const applyEffect = require("../applyEffect");

function applyEffectsToBattlefieldsEffect(effects, player) {
  for (let i = 0; i < effects.length; i++) {
    applyEffect(effects[i], player);
  }
}

module.exports = applyEffectsToBattlefieldsEffect;
