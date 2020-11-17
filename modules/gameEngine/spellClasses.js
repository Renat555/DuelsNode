module.exports.Player = class Player {
  constructor(
    actionPoints,
    energyPoints,
    health,
    maxHealth,
    muve,
    position,
    battlefield,
    buffs,
    debuffs
  ) {
    this.actionPoints = actionPoints;
    this.energyPoints = energyPoints;
    this.health = health;
    this.maxHealth = maxHealth;
    this.muve = muve;
    this.position = position;
    this.battlefield = battlefield;
    this.buffs = buffs;
    this.debuffs = debuffs;
    this.descriptionForUser = "";
    this.descriptionForEnemy = "";
  }

  decreaseHealth(damage, spellName, descriptionForUser, descriptionForEnemy) {
    this.health = this.health - damage;
    if (this.health < 0) this.health = 0;
    this.descriptionForUser +=
      spellName +
      " поражает противника и наносит " +
      damage +
      " единиц урона. " +
      descriptionForUser;
    this.descriptionForEnemy =
      spellName +
      " поражает вас и наносит " +
      damage +
      " единиц урона. " +
      descriptionForEnemy;
  }

  increaseHealth(heal, spellName, descriptionForUser, descriptionForEnemy) {
    this.health = this.health + heal;
    if (this.health > this.maxHealth) this.health = this.maxHealth;
    this.descriptionForUser +=
      spellName +
      " исцеляет вас и восполняет " +
      heal +
      " единиц здоровья. " +
      descriptionForUser;
    this.descriptionForEnemy =
      spellName +
      " исцеляет противника и восполняет " +
      heal +
      " единиц здоровья. " +
      descriptionForEnemy;
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
    this.descriptionForUser +=
      "Вы успешно наложили на себя " + effect.name + ". ";
    this.descriptionForEnemy +=
      "Противник успешно наложил на себя " + effect.name + ". ";
  }

  saveNegativeEffect(effect) {
    this.debuffs.push(effect);
    this.descriptionForUser +=
      "Противник успешно наложил на вас " + effect.name + ". ";
    this.descriptionForEnemy +=
      "Вы успешно наложили на противника " + effect.name + ". ";
  }

  deletePositiveEffect(spellForDelete) {
    let index = this.buffs.findIndex(
      (item) => item.spellName == spellForDelete
    );
    this.buffs.splice(index, 1);
  }

  deleteNegativeEffect(spellForDelete) {
    let index = this.debuffs.findIndex(
      (item) => item.spellName == spellForDelete
    );
    this.debuffs.splice(index, 1);
  }
};

module.exports.Firespear = class Firespear {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "firespear";
  russianName = "Метеор";
  descriptionForUser = "";
  descriptionForEnemy = "";
  maxDamage = Math.round(Math.random() * (30 - 20)) + 20;
  currentDamage = this.maxDamage;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.currentDamage * percent) / 100);
    this.currentDamage -= points;
    this.descriptionForUser +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  increaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage += points;
    this.descriptionForUser +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.decreaseHealth(
      this.currentDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }
};

module.exports.Fireshild = class Fireshild {
  constructor(duration = 4) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "fireshild";
  russianName = "Огненный щит";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = ["firesource", "firesphere", "deathflow"];
  activationProbability = 1;
  percentDecreaseDamage = 40;
  pointsDecreaseDamage = 0;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deletePositiveEffect(this.spellName);
    }
  }

  increaseDuration(duration, player) {
    this.duration += duration;
  }

  decreaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseDamage(
      this.percentDecreaseDamage,
      this.pointsDecreaseDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
};

module.exports.Firecrown = class Firecrown {
  constructor(duration = 4) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "firecrown";
  russianName = "Огненный венец";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [
    "firespear",
    "fireflow",
    "waterspear",
    "waterflow",
    "earthspear",
    "earthflow",
    "airspear",
    "airflow",
  ];
  activationProbability = 1;
  percentIncreaseDamage = 25;
  pointsIncreaseDamage = 0;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deletePositiveEffect(this.spellName);
    }
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  increaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.increaseDamage(
      this.percentIncreaseDamage,
      this.pointsIncreaseDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
};

