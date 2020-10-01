
module.exports.Player = class Player {
  constructor(actionPoints, energyPoints, health, maxHealth, buffs, debuffs) {
    this.actionPoints = actionPoints;
    this.energyPoints = energyPoints;
    this.health = health;
    this.maxHealth = maxHealth;
    this.buffs = buffs;
    this.debuffs = debuffs;
    this.descriptionForUser = '';
    this.descriptionForEnemy = '';
  }

  decreaseHealth(damage, spellName, descriptionForUser, descriptionForEnemy) {
    this.health = this.health - damage;
    if (this.health < 0) this.health = 0;
    this.descriptionForUser += spellName + ' поражает противника и наносит ' + damage + ' единиц урона. ' + descriptionForUser;
    this.descriptionForEnemy = spellName + ' поражает вас и наносит ' + damage + ' единиц урона. ' + descriptionForEnemy;
  }

  increaseHealth(heal, spellName, descriptionForUser, descriptionForEnemy) {
    this.health = this.health + heal;
    if (this.health > this.maxHealth) this.health = this.maxHealth;
    this.descriptionForUser += spellName + ' исцеляет вас и восполняет ' + heal + ' единиц здоровья. ' + descriptionForUser;
    this.descriptionForEnemy = spellName + ' исцеляет противника и восполняет ' + heal + ' единиц здоровья. ' + descriptionForEnemy;
  }

  decreaseMaxHealth(damage) {
    this.maxHealth = this.maxHealth - damage;
    if (this.maxHealth < 0) this.maxHealth = 0;
  }

  increaseMaxHealth(heal) {
    this.maxHealth = this.maxHealth + heal;
  }

  savePositiveEffect(effect) {
    this.buffs.push(effect);
    this.descriptionForUser += 'Вы успешно наложили на себя ' + effect.name + '. ';
    this.descriptionForEnemy += 'Противник успешно наложил на себя ' + effect.name + '. ';
  }

  saveNegativeEffect(effect) {
    this.debuffs.push(effect);
    this.descriptionForUser += 'Противник успешно наложил на вас ' + effect.name + '. ';
    this.descriptionForEnemy += 'Вы успешно наложили на противника ' + effect.name + '. ';
  }

  deletePositiveEffect(spellForDelete, spellName, descriptionForUser, descriptionForEnemy) {
    let index = this.buffs.findIndex(item => item.spell == spellForDelete);
    this.buffs.splice(index, 1);
    this.descriptionForUser += 'Вы успешно сняли с противника ' + spellName + '. ' + descriptionForUser;
    this.descriptionForEnemy += 'Противник успешно снял с вас ' + spellName + '. ' + descriptionForEnemy;
  }

  deleteNegativeEffect(spellForDelete, spellName, descriptionForUser, descriptionForEnemy) {
    let index = this.debuffs.findIndex(item => item.spell == spellForDelete);
    this.debuffs.splice(index, 1);
    this.descriptionForUser += 'Вы успешно сняли с себя ' + spellName + '. ' + descriptionForUser;
    this.descriptionForEnemy += 'Противник успешно снял с себя ' + spellName + '. ' + descriptionForEnemy;
  }
}

module.exports.Firespear = class Firespear {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'firespear'
  name = 'Метеор';
  descriptionForUser = '';
  descriptionForEnemy = '';
  maxDamage = Math.round(Math.random()*(30 - 20)) + 20;
  currentDamage = this.maxDamage;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.currentDamage*percent/100);
    this.currentDamage -= points;
    this.descriptionForUser += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  increaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage += points;
    this.descriptionForUser += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.decreaseHealth(this.currentDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }
}

