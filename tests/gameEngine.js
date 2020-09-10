
const chai = require('chai');
const expect = chai.expect;

const spellModels = require('./../modules/gameEngine/spellModels');

const effectsTypes = require('./../modules/gameEngine/spellTypes');
const Player = effectsTypes.Player;
const ImmediateDamage = effectsTypes.ImmediateDamage;

const processingSpell = require('./../modules/gameEngine/processingSpell');
const processingSpellByEnemyEffects = processingSpell.processingSpellByEnemyEffects;
const createSpell = processingSpell.createSpell;
const createUser = processingSpell.createUser;

describe('game engine', function () {

  describe('spell effects', function () {

    before(function(){
      let firespear = createSpell(spellModels, 'firespear');
      console.log(firespear);
    });

    it('ImmediateDamage decrease enemy health', function() {
      let firespear = createSpell(spellModels, 'firespear');

      let enemyResult = new Player(250, 250, [], []);
      let enemyExpect = new Player(250, 250, [], []);
      enemyExpect.health = enemyExpect.health - firespear.damage;

      firespear.effect(enemyResult);

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('ImmediateDamage decrease enemy health', function() {
      let firespear = createSpell(spellModels, 'firespear');

      let enemyResult = new Player(250, 250, [], []);
      let enemyExpect = new Player(250, 250, [], []);
      enemyExpect.health = enemyExpect.health - firespear.damage;

      firespear.effect(enemyResult);

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

  });



});