module.exports.Firesource = class Firesource {
  constructor(duration = 3) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "firesource";
  russianName = "Вулкан";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [];
  activationProbability = 1;
  maxDamage = Math.round(Math.random() * (12 - 5)) + 5;
  currentDamage = this.maxDamage;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deleteNegativeEffect(this.spellName);
    }
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage -= points;
    this.descriptionForUser +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  increaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage += points;
    this.descriptionForUser +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.activationProbability < Math.random()) return;
    player.decreaseHealth(
      this.currentDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.saveNegativeEffect(this);
  }
};

module.exports.Firesphere = class Firesphere {
  constructor(duration = -1) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "firesphere";
  russianName = "Огненная клетка";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [
    "firespear",
    "fireflow",
    "waterspear",
    "waterflow",
    "earthspear",
    "earthflow",
    "airspear",
    "airflow",
  ];
  activationProbability = 1;
  maxDamage = Math.round(Math.random() * (10 - 5)) + 5;
  currentDamage = this.maxDamage;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deleteNegativeEffect(this.spellName);
    }
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage -= points;
    this.descriptionForUser +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  increaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage += points;
    this.descriptionForUser +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.activationProbability < Math.random()) return;
    player.decreaseHealth(
      this.currentDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.saveNegativeEffect(this);
  }
};

module.exports.Firestamp = class Firestamp {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "firestamp";
  russianName = "Клеймо огня";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [
    "firesource",
    "firesphere",
    "earthsphere",
    "airshild",
    "aircrown",
    "airsphere",
    "airstamp",
    "deathshild",
    "deathsphere",
    "deathstamp",
    "deathflow",
  ];
  pointsIncreaseDuration = 2;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  increaseSpellDuration(player) {
    if (this.hitProbability < Math.random()) return;
    for (let i = 0; i < player.debuffs.length; i++) {
      player.debuffs[i].increaseDuration(
        this.pointsIncreaseDuration,
        this.russianName,
        this.descriptionForUser,
        this.descriptionForEnemy
      );
    }
  }
};

module.exports.Firekey = class Firekey {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "firekey";
  russianName = "Ключ огня";
  descriptionForUser = "";
  descriptionForEnemy = "";

  constructor(spellForDelete) {
    this.spellForDelete = spellForDelete;
  }

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  deleteEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.deletePositiveEffect(
      this.spellForDelete,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }
};

module.exports.Fireflow = class Fireflow {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.66;
  spellName = "fireflow";
  russianName = "Струя пламени";
  descriptionForUser = "";
  descriptionForEnemy = "";
  maxDamage = Math.round(Math.random() * (35 - 25)) + 25;
  currentDamage = this.maxDamage;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage -= points;
    this.descriptionForUser +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  increaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage += points;
    this.descriptionForUser +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.decreaseHealth(
      this.currentDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }
};

