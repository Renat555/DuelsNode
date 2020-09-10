
function activationEffects(player) {
  let buffs = player['buffs'];

  for (let i = 0; i < buffs.length; i++) {
    if (buffs[i]['category'] == 'DamagePerMuve') {
      buffs[i].effect(player);
    }
  }

}

function endMuve(request, collection, ws) {

}

module.exports.endMuve = endMuve;
module.exports.activationEffects = activationEffects;
