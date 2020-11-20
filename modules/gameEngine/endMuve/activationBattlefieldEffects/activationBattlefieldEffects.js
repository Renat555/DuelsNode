const createEffectsFromBattlefield = require("./createEffectsFromBattlefield");
const applyEffectsToBattlefieldEffect = require("./applyEffectsToBattlefieldEffect");
const applyBattlefieldEffects = require("./applyBattlefieldEffects");
const decreaseDurationBattlefieldEffects = require("./decreaseDurationBattlefieldEffects");

function activationBattlefieldEffects(user, enemy) {
  let userEffects = createEffectsFromBattlefield(user);
  let enemyEffects = createEffectsFromBattlefield(enemy);
  applyEffectsToBattlefieldEffect(userEffects, user);
  applyEffectsToBattlefieldEffect(enemyEffects, enemy);
  applyBattlefieldEffects(userEffects, user);
  applyBattlefieldEffects(enemyEffects, enemy);
  decreaseDurationBattlefieldEffects(user, enemy);
}

module.exports = activationBattlefieldEffects;
