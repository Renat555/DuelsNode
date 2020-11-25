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
    this.description = "";
  }

  decreaseHealth(damage) {
    this.health = this.health - damage;
    if (this.health < 0) this.health = 0;
  }

  increaseHealth(heal, description) {
    this.health = this.health + heal;
    if (this.health > this.maxHealth) this.health = this.maxHealth;
    this.description += description;
  }

  decreaseMaxHealth(damage) {
    this.maxHealth = this.maxHealth - damage;
    if (this.maxHealth < 0) this.maxHealth = 0;
  }

  increaseMaxHealth(heal) {
    this.maxHealth = this.maxHealth + heal;
  }

  saveNegativeEffect(effect) {
    let mark = 0;

    for (let i = 0; i < this.debuffs.length; i++) {
      if (this.debuffs[i]["spellName"] == effect["spellName"]) {
        this.debuffs[i]["duration"] += effect["duration"];
        mark = 1;
      }
    }

    if (mark == 0) this.debuffs.push(effect);
  }

  savePositiveEffect(effect) {
    let mark = 0;

    for (let i = 0; i < this.buffs.length; i++) {
      if (this.buffs[i]["spellName"] == effect["spellName"]) {
        this.buffs[i]["duration"] += effect["duration"];
        mark = 1;
      }
    }

    if (mark == 0) this.buffs.push(effect);
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

  addDescription(description) {
    this.description += description;
  }
};

module.exports.Firespear = class Firespear {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "firespear";
  russianName = "Метеор";
  maxDamage = Math.round(Math.random() * (30 - 20)) + 20;
  currentDamage = this.maxDamage;
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

  decreasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = "Вы не попадаете Метеором в цель.";
      this.descriptionForEnemy = "Противник не попадает в вас Метеором.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser +=
        "Метеор поражает противника и наносит " +
        this.currentDamage +
        " урона.";
      this.descriptionForEnemy =
        "Метеор поражает вас и наносит " + this.currentDamage + " урона.";
      user.addDescription(this.descriptionForUser);
      enemy.decreaseHealth(this.currentDamage);
      enemy.addDescription(this.descriptionForEnemy);
    }
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
  russianName = "Метеор";
  dependences = ["firesource", "firesphere", "watersphere", "deathflow"];
  activationProbability = 1;
  percentDecreaseDamage = 40;
  pointsDecreaseDamage = 0;
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
    if (duration == -1) {
      this.duration = -1;
    } else {
      this.duration += duration;
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось наложить на себя Огненный щит.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на себя Огненный щит.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы накладываете на себя Огненный щит.";
      this.descriptionForEnemy += "Противник накладывает на себя Огненный щит.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser = "Вы не попадаете метеором в цель.";
      this.descriptionForEnemy = "Противник не попадает в вас метеором.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        "Метеор поражает противника и наносит " +
        this.currentDamage +
        " урона.";
      this.descriptionForEnemy =
        "Метеор поражает вас и наносит " + this.currentDamage + " урона.";
      user.addDescription(this.descriptionForUser);
      enemy.decreaseHealth(this.currentDamage, this.descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось наложить на себя Огненный венец.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на себя Огненный венец.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы накладываете на себя Огненный венец.";
      this.descriptionForEnemy +=
        "Противник накладывает на себя Огненный венец.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось наложить на противника Вулкан.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на вас Вулкан.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы накладываете на противника Вулкан.";
      this.descriptionForEnemy += "Противник накладывает на вас Вулкан.";
      enemy.saveNegativeEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось заключить противника в Огненную клетку.";
      this.descriptionForEnemy +=
        "Противнику не удалось заключить вас в Огненную клетку.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser +=
        "Вы накладываете на противника Огненную клетку.";
      this.descriptionForEnemy +=
        "Противник накладывает на вас Огненную клетку.";
      enemy.saveNegativeEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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
  maxDamage = Math.round(Math.random() * (35 - 25)) + 25;
  currentDamage = this.maxDamage;
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

  decreasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = "Струя пламени не попадает в противника.";
      this.descriptionForEnemy = "Струя пламени не попадает в вас.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        "Струя пламени поражает противника и наносит " +
        this.currentDamage +
        " единиц урона.";
      this.descriptionForEnemy =
        "Струя пламени поражает вас и наносит " +
        this.currentDamage +
        " единиц урона.";
      user.addDescription(this.descriptionForUser);
      enemy.decreaseHealth(this.currentDamage);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser += "Вам не удалось наложить на себя Власть огня.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на себя Власть огня.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы накладываете на себя Власть огня.";
      this.descriptionForEnemy += "Противник накладывает на себя Власть огня.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
  }
};

