
const spellClasses = require('./spellClasses');

function createPlayers(mongoCollection, userId) {
  let arr = {user: "", enemy: ""};

  mongoCollection.findOne({'id': userId}, function (err, result) {
    arr['user'] = result;
    mongoCollection.findOne({$and: [{'id': {$not: {$eq: result['id']} } }, {'idGame': result['idGame']}] }, function (err, result) {
      arr['enemy'] = result;
    });
  });

  return arr;
}

function createSpell(spellName) {
  let spell;

  switch (spellName) {
    case 'firespear':
      spell = new Firespear();
      break;
    case 'firekey':
      spell = new Fireshild();
      break;
    case 'firespear':
      spell = new Firecrown();
      break;
    case 'firekey':
      spell = new Firesource();
      break;
    case 'firespear':
      spell = new Firesphere();
      break;
    case 'firekey':
      spell = new Firestamp();
      break;
    case 'firespear':
      spell = new Firekey();
      break;
    case 'firekey':
      spell = new Fireflow();
      break;
    case 'firekey':
      spell = new Firepower();
      break;
  }
  return spell;
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
        player['debuffs'][i].decreasePlayerHealth(player);
        break;
    }

  }

}

function savePlayers(user, enemy) {

}

function processingSpell(spellName, collection, ws) {
  let {user, enemy} = createPlayers(collection, ws['id']);
  let response = {header: 'processedSpell', user: user, enemy: enemy};
  ws.send(JSON.stringify(response));
  /*processingSpellByPlayerEffects(enemy, spell);
  processingSpellByPlayerEffects(user, spell);
  savePlayers(user, enemy);*/
}

module.exports.processingSpell = processingSpell;
module.exports.createSpell = createSpell;
module.exports.createPlayers = createPlayers;
module.exports.processingSpellByPlayerEffects = processingSpellByPlayerEffects;
module.exports.savePlayers = savePlayers;
