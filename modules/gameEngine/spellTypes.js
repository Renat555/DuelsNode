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

  saveEffect(effect) {
    this.buffs.push(effect);
  }

}

class Spell {

  constructor(parameters) {
    this.category = parameters[0];
    this.type = parameters[1];
    this.element = parameters[2];
    this.form = parameters[3];
    this.actionPoints = parameters[4];
    this.energyPoints = parameters[5];
    this.spellName = parameters[6];
    this.tiedSpells = parameters[7];
    this.hitProbability = parameters[8];
    this.descriptionForUser = '';
    this.descriptionForEnemy = '';
  }

  getSpellName() {
    return this.element + this.form;
  }

}

class BattleSpell extends Spell {

  constructor(parameters) {
    super(parameters);
    this.damage = Math.floor(Math.random()*(parameters[10] - parameters[9])) + parameters[9];
  }

  increaseDamage(percent, points) {
    if (percent == 0) {
      this.damage = this.damage + points;
    } else {
      this.damage = this.damage + Math.round(this.damage*percent/100);
    }

  }

  decreaseDamage(percent, points) {
    if (percent == 0) {
      this.damage = this.damage - points;
    } else {
      this.damage = this.damage - Math.round(this.damage*percent/100);
    }

    if (this.damage < 0) this.damage = 0;
  }

  effect(enemy) {
    if (this.hitChance > Math.random()) return;
    enemy.decreaseHealth(this.damage);
    this.descriptionForUser = this.spellName + ' поражает противника и наносит ' + this.damage + ' единиц урона. ';
    this.descriptionForEnemy = this.spellName + ' поражает вас и наносит ' + this.damage + ' единиц урона. ';
  }

}

module.exports.ImmediateDamage = class ImmediateDamage extends BattleSpell {

  constructor(parameters) {
    super(parameters);
  }

}

class Debuff extends Spell {

  constructor(parameters) {
    super(parameters);
    this.duration = parameters[11];
  }

}

module.exports.DamagePerMuve = class DamagePerMuve extends Debuff {

  constructor(parameters) {
    super(parameters);
    this.damage = Math.floor(Math.random()*(parameters[10] - parameters[9])) + parameters[9];
  }

  save(player) {
    player.saveEffect(this);
  }

  effect(player) {
    player.decreaseHealth(this.damage);
  }

}