module.exports.Firepower = class Firepower {
  constructor(duration = -1) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "firepower";
  russianName = "Власть огня";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [
    "firespear",
    "fireflow",
    "waterspear",
    "waterflow",
    "earthspear",
    "earthflow",
    "airspear",
    "airflow",
  ];
  activationProbability = 1;
  percentIncreaseDamage = 0;
  pointsIncreaseDamage = 5;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
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
    spell.increaseDamage(
      this.percentIncreaseDamage,
      this.pointsIncreaseDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
};

module.exports.Waterspear = class Waterspear {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "waterspear";
  russianName = "Ледяной осколок";
  descriptionForUser = "";
  descriptionForEnemy = "";
  maxDamage = Math.round(Math.random() * (15 - 5)) + 5;
  currentDamage = this.maxDamage;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage -= points;
    this.descriptionForUser +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  increaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage += points;
    this.descriptionForUser +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    let totalDamage = this.currentDamage + player["debuffs"].length * 5;
    player.decreaseHealth(
      totalDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }
};

module.exports.Watershild = class Watershild {
  constructor(duration = 6) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "watershild";
  russianName = "Ледяная стена";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [
    "firespear",
    "fireflow",
    "waterspear",
    "waterflow",
    "earthspear",
    "earthflow",
    "airspear",
    "airflow",
  ];
  activationProbability = 1;
  percentDecreaseDamage = 40;
  pointsDecreaseDamage = 0;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deletePositiveEffect(this.spellName);
    }
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseDamage(
      this.percentDecreaseDamage,
      this.pointsDecreaseDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
};

module.exports.Watercrown = class Watercrown {
  constructor(duration = 6) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "watercrown";
  russianName = "Корона воды";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = ["firesource", "firesphere", "deathflow"];
  activationProbability = 1;
  percentDecreaseDamage = 50;
  pointsDecreaseDamage = 0;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deletePositiveEffect(this.spellName);
    }
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseDamage(
      this.percentDecreaseDamage,
      this.pointsDecreaseDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
};

module.exports.Watersource = class Watersource {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.66;
  spellName = "watersource";
  russianName = "Родник";
  descriptionForUser = "";
  descriptionForEnemy = "";

  constructor(spellForDelete) {
    this.spellForDelete = spellForDelete;
  }

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  deleteEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.deleteNegativeEffect(
      this.spellForDelete,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }
};

module.exports.Watersphere = class Watersphere {
  constructor(duration = 2) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "watersphere";
  russianName = "Ледяная сфера";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [];
  activationProbability = 1;
  percentDecreaseDamage = 100;
  pointsDecreaseDamage = 0;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deletePositiveEffect(this.spellName);
    }
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreasePlayerHealth(player) {
    if (this.activationProbability < Math.random()) return;
    player.decreaseHealth(
      this.currentDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }
};

module.exports.Waterstamp = class Waterstamp {
  constructor(duration = 6) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "waterstamp";
  russianName = "Ледяная стена";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [
    "firespear",
    "fireflow",
    "waterspear",
    "waterflow",
    "earthspear",
    "earthflow",
    "airspear",
    "airflow",
  ];
  activationProbability = 1;
  percentDecreaseDamage = 33;
  pointsDecreaseDamage = 0;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deletePositiveEffect(this.spellName);
    }
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseDamage(
      this.percentDecreaseDamage,
      this.pointsDecreaseDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
};

module.exports.Waterkey = class Waterkey {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "waterkey";
  russianName = "Ключ воды";
  descriptionForUser = "";
  descriptionForEnemy = "";

  constructor(spellForDelete) {
    this.spellForDelete = spellForDelete;
  }

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  deleteEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.deleteNegativeEffect(
      this.spellForDelete,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }
};

module.exports.Waterflow = class Waterflow {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "waterflow";
  russianName = "Водный поток";
  descriptionForUser = "";
  descriptionForEnemy = "";
  maxDamage = 20;
  currentDamage = this.maxDamage;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage -= points;
    this.descriptionForUser +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  increaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage += points;
    this.descriptionForUser +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    let totalDamage = this.currentDamage + player["debuffs"].length * 5;
    player.decreaseHealth(
      totalDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }
};

module.exports.Waterpower = class Waterpower {
  constructor(duration = -1) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "waterpower";
  russianName = "Власть воды";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = ["watershild", "watercrown", "watersphere", "waterstamp"];
  pointsIncreaseDuration = 2;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
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
    spell.increaseDuration(
      this.pointsIncreaseDuration,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
};

module.exports.Earthspear = class Earthspear {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.33;
  spellName = "earthspear";
  russianName = "Глыба";
  descriptionForUser = "";
  descriptionForEnemy = "";
  maxDamage = Math.round(Math.random() * (70 - 50)) + 50;
  currentDamage = this.maxDamage;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage -= points;
    this.descriptionForUser +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  increaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage += points;
    this.descriptionForUser +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.decreaseHealth(
      this.currentDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }
};

module.exports.Earthshild = class Earthshild {
  constructor(duration = 5) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  spellName = "earthshild";
  russianName = "Скала";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [];
};

module.exports.Earthcrown = class Earthcrown {
  constructor(duration = 6) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "earthcrown";
  russianName = "Корона земли";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [
    "firespear",
    "fireflow",
    "waterspear",
    "waterflow",
    "earthspear",
    "earthflow",
    "airspear",
    "airflow",
  ];
  activationProbability = 1;
  percentIncreaseHitProbability = 0.15;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deletePositiveEffect(this.spellName);
    }
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
};

module.exports.Earthsource = class Earthsource {
  constructor(duration = 4) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "earthsource";
  russianName = "Земные недра";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = ["earthspear", "earthflow", "earthsphere"];
  activationProbability = 1;
  percentIncreaseDamage = 0;
  pointsIncreaseDamage = 15;
  pointsIncreaseDuration = 1;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deletePositiveEffect(this.spellName);
    }
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  icreaseSpellDuration(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.increaseDuration(this.pointsIncreaseDuration);
  }

  increaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.increaseDamage(
      this.percentIncreaseDamage,
      this.pointsIncreaseDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
};

module.exports.Earthsphere = class Earthsphere {
  constructor(duration = 10) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "earthsphere";
  russianName = "Склеп";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [
    "firespear",
    "fireflow",
    "waterspear",
    "waterflow",
    "earthspear",
    "earthflow",
    "airspear",
    "airflow",
    "firesource",
    "firesphere",
    "earthsphere",
    "airshild",
    "aircrown",
    "airsphere",
    "airstamp",
    "deathshild",
    "deathsphere",
    "deathstamp",
    "deathflow",
  ];
  activationProbability = 1;
  percentIncreaseHitProbability = 0.05;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deletePositiveEffect(this.spellName);
    }
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
};

