
const effectsList = require('./effectsList');
const spellModels = require('./spellModels');

const SingleDamage = effectsList.SingleDamage;
const IncreaseDamageOutputSpell = effectsList.IncreaseDamageOutputSpell;
const DecreaseDamageInputSpell = effectsList.DecreaseDamageInputSpell;

function createPlayers(mongoCollection, userId) {
  let user;

  mongoCollection.findOne({'id': userId}, function (err, result){
    user = result;
  });

  return user;
}

function createSpell(spellModels, spell) {
  let spellArr = [];

  for (let i = 1; i < spellModels[spell].length; i++) {

    let constructor = spellModels[spell][i][1];

    switch (constructor) {
      case 'ImmediateDamage':
        spellArr[i] = new ImmediateDamage(spellModels[spell][0], spellModels[spell][i]);
        break;
      case 'IncreaseDamageOutputSpell':
        spellArr[i] = new IncreaseDamageOutputSpell(spellModels[spell][i]);
        break;
      case 'DecreaseDamageInputSpell':
        spellArr[i] = new DecreaseDamageInputSpell(spellModels[spell][i]);
        break;
    }

  }

  return spellArr;
}

function isHaveNotDependences(effect, spell) {

  effect.dependencesType.forEach((item) => {

  });

}

function processingSpellByEnemyEffects(enemy, spell) {

  for (let i = 0; i < enemy['buffs'].length; i++) {
    for (let j = 0; j < enemy['buffs'][i].length; j++) {
      for (let k = 0; k < spell.length; k++) {
        if (isHaveNotDependences(enemy['buffs'][i][j], spell[k])) continue;
        enemy['buffs'][i][j].effect(spell[k]);
      }
    }
  }

  for (let i = 0; i < enemy['debuffs'].length; i++) {
    for (let j = 0; j < enemy['debuffs'][i].length; j++) {
      for (let k = 0; k < spell.length; k++) {
        if (isHaveNotDependences(enemy['debuffs'][i][j], spell[k])) continue;
        enemy['debuffs'][i][j].effect(spell[k]);
      }
    }
  }

}

function processingSpellByUserEffects(user, spell) {

}

function processingEnemyBySpell(enemy, spell) {
  for (let i = 0; i < spell.length; i++) {

  }
}

function processingUserBySpell(user, spell) {

}

function savePlayers(user, enemy) {

}

function processingSpell(spell, collection, ws) {
  createPlayers(mongoCollection, userId);
  createSpell(spell);
  processingSpellByEnemyEffects(user, enemy, spell);
  processingSpellByUserEffects(user, enemy, spell);
  processingEnemyBySpell(enemy, spell);
  processingUserBySpell(user, spell);
  savePlayers(user, enemy);
}

module.exports.createPlayers = createPlayers;
module.exports.createSpell = createSpell;
module.exports.processingSpellByEnemyEffects = processingSpellByEnemyEffects;
module.exports.processingSpellByUserEffects = processingSpellByUserEffects;
module.exports.processingEnemyBySpell = processingEnemyBySpell;
module.exports.processingUserBySpell = processingUserBySpell;
module.exports.savePlayers = savePlayers;