module.exports.Waterspear = class Waterspear {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "waterspear";
  maxDamage = Math.round(Math.random() * (15 - 5)) + 5;
  currentDamage = this.maxDamage;
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

  decreasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = "Ледяной осколок не попадает в противника.";
      this.descriptionForEnemy = "Ледяной осколок не попадает в вас.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      let totalDamage = this.currentDamage + enemy["debuffs"].length * 5;
      let descriptionForUser =
        "Ледяной осколок поражает противника и наносит " +
        totalDamage +
        " единиц урона.";
      let descriptionForEnemy =
        "Ледяной осколок поражает вас и наносит " +
        totalDamage +
        " единиц урона.";
      user.addDescription(descriptionForUser);
      enemy.decreaseHealth(totalDamage, descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser += "Вам не удалось создать Ледяную стену.";
      this.descriptionForEnemy +=
        "Противнику не удалось создать Ледяную стену.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы созадете Ледяную стену.";
      this.descriptionForEnemy += "Противник создает Ледяную стену.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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
  dependences = ["firesource", "firesphere", "watersphere", "deathflow"];
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser += "Вам не удалось наложить на себя Корону воды.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на себя Корону воды.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы накладываете на себя Корону воды.";
      this.descriptionForEnemy += "Противник наложил на себя Корону воды.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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
  maxDamage = 20;
  currentDamage = this.maxDamage;

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
};

module.exports.Waterstamp = class Waterstamp {
  constructor(duration = 6) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "waterstamp";
  russianName = "Печать воды";
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser += "Вам не удалось наложить на себя Печать воды.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на себя Печать воды.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы накладываете на себя Печать воды.";
      this.descriptionForEnemy += "Противник наложил на себя Печать воды.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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
  maxDamage = 20;
  currentDamage = this.maxDamage;
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

  decreasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = "Водный поток не попадает в противника.";
      this.descriptionForEnemy = "Водный поток не попадает в вас.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      let descriptionForUser =
        "Водный поток поражает противника и наносит " +
        this.currentDamage +
        " единиц урона.";
      let descriptionForEnemy =
        "Водный поток поражает вас и наносит " +
        this.currentDamage +
        " единиц урона.";
      user.addDescription(descriptionForUser);
      enemy.decreaseHealth(this.currentDamage, descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser += "Вам не удалось наложить на себя Власть воды.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на себя Власть воды.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы накладываете на себя Власть воды.";
      this.descriptionForEnemy += "Противник наложил на себя Власть воды.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
  }
};

module.exports.Earthspear = class Earthspear {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.33;
  spellName = "earthspear";
  maxDamage = Math.round(Math.random() * (70 - 50)) + 50;
  currentDamage = this.maxDamage;
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

  decreasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = "Глыба не попадает в противника.";
      this.descriptionForEnemy = "Глыба не попадает в вас.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      let descriptionForUser =
        "Глыба поражает противника и наносит " +
        this.currentDamage +
        " единиц урона.";
      let descriptionForEnemy =
        "Глыба поражает вас и наносит " + this.currentDamage + " единиц урона.";
      user.addDescription(descriptionForUser);
      enemy.decreaseHealth(this.currentDamage, descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось наложить на себя Корону земли.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на себя Корону земли.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы накладываете на себя Корону земли.";
      this.descriptionForEnemy += "Противник наложил на себя Корону земли.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось наложить на себя Земные недра.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на себя Земные недра.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы накладываете на себя Земные недра.";
      this.descriptionForEnemy += "Противник наложил на себя Земные недра.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser += "Вам не удалось зключить противника в Склеп.";
      this.descriptionForEnemy +=
        "Противнику не удалось заключить вас в Склеп.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы заключили противника в Склеп.";
      this.descriptionForEnemy += "Противник заключил вас в Склеп.";
      enemy.saveNegativeEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось наложить на себя Печать земли.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на себя Печать земли.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы наложили на себя Печать земли.";
      this.descriptionForEnemy += "Противник наложил на себя Печать земли.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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
  maxDamage = 80;
  currentDamage = this.maxDamage;
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

  decreasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = "Сель не попадает в противника.";
      this.descriptionForEnemy = "Сель не попадает в вас.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      let descriptionForUser =
        "Сель поражает противника и наносит " +
        this.currentDamage +
        " единиц урона.";
      let descriptionForEnemy =
        "Сель поражает вас и наносит " + this.currentDamage + " единиц урона.";
      user.addDescription(descriptionForUser);
      enemy.decreaseHealth(this.currentDamage, descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось наложить на себя Власть земли.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на себя Власть земли.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы наложили на себя Власть земли.";
      this.descriptionForEnemy += "Противник наложил на себя Власть земли.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
  }
};

module.exports.Airspear = class Airspear {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.75;
  spellName = "airspear";
  maxDamage = 25;
  currentDamage = this.maxDamage;
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

  decreasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = "Копье воздуха не попадает в противника.";
      this.descriptionForEnemy = "Копье воздуха не попадает в вас.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      let descriptionForUser =
        "Копье воздуха поражает противника и наносит " +
        this.currentDamage +
        " единиц урона.";
      let descriptionForEnemy =
        "Копье воздуха поражает вас и наносит " +
        this.currentDamage +
        " единиц урона.";
      user.addDescription(descriptionForUser);
      enemy.decreaseHealth(this.currentDamage, descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser += "Вам не удалось окружить противника Вихрем.";
      this.descriptionForEnemy += "Противнику не удалось окружить вас Вихрем.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы окружили противника Вихрем.";
      this.descriptionForEnemy += "Противник окружил вас Вихрем.";
      enemy.saveNegativeEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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
  russianName = "Корона воздуха";
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser += "Вам не удалось окружить противника Вихрем.";
      this.descriptionForEnemy += "Противнику не удалось окружить вас Вихрем.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы окружили противника Вихрем.";
      this.descriptionForEnemy += "Противник окружил вас Вихрем.";
      enemy.saveNegativeEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser += "Вам не удалось открыть Врата воздуха.";
      this.descriptionForEnemy +=
        "Противнику не удалось открыть Врата воздуха.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы открыли Врата воздуха.";
      this.descriptionForEnemy += "Противник открыл Врата воздуха.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось заключить противника в Воздушный кокон.";
      this.descriptionForEnemy +=
        "Противнику не удалось заключить вас в Воздушный кокон.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы заключили противника в Воздушный кокон.";
      this.descriptionForEnemy += "Противник заключил вас в Воздушный кокон.";
      enemy.saveNegativeEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось наложить на противника Печать воздуха.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на вас Печать воздуха.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы наложили на противника Печать воздуха.";
      this.descriptionForEnemy += "Противник наложил на вас Печать воздуха.";
      enemy.saveNegativeEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  decreasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = "Ударная волна не попадает в противника.";
      this.descriptionForEnemy = "Ударная волна не попадает в вас.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      let descriptionForUser =
        "Ударная волна поражает противника и наносит " +
        this.currentDamage +
        " единиц урона.";
      let descriptionForEnemy =
        "Ударная волна поражает вас и наносит " +
        this.currentDamage +
        " единиц урона.";
      user.addDescription(descriptionForUser);
      enemy.decreaseHealth(this.currentDamage, descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось наложить на себя Власть воздуха.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на себя Власть воздуха.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы наложили на себя Власть воздуха.";
      this.descriptionForEnemy += "Противник наложил на себя Власть воздуха.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser += "Вам не удалось наложить на себя Щит жизни.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на себя Щит жизни.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы наложили на себя Щит жизни.";
      this.descriptionForEnemy += "Противник наложил на себя Щит жизни.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось окружить себя Сферой восстановления.";
      this.descriptionForEnemy +=
        "Противнику не удалось окружить себя Сферой восстановления.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы окружили себя Сферой восстановления.";
      this.descriptionForEnemy +=
        "Противник окружил себя Сферой восстановления.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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
  dependences = ["deathshild", "deathsphere", "deathstamp", "deathflow"];
  activationProbability = 1;
  percentDecreaseHitProbability = 1;
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось наложить на себя Печать жизни.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на себя Печать жизни.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы наложили на себя Печать жизни.";
      this.descriptionForEnemy += "Противник наложил на себя Печать жизни.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser += "Вам не удалось создать Поток жизни.";
      this.descriptionForEnemy += "Противнику не удалось создать Поток жизни.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы создали Поток жизни.";
      this.descriptionForEnemy += "Противник создал Поток жизни.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось наложить на себя Власть жизни.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на себя Власть жизни.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы наложили на себя Власть жизни.";
      this.descriptionForEnemy += "Противник наложил на себя Власть жизни.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось наложить на противника Пелену смерти.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на вас Пелену смерти.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы наложили на противника Пелену смерти.";
      this.descriptionForEnemy += "Противник наложил на вас Пелену смерти.";
      enemy.saveNegativeEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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
  dependences = ["firesource", "deathflow"];
  activationProbability = 1;
  percentIncreaseDamage = 0;
  pointsIncreaseDamage = 15;
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось наложить на противника Круг смерти.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на вас Круг смерти.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы наложили на противника Круг смерти.";
      this.descriptionForEnemy += "Противник наложил на вас Круг смерти.";
      enemy.saveNegativeEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось наложить на противника Печать смерти.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на вас Печать смерти.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы наложили на противника Печать смерти.";
      this.descriptionForEnemy += "Противник наложил на вас Печать смерти.";
      enemy.saveNegativeEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось наложить на себя Ключ от смерти.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на себя Ключ от смерти.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы наложили на себя Ключ от смерти.";
      this.descriptionForEnemy += "Противник наложил на себя Ключ от смерти.";
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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
  dependences = [];
  activationProbability = 1;
  maxDamage = 5;
  currentDamage = this.maxDamage;
  pointsIncreaseHealth = 5;
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

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser +=
        "Вам не удалось наложить на противника Поток смерти.";
      this.descriptionForEnemy +=
        "Противнику не удалось наложить на вас Поток смерти.";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser += "Вы наложили на противника Поток смерти";
      this.descriptionForEnemy += "Противник наложил на вас Поток смерти.";
      enemy.saveNegativeEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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