module.exports.Earthstamp = class Earthstamp {
  constructor(duration = 4) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "earthstamp";
  russianName = "Печать земли";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [
    "firespear",
    "fireflow",
    "waterspear",
    "waterflow",
    "earthspear",
    "earthflow",
    "airspear",
    "airflow",
  ];
  activationProbability = 1;
  percentDecreaseDamage = 50;
  pointsDecreaseDamage = 0;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deletePositiveEffect(this.spellName);
    }
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseDamage(
      this.percentDecreaseDamage,
      this.pointsDecreaseDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
};

module.exports.Earthkey = class Earthkey {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "earthkey";
  russianName = "Ключ земли";
  descriptionForUser = "";
  descriptionForEnemy = "";

  constructor(spellForDelete) {
    this.spellForDelete = spellForDelete;
  }

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  deleteEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.deleteNegativeEffect(
      this.spellForDelete,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }
};

module.exports.Earthflow = class Earthflow {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.25;
  spellName = "earthflow";
  russianName = "Сель";
  descriptionForUser = "";
  descriptionForEnemy = "";
  maxDamage = 80;
  currentDamage = this.maxDamage;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage -= points;
    this.descriptionForUser +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  increaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage += points;
    this.descriptionForUser +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.decreaseHealth(
      this.currentDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }
};

module.exports.Earthpower = class Earthpower {
  constructor(duration = 4) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "earthpower";
  russianName = "Власть земли";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = ["earthshild", "earthcrown", "earthsource", "earthstamp"];
  activationProbability = 0.5;
  pointsIncreaseDuration = 4;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deletePositiveEffect(this.spellName);
    }
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  increaseSpellDuration(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.increaseDuration(
      this.pointsIncreaseDuration,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.savePositiveEffect(this);
  }
};

module.exports.Airspear = class Airspear {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.75;
  spellName = "airspear";
  russianName = "Копье воздуха";
  descriptionForUser = "";
  descriptionForEnemy = "";
  maxDamage = 25;
  currentDamage = this.maxDamage;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage -= points;
    this.descriptionForUser +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  increaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage += points;
    this.descriptionForUser +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.decreaseHealth(
      this.currentDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }
};

