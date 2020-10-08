
const chai = require('chai');
const expect = chai.expect;

const spellClasses = require('./../modules/gameEngine/spellClasses');
const Player = spellClasses.Player;
const Firespear = spellClasses.Firespear;
const Fireshild = spellClasses.Fireshild;
const Firecrown = spellClasses.Firecrown;
const Firesource = spellClasses.Firesource;
const Firesphere = spellClasses.Firesphere;
const Firestamp = spellClasses.Firestamp;
const Firekey = spellClasses.Firekey;
const Fireflow = spellClasses.Fireflow;
const Firepower = spellClasses.Firepower;
const Waterspear = spellClasses.Waterspear;
const Watershild = spellClasses.Watershild;
const Watercrown = spellClasses.Watercrown;
const Watersource = spellClasses.Watersource;
const Watersphere = spellClasses.Watersphere;
const Waterstamp = spellClasses.Waterstamp;
const Waterkey = spellClasses.Waterkey;
const Waterflow = spellClasses.Waterflow;
const Waterpower = spellClasses.Waterpower;
const Earthspear = spellClasses.Earthspear;
const Earthshild = spellClasses.Earthshild;
const Earthcrown = spellClasses.Earthcrown;
const Earthsource = spellClasses.Earthsource;
const Earthsphere = spellClasses.Earthsphere;
const Earthstamp = spellClasses.Earthstamp;
const Earthkey = spellClasses.Earthkey;
const Earthflow = spellClasses.Earthflow;
const Earthpower = spellClasses.Earthpower;
const Airspear = spellClasses.Airspear;
const Airshild = spellClasses.Airshild;
const Aircrown = spellClasses.Aircrown;
const Airsource = spellClasses.Airsource;
const Airsphere = spellClasses.Airsphere;
const Airstamp = spellClasses.Airstamp;
const Airkey = spellClasses.Airkey;
const Airflow = spellClasses.Airflow;
const Airpower = spellClasses.Airpower;
const Lifespear = spellClasses.Lifespear;
const Lifeshild = spellClasses.Lifeshild;
const Lifecrown = spellClasses.Lifecrown;
const Lifesource = spellClasses.Lifesource;
const Lifesphere = spellClasses.Lifesphere;
const Lifestamp = spellClasses.Lifestamp;
const Lifekey = spellClasses.Lifekey;
const Lifeflow = spellClasses.Lifeflow;
const Lifepower = spellClasses.Lifepower;
const Deathspear = spellClasses.Deathspear;
const Deathshild = spellClasses.Deathshild;
const Deathcrown = spellClasses.Deathcrown;
const Deathsource = spellClasses.Deathsource;
const Deathsphere = spellClasses.Deathsphere;
const Deathstamp = spellClasses.Deathstamp;
const Deathkey = spellClasses.Deathkey;
const Deathflow = spellClasses.Deathflow;
const Deathpower = spellClasses.Deathpower;

const processingSpell = require('./../modules/gameEngine/processingSpell');
const processingSpellByEnemyEffects = processingSpell.processingSpellByEnemyEffects;

const createPlayers = require('./../modules/gameEngine/createPlayers');
const createEffectsFromSpellNames = createPlayers.createEffectsFromSpellNames;
const createSpellNamesFromEffects = require('./../modules/gameEngine/savePlayers').createSpellNamesFromEffects;
const createSpell = require('./../modules/gameEngine/createSpell');

const endMuve = require('./../modules/gameEngine/endMuve');
const processingEffect = endMuve.processingEffect;

