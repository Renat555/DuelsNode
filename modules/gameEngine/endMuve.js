
function activationEffects(user, enemy, battleField) {
  let buffs = player['buffs'];

  for (let i = 0; i < buffs.length; i++) {
    buffs[i].effectPerMuve(user, enemy, battleField);
  }

  let debuffs = player['debuffs'];

  for (let i = 0; i < debuffs.length; i++) {
    debuffs[i].effectPerMuve(user, enemy, battleField);
  }

}

function endMuve(request, collection, ws) {

}

module.exports.endMuve = endMuve;
module.exports.activationEffects = activationEffects;