module.exports.Airshild = class Airshild {
  constructor(duration = 4) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "airshild";
  russianName = "Вихрь";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [
    "firespear",
    "fireflow",
    "waterspear",
    "waterflow",
    "earthspear",
    "earthflow",
    "airspear",
    "airflow",
  ];
  activationProbability = 1;
  percentDecreaseHitProbability = 0.33;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deleteNegativeEffect(this.spellName);
    }
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
};

module.exports.Aircrown = class Aircrown {
  constructor(duration = 4) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "aircrown";
  russianName = "Корона земли";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [
    "fireshild",
    "firecrown",
    "firepower",
    "watershild",
    "watercrown",
    "watersphere",
    "waterstamp",
    "waterpower",
    "earthshild",
    "earthcrown",
    "earthsource",
    "earthstamp",
    "earthpower",
    "airsource",
    "airpower",
    "lifeshild",
    "lifesphere",
    "lifestamp",
    "lifeflow",
    "lifepower",
    "deathkey",
  ];
  activationProbability = 1;
  percentDecreaseHitProbability = 0.33;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deleteNegativeEffect(this.spellName);
    }
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
};

module.exports.Airsource = class Airsource {
  constructor(duration = 6) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "airsource";
  russianName = "Врата воздуха";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [
    "firespear",
    "fireflow",
    "waterspear",
    "waterflow",
    "earthspear",
    "earthflow",
    "airspear",
    "airflow",
    "firesource",
    "firesphere",
    "earthsphere",
    "airshild",
    "aircrown",
    "airsphere",
    "airstamp",
    "deathshild",
    "deathsphere",
    "deathstamp",
    "deathflow",
  ];
  activationProbability = 1;
  percentIncreaseHitProbability = 0.1;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deletePositiveEffect(this.spellName);
    }
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
};

module.exports.Airsphere = class Airsphere {
  constructor(duration = 4) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "airsphere";
  russianName = "Воздушный кокон";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [
    "firesource",
    "firesphere",
    "earthsphere",
    "airshild",
    "aircrown",
    "airsphere",
    "airstamp",
    "deathshild",
    "deathsphere",
    "deathstamp",
    "deathflow",
  ];
  activationProbability = 1;
  percentDecreaseHitProbability = 0.33;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
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
    if (this.duration <= 0) {
      player.deleteNegativeEffect(this.spellName);
    }
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
};

module.exports.Airstamp = class Airstamp {
  constructor(duration = 10) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "airstamp";
  russianName = "Печать воздуха";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [
    "fireshild",
    "firecrown",
    "firepower",
    "watershild",
    "watercrown",
    "watersphere",
    "waterstamp",
    "waterpower",
    "earthshild",
    "earthcrown",
    "earthsource",
    "earthstamp",
    "earthpower",
    "airsource",
    "airpower",
    "lifeshild",
    "lifesphere",
    "lifestamp",
    "lifeflow",
    "lifepower",
    "deathkey",
  ];
  activationProbability = 1;
  percentDecreaseHitProbability = 0.1;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deleteNegativeEffect(this.spellName);
    }
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
};

module.exports.Airkey = class Airkey {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "airkey";
  russianName = "Ключ воздуха";
  descriptionForUser = "";
  descriptionForEnemy = "";

  constructor(spellForDelete) {
    this.spellForDelete = spellForDelete;
  }

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  deleteEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.deletePositiveEffect(
      this.spellForDelete,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }
};

module.exports.Airflow = class Airflow {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.5;
  spellName = "airflow";
  russianName = "Ударная волна";
  descriptionForUser = "";
  descriptionForEnemy = "";
  maxDamage = 40;
  currentDamage = this.maxDamage;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage -= points;
    this.descriptionForUser +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " снижает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  increaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage += points;
    this.descriptionForUser +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForUser;
    this.descriptionForEnemy +=
      spellName +
      " увеличивает урон от заклинания на " +
      points +
      " единиц." +
      descriptionForEnemy;
  }

  decreasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.decreaseHealth(
      this.currentDamage,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }
};

