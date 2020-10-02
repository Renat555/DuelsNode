
const spellClasses = require('./spellClasses');
const Player = spellClasses.Player;
const createSpell = require('./createSpell');
const applySpell = require('./applySpell');

function createEffectsFromSpellNames(arrNames) {
  let arrEffects = [];
  for (let i = 0; i < arrNames.length; i++) {
    arrEffects[i] = createSpell(arrNames[i][0]);
  }
  return arrEffects;
}

function createSpellNamesFromEffects(arrEffects) {
  let arrNames = [];
  for (let i = 0; i < arrEffects.length; i++) {
    arrNames[i] = [];
    arrNames[i][0] = arrEffects[i]['spell'];
    arrNames[i][1] = arrEffects[i]['duration'];
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

function createPlayers(mongoCollection, ws) {
  return new Promise((resolve, reject) => {
    let arr = {user: "", enemy: ""};

    mongoCollection.findOne({'id': ws['id']})
      .then(doc => {
        let userBuffs = createEffectsFromSpellNames(doc['buffs']);
        let userDebuffs = createEffectsFromSpellNames(doc['debuffs']);
        let user = new Player(doc['actionPoints'], doc['energyPoints'], doc['health'], doc['maxHealth'], userBuffs, userDebuffs);
        arr['user'] = user;
      })
        .then(() => {
          mongoCollection.findOne({'id': ws['idEnemy']}, function (err, doc) {
            let enemyBuffs = createEffectsFromSpellNames(doc['buffs']);
            let enemyDebuffs = createEffectsFromSpellNames(doc['debuffs']);
            let enemy = new Player(doc['actionPoints'], doc['energyPoints'], doc['health'], doc['maxHealth'], enemyBuffs, enemyDebuffs);
            arr['enemy'] = enemy;
            resolve(arr);
          });
        });

  });
}

function savePlayers(user, enemy, mongoCollection, ws) {
  return new Promise((resolve, reject) => {
  user['buffs'] = createSpellNamesFromEffects(user['buffs']);
  user['debuffs'] = createSpellNamesFromEffects(user['debuffs']);

  mongoCollection.updateOne(
    {'id': ws['id']},
    {$set: {actionPoints: user['actionPoints'], energyPoints: user['energyPoints'], maxHealth: user['maxHealth'], health: user['health'], buffs: user['buffs'], debuffs: user['debuffs']}});

  enemy['buffs'] = createSpellNamesFromEffects(enemy['buffs']);
  enemy['debuffs'] = createSpellNamesFromEffects(enemy['debuffs']);
  mongoCollection.updateOne(
    {'id': ws['idEnemy']},
    {$set: {actionPoints: enemy['actionPoints'], energyPoints: enemy['energyPoints'], maxHealth: enemy['maxHealth'], health: enemy['health'], buffs: enemy['buffs'], debuffs: enemy['debuffs']}});
    resolve();
  });
}

function sendGameInformation(mongoCollection, ws, wss) {
  let response = {header: 'processingSpell'};

  mongoCollection.findOne({'id': ws['id']})
      .then(doc => {
        response['user'] = doc;
      })
        .then(() => {
          mongoCollection.findOne({'id': ws['idEnemy']}, function (err, doc) {
            response['enemy'] = doc;
            ws.send(JSON.stringify(response));
            wss.clients.forEach(function each(client) {
            if (client.readyState == 1 && client['id'] == ws['idEnemy']) {
              let responseForEnemy = {'header': 'processingSpell'};
			        responseForEnemy['user'] = response['enemy'];
			        responseForEnemy['enemy'] = response['user'];
			        client.send(JSON.stringify(responseForEnemy));
            }
            });
          });
        });
}

function processingSpell(request, collection, ws, wss) {
  createPlayers(collection, ws)
    .then(result => {
      let {user, enemy} = result;
      let spell = createSpell(request['spell'], request['despell']);
      applySpell(spell, user, enemy);
      savePlayers(user, enemy, collection, ws)
        .then(result => {
          sendGameInformation(collection, ws, wss);
        })
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
