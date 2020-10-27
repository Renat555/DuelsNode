const spellClasses = require("./spellClasses");
const Player = spellClasses.Player;
const createSpell = require("./createSpell");

function createEffectsFromSpellNames(arrNames) {
  let arrEffects = [];
  for (let i = 0; i < arrNames.length; i++) {
    arrEffects[i] = createSpell(arrNames[i][0], undefined, arrNames[i][1]);
  }

  return arrEffects;
}

function createPlayers(mongoCollection, ws) {
  return new Promise((resolve, reject) => {
    let arr = { user: "", enemy: "", battlefield: "" };
    mongoCollection
      .findOne({ id: ws["id"] })
      .then((doc) => {
        let userBuffs = createEffectsFromSpellNames(doc["buffs"]);
        let userDebuffs = createEffectsFromSpellNames(doc["debuffs"]);
        let user = new Player(
          doc["actionPoints"],
          doc["energyPoints"],
          doc["health"],
          doc["maxHealth"],
          doc["muve"],
          userBuffs,
          userDebuffs
        );
        arr["user"] = user;
      })
      .then(() => {
        mongoCollection.findOne({ id: ws["idEnemy"] }, function (err, doc) {
          let enemyBuffs = createEffectsFromSpellNames(doc["buffs"]);
          let enemyDebuffs = createEffectsFromSpellNames(doc["debuffs"]);
          let enemy = new Player(
            doc["actionPoints"],
            doc["energyPoints"],
            doc["health"],
            doc["maxHealth"],
            doc["muve"],
            enemyBuffs,
            enemyDebuffs
          );
          arr["enemy"] = enemy;
          resolve(arr);
        });
      });
  });
}

module.exports.createPlayers = createPlayers;
module.exports.createEffectsFromSpellNames = createEffectsFromSpellNames;