module.exports.Airpower = class Airpower {
  constructor(duration = -1) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "airpower";
  russianName = "Власть воздуха";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [
    "firespear",
    "fireflow",
    "waterspear",
    "waterflow",
    "earthspear",
    "earthflow",
    "airspear",
    "airflow",
  ];
  activationProbability = 1;
  percentDecreaseHitProbability = 0.2;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
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
};

module.exports.Lifespear = class Lifespear {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "lifespear";
  russianName = "Касание жизни";
  descriptionForUser = "";
  descriptionForEnemy = "";

  constructor(spellForDelete) {
    this.spellForDelete = spellForDelete;
  }

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  deleteEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.deleteNegativeEffect(
      this.spellForDelete,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }
};

module.exports.Lifeshild = class Lifeshild {
  constructor(duration = -1) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "lifeshild";
  russianName = "Щит жизни";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = ["deathcrown"];
  activationProbability = 1;
  percentDecreaseHitProbability = 1;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
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
};

module.exports.Lifecrown = class Lifecrown {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "lifecrown";
  russianName = "Корона жизни";
  descriptionForUser = "";
  descriptionForEnemy = "";
  pointsIncreaseMaxHealth = 15;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  increasePlayerMaxHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.increaseMaxHealth(this.pointsIncreaseMaxHealth);
  }
};

module.exports.Lifesource = class Lifesource {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "lifesource";
  russianName = "Источник жизни";
  descriptionForUser = "";
  descriptionForEnemy = "";
  pointsIncreaseHealth = 30;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  increasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.increaseHealth(this.pointsIncreaseHealth);
  }
};

module.exports.Lifesphere = class Lifesphere {
  constructor(duration = 5) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "lifesphere";
  russianName = "Сфера восстановления";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [];
  activationProbability = 1;
  pointsIncreaseHealth = 10;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deletePositiveEffect(this.spellName);
    }
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
};

module.exports.Lifestamp = class Lifestamp {
  constructor(duration = 8) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "lifestamp";
  russianName = "Печать жизни";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = ["deathshild", "deathsphere", "deathstamp", "deathflow"];
  activationProbability = 1;
  percentDecreaseHitProbability = 1;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deletePositiveEffect(this.spellName);
    }
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
};

module.exports.Lifekey = class Lifekey {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.66;
  spellName = "lifekey";
  russianName = "Ключ жизни";
  descriptionForUser = "";
  descriptionForEnemy = "";

  constructor(spellForDelete) {
    this.spellForDelete = spellForDelete;
  }

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  deleteEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.deleteNegativeEffect(
      this.spellForDelete,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }
};

module.exports.Lifeflow = class Lifeflow {
  constructor(duration = 2) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "lifeflow";
  russianName = "Поток жизни";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [];
  activationProbability = 1;
  pointsIncreaseHealth = 25;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deletePositiveEffect(this.spellName);
    }
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
};

module.exports.Lifepower = class Lifepower {
  constructor(duration = -1) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "lifepower";
  russianName = "Власть жизни";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [];
  activationProbability = 1;
  percentDecreaseHitProbability = 1;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
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
};

module.exports.Deathspear = class Deathspear {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.66;
  spellName = "deathspear";
  russianName = "Касание смерти";
  descriptionForUser = "";
  descriptionForEnemy = "";

  constructor(spellForDelete) {
    this.spellForDelete = spellForDelete;
  }

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  deleteEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.deletePositiveEffect(
      this.spellForDelete,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }
};

module.exports.Deathshild = class Deathshild {
  constructor(duration = 4) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "deathshild";
  russianName = "Пелена смерти";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [
    "fireshild",
    "firecrown",
    "firepower",
    "watershild",
    "watercrown",
    "watersphere",
    "waterstamp",
    "waterpower",
    "earthshild",
    "earthcrown",
    "earthsource",
    "earthstamp",
    "earthpower",
    "airsource",
    "airpower",
    "lifeshild",
    "lifesphere",
    "lifestamp",
    "lifeflow",
    "lifepower",
    "deathkey",
  ];
  activationProbability = 1;
  percentDecreaseHitProbability = 0.5;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deleteNegativeEffect(this.spellName);
    }
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
};

