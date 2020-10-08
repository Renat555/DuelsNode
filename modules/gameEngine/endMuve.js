
const createPlayers = require('./createPlayers');
const isHaveDependences = require('./isHaveDependences');
const sendGameInformation = require('./sendGameInformation');


function processingEffects(user, enemy) {

  for (let i = 0; i < user['buffs'].length; i++) {
    processingEffect(urser['buffs'][i], user);
  }
  
  for (let i = 0; i < user['debuffs'].length; i++) {
    processingEffect(urser['debuffs'][i], user);
  }
  
  for (let i = 0; i < enemy['buffs'].length; i++) {
    processingEffect(enemy['buffs'][i], enemy);
  }

  for (let i = 0; i < enemy['debuffs'].length; i++) {
    processingEffect(enemy['debuffs'][i], enemy);
  }

}

function processingEffect(effect, player) {

  for (let i = 0; i < player['buffs'].length; i++) {
    if (!isHaveDependences(player['buffs'][i], effect)) continue;
    
    switch (player['buffs'][i]['spellName']) {
      case 'fireshild':
        player['buffs'][i].decreaseSpellDamage(effect);
        break;
      case 'watercrown':
        player['buffs'][i].decreaseSpellDamage(effect);
        break;
      case 'watersphere':
        player['buffs'][i].decreaseSpellDamage(effect);
        break;
      case 'earthshild':
        player['buffs'][i].decreaseSpellDamage(effect);
        break;
    }
  }
  
  for (let i = 0; i < player['debuffs'].length; i++) {
    if (!isHaveDependences(player['buffs'][i], effect)) continue;
  
    switch (player['buffs'][i]['spellName']) {
      case 'deathsphere':
        player['buffs'][i].increaseSpellDamage(effect);
        break;
    }
  }

}

function applyEffects(user, enemy) {
  
  for (let i = 0; i < user['buffs'].length; i++) {
    applyEffect(urser['buffs'][i], user, enemy);
  }
  
  for (let i = 0; i < user['debuffs'].length; i++) {
    applyEffect(urser['debuffs'][i], user, enemy);
  }
  
  for (let i = 0; i < enemy['buffs'].length; i++) {
    applyEffect(enemy['buffs'][i], enemy, user);
  }

  for (let i = 0; i < enemy['debuffs'].length; i++) {
    applyEffect(enemy['debuffs'][i], enemy, user);
  }

}

function applyEffect(effect, user, enemy) {

  switch (effect['spellName']) {
    case 'firesource':
      effect.decreasePlayerHealth(user);
      break;
    case 'lifesphere':
      effect.increasePlayerHealth(user);
      break;
    case 'lifeflow':
      effect.increasePlayerHealth(user);
      break;
    case 'deathflow':
      effect.deathflowEffect(user, enemy);
      break;
  }

}

function endMuve(collection, ws, wss) {
  createPlayers(collection, ws)
    .then(result => {
      let {user, enemy} = result;
      processingEffects(user, enemy);
      applyEffects(user, enemy);
      savePlayers(user, enemy, collection, ws)
        .then(result => {
          sendGameInformation(collection, ws, wss);
        });
    })
}

module.exports.endMuve = endMuve;
module.exports.processingEffects = processingEffects;
module.exports.processingEffect = processingEffect;
