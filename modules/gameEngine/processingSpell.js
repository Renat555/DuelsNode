
const createPlayers = require('./createPlayers').createPlayers;
const createSpell = require('./createSpell');
const applySpell = require('./applySpell');
const isHaveDependences = require('./isHaveDependences')
const savePlayers = require('./savePlayers').savePlayers;
const sendGameInformation = require('./sendGameInformation');

function processingSpellByUserEffects(player, spell) {

  for (let i = 0; i < player['buffs'].length; i++) {
    if (!isHaveDependences(player['buffs'][i], spell)) continue;

    switch (player['buffs'][i]['spellName']) {
      case 'firecrown':
        player['buffs'][i].increaseSpellDamage(spell);
        break;
      case 'firepower':
        player['buffs'][i].increaseSpellDamage(spell);
        break;
      case 'waterpower':
        player['buffs'][i].increaseSpellDuration(spell);
        break;
      case 'earthcrown':
        player['buffs'][i].increaseSpellHitProbability(spell);
        break;
      case 'earthsource':
        if (spell['spellName'] == 'earthsphere') {
          player['buffs'][i].increaseSpellDuration(spell);
        } else {
          player['buffs'][i].increaseSpellDamage(spell);
        }
        break;
      case 'earthpower':
        player['buffs'][i].increaseSpellDuration(spell);
        break;
      case 'airsource':
        player['buffs'][i].increaseSpellHitProbability(spell);
        break;
    }

  }

  for (let i = 0; i < player['debuffs'].length; i++) {
    if (!isHaveDependences(player['debuffs'][i], spell)) continue;

    switch (player['debuffs'][i]['spellName']) {
      case 'airshild':
        player['debuffs'][i].decreaseSpellHitProbability(player);
        break;
      case 'aircrown':
        player['debuffs'][i].decreaseSpellHitProbability(player);
        break;
      case 'airsphere':
        player['debuffs'][i].decreaseSpellHitProbability(player);
        break;
      case 'airstamp':
        player['debuffs'][i].decreaseSpellHitProbability(player);
        break;
      case 'deathshild':
        player['debuffs'][i].decreaseSpellHitProbability(player);
        break;
      case 'deathshild':
        player['debuffs'][i].decreaseSpellHitProbability(player);
        break;
      case 'deathstamp':
        player['debuffs'][i].decreaseSpellHitProbability(player);
        break;
    }

  }

}

function processingSpellByEnemyEffects(player, spell) {
  for (let i = 0; i < player['buffs'].length; i++) {
    if (!isHaveDependences(player['buffs'][i], spell)) continue;

    switch (player['buffs'][i]['spellName']) {
      case 'fireshild':
        player['buffs'][i].decreaseSpellDamage(spell);
        break;
      case 'watershild':
        player['buffs'][i].decreaseSpellDamage(spell);
        break;
      case 'watersphere':
        player['buffs'][i].decreaseSpellDamage(spell);
        break;
      case 'waterstamp':
        player['buffs'][i].decreaseSpellDamage(spell);
        break;
      case 'earthshild':
        player['buffs'][i].decreaseSpellDamage(spell);
        break;
      case 'earthstamp':
        player['buffs'][i].decreaseSpellDamage(spell);
        break;
      case 'airpower':
        player['buffs'][i].decreaseSpellHitProbability(spell);
        break;
      case 'lifeshild':
        player['buffs'][i].decreaseSpellHitProbability(spell);
        break;
      case 'lifestamp':
        player['buffs'][i].decreaseSpellHitProbability(spell);
        break;
      case 'lifepower':
        player['buffs'][i].decreaseSpellHitProbability(spell);
        break;
      case 'deathkey':
        player['buffs'][i].incrasePlayerHealth(player, spell);
        break;
    }

  }

  for (let i = 0; i < player['debuffs'].length; i++) {
    if (!isHaveDependences(player['debuffs'][i], spell)) continue;

    switch (player['debuffs'][i]['spellName']) {
      case 'firesphere':
        player['debuffs'][i].decreasePlayerHealth(player);
        break;
      case 'earthsphere':
        player['debuffs'][i].increaseSpellHitProbability(spell);
        break;
    }

  }

}

function processingSpell(request, collection, ws, wss) {
  createPlayers(collection, ws)
    .then(result => {
      let {user, enemy} = result;
      let spell = createSpell(request['spell'], request['despell']);
      processingSpellByUserEffects(user, spell);
      processingSpellByEnemyEffects(enemy, spell);
      applySpell(spell, user, enemy);
      savePlayers(user, enemy, collection, ws)
        .then(result => {
          let response = {header: 'processingSpell'};
          sendGameInformation(response, collection, ws, wss);
        })
    });
}

module.exports.processingSpell = processingSpell;
module.exports.processingSpellByUserEffects = processingSpellByUserEffects;
module.exports.processingSpellByEnemyEffects = processingSpellByEnemyEffects;
module.exports.savePlayers = savePlayers;