module.exports.Deathcrown = class Deathcrown {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "deathcrown";
  russianName = "Корона мертвеца";
  descriptionForUser = "";
  descriptionForEnemy = "";
  pointsDecreaseMaxHealth = 15;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreasePlayerMaxHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.decreaseMaxHealth(this.pointsDecreaseMaxHealth);
  }
};

module.exports.Deathsource = class Deathsource {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "deathsource";
  russianName = "Смерть";
  descriptionForUser = "";
  descriptionForEnemy = "";

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreasePlayerHealth(player) {
    if (this.hitProbability < Math.random()) return;
    player.decreaseHealth(player.health);
  }
};

module.exports.Deathsphere = class Deathsphere {
  constructor(duration = 2) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "deathsphere";
  russianName = "Круг смерти";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = ["firesource", "deathflow"];
  activationProbability = 1;
  percentIncreaseDamage = 0;
  pointsIncreaseDamage = 15;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deleteNegativeEffect(this.spellName);
    }
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
};

module.exports.Deathstamp = class Deathstamp {
  constructor(duration = 2) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "deathstamp";
  russianName = "Печать смерти";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [
    "fireshild",
    "firecrown",
    "firepower",
    "watershild",
    "watercrown",
    "watersphere",
    "waterstamp",
    "waterpower",
    "earthshild",
    "earthcrown",
    "earthsource",
    "earthstamp",
    "earthpower",
    "airsource",
    "airpower",
    "lifeshild",
    "lifesphere",
    "lifestamp",
    "lifeflow",
    "lifepower",
    "deathkey",
  ];
  activationProbability = 1;
  percentDecreaseHitProbability = 1;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deleteNegativeEffect(this.spellName);
    }
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
};

module.exports.Deathkey = class Deathkey {
  constructor(duration = 4) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "deathkey";
  russianName = "Ключ от смерти";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [
    "firespear",
    "fireflow",
    "waterspear",
    "waterflow",
    "earthspear",
    "earthflow",
    "airspear",
    "airflow",
  ];
  activationProbability = 0.5;
  pointsIncreaseHealth = 1;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
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
    if (this.duration <= 0) {
      player.deletePositiveEffect(this.spellName);
    }
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
};

module.exports.Deathflow = class Deathflow {
  constructor(duration = 5) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "deathflow";
  russianName = "Поток смерти";
  descriptionForUser = "";
  descriptionForEnemy = "";
  dependences = [];
  activationProbability = 1;
  maxDamage = 5;
  currentDamage = this.maxDamage;
  pointsIncreaseHealth = 5;

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  decreaseDuration(duration, player) {
    this.duration -= duration;
    if (this.duration <= 0) {
      player.deletePositiveEffect(this.spellName);
    }
  }

  increaseDuration(duration) {
    this.duration += duration;
  }

  decreaseDamage(percent, points) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage -= points;
  }

  increaseDamage(
    percent,
    points,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    points += Math.round((this.maxDamage * percent) / 100);
    this.currentDamage += points;
  }

  deathflowEffect(user, enemy) {
    if (this.activationProbability < Math.random()) return;
    enemy.decreaseHealth(
      this.currentDamage,
      this.name,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
    user.increaseHealth(this.pointsIncreaseHealth);
  }

  saveEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.saveNegativeEffect(this);
  }
};

module.exports.Deathpower = class Deathpower {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "deathpower";
  russianName = "Власть смерти";
  descriptionForUser = "";
  descriptionForEnemy = "";

  constructor(spellForDelete) {
    this.spellForDelete = spellForDelete;
  }

  decreaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability - percent;
  }

  increaseHitProbability(
    percent,
    spellName,
    descriptionForUser,
    descriptionForEnemy
  ) {
    this.hitProbability = this.hitProbability + percent;
  }

  deleteEffect(player) {
    if (this.hitProbability < Math.random()) return;
    player.deletePositiveEffect(
      this.spellForDelete,
      this.russianName,
      this.descriptionForUser,
      this.descriptionForEnemy
    );
  }
};