describe('game engine', function () {

  describe('processing users and battlfield by spell', function () {

    it('create effects from spell names', function() {
      let expectEffects = [];
      expectEffects[0] = new Fireshild;
      expectEffects[1] = new Waterpower;
      expectEffects[2] = new Airstamp;

      let resultEffects = createEffectsFromSpellNames([['fireshild', 4], ['waterpower', -1], ['airstamp', 10]]);
      expect(resultEffects).to.deep.equal(expectEffects);
    });

    it('create spell names from effects', function() {
      let effects = [];
      effects[0] = new Fireshild;
      effects[1] = new Waterpower;
      effects[2] = new Airstamp;

      let resultNames = createSpellNamesFromEffects(effects);
      let expectNames = [['fireshild', 4], ['waterpower', -1], ['airstamp', 10]];

      expect(resultNames).to.deep.equal(expectNames);
    });

    it('create spell from name', function() {
      let spellExpect = new Watersource();
      let spellResultl = createSpell('watersource');

      expect(spellResultl).to.deep.equal(spellExpect);
    });

    it('processing effect by others effects', function() {
      let spellExpect = new Firesource();
      let spellResult = new Firesource();
      spellExpect.maxDamage = spellResult.maxDamage;
      spellExpect.currentDamage = spellResult.currentDamage;

      let player = new Player(3, 3, 250, 250, [], []);
      player['buffs'][0] = new Fireshild();

      processingEffect(spellResult, player);

      spellExpect.decreaseDamage(40, 0, 'Огненный щит', player['buffs'][0].descriptionForUser, player['buffs'][0].descriptionForEnemy);

      expect(spellResult).to.deep.equal(spellExpect);
    });

  });

  describe('spells', function () {

    it('firespear', function() {
      let firespear = new Firespear();

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      let enemyExpect = new Player(3, 3, 250, 250, [], []);
      enemyExpect.health -= firespear.currentDamage;

      firespear.decreasePlayerHealth(enemyResult);
      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('fireshild', function() {
      let fireshild = new Fireshild();

      let spellResult = new Firesource();
      let spellExpect = new Firesource();
      spellExpect.maxDamage = spellResult.maxDamage;
      spellExpect.currentDamage = spellResult.currentDamage;

      fireshild.decreaseSpellDamage(spellResult);
      spellExpect.currentDamage -= Math.round(spellExpect.currentDamage*fireshild.percentDecreaseDamage/100);

      spellResult['descriptionForUser'] = '';
      spellResult['descriptionForEnemy'] = '';

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('firecrown', function() {
      let firecrown = new Firecrown();

      let spellExpect = new Firespear();
      let spellResult = new Firespear();
      spellExpect.maxDamage = spellResult.maxDamage;
      spellExpect.currentDamage = spellResult.currentDamage;

      spellExpect.currentDamage += Math.round(spellExpect.maxDamage*firecrown.percentIncreaseDamage/100);
      firecrown.increaseSpellDamage(spellResult);

      spellResult['descriptionForUser'] = '';
      spellResult['descriptionForEnemy'] = '';

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('firesource', function() {
      let firesource = new Firesource();

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      let enemyExpect = new Player(3, 3, 250, 250, [], []);
      enemyExpect.health -= firesource.currentDamage;

      firesource.decreasePlayerHealth(enemyResult);
      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('firesphere', function() {
      let firesphere = new Firesphere();
      let firespear = new Firespear();

      let enemyExpect = new Player(3, 3, 250, 250, [], []);
      enemyExpect.health = enemyExpect.health - firespear.currentDamage - firesphere.currentDamage;

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      firesphere.saveEffect(enemyResult);
      processingSpellByEnemyEffects(enemyResult, firespear);
      firespear.decreasePlayerHealth(enemyResult);

      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';
      enemyResult['debuffs'] = [];

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('firestamp', function() {
      let firestamp = new Firestamp();
      let firesource = new Firesource();

      let enemyExpect = new Player(3, 3, 250, 250, [], []);
      enemyExpect['debuffs'][0] = firesource;
      enemyExpect['debuffs'][0]['duration'] += 2;

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      firesource.saveEffect(enemyResult);
      firestamp.increaseSpellDuration(enemyResult);

      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('firekey', function() {
      let firekey = new Firekey('fireshild');
      let fireshild = new Fireshild();

      let enemyExpect = new Player(3, 3, 250, 250, [], []);

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      fireshild.saveEffect(enemyResult);
      firekey.deleteEffect(enemyResult);

      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('fireflow', function() {
      let fireflow = new Fireflow();
      fireflow.hitProbability = 1;

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      let enemyExpect = new Player(3, 3, 250, 250, [], []);
      enemyExpect.health -= fireflow.currentDamage;

      fireflow.decreasePlayerHealth(enemyResult);
      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('firepower', function() {
      let firepower = new Firepower();

      let spellExpect = new Firespear();
      let spellResult = new Firespear();
      spellExpect.maxDamage = spellResult.maxDamage;
      spellExpect.currentDamage = spellResult.currentDamage;

      spellExpect.currentDamage += 5;
      firepower.increaseSpellDamage(spellResult);

      spellResult['descriptionForUser'] = '';
      spellResult['descriptionForEnemy'] = '';

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('waterspear', function() {
      let waterspear = new Waterspear();
      let firesource = new Firesource();

      let enemyExpect = new Player(3, 3, 250, 250, [], []);
      enemyExpect.health = enemyExpect.health - waterspear.currentDamage - 5;

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      firesource.saveEffect(enemyResult);
      waterspear.decreasePlayerHealth(enemyResult);

      enemyResult['debuffs'] = [];
      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('watershild', function() {
      let watershild = new Watershild();

      let spellExpect = new Firespear();
      let spellResult = new Firespear();
      spellExpect.maxDamage = spellResult.maxDamage;
      spellExpect.currentDamage = spellResult.currentDamage;

      spellExpect.currentDamage = spellExpect.currentDamage - Math.round(spellExpect.currentDamage*40/100);;

      watershild.decreaseSpellDamage(spellResult);

      spellResult['descriptionForUser'] = '';
      spellResult['descriptionForEnemy'] = '';

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('watercrown', function() {
      let watercrown = new Watercrown();

      let spellResult = new Firesource();
      let spellExpect = new Firesource();
      spellExpect.maxDamage = spellResult.maxDamage;
      spellExpect.currentDamage = spellResult.currentDamage;

      watercrown.decreaseSpellDamage(spellResult);
      spellExpect.currentDamage -= Math.round(spellExpect.currentDamage*watercrown.percentDecreaseDamage/100);

      spellResult['descriptionForUser'] = '';
      spellResult['descriptionForEnemy'] = '';

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('watersource', function() {
      let watersource = new Watersource('firesource');
      watersource.hitProbability = 1;
      let firesource = new Firesource();

      let enemyExpect = new Player(3, 3, 250, 250, [], []);

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      firesource.saveEffect(enemyResult);
      watersource.deleteEffect(enemyResult);

      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('watersphere', function() {
      let watersphere = new Watersphere();

      let spellExpect = new Firespear();
      let spellResult = new Firespear();
      spellExpect.maxDamage = spellResult.maxDamage;

      spellExpect.currentDamage = 0;

      watersphere.decreaseSpellDamage(spellResult);

      spellResult['descriptionForUser'] = '';
      spellResult['descriptionForEnemy'] = '';

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('waterstamp', function() {
      let waterstamp = new Waterstamp();

      let spellExpect = new Firespear();
      let spellResult = new Firespear();
      spellExpect.maxDamage = spellResult.maxDamage;
      spellExpect.currentDamage = spellResult.currentDamage;

      spellExpect.currentDamage = spellExpect.currentDamage - Math.round(spellExpect.currentDamage*33/100);;

      waterstamp.decreaseSpellDamage(spellResult);

      spellResult['descriptionForUser'] = '';
      spellResult['descriptionForEnemy'] = '';

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('waterkey', function() {
      let waterkey = new Waterkey('firesource');
      let firesource = new Firesource();

      let enemyExpect = new Player(3, 3, 250, 250, [], []);

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      firesource.saveEffect(enemyResult);
      waterkey.deleteEffect(enemyResult);

      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('waterflow', function() {
      let waterflow = new Waterflow();

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      let enemyExpect = new Player(3, 3, 250, 250, [], []);
      enemyExpect.health -= waterflow.currentDamage;

      waterflow.decreasePlayerHealth(enemyResult);
      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('waterpower', function() {
      let waterpower = new Waterpower();

      let spellExpect = new Watershild();
      spellExpect.duration += 2;

      let spellResult = new Watershild();
      waterpower.increaseSpellDuration(spellResult);

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('earthspear', function() {
      let earthspear = new Earthspear();
      earthspear.hitProbability = 1;

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      let enemyExpect = new Player(3, 3, 250, 250, [], []);
      enemyExpect.health -= earthspear.currentDamage;

      earthspear.decreasePlayerHealth(enemyResult);
      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('earthshild', function() {
      let earthshild = new Earthshild();
      let firesource = new Firesource();
      let firespear = new Firespear();

      let totalDamage = (firespear.currentDamage + firesource.currentDamage) - 20;
      if (totalDamage < 0) totalDamage = 0;

      let playerExpect = new Player(3, 3, 250, 250, [], []);
      playerExpect.health = playerExpect.health - totalDamage;

      let playerResult = new Player(3, 3, 250, 250, [], []);
      earthshild.decreaseSpellDamage(firespear);
      earthshild.decreaseSpellDamage(firesource);
      firespear.decreasePlayerHealth(playerResult);
      firesource.decreasePlayerHealth(playerResult);

      playerResult['descriptionForUser'] = '';
      playerResult['descriptionForEnemy'] = '';

      expect(playerResult).to.deep.equal(playerExpect);
    });

    it('earthcrown', function() {
      let earthcrown = new Earthcrown();

      let spellExpect = new Earthspear();
      spellExpect.hitProbability += 0.15;

      let spellResult = new Earthspear();
      earthcrown.increaseSpellHitProbability(spellResult);

      spellExpect.currentDamage = spellResult.currentDamage;
      spellExpect.maxDamage = spellResult.maxDamage;
      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('earthsource', function() {
      let earthsource = new Earthsource();
      let earthspear = new Earthspear();
      let earthsphere = new Earthsphere();

      let arrExpect = [];
      let arrResult = [];

      arrExpect[0] = earthspear.currentDamage + 15;
      arrExpect[1] = earthsphere.duration + 1;

      earthsource.increaseSpellDamage(earthspear);
      arrResult[0] = earthspear.currentDamage;
      earthsource.icreaseSpellDuration(earthsphere);
      arrResult[1] = earthsphere.duration;

      expect(arrResult).to.deep.equal(arrExpect);
    });

    it('earthsphere', function() {
      let earthsphere = new Earthsphere();

      let arrExpect = [];
      let arrResult = [];

      arrExpect[0] = 0.5 + 0.05;
      arrExpect[1] = 0.33 + 0.05;

      let spellOneResult = new Firesource();
      spellOneResult.hitProbability = 0.5;
      earthsphere.increaseSpellHitProbability(spellOneResult);
      arrResult[0] = spellOneResult.hitProbability;

      let spellTwoResult = new Earthspear();
      earthsphere.increaseSpellHitProbability(spellTwoResult);
      arrResult[1] = spellTwoResult.hitProbability;

      expect(arrResult).to.deep.equal(arrExpect);
    });

    it('earthstamp', function() {
      let earthstamp = new Earthstamp();

      let spellExpect = new Firespear();
      let spellResult = new Firespear();
      spellExpect.maxDamage = spellResult.maxDamage;
      spellExpect.currentDamage = spellResult.currentDamage;

      spellExpect.currentDamage = spellExpect.currentDamage - Math.round(spellExpect.currentDamage*50/100);;

      earthstamp.decreaseSpellDamage(spellResult);

      spellResult['descriptionForUser'] = '';
      spellResult['descriptionForEnemy'] = '';

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('earthkey', function() {
      let earthkey = new Earthkey('firesource');
      let firesource = new Firesource();

      let enemyExpect = new Player(3, 3, 250, 250, [], []);

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      firesource.saveEffect(enemyResult);
      earthkey.deleteEffect(enemyResult);

      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('earthflow', function() {
      let earthflow = new Earthflow();
      earthflow.hitProbability = 1;

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      let enemyExpect = new Player(3, 3, 250, 250, [], []);
      enemyExpect.health -= earthflow.currentDamage;

      earthflow.decreasePlayerHealth(enemyResult);
      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('earthpower', function() {
      let earthpower = new Earthpower();
      earthpower.activationProbability = 1;

      let spellExpect = new Earthstamp();
      spellExpect.duration += 4;

      let spellResult = new Earthstamp();
      earthpower.increaseSpellDuration(spellResult);

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('airspear', function() {
      let airspear = new Airspear();
      airspear.hitProbability = 1;

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      let enemyExpect = new Player(3, 3, 250, 250, [], []);
      enemyExpect.health -= airspear.currentDamage;

      airspear.decreasePlayerHealth(enemyResult);
      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('airshild', function() {
      let airshild = new Airshild();

      let spellExpect = new Airspear();
      spellExpect.hitProbability -= airshild.percentDecreaseHitProbability;

      let spellResult = new Airspear();
      airshild.decreaseSpellHitProbability(spellResult);

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('aircrown', function() {
      let aircrown = new Aircrown();
      let waterpower = new Waterpower();

      let spellExpect = new Waterpower();
      spellExpect.hitProbability -= 0.33;

      let spellResult = new Waterpower();
      aircrown.decreaseSpellHitProbability(spellResult);

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('airsource', function() {
      let airsource = new Airsource();

      let arrExpect = [];
      let arrResult = [];

      arrExpect[0] = 0.5 + 0.1;
      arrExpect[1] = 0.33 + 0.1;

      let spellOneResult = new Firesource();
      spellOneResult.hitProbability = 0.5;
      airsource.increaseSpellHitProbability(spellOneResult);
      arrResult[0] = spellOneResult.hitProbability;

      let spellTwoResult = new Earthspear();
      airsource.increaseSpellHitProbability(spellTwoResult);
      arrResult[1] = spellTwoResult.hitProbability;

      expect(arrResult).to.deep.equal(arrExpect);
    });

    it('airsphere', function() {
      let airsphere = new Airsphere();

      let spellExpect = new Firesource();
      spellExpect.hitProbability -= airsphere.percentDecreaseHitProbability;

      let spellResult = new Firesource();
      spellResult.maxDamage = spellExpect.maxDamage;
      spellResult.currentDamage = spellExpect.currentDamage;
      airsphere.decreaseSpellHitProbability(spellResult);

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('airstamp', function() {
      let airstamp = new Airstamp();

      let spellExpect = new Earthpower();
      spellExpect.hitProbability -= airstamp.percentDecreaseHitProbability;

      let spellResult = new Earthpower();
      airstamp.decreaseSpellHitProbability(spellResult);

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('airkey', function() {
      let airkey = new Airkey('waterpower');
      let waterpower = new Waterpower();

      let enemyExpect = new Player(3, 3, 250, 250, [], []);

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      waterpower.saveEffect(enemyResult);
      airkey.deleteEffect(enemyResult);

      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('airflow', function() {
      let airflow = new Airflow();
      airflow.hitProbability = 1;

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      let enemyExpect = new Player(3, 3, 250, 250, [], []);
      enemyExpect.health -= airflow.currentDamage;

      airflow.decreasePlayerHealth(enemyResult);
      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('airpower', function() {
      let airspower = new Airpower();

      let spellExpect = new Firespear();
      spellExpect.hitProbability -= airspower.percentDecreaseHitProbability;

      let spellResult = new Firespear();
      spellResult.maxDamage = spellExpect.maxDamage;
      spellResult.currentDamage = spellExpect.currentDamage;
      airspower.decreaseSpellHitProbability(spellResult);

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('lifespear', function() {
      let lifespear = new Lifespear('deathshild');
      let deathshild = new Deathshild();

      let enemyExpect = new Player(3, 3, 250, 250, [], []);

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      deathshild.saveEffect(enemyResult);
      lifespear.deleteEffect(enemyResult);

      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('lifeshild', function() {
      let lifeshild = new Lifeshild();
      let deathcrown = new Deathcrown();

      let spellExpect = new Deathcrown();
      spellExpect.hitProbability = 0;

      let spellResult = new Deathcrown();
      lifeshild.decreaseSpellHitProbability(spellResult);

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('lifecrown', function() {
      let lifecrown = new Lifecrown();

      let playerExpect = new Player(3, 3, 250, 250, [], []);
      playerExpect.maxHealth = 265;

      let playerResult = new Player(3, 3, 250, 250, [], []);
      lifecrown.increasePlayerMaxHealth(playerResult);

      playerResult['descriptionForUser'] = '';
      playerResult['descriptionForEnemy'] = '';

      expect(playerResult).to.deep.equal(playerExpect);
    });

    it('lifesource', function() {
      let lifesource = new Lifesource();

      let playerExpect = new Player(3, 3, 200, 250, [], []);
      playerExpect.health = 230;

      let playerResult = new Player(3, 3, 200, 250, [], []);
      lifesource.increasePlayerHealth(playerResult);

      playerResult['descriptionForUser'] = '';
      playerResult['descriptionForEnemy'] = '';

      expect(playerResult).to.deep.equal(playerExpect);
    });

    it('lifesphere', function() {
      let lifesphere = new Lifesphere();

      let playerExpect = new Player(3, 3, 200, 250, [], []);
      playerExpect.health = 210;

      let playerResult = new Player(3, 3, 200, 250, [], []);
      lifesphere.increasePlayerHealth(playerResult);

      playerResult['descriptionForUser'] = '';
      playerResult['descriptionForEnemy'] = '';

      expect(playerResult).to.deep.equal(playerExpect);
    });

    it('lifestamp', function() {
      let lifestamp = new Lifestamp();

      let spellExpect = new Deathshild();
      spellExpect.hitProbability = 0;

      let spellResult = new Deathshild();
      lifestamp.decreaseSpellHitProbability(spellResult);

      spellResult['descriptionForUser'] = '';
      spellResult['descriptionForEnemy'] = '';

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('lifekey', function() {
      let lifekey = new Lifekey('airshild');
      lifekey.hitProbability = 1;
      let airshild = new Airshild();

      let enemyExpect = new Player(3, 3, 250, 250, [], []);

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      airshild.saveEffect(enemyResult);
      lifekey.deleteEffect(enemyResult);

      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('lifeflow', function() {
      let lifeflow = new Lifeflow();

      let playerExpect = new Player(3, 3, 200, 250, [], []);
      playerExpect.health = 225;

      let playerResult = new Player(3, 3, 200, 250, [], []);
      lifeflow.increasePlayerHealth(playerResult);

      playerResult['descriptionForUser'] = '';
      playerResult['descriptionForEnemy'] = '';

      expect(playerResult).to.deep.equal(playerExpect);
    });

    it('lifepower', function() {
      let lifepower = new Lifepower();

      let spellExpect = new Deathspear();
      spellExpect.hitProbability -= 1;

      let spellResult = new Deathspear();
      lifepower.decreaseSpellHitProbability(spellResult)

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('deathspear', function() {
      let deathspear = new Deathspear('waterpower');
      deathspear.hitProbability = 1;
      let waterpower = new Waterpower();

      let enemyExpect = new Player(3, 3, 250, 250, [], []);

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      waterpower.saveEffect(enemyResult);
      deathspear.deleteEffect(enemyResult);

      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('deathshild', function() {
      let deathshild = new Deathshild();

      let spellExpect = new Firesource();
      spellExpect.hitProbability -= deathshild.percentDecreaseHitProbability;

      let spellResult = new Firesource();
      spellResult.maxDamage = spellExpect.maxDamage;
      spellResult.currentDamage = spellExpect.currentDamage;
      deathshild.decreaseSpellHitProbability(spellResult);

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('deathcrown', function() {
      let deathcrown = new Deathcrown();

      let enemyExpect = new Player(3, 3, 250, 250, [], []);
      enemyExpect.maxHealth -= 15;

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      deathcrown.decreasePlayerMaxHealth(enemyResult);

      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('deathsource', function() {
      let deathsource = new Deathsource();

      let enemyExpect = new Player(3, 3, 250, 250, [], []);
      enemyExpect.health -= 250;

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      deathsource.decreasePlayerHealth(enemyResult);

      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('deathsphere', function() {
      let deathsphere = new Deathsphere();

      let spellExpect = new Firesource();
      let spellResult = new Firesource();
      spellResult.maxDamage = spellExpect.maxDamage;
      spellResult.currentDamage = spellExpect.currentDamage;

      spellExpect.currentDamage += 15;

      deathsphere.increaseSpellDamage(spellResult);

      spellResult['descriptionForUser'] = '';
      spellResult['descriptionForEnemy'] = '';

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('deathstamp', function() {
      let deathstamp = new Deathstamp();

      let spellExpect = new Lifesphere();
      spellExpect.hitProbability = 0;

      let spellResult = new Lifesphere();
      deathstamp.decreaseSpellHitProbability(spellResult);

      spellResult['descriptionForUser'] = '';
      spellResult['descriptionForEnemy'] = '';

      expect(spellResult).to.deep.equal(spellExpect);
    });

    it('deathkey', function() {
      let deathkey = new Deathkey();
      deathkey.activationProbability = 1;
      let waterflow = new Waterflow();

      let enemyExpect = new Player(3, 3, 1, 250, [], []);

      let enemyResult = new Player(3, 3, 20, 250, [], []);
      deathkey.increasePlayerHealth(enemyResult, waterflow);
      waterflow.decreasePlayerHealth(enemyResult);

      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

    it('deathflow', function() {
      let deathflow = new Deathflow();

      let arrExpect = [205, 205];
      let arrResult = [];

      let user = new Player(3, 3, 200, 250, [], []);
      let enemy = new Player(3, 3, 210, 250, [], []);
      deathflow.deathflowEffect(user, enemy);

      arrResult[0] = user.health;
      arrResult[1] = enemy.health;

      expect(arrResult).to.deep.equal(arrExpect);
    });

    it('deathpower', function() {
      let deathpower = new Deathpower('lifepower');
      let lifepower = new Lifepower();

      let enemyExpect = new Player(3, 3, 250, 250, [], []);

      let enemyResult = new Player(3, 3, 250, 250, [], []);
      lifepower.saveEffect(enemyResult);
      deathpower.deleteEffect(enemyResult);

      enemyResult['descriptionForUser'] = '';
      enemyResult['descriptionForEnemy'] = '';

      expect(enemyResult).to.deep.equal(enemyExpect);
    });

  });

});
