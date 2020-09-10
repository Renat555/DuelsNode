
const spellTypes = require('./spellTypes');
const spellModels = require('./spellModels');

const ImmediateDamage = spellTypes.ImmediateDamage;
const DamagePerMuve = spellTypes.DamagePerMuve;

function createPlayers(mongoCollection, userId) {
  let user;

  mongoCollection.findOne({'id': userId}, function (err, result){
    user = result;
  });

  return user;
}

function createSpell(spellModels, spell) {
    let createdSpell;

    let constructor = spellModels[spell][1];
    switch (constructor) {
      case 'ImmediateDamage':
        createdSpell = new ImmediateDamage(spellModels[spell]);
        break;
      case 'DamagePerMuve':
        createdSpell = new DamagePerMuve(spellModels[spell]);
        break;
      case 'DecreaseDamageInputSpell':
        break;
    }


  return createdSpell;
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

function processingPlayerBySpell(player, spell) {
  switch (spell['type']) {
    case expression:

      break;
    default:

  }
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
