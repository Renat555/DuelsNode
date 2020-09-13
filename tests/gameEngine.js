
const chai = require('chai');
const expect = chai.expect;

const spellClasses = require('./../modules/gameEngine/spellClasses');
const Player = spellClasses.Player;

const Fireshild = spellClasses.Fireshild;


const processingSpell = require('./../modules/gameEngine/processingSpell');
const processingSpellByPlayerEffects = processingSpell.processingSpellByPlayerEffects;
const createSpell = processingSpell.createSpell;
const createUser = processingSpell.createUser;

const endMuve = require('./../modules/gameEngine/endMuve');
const activationEffects = endMuve.activationEffects;

describe('game engine', function () {

  describe('spells', function () {

    it('firespear', function() {
      const Firespear = spellClasses.Firespear;
      let firespear = new Firespear();

      let enemyResult = new Player(250, 250, [], []);
      let enemyExpect = new Player(250, 250, [], []);
      enemyExpect.health -= firespear.damage;

      firespear.damagePlayer(enemyResult);
      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('fireshild', function() {
      const Fireshild = spellClasses.Fireshild;
      const Firesource = spellClasses.Firesource;

      let fireshild = new Fireshild();

      let spellResult = new Firesource();
      let spellExpect = new Firesource();
      spellExpect.damage = spellResult.damage;

      fireshild.decreaseSpellDamage(spellResult);
      spellExpect.damage -= Math.round(spellExpect.damage*fireshild.percentDecreaseDamage/100);

      spellResult['descriptionForUser'] = '';
      spellResult['descriptionForEnemy'] = '';

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('firecrown', function() {
      const Firecrown = spellClasses.Firecrown;
      const Firespear = spellClasses.Firespear;

      let firecrown = new Firecrown();

      let spellExpect = new Firespear();
      let spellResult = new Firespear();
      spellExpect.damage = spellResult.damage;

      spellExpect.damage += Math.round(spellExpect.damage*firecrown.percentIncreaseDamage/100);
      firecrown.increaseSpellDamage(spellResult);

      spellResult['descriptionForUser'] = '';
      spellResult['descriptionForEnemy'] = '';


      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('firesource', function() {
      const Firesource = spellClasses.Firesource;

      let firesource = new Firesource();

      let enemyResult = new Player(250, 250, [], []);
      let enemyExpect = new Player(250, 250, [], []);
      enemyExpect.health -= firesource.damage;

      firesource.damagePlayer(enemyResult);
      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('firesphere', function() {
      const Firesphere = spellClasses.Firesphere;
      const Firespear = spellClasses.Firespear;
      let firesphere = new Firesphere();
      let firespear = new Firespear();

      let enemyExpect = new Player(250, 250, [], []);
      enemyExpect.health = enemyExpect.health - firespear.damage - firesphere.damage;

      let enemyResult = new Player(250, 250, [], []);
      firesphere.saveEffect(enemyResult);
      processingSpellByPlayerEffects(enemyResult, firespear);
      firespear.damagePlayer(enemyResult);

      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';
      enemyResult['debuffs'] = [];

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('firestamp', function() {
      const Firestamp = spellClasses.Firestamp;
      const Firesource = spellClasses.Firesource;
      let firestamp = new Firestamp();
      let firesource = new Firesource();

      let enemyExpect = new Player(250, 250, [], []);
      enemyExpect['debuffs'][0] = firesource;
      enemyExpect['debuffs'][0]['duration'] += 2;

      let enemyResult = new Player(250, 250, [], []);
      firesource.saveEffect(enemyResult);
      processingSpellByPlayerEffects(enemyResult, firestamp);

      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('firekey', function() {
      const Firekey = spellClasses.Firekey;
      const Fireshild = spellClasses.Fireshild;
      let firekey = new Firekey('fireshild');
      let fireshild = new Fireshild();

      let enemyExpect = new Player(250, 250, [], []);

      let enemyResult = new Player(250, 250, [], []);
      fireshild.saveEffect(enemyResult);
      firekey.deleteEffect(enemyResult);

      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('fireflow', function() {
      const Fireflow = spellClasses.Fireflow;
      let fireflow = new Fireflow();

      let enemyResult = new Player(250, 250, [], []);
      let enemyExpect = new Player(250, 250, [], []);
      enemyExpect.health -= fireflow.damage;

      fireflow.damagePlayer(enemyResult);
      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('firepower', function() {
      const Firepower = spellClasses.Firepower;
      const Firespear = spellClasses.Firespear;

      let firepower = new Firepower();

      let spellExpect = new Firespear();
      let spellResult = new Firespear();
      spellExpect.damage = spellResult.damage;

      spellExpect.damage += 5;
      firepower.increaseSpellDamage(spellResult);

      spellResult['descriptionForUser'] = '';
      spellResult['descriptionForEnemy'] = '';


      expect(spellResult).to.deep.equal(spellExpect);
    });

  });

});
