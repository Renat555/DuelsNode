
module.exports.Player = class Player {

  constructor(health, maxHealth, buffs, debuffs) {
    this.health = health;
    this.maxHealth = maxHealth;
    this.buffs = buffs;
    this.debuffs = debuffs;
  }

  decreaseHealth(damage) {
    this.health = this.health - damage;
    if (this.health < 0) this.health = 0;
  }

}

module.exports.ImmediateDamage = class ImmediateDamage {

  constructor(specifications) {
    this.actionPoints = specifications[0];
    this.energyPoints = specifications[5];





    this.type = specifications[0];
    this.element = specifications[1];
    this.actionPoints = specifications[4];

    this.damage = Math.floor(Math.random() * (specifications[3] - specifications[2])) + specifications[2];
    this.descriptionStart = specifications[6];
    this.description = '';
  }

  increaseDamage(percent, points, description) {
    if (percent == 0) {
      this.damage = this.damage + points;
      this.description += description + points + ' единиц.';
    } else {
      this.damage = this.damage + Math.round(this.damage*percent/100);
      this.description += description + Math.round(this.damage*percent/100) + ' единиц.';
    }

  }

  decreaseDamage(percent, points, description) {
    if (percent == 0) {
      this.damage = this.damage - points;
      this.description += description + points + ' единиц.';
    } else {
      this.damage = this.damage - Math.round(this.damage*percent/100);
      this.description += description + Math.round(this.damage*percent/100) + ' единиц.';
    }

    if (this.damage < 0) this.damage = 0;
  }

  effect(Enemy) {
    Enemy.decreaseHealth(this.damage);
    this.description = this.descriptionStart + this.damage + ' единиц урона. ' + this.description;
  }

 }

 module.exports.IncreaseDamageOutputSpell = class IncreaseDamageOutputSpell {

   constructor(specifications) {
     this.type = specifications[0];
     this.element = specifications[1];
     this.percentIncreaseDamage = specifications[2];
     this.pointsIncreaseDamage = specifications[3];
     this.actionPoints = specifications[4];
     this.energyPoints = specifications[5];
     this.dependencesType = specifications[6];
     this.dependencesElement = specifications[7];
     this.description = specifications[8];
   }

   effect(spell) {
     spell.increaseDamage(this.percentIncreaseDamage, this.pointsIncreaseDamage, this.description);
   }

  }

  module.exports.DecreaseDamageInputSpell = class DecreaseDamageInputSpell {

    constructor(specifications) {
      this.type = specifications[0];
      this.element = specifications[1];
      this.percentDecreaseDamage = specifications[2];
      this.pointsDecreaseDamage = specifications[3];
      this.actionPoints = specifications[4];
      this.energyPoints = specifications[5];
      this.description = specifications[6];
    }

    effect(spell) {
      spell.decreaseDamage(this.percentDecreaseDamage, this.pointsDecreaseDamage, this.description);
    }

   }

   module.exports.DecreaseDamageEffect = class DecreaseDamageEffect {

     constructor(specifications) {
       this.type = specifications[0];
     }

   }
