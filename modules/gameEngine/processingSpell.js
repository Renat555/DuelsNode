
const spellClasses = require('./spellClasses');

const Firespear = spellClasses.Firespear;

function createPlayers(mongoCollection, userId) {
  let user;

  mongoCollection.findOne({'id': userId}, function (err, result){
    user = result;
  });

  return user;
}

function isHaveDependences(effect, spell) {
  for (let i = 0; i < effect['dependences'].length; i++) {
    if (effect['dependences'][i] == spell['spell']) return true;
  }
  return false;
}

function processingSpellByPlayerEffects(player, spell) {

  for (let i = 0; i < player['buffs'].length; i++) {
    if (!isHaveDependences(player['buffs'][i], spell)) continue;

    switch (player['buffs'][i]['spell']) {
      case 'fireshild':
        player['buffs'][i].decreaseSpellDamager(spell);
        break;
    }


  }

  for (let i = 0; i < player['debuffs'].length; i++) {
    if (!isHaveDependences(player['debuffs'][i], spell)) continue;

    switch (player['debuffs'][i]['spell']) {
      case 'firesphere':
        player['debuffs'][i].damagePlayer(player);
        break;
    }

  }

}

function savePlayers(user, enemy) {

}

function processingSpell(spellName, collection, ws) {
  let spell;

  switch (spellName) {
    case 'firespear':
      spell = new Firespear();
      break;
    case 'firekey':
      spell = new Firekey();
      break;
  }

  createPlayers(mongoCollection, userId);
  processingSpellByPlayerEffects(enemy, spell);
  processingSpellByPlayerEffects(user, spell);
  savePlayers(user, enemy);
}

module.exports.createPlayers = createPlayers;
module.exports.processingSpellByPlayerEffects = processingSpellByPlayerEffects;
module.exports.savePlayers = savePlayers;
