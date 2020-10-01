
const spellClasses = require('./spellClasses');
const Player = spellClasses.Player;
const createSpell = require('./createSpell');
const applySpell = require('./applySpell');

function createEffectsFromSpellNames(arrNames) {
  let arrEffects = [];
  for (let i = 0; i < arrNames.length; i++) {
    arrEffects[i] = createSpell(arrNames[i]);
  }
  return arrEffects;
}

function createSpellNamesFromEffects(arrEffects) {
  let arrNames = [];
  for (let i = 0; i < arrEffects.length; i++) {
    arrNames[i] = arrEffects[i]['spell'];
  }
  return arrNames;
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

function createPlayers(mongoCollection, ws, wss) {
  return new Promise((resolve, reject) => {
    let arr = {user: "", enemy: ""};

    mongoCollection.find({'idGame': ws['idGame']}).toArray(function(err, result) {

      let userBuffs = createEffectsFromSpellNames(result[0]['buffs']);
      let userDebuffs = createEffectsFromSpellNames(result[0]['debuffs']);
      let user = new Player(result[0]['actionPoints'], result[0]['energyPoints'], result[0]['health'], result[0]['maxHealth'], userBuffs, userDebuffs);
      arr['user'] = user;

      let enemyBuffs = createEffectsFromSpellNames(result[1]['buffs']);
      let enemyDebuffs = createEffectsFromSpellNames(result[1]['debuffs']);
      let enemy = new Player(result[1]['actionPoints'], result[1]['energyPoints'], result[1]['health'], result[1]['maxHealth'], enemyBuffs, enemyDebuffs);
      arr['enemy'] = enemy;

      resolve(arr);
      });
    });
  }

function savePlayers(user, enemy, mongoCollection, ws, wss) {
    let userBuffs = createSpellNamesFromEffects(user['buffs']);
    let userDebuffs = createSpellNamesFromEffects(user['debuffs']);

    mongoCollection.updateOne(
      {'id': ws['id']},
      {$set: {actionPoints: user['actionPoints'], energyPoints: user['energyPoints'], maxHealth: user['maxHealth'], health: user['health'], buffs: userBuffs, debuffs: userDebuffs}});

    let enemyBuffs = createSpellNamesFromEffects(enemy['buffs']);
    let enemyDebuffs = createSpellNamesFromEffects(enemy['debuffs']);
    mongoCollection.updateOne(
      {'id': ws['idEnemy']},
      {$set: {actionPoints: enemy['actionPoints'], energyPoints: enemy['energyPoints'], maxHealth: enemy['maxHealth'], health: enemy['health'], buffs: enemyBuffs, debuffs: enemyDebuffs}});
}

function sendGameInformation(user, enemy, ws, wss) {
  let response = {header: 'processingSpell', user: user, enemy: enemy};
  ws.send(JSON.stringify(response));

  wss.clients.forEach(function each(client) {
    if (client.readyState == 1 && client['id'] == ws['idEnemy']) {
      let responseForEnemy = {'header': 'processingSpell'};
			responseForEnemy['user'] = response['enemy'];
			responseForEnemy['enemy'] = response['user'];
			client.send(JSON.stringify(responseForEnemy));
    }
  });
}

function processingSpell(request, collection, ws, wss) {
  createPlayers(collection, ws, wss)
    .then(result => {
      let {user, enemy} = result;
      let spellName = request['element'] + request['form'];
      let spell = createSpell(spellName);
      applySpell(spell, user, enemy);
      savePlayers(user, enemy, collection, ws, wss);
      sendGameInformation(user, enemy, ws, wss);
  /*processingSpellByPlayerEffects(enemy, spell);
  processingSpellByPlayerEffects(user, spell);
  savePlayers(user, enemy);*/
    });
}

module.exports.processingSpell = processingSpell;
module.exports.createEffectsFromSpellNames = createEffectsFromSpellNames;
module.exports.createSpellNamesFromEffects = createSpellNamesFromEffects;
module.exports.processingSpellByPlayerEffects = processingSpellByPlayerEffects;
module.exports.savePlayers = savePlayers;
