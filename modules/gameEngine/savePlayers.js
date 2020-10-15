
function createSpellNamesFromEffects(arrEffects) {
  let arrNames = [];
  for (let i = 0; i < arrEffects.length; i++) {
    arrNames[i] = [];
    arrNames[i][0] = arrEffects[i]['spellName'];
    arrNames[i][1] = arrEffects[i]['duration'];
  }
  return arrNames;
}

function savePlayers(user, enemy, mongoCollection, ws) {
  return new Promise((resolve, reject) => {
  user['buffs'] = createSpellNamesFromEffects(user['buffs']);
  user['debuffs'] = createSpellNamesFromEffects(user['debuffs']);

  mongoCollection.updateOne(
    {'id': ws['id']},
    {$set: {actionPoints: user['actionPoints'], energyPoints: user['energyPoints'], maxHealth: user['maxHealth'], health: user['health'], muve: user['muve'], buffs: user['buffs'], debuffs: user['debuffs']}});

  enemy['buffs'] = createSpellNamesFromEffects(enemy['buffs']);
  enemy['debuffs'] = createSpellNamesFromEffects(enemy['debuffs']);
  mongoCollection.updateOne(
    {'id': ws['idEnemy']},
    {$set: {actionPoints: enemy['actionPoints'], energyPoints: enemy['energyPoints'], maxHealth: enemy['maxHealth'], health: enemy['health'], muve: enemy['muve'], buffs: enemy['buffs'], debuffs: enemy['debuffs']}});
    resolve();
  });
}

module.exports.savePlayers = savePlayers;
module.exports.createSpellNamesFromEffects = createSpellNamesFromEffects;