module.exports.Fireshild = class Fireshild {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'fireshild';
  name = 'Огненный щит';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firesource', 'firesphere', 'deathflow'];
  activationProbability = 1;
  duration = 4;
  percentDecreaseDamage = 40;
  pointsDecreaseDamage = 0;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseDamage(this.percentDecreaseDamage, this.pointsDecreaseDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Firecrown = class Firecrown {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'firecrown';
  name = 'Огненный венец';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firespear', 'fireflow', 'waterspear', 'waterflow', 'earthspear', 'earthflow', 'airspear', 'airflow'];
  activationProbability = 1;
  duration = 4;
  percentIncreaseDamage = 25;
  pointsIncreaseDamage = 0;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  increaseSpellDamage(spell) {
      if (this.activationProbability < Math.random()) return;
      spell.increaseDamage(this.percentIncreaseDamage, this.pointsIncreaseDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Firesource = class Firesource {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'firesource';
  name = 'Вулкан';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = [];
  activationProbability = 1;
  duration = 3;
  maxDamage = Math.round(Math.random()*(12 - 5)) + 5;
  currentDamage = this.maxDamage;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage -= points;
    this.descriptionForUser += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  increaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage += points;
    this.descriptionForUser += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.activationProbability < Math.random()) return;
    player.decreaseHealth(this.currentDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.saveNegativeEffect(this);
  }
}

module.exports.Firesphere = class Firesphere {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'firesphere';
  name = 'Огненная клетка';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firespear', 'fireflow', 'waterspear', 'waterflow', 'earthspear', 'earthflow', 'airspear', 'airflow'];
  activationProbability = 1;
  duration = -1;
  maxDamage = Math.round(Math.random()*(10 - 5)) + 5;
  currentDamage = this.maxDamage;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage -= points;
    this.descriptionForUser += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  increaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage += points;
    this.descriptionForUser += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.activationProbability < Math.random()) return;
    player.decreaseHealth(this.currentDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.saveNegativeEffect(this);
  }
}

module.exports.Firestamp = class Firestamp {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'firestamp'
  name = 'Клеймо огня';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firesource', 'firesphere', 'earthsphere', 'airshild', 'aircrown', 'airsphere', 'airstamp', 'deathshild', 'deathsphere', 'deathstamp', 'deathflow'];
  pointsIncreaseDuration = 2;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  increaseSpellDuration(player) {
    if (this.hitProbability < Math.random()) return;
    for (let i = 0; i < player.debuffs.length; i++) {
      splayer.debuff[i].increaseDuration(this.pointsIncreaseDuration, this.name, this.descriptionForUser, this.descriptionForEnemy);
    }
  }
}

module.exports.Firekey = class Firekey {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'firekey'
  name = 'Ключ огня';
  descriptionForUser = '';
  descriptionForEnemy = '';

  constructor(spellForDelete) {
    this.spellForDelete = spellForDelete;
  }

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  deleteEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.deletePositiveEffect(this.spellForDelete, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }
}

module.exports.Fireflow = class Fireflow {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.66;
  spell = 'fireflow'
  name = 'Струя пламени';
  descriptionForUser = '';
  descriptionForEnemy = '';
  maxDamage = Math.round(Math.random()*(35 - 25)) + 25;
  currentDamage = this.maxDamage;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage -= points;
    this.descriptionForUser += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  increaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage += points;
    this.descriptionForUser += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.decreaseHealth(this.currentDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }
}

module.exports.Firepower = class Firepower {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'firepower';
  name = 'Власть огня';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firespear', 'fireflow', 'waterspear', 'waterflow', 'earthspear', 'earthflow', 'airspear', 'airflow'];
  activationProbability = 1;
  duration = -1;
  percentIncreaseDamage = 0;
  pointsIncreaseDamage = 5;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  increaseSpellDamage(spell) {
      if (this.activationProbability < Math.random()) return;
      spell.increaseDamage(this.percentIncreaseDamage, this.pointsIncreaseDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Waterspear = class Waterspear {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'waterspear'
  name = 'Ледяной осколок';
  descriptionForUser = '';
  descriptionForEnemy = '';
  maxDamage = Math.round(Math.random()*(15 - 5)) + 5;
  currentDamage = this.maxDamage;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage -= points;
    this.descriptionForUser += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  increaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage += points;
    this.descriptionForUser += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    let totalDamage = this.currentDamage + player['debuffs'].length*5;
    player.decreaseHealth(totalDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }
}

module.exports.Watershild = class Watershild {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'watershild';
  name = 'Ледяная стена';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firespear', 'fireflow', 'waterspear', 'waterflow', 'earthspear', 'earthflow', 'airspear', 'airflow'];
  activationProbability = 1;
  duration = 6;
  percentDecreaseDamage = 40;
  pointsDecreaseDamage = 0;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseDamage(this.percentDecreaseDamage, this.pointsDecreaseDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Watercrown = class Watercrown {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'watercrown';
  name = 'Корона воды';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firesource', 'firesphere', 'deathflow'];
  activationProbability = 1;
  duration = 6;
  percentDecreaseDamage = 50;
  pointsDecreaseDamage = 0;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseDamage(this.percentDecreaseDamage, this.pointsDecreaseDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Watersource = class Watersource {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.66;
  spell = 'watersource'
  name = 'Родник';
  descriptionForUser = '';
  descriptionForEnemy = '';

  constructor(spellForDelete) {
    this.spellForDelete = spellForDelete;
  }

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  deleteEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.deleteNegativeEffect(this.spellForDelete, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }
}

module.exports.Watersphere = class Watersphere {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'watersphere';
  name = 'Ледяная сфера';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firespear', 'fireflow', 'waterspear', 'waterflow', 'earthspear', 'earthflow', 'airspear', 'airflow'];
  activationProbability = 1;
  duration = 2;
  percentDecreaseDamage = 100;
  pointsDecreaseDamage = 0;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseDamage(this.percentDecreaseDamage, this.pointsDecreaseDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Waterstamp = class Waterstamp {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'waterstamp';
  name = 'Ледяная стена';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firespear', 'fireflow', 'waterspear', 'waterflow', 'earthspear', 'earthflow', 'airspear', 'airflow'];
  activationProbability = 1;
  duration = 6;
  percentDecreaseDamage = 33;
  pointsDecreaseDamage = 0;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseDamage(this.percentDecreaseDamage, this.pointsDecreaseDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Waterkey = class Waterkey {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'waterkey'
  name = 'Ключ воды';
  descriptionForUser = '';
  descriptionForEnemy = '';

  constructor(spellForDelete) {
    this.spellForDelete = spellForDelete;
  }

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  deleteEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.deleteNegativeEffect(this.spellForDelete, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }
}

module.exports.Waterflow = class Waterflow {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'waterflow'
  name = 'Водный поток';
  descriptionForUser = '';
  descriptionForEnemy = '';
  maxDamage = 20;
  currentDamage = this.maxDamage;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage -= points;
    this.descriptionForUser += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  increaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage += points;
    this.descriptionForUser += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    let totalDamage = this.currentDamage + player['debuffs'].length*5;
    player.decreaseHealth(totalDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }
}

module.exports.Waterpower = class Waterpower {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'waterpower';
  name = 'Власть воды';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['watershild', 'watercrown', 'watersphere', 'waterstamp'];
  activationProbability = 1;
  duration = -1;
  pointsIncreaseDuration = 2;


  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  increaseSpellDuration(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.increaseDuration(this.pointsIncreaseDuration, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Earthspear = class Earthspear {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.33;
  spell = 'earthspear'
  name = 'Глыба';
  descriptionForUser = '';
  descriptionForEnemy = '';
  maxDamage = Math.round(Math.random()*(70 - 50)) + 50;
  currentDamage = this.maxDamage;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage -= points;
    this.descriptionForUser += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  increaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage += points;
    this.descriptionForUser += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.decreaseHealth(this.currentDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }
}

module.exports.Earthshild = class Earthshild {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'earthshild';
  name = 'Скала';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firesource', 'firesphere', 'deathflow', 'firespear', 'fireflow', 'waterspear', 'waterflow', 'earthspear', 'earthflow', 'airspear', 'airflow'];
  activationProbability = 1;
  duration = 8;
  percentDecreaseDamage = 0;
  pointsDecreaseDamage = 10;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseDamage(this.percentDecreaseDamage, this.pointsDecreaseDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Earthcrown = class Earthcrown {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'earthcrown';
  name = 'Корона земли';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firespear', 'fireflow', 'waterspear', 'waterflow', 'earthspear', 'earthflow', 'airspear', 'airflow'];
  activationProbability = 1;
  duration = 6;
  percentIncreaseHitProbability = 0.15;


  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  increaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.increaseHitProbability(this.percentIncreaseHitProbability);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Earthsource = class Earthsource {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'earthsource';
  name = 'Земные недра';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['earthspear', 'earthflow', 'earthsphere'];
  activationProbability = 1;
  duration = 4;
  percentIncreaseDamage = 0;
  pointsIncreaseDamage = 15;
  pointsIncreaseDuration = 1;


  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  increaseSpellDurationOrDamage(spell) {
      if (this.activationProbability < Math.random()) return;
      if (spell['spell'] == 'earthsphere') {
        spell.increaseDuration(this.pointsIncreaseDuration);
      } else {
        spell.increaseDamage(this.percentIncreaseDamage, this.pointsIncreaseDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
      }
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Earthsphere = class Earthsphere {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'earthsphere';
  name = 'Склеп';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firespear', 'fireflow', 'waterspear', 'waterflow', 'earthspear', 'earthflow', 'airspear', 'airflow', 'firesource', 'firesphere', 'earthsphere', 'airshild', 'aircrown', 'airsphere', 'airstamp', 'deathshild', 'deathsphere', 'deathstamp', 'deathflow'];
  activationProbability = 1;
  duration = 10;
  percentIncreaseHitProbability = 0.05;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  increaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.increaseHitProbability(this.percentIncreaseHitProbability);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.saveNegativeEffect(this);
  }
}

module.exports.Earthstamp = class Earthstamp {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'earthstamp';
  name = 'Печать земли';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firespear', 'fireflow', 'waterspear', 'waterflow', 'earthspear', 'earthflow', 'airspear', 'airflow'];
  activationProbability = 1;
  duration = 4;
  percentDecreaseDamage = 50;
  pointsDecreaseDamage = 0;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseDamage(this.percentDecreaseDamage, this.pointsDecreaseDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Earthkey = class Earthkey {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'earthkey'
  name = 'Ключ земли';
  descriptionForUser = '';
  descriptionForEnemy = '';

  constructor(spellForDelete) {
    this.spellForDelete = spellForDelete;
  }

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  deleteEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.deleteNegativeEffect(this.spellForDelete, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }
}

module.exports.Earthflow = class Earthflow {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.25;
  spell = 'earthflow'
  name = 'Сель';
  descriptionForUser = '';
  descriptionForEnemy = '';
  maxDamage = 80;
  currentDamage = this.maxDamage;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage -= points;
    this.descriptionForUser += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  increaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage += points;
    this.descriptionForUser += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.decreaseHealth(this.currentDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }
}

module.exports.Earthpower = class Earthpower {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'earthpower';
  name = 'Власть земли';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['earthshild', 'earthcrown', 'earthsource', 'earthstamp'];
  activationProbability = 0.5;
  duration = 4;
  pointsIncreaseDuration = 4;


  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  increaseSpellDuration(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.increaseDuration(this.pointsIncreaseDuration, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Airspear = class Airspear {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.75;
  spell = 'airspear'
  name = 'Копье воздуха';
  descriptionForUser = '';
  descriptionForEnemy = '';
  maxDamage = 25;
  currentDamage = this.maxDamage;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage -= points;
    this.descriptionForUser += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  increaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage += points;
    this.descriptionForUser += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.decreaseHealth(this.currentDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }
}

module.exports.Airshild = class Airshild {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'airshild';
  name = 'Вихрь';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firespear', 'fireflow', 'waterspear', 'waterflow', 'earthspear', 'earthflow', 'airspear', 'airflow'];
  activationProbability = 1;
  duration = 4;
  percentDecreaseHitProbability = 0.33;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseHitProbability(this.percentDecreaseHitProbability);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.saveNegativeEffect(this);
  }
}

module.exports.Aircrown = class Aircrown {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'aircrown';
  name = 'Корона земли';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['fireshild', 'firecrown', 'firepower', 'watershild', 'watercrown', 'watersphere', 'waterstamp', 'waterpower', 'earthshild', 'earthcrown', 'earthsource', 'earthstamp', 'earthpower', 'airsource', 'airpower', 'lifeshild', 'lifesphere', 'lifestamp', 'lifeflow', 'lifepower', 'deathkey'];
  activationProbability = 1;
  duration = 4;
  percentDecreaseHitProbability = 0.33;


  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseHitProbability(this.percentDecreaseHitProbability);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.saveNegativeEffect(this);
  }
}

module.exports.Airsource = class Airsource {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'airsource';
  name = 'Врата воздуха';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firespear', 'fireflow', 'waterspear', 'waterflow', 'earthspear', 'earthflow', 'airspear', 'airflow', 'firesource', 'firesphere', 'earthsphere', 'airshild', 'aircrown', 'airsphere', 'airstamp', 'deathshild', 'deathsphere', 'deathstamp', 'deathflow'];
  activationProbability = 1;
  duration = 6;
  percentIncreaseHitProbability = 0.1;


  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  increaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.increaseHitProbability(this.percentIncreaseHitProbability);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Airsphere = class Airsphere {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'airsphere';
  name = 'Воздушный кокон';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firesource', 'firesphere', 'earthsphere', 'airshild', 'aircrown', 'airsphere', 'airstamp', 'deathshild', 'deathsphere', 'deathstamp', 'deathflow'];
  activationProbability = 1;
  duration = 4;
  percentDecreaseHitProbability = 0.33;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseHitProbability(this.percentDecreaseHitProbability);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.saveNegativeEffect(this);
  }
}

module.exports.Airstamp = class Airstamp {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'airstamp';
  name = 'Печать воздуха';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['fireshild', 'firecrown', 'firepower', 'watershild', 'watercrown', 'watersphere', 'waterstamp', 'waterpower', 'earthshild', 'earthcrown', 'earthsource', 'earthstamp', 'earthpower', 'airsource', 'airpower', 'lifeshild', 'lifesphere', 'lifestamp', 'lifeflow', 'lifepower', 'deathkey'];
  activationProbability = 1;
  duration = 10;
  percentDecreaseHitProbability = 0.1;


  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseHitProbability(this.percentDecreaseHitProbability);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.saveNegativeEffect(this);
  }
}

module.exports.Airkey = class Airkey {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'airkey'
  name = 'Ключ воздуха';
  descriptionForUser = '';
  descriptionForEnemy = '';

  constructor(spellForDelete) {
    this.spellForDelete = spellForDelete;
  }

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  deleteEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.deletePositiveEffect(this.spellForDelete, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }
}

module.exports.Airflow = class Airflow {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.5;
  spell = 'airflow'
  name = 'Ударная волна';
  descriptionForUser = '';
  descriptionForEnemy = '';
  maxDamage = 40;
  currentDamage = this.maxDamage;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage -= points;
    this.descriptionForUser += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  increaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage += points;
    this.descriptionForUser += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.decreaseHealth(this.currentDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }
}

module.exports.Airpower = class Airpower {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'airpower';
  name = 'Власть воздуха';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firespear', 'fireflow', 'waterspear', 'waterflow', 'earthspear', 'earthflow', 'airspear', 'airflow'];
  activationProbability = 1;
  duration = -1;
  percentDecreaseHitProbability = 0.2;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseHitProbability(this.percentDecreaseHitProbability);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Lifespear = class Lifespear {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'lifespear'
  name = 'Касание жизни';
  descriptionForUser = '';
  descriptionForEnemy = '';

  constructor(spellForDelete) {
    this.spellForDelete = spellForDelete;
  }

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  deleteEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.deleteNegativeEffect(this.spellForDelete, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }
}

module.exports.Lifeshild = class Lifeshild {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'lifeshild';
  name = 'Щит жизни';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['deathcrown'];
  activationProbability = 1;
  duration = -1;
  percentDecreaseHitProbability = 1;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseHitProbability(this.percentDecreaseHitProbability);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Lifecrown = class Lifecrown {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'lifecrown'
  name = 'Корона жизни';
  descriptionForUser = '';
  descriptionForEnemy = '';
  pointsIncreaseMaxHealth = 15;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  increasePlayerMaxHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.increaseMaxHealth(this.pointsIncreaseMaxHealth);
  }
}

module.exports.Lifesource = class Lifesource {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'lifesource'
  name = 'Источник жизни';
  descriptionForUser = '';
  descriptionForEnemy = '';
  pointsIncreaseHealth = 30;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  increasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.increaseHealth(this.pointsIncreaseHealth);
  }
}

module.exports.Lifesphere = class Lifesphere {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'lifesphere';
  name = 'Сфера восстановления';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = [];
  activationProbability = 1;
  duration = 5;
  pointsIncreaseHealth = 10;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  increasePlayerHealth(player) {
    if (this.activationProbability < Math.random()) return;
    player.increaseHealth(this.pointsIncreaseHealth);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Lifestamp = class Lifestamp {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'lifestamp';
  name = 'Печать жизни';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['deathshild', 'deathsphere', 'deathstamp', 'deathflow'];
  activationProbability = 1;
  duration = 8;
  percentDecreaseHitProbability = 1;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseHitProbability(this.percentDecreaseHitProbability);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Lifekey = class Lifekey {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.66;
  spell = 'lifekey';
  name = 'Ключ жизни';
  descriptionForUser = '';
  descriptionForEnemy = '';

  constructor(spellForDelete) {
    this.spellForDelete = spellForDelete;
  }

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  deleteEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.deleteNegativeEffect(this.spellForDelete, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }
}

module.exports.Lifeflow = class Lifeflow {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'lifeflow';
  name = 'Поток жизни';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = [];
  activationProbability = 1;
  duration = 2;
  pointsIncreaseHealth = 25;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  increasePlayerHealth(player) {
    if (this.activationProbability < Math.random()) return;
    player.increaseHealth(this.pointsIncreaseHealth);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Lifepower = class Lifepower {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'lifepower';
  name = 'Власть жизни';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = [];
  activationProbability = 1;
  duration = -1;
  percentDecreaseHitProbability = 1;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseHitProbability(this.percentDecreaseHitProbability);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Deathspear = class Deathspear {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.66;
  spell = 'deathspear'
  name = 'Касание смерти';
  descriptionForUser = '';
  descriptionForEnemy = '';

  constructor(spellForDelete) {
    this.spellForDelete = spellForDelete;
  }

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  deleteEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.deletePositiveEffect(this.spellForDelete, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }
}

module.exports.Deathshild = class Deathshild {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'deathshild';
  name = 'Пелена смерти';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['fireshild', 'firecrown', 'firepower', 'watershild', 'watercrown', 'watersphere', 'waterstamp', 'waterpower', 'earthshild', 'earthcrown', 'earthsource', 'earthstamp', 'earthpower', 'airsource', 'airpower', 'lifeshild', 'lifesphere', 'lifestamp', 'lifeflow', 'lifepower', 'deathkey'];
  activationProbability = 1;
  duration = 4;
  percentDecreaseHitProbability = 0.5;


  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseHitProbability(this.percentDecreaseHitProbability);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.saveNegativeEffect(this);
  }
}

module.exports.Deathcrown = class Deathcrown {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'deathcrown';
  name = 'Корона мертвеца';
  descriptionForUser = '';
  descriptionForEnemy = '';
  pointsDecreaseMaxHealth = 15;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreasePlayerMaxHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.decreaseMaxHealth(this.pointsDecreaseMaxHealth);
  }
}

module.exports.Deathsource = class Deathsource {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'deathsource';
  name = 'Смерть';
  descriptionForUser = '';
  descriptionForEnemy = '';

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.decreaseHealth(player.health);
  }
}

module.exports.Deathsphere = class Deathsphere {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'deathsphere';
  name = 'Круг смерти';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firesource', 'deathflow'];
  activationProbability = 1;
  duration = 2;
  percentIncreaseDamage = 0;
  pointsIncreaseDamage = 15;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  increaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.increaseDamage(this.percentIncreaseDamage, this.pointsIncreaseDamage);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.saveNegativeEffect(this);
  }
}

module.exports.Deathstamp = class Deathstamp {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'deathstamp';
  name = 'Печать смерти';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['fireshild', 'firecrown', 'firepower', 'watershild', 'watercrown', 'watersphere', 'waterstamp', 'waterpower', 'earthshild', 'earthcrown', 'earthsource', 'earthstamp', 'earthpower', 'airsource', 'airpower', 'lifeshild', 'lifesphere', 'lifestamp', 'lifeflow', 'lifepower', 'deathkey'];
  activationProbability = 1;
  duration = 2;
  percentDecreaseHitProbability = 1;


  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseHitProbability(this.percentDecreaseHitProbability);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.saveNegativeEffect(this);
  }
}

module.exports.Deathkey = class Deathkey {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'deathkey';
  name = 'Ключ от смерти';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = ['firespear', 'fireflow', 'waterspear', 'waterflow', 'earthspear', 'earthflow', 'airspear', 'airflow'];
  activationProbability = 0.5;
  duration = 4;
  pointsIncreaseHealth = 1;

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  increasePlayerHealth(player, spell) {
    if (this.activationProbability < Math.random()) return;
    if (player.health <= spell.currentDamage) {
      player.decreaseHealth(player.health);
      player.increaseHealth(spell.currentDamage + 1);
    }
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
}

module.exports.Deathflow = class Deathflow {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'deathflow';
  name = 'Поток смерти';
  descriptionForUser = '';
  descriptionForEnemy = '';
  dependences = [];
  activationProbability = 1;
  duration = 5;
  maxDamage = 5;
  currentDamage = this.maxDamage;
  pointsIncreaseHealth = 5;


  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration) {
    this.duration -= duration;
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseDamage(percent, points) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage -= points;
  }

  increaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.maxDamage*percent/100);
    this.currentDamage += points;
  }

  deathflowEffect(user, enemy) {
    if (this.activationProbability < Math.random()) return;
    enemy.decreaseHealth(this.currentDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
    user.increaseHealth(this.pointsIncreaseHealth);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.saveNegativeEffect(this);
  }
}

module.exports.Deathpower = class Deathpower {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spell = 'deathpower'
  name = 'Власть смерти';
  descriptionForUser = '';
  descriptionForEnemy = '';

  constructor(spellForDelete) {
    this.spellForDelete = spellForDelete;
  }

  decreaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(percent, spellName, descriptionForUser, descriptionForEnemy) {
    this.hitProbability = this.hitProbability + percent;
  }

  deleteEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.deletePositiveEffect(this.spellForDelete, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }
}
