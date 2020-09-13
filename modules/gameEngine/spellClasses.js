
module.exports.Player = class Player {

  constructor(health, maxHealth, buffs, debuffs) {
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
  damage = Math.round(Math.random()*(30 - 20)) + 20;

  decreaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.damage*percent/100);
    this.damage -= points;
    this.descriptionForUser += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  increaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.damage*percent/100);
    this.damage += points;
    this.descriptionForUser += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  damagePlayer(player) {
    if (this.hitProbability < Math.random()) return;
    player.decreaseHealth(this.damage, this.name, this.descriptionForUser, this.descriptionForEnemy);
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

  saveEffect(player) {
    player.savePositiveEffect(this);
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseDamage(this.percentDecreaseDamage, this.pointsDecreaseDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
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

  saveEffect(player) {
    player.savePositiveEffect(this);
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  increaseSpellDamage(spell) {
      if (this.activationProbability < Math.random()) return;
      spell.increaseDamage(this.percentIncreaseDamage, this.pointsIncreaseDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
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
  damage = Math.round(Math.random()*(12 - 5)) + 5;

  saveEffect(player) {
    player.saveNegativeEffect(this);
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.damage*percent/100);
    this.damage -= points;
    this.descriptionForUser += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  damagePlayer(player) {
    if (this.activationProbability < Math.random()) return;
    player.decreaseHealth(this.damage, this.name, this.descriptionForUser, this.descriptionForEnemy);
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
  damage = Math.round(Math.random()*(10 - 5)) + 5;

  saveEffect(player) {
    player.saveNegativeEffect(this);
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.damage*percent/100);
    this.damage -= points;
    this.descriptionForUser += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  damagePlayer(player) {
    if (this.activationProbability < Math.random()) return;
    player.decreaseHealth(this.damage, this.name, this.descriptionForUser, this.descriptionForEnemy);
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

  increaseSpellDuration(spell) {
    spell.increaseDuration(this.pointsIncreaseDuration, this.name, this.descriptionForUser, this.descriptionForEnemy);
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

  deleteEffect(player) {
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
  damage = Math.round(Math.random()*(35 - 25)) + 25;

  decreaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.damage*percent/100);
    this.damage -= points;
    this.descriptionForUser += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' снижает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  increaseDamage(percent, points, spellName, descriptionForUser, descriptionForEnemy) {
    points += Math.round(this.damage*percent/100);
    this.damage += points;
    this.descriptionForUser += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForUser;
    this.descriptionForEnemy += spellName + ' увеличивает урон от заклинания на ' + points + ' единиц.' + descriptionForEnemy;
  }

  damagePlayer(player) {
    if (this.hitProbability < Math.random()) return;
    player.decreaseHealth(this.damage, this.name, this.descriptionForUser, this.descriptionForEnemy);
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

  saveEffect(player) {
    player.savePositiveEffect(this);
  }

  increaseSpellDamage(spell) {
      if (this.activationProbability < Math.random()) return;
      spell.increaseDamage(this.percentIncreaseDamage, this.pointsIncreaseDamage, this.name, this.descriptionForUser, this.descriptionForEnemy);
  }

}

let spellModels = {

  waterspear: [
    [1, 1, 1],
    ['ImmediateDamagePerEachNegativeEffect', 'water', 5, 15, 'Ледяной осколок',
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['All']]
  ],
  watershild: [
    [1, 1, 6],
    ['DecreaseDamageInputImmediateDamage', 'water', 40, 0,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на себя ледяную стену. ',
    'Противник успешно наложил на себя ледяную стену. ',
    'Вам не удалось наложить на себя ледяную стену. ',
    'Противнику не удалось наложить на себя ледяную стену. ',
    ' Ледяная стена уменьшила урон от заклинания на ']
  ],
  watercrown: [
    [1, 1, 6],
    ['DecreaseDamageNegativeEffect', 'water', 50, 0,
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'Vampirism'], ['All'],
    'Вы успешно наложили на себя корону воды. ',
    'Противник успешно наложил на себя корону воды. ',
    'Вам не удалось наложить на себя корону воды. ',
    'Противнику не удалось наложить на себя корону воды. ',
    ' Корона воды снижает урон от заклинания на ']
  ],
  watersource: [
    [1, 1],
    ['СancelNegativeEffect', 'water', 0.66,
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['water', 'earth', 'fire', 'air'],
    'Родник снял с противника ',
    'Родник снял с вас ',
    'Не удалось применить родник. ']
  ],
  watersphere: [
    [1, 1],
    ['BlockInputImmediateDamage', 'water', 2,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на себя ледяную сферу. ',
    'Противник успешно наложил на себя ледяную сферу. ',
    'Вам не удалось наложить на себя ледяную сферу. ',
    'Противнику не удалось наложить на себя ледяную сферу. ',
    ' Ледяная сфера уменьшила урон от заклинания на ']
  ],
  waterstamp: [
    [1, 1, 6],
    ['DecreaseDamageInputImmediateDamage', 'water', 33, 0,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на себя печать воды. ',
    'Противник успешно наложил на себя печать воды. ',
    'Вам не удалось наложить на себя печать воды. ',
    'Противнику не удалось наложить на себя печать воды. ',
    ' Печать воды уменьшила урон от заклинания на ']
  ],
  waterkey: [
    [1, 1],
    ['СancelNegativeEffect', 'water',
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['fire', 'air'],
    'Ключ воды снял с противника ',
    'Ключ воды снял с вас ',
    'Не удалось применить ключ воды. ']
  ],

  waterflow: ['BattleSpell', 'ImmediateDamage', 'water', 'flow', 1, 1, 'Водный поток', [], 1, 20, 30],

  waterpower: [
    [1, 1, -1],
    ['IncreaseDurationInputBuff', 'water', 2,
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['water'],
    'Вы успешно наложили на себя власть воды. ',
    'Противник успешно наложил на себя власть воды. ',
    'Вам не удалось наложить на себя власть воды. ',
    'Противнику не удалось наложить на себя власть воды. ',
    'Власть воды увеличила продолжительность действия заклинания на два хода. ']
  ],

  earthspear: ['BattleSpell', 'ImmediateDamage', 'earth', 'spear', 1, 1, 'Глыба', [], 0.33, 50, 70],

  earthshild: [
    [1, 1, 8],
    ['DecreaseDamageNegativeEffect', 'earth', 0, 10,
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['All'],
    'Вы успешно защитили себя скалой. ',
    'Противник успешно защитил себя скалой. ',
    'Вам не удалось создать скалу. ',
    'Противнику не удалось создать скалу. ',
    ' Скала снижает урон от заклинания на '],
    ['DecreaseDamageInputSpell', 'earth', 0, 10,
    ['SingleImmediateDamage'], ['All'],
    ' Скала уменьшила урон от заклинания на ']
  ],
  earthcrown: [
    [1, 1, 6],
    ['IncreaseHitChanceOutputImmediateDamage', 'earth', 15,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на себя корону земли. ',
    'Противник успешно наложил на себя корону земли. ',
    'Вам не удалось наложить на себя корону земли. ',
    'Противнику не удалось наложить на себя корону земли. ',
    ' Корона воды увеличила вероятность попадания заклинанием на 15%. ']
  ],
  earthsource: [
    [1, 1, 4],
    ['IncreaseDamageOutputImmediateDamage', 'earth', 0, 15,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на себя земные недра. ',
    'Противник успешно наложил на себя земные недра. ',
    'Вам не удалось наложить на себя земные недра. ',
    'Противнику не удалось наложить на себя земные недра. ',
    ' Земные недра увеличил урон от заклинания на 15 единиц. '],
    ['IncreaseDurationOutputNegativeEffect', 'earth', 1,
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['earth'],
    'Земные недра увеличили продолжительность действия заклинания на один ход. ']
  ],
  earthsphere: [
    [1, 1, 10],
    ['IncreaseHitChanceInputImmediateDamage', 'earth', 5, 0,
    ['ImmediateDamage'], ['All'],
    'Вы успешно заключили противника в склеп. ',
    'Противник успешно заключил вас в склеп. ',
    'Вам не удалось заключить противника в склеп. ',
    'Противнику не удалось заключить вас в склеп. ',
    ' Склеп увеличил вероятность попадания заклинанием на 5%. '],



    ['IncreaseHitChanceInputNegativeEffect', 'earth', 5, 0,
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['All'],
    ' Склеп увеличил вероятность попадания заклинанием на 5%. ']
  ],
  earthstamp: [
    [1, 1, 4],
    ['DecreaseDamageInputImmediateDamage', 'earth', 50, 0,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на себя печать земли. ',
    'Противник успешно наложил на себя печать земли. ',
    'Вам не удалось наложить на себя печать земли. ',
    'Противнику не удалось наложить на себя печать земли. ',
    ' Печать земли вдвое уменьшила урон от заклинания. ']
  ],
  earthkey: [
    [1, 1],
    ['СancelNegativeEffect', 'earth',
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['fire', 'air'],
    'Ключ земли снял с противника ',
    'Ключ земли снял с вас ',
    'Не удалось применить ключ земли. ']
  ],

  earthflow: ['BattleSpell', 'ImmediateDamage', 'earth', 'flow', 1, 1, 'Сель', [], 0.25, 80, 80],

  earthpower: [
    [1, 1, 4],
    ['IncreaseDurationInputBuff', 'earth', 4, 0.5,
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['water'],
    'Вы успешно наложили на себя власть земли. ',
    'Противник успешно наложил на себя власть земли. ',
    'Вам не удалось наложить на себя власть земли. ',
    'Противнику не удалось наложить на себя власть земли. ',
    'Власть земли увеличила продолжительность действия заклинания на четыре хода. ']
  ],

  airspear: ['BattleSpell', 'ImmediateDamage', 'air', 'spear', 1, 1, 'Копье воздуха', [], 0.75, 25, 25],

  airshild: [
    [1, 1, 4],
    ['DecreaseHitChanceOutputImmediateDamage', 'air', 0.33,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на противника вихрь. ',
    'Противник успешно наложил на вас вихрь. ',
    'Вам не удалось наложить на противника вихрь. ',
    'Противнику не удалось наложить на вас вихрь. ',
    'Вихрь снизил вероятность попадания заклинанием на ']
  ],
  aircrown: [
    [1, 1, 4],
    ['DecreaseHitChanceInputPositiveEffect', 'air', 0.33,
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['All'],
    'Вы успешно наложили на противника корону воздуха. ',
    'Противник успешно наложил на вас корону воздуха. ',
    'Вам не удалось наложить на противника корону воздуха. ',
    'Противнику не удалось наложить на вас корону воздуха. ',
    'Корона воздуха уменьшила вероятность успешного наложения заклинания на . ']
  ],
  airsource: [
    [1, 1, 6],
    ['IncreaseHitChanceOutputImmediateDamage', 'air', 10,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на себя врата воздуха. ',
    'Противник успешно наложил на себя врата воздуха. ',
    'Вам не удалось наложить на себя врата воздуха. ',
    'Противнику не удалось наложить на себя врата воздуха. ',
    'Врата воздуха увеличили вероятность попадания заклинанием на 10%. '],
    ['IncreaseHitChanceOutputNegativeEffect', 'air', 10,
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['All'],
    'Врата воздуха увеличили вероятность попадания заклинанием на 10%. ']
  ],
  airsphere: [
    [1, 1, 4],
    ['DecreaseHitChanceOutputNegativeEffect', 'air', 0.33,
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['All'],
    'Вы успешно наложили на противника воздушный кокон. ',
    'Противник успешно наложил на вас воздушный кокон. ',
    'Вам не удалось наложить на противника воздушный кокон. ',
    'Противнику не удалось наложить на вас воздушный кокон. ',
    'Воздушный кокон уменьшил вероятность успешного наложения заклинания на . ']
  ],
  airstamp: [
    [1, 1, 10],
    ['DecreaseHitChanceInputPositiveEffect', 'air', 0.1,
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['All'],
    'Вы успешно наложили на противника печать воздуха. ',
    'Противник успешно наложил на вас печать воздуха. ',
    'Вам не удалось наложить на противника печать воздуха. ',
    'Противнику не удалось наложить на вас печать воздуха. ',
    'Печать воздуха уменьшила вероятность успешного наложения заклинания на . ']
  ],
  airkey: [
    [1, 1],
    ['CancelPositiveEffect', 'air',
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['water', 'earth'],
    'Ключ воздуха снял с противника ',
    'Ключ воздуха снял с вас ',
    'Не удалось применить ключ воздуха. ']
  ],

  airflow: ['BattleSpell', 'ImmediateDamage', 'air', 'flow', 1, 1, 'Ударная волна', [], 0.5, 40, 40],

  airpower: [
    [1, 1, -1],
    ['DecreaseHitChanceInputImmediateDamage', 'air', 20,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на себя власть воздуха. ',
    'Противник успешно наложил на себя власть воздуха. ',
    'Вам не удалось наложить на себя власть воздуха. ',
    'Противнику не удалось наложить на себя власть воздуха. ',
    'Власть воздуха увеличила вероятность попадания заклинанием на 20%. ']
  ],
  lifespear: [
    [1, 1],
    ['CancelNegativeEffect', 'life',
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['death'],
    'Касание жизни снимает с вас ',
    'Касание жизни снимает с противника ',
    'Не удалось применить касание жизни. ']
  ],
  lifeshild: [
    [1, 1, -1],
    ['BlockDecreaseMaxHealth', 'life',
    ['DecreaseMaxHealth'], ['All'],
    'Вы успешно наложили на себя щит жизни. ',
    'Противник успешно наложил на себя щит жизни. ',
    'Вам не удалось наложить на себя щит жизни. ',
    'Противнику не удалось наложить на себя щит жизни. ',
    'Щит жизни не позволил уменьшить ваш запас здоровья. ',
    'Щит жизни не позволил уменьшить запас здоровья противника. ']
  ],
  lifecrown: [
    [1, 1],
    ['IncreaseMaxHealth', 'life', 15,
    'Корона жизни увеличивает ваш максимальный запас здоровья на ',
    'Корона жизни увеличивает максимальный запас здоровья противника на ',
    'Вам не удалось применить корону жизни. ',
    'Противнику не удалось применить корону жизни. ']
  ],
  lifesource: [
    [1, 1],
    ['IncreaseHealth', 'life', 30,
    'Источник жизни восстанавливает вам ',
    'Источник жизни восстанавливает противнику ',
    'Вам не удалось применить источник жизни. ',
    'Противнику не удалось применить источник жизни. ']
  ],
  lifesphere: [
    [1, 1, 5],
    ['IncreaseHealthPerMuve', 'life', 10,
    [], [],
    'Вы успешно наложили на себя сферу восстановления. ',
    'Противник успешно наложил на себя сферу восстановления. ',
    'Вам не удалось наложить на себя сферу восстановления. ',
    'Противнику не удалось наложить на себя сферу восстановления. ',
    'Сфера восстановления восстановила вам  ',
    'Сфера восстановления восстановила противнику ']
  ],
  lifestamp: [
    [1, 1, 8],
    ['BlockInputNegativeEffect', 'life',
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['All'],
    'Вы успешно наложили на себя печать жизни. ',
    'Противник успешно наложил на себя печать жизни. ',
    'Вам не удалось наложить на себя печать жизни. ',
    'Противнику не удалось наложить на себя печать жизни. ',
    'Печать жизни не позволила наложить на вас заклинание. ']
  ],
  lifekey: [
    [1, 1],
    ['CancelNegativeEffect', 'life', 0.66,
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['All'],
    'Ключ жизни снял с противника ',
    'Ключ жизни снял с вас ',
    'Не удалось применить ключ жизни. ']
  ],
  lifeflow: [
    [1, 1, 2],
    ['IncreaseHealthPerMuve', 'life', 25,
    'Вы успешно наложили на себя поток жизни. ',
    'Противник успешно наложил на себя поток жизни. ',
    'Вам не удалось наложить на себя поток жизни. ',
    'Противнику не удалось наложить на себя поток жизни. ',
    'Споток жизни восстановил вам  ',
    'поток жизни восстановил противнику ']
  ],
  lifepower: [
    [1, 1, -1],
    ['BlockCancelPositiveEffect', 'life',
    'Вы успешно наложили на себя власть жизни. ',
    'Противник успешно наложил на себя власть жизни. ',
    'Вам не удалось наложить на себя власть жизни. ',
    'Противнику не удалось наложить на себя власть жизни. ',
    'Власть жизни не позволила снять заклинание. ']
  ],
  deathspear: [
    [1, 1],
    ['CancelPositiveEffect', 'death', 0.66,
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['All'],
    'Касание смерти сняло с противника ',
    'Касание смерти сняло с вас ',
    'Не удалось применить касание смерти. ']
  ],
  deathshild: [
    [1, 1, 4],
    ['DecreaseHitChanceInputPositiveEffect', 'death', 0.5,
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['All'],
    'Вы успешно наложили на противника пелену смерти. ',
    'Противник успешно наложил на вас пелену смерти. ',
    'Вам не удалось наложить на противника пелену смерти. ',
    'Противнику не удалось наложить на вас пелену смерти. ',
    'Пелена смерти уменьшила вероятность успешного наложения заклинания на . ']
  ],
  deathcrown: [
    [1, 1],
    ['DecreaseMaxHealth', 'death', 15,
    'Корона мертвеца уменьшает максимальный запас здоровья противника на ',
    'Корона мертвеца уменьшает ваш максимальный запас здоровья на ',
    'Не удалось применить корону мертвеца. ']
  ],
  deathsource: [
    [1, 1],
    ['Death', 'death',
    'Смерть убивает противника. ',
    'Смерть убивает вас. ',
    'Не удалось применить смерть. ']
  ],
  deathsphere: [
    [1, 1, 2],
    ['IncreaseDamageInputNegativeEffect', 'death', 15
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'Vampirism'], ['All'],
    'Вы успешно наложили на противника круг смерти. ',
    'Противник успешно наложил на вас круг смерти. ',
    'Вам не удалось наложить на противника круг смерти. ',
    'Противнику не удалось наложить на вас круг смерти. ',
    'Круг смерти увеличил урон от дебафа на ']
  ],
  deathstamp: [
    [1, 1, 2],
    ['BlockInputPositiveEffect', 'death',
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['All'],
    'Вы успешно наложили на противника печать смерти. ',
    'Противник успешно наложил на вас печать смерти. ',
    'Вам не удалось наложить на противника печать смерти. ',
    'Противнику не удалось наложить на вас печать смерти. ',
    'Печать смерти заблокировала заклинание. ']
  ],
  deathkey: [
    [1, 1],
    ['BlockDeath', 'death',
    'Вы успешно наложили на себя ключ от смерти. ',
    'Противник успешно наложил на себя ключ от смерти. ',
    'Вам не удалось наложить на себя ключ от смерти. ',
    'Противнику не удалось наложить на себя ключ от смерти. ',
    'Ключ от смерти не позволил убить вас. ',
    'Ключ от смерти не позволил убить противника. ']
  ],
  deathflow: [
    [1, 1, 5],
    ['Vampirism', 'death', 5,
    'Вы успешно наложили на противника поток смерти. ',
    'Противник успешно наложил на вас поток смерти. ',
    'Вам не удалось наложить на противника поток смерти. ',
    'Противнику не удалось наложить на вас поток смерти. ',
    'Поток смерти отнял 5 единиц здоровья и передал вам. ',
    'Поток смерти отнял 5 единиц здоровья у вас и передал противнику. ']
  ],
  deathpower: [
    [1, 1],
    ['CancelPositiveEffect', 'death',
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['life'],
    'Власть смерти сняла с противника ',
    'Власть смерти сняла с вас ',
    'Не удалось применить власть смерти. ']
  ]
}
