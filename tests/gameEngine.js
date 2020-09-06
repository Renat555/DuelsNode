buff
DecreaseDamageNegativeEffect
IncreaseDamageOutputImmediateDamage
DecreaseDamageInputImmediateDamage
DamageByContactInputImmediateDamage
BlockInputImmediateDamage
IncreaseDurationInputBuff
IncreaseHitChanceOutputImmediateDamage
BlockDecreaseMaxHealth
IncreaseHealthPerMuve
BlockInputNegativeEffect



debuff
DamagePerMuve
DamageByContactInputImmediateDamage
IncreaseHitChanceInputImmediateDamage
IncreaseHitChanceInputNegativeEffect
IncreaseHitChanceOutputNegativeEffect
DecreaseHitChanceOutputImmediateDamage
DecreaseHitChanceOutputNegativeEffect
DecreaseHitChanceInputPositiveEffect


dispel

battleSpell

other







const chai = require('chai');
const expect = chai.expect;

const spellModels = require('./../modules/gameEngine/spellModels');

const effectsList = require('./../modules/gameEngine/effectsList');
const Player = effectsList.Player;
const SingleDamage = effectsList.SingleDamage;

const processingSpell = require('./../modules/gameEngine/processingSpell');
const processingSpellByEnemyEffects = processingSpell.processingSpellByEnemyEffects;
const createSpell = processingSpell.createSpell;
const createUser = processingSpell.createUser;

describe('game engine', function () {



  describe('processing spell', function () {

    it('create spell', function () {
      let expectSpell = [ new SingleDamage(['SingleDamage', 'water', 20, 20, 1, 1, 'Водный поток поражает противника и наносит урон ']) ];
      let resultSpell = createSpell(spellModels, 'waterflow');

      expect(expectSpell).to.deep.equal(resultSpell);
    });

  });



  describe('spell effects', function () {

    it('SingleDamage decrease enemy health', function() {
      let firespear = createSpell(spellModels, 'firespear');

      let enemyResult = new Player(250, 250, [], []);
      let enemyExpect = new Player(250, 250, [], []);
      enemyExpect.health = enemyExpect.health - firespear[0].damage;

      for (let i = 0; i < firespear.length; i++) {
        firespear[i].effect(enemyResult);
      }

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('IncreaseDamageOutputSpell adds damage for spell', function() {
      let firecrown = createSpell(spellModels, 'firecrown');

      let spellResult = new SingleDamage(['SingleDamage', 'water', 20, 20, 1, 1, 'Водный поток поражает противника и наносит урон ']);
      let spellExpect = new SingleDamage(['SingleDamage', 'water', 20, 20, 1, 1, 'Водный поток поражает противника и наносит урон ']);
      spellExpect.damage = spellExpect.damage + Math.round(spellExpect.damage*25/100);

      firecrown[0].effect(spellResult);

      spellExpect.description = spellResult.description;
      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('DecreaseDamageInputSpell reduces damage for spell', function() {
      let enemy = new Player(250, 250, [], []);
      enemy['buffs'][0] = createSpell(spellModels, 'watershild');

      let waterflowExpect = createSpell(spellModels, 'waterflow');
      waterflowExpect[0].damage = waterflowExpect[0].damage - Math.round(waterflowExpect[0].damage*40/100);

      let waterflowResult = createSpell(spellModels, 'waterflow');
      processingSpellByEnemyEffects(enemy,  waterflowResult);

      waterflowExpect[0].description = waterflowResult[0].description;
      expect(waterflowExpect).to.deep.equal(waterflowResult);
    });

  });



});
