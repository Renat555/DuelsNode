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
  }

  decreaseMaxHealth(damage) {
    this.maxHealth = this.maxHealth - damage;
    if (this.maxHealth < 0) this.maxHealth = 0;
    if (this.health > this.maxHealth) this.health = this.maxHealth;
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
    for (let i = 0; i < this.buffs.length; i++) {
      if (this.buffs[i]["spellName"] == spellForDelete) {
        this.buffs.splice(i, 1);
      }
    }
  }

  deleteNegativeEffect(spellForDelete) {
    for (let i = 0; i < this.debuffs.length; i++) {
      if (this.debuffs[i]["spellName"] == spellForDelete) {
        this.debuffs.splice(i, 1);
      }
    }
  }

  addDescription(description) {
    this.description = description + this.description;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  decreaseDamage(points) {
    this.currentDamage -= points;
    if (this.currentDamage < 0) {
      this.currentDamage = 0;
    }
  }

  increaseDamage(points) {
    this.currentDamage += points;
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = " Вы не попадаете Метеором в цель. ";
      this.descriptionForEnemy = " Противник не попадает в вас Метеором. ";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Метеор поражает противника и наносит " +
        this.currentDamage +
        " урона. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Метеор поражает вас и наносит " +
        this.currentDamage +
        " урона. " +
        this.descriptionForEnemy;
      enemy.decreaseHealth(this.currentDamage);
      user.addDescription(this.descriptionForUser);
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
  descriptionForUser = "";
  descriptionForEnemy = "";

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Огненный щит не подействовал на " +
        spell.russianName +
        ". " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Огненный щит не подействовал на " +
        spell.russianName +
        ". " +
        this.descriptionForEnemy;
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      let points = Math.round(
        (spell.currentDamage * this.percentDecreaseDamage) / 100
      );
      spell.decreaseDamage(points);
      this.descriptionForUser =
        " Огненный щит уменьшил урон на " +
        points +
        " единиц." +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Огненный щит уменьшил урон на " +
        points +
        " единиц." +
        this.descriptionForEnemy;
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на себя Огненный щит. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на себя Огненный щит. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы накладываете на себя Огненный щит. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник накладывает на себя Огненный щит. " +
        this.descriptionForEnemy;
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
  descriptionForUser = "";
  descriptionForEnemy = "";

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  increaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Огненный венец не подействовал на " +
        spell.russianName +
        ". " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Огненный венец не подействовал на " +
        spell.russianName +
        ". " +
        this.descriptionForEnemy;
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      let points = Math.round(
        (spell.currentDamage * this.percentIncreaseDamage) / 100
      );
      this.descriptionForUser =
        " Огненный венец увеличил урон на " +
        points +
        " единиц." +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Огненный венец увеличил урон на " +
        points +
        " единиц." +
        this.descriptionForEnemy;
      spell.increaseDamage(points);
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на себя Огненный венец. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на себя Огненный венец. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы накладываете на себя Огненный венец. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник накладывает на себя Огненный венец. " +
        this.descriptionForEnemy;
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
  dependences = [];
  activationProbability = 1;
  maxDamage = Math.round(Math.random() * (12 - 5)) + 5;
  currentDamage = this.maxDamage;
  descriptionForUser = "";
  descriptionForEnemy = "";

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  decreaseDamage(points) {
    this.currentDamage -= points;
    if (this.currentDamage < 0) {
      this.currentDamage = 0;
    }
  }

  increaseDamage(points) {
    this.currentDamage += points;
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreasePlayerHealth(user, enemy) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser = " Вулкан не сработал. ";
      this.descriptionForEnemy = " Вулкан не сработал. ";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вулкан наносит вам " +
        this.currentDamage +
        " урона. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Вулкан нанoсит противнику " +
        this.currentDamage +
        " урона. " +
        this.descriptionForEnemy;
      user.decreaseHealth(this.currentDamage);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на противника Вулкан. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на вас Вулкан. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы накладываете на противника Вулкан. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник накладывает на вас Вулкан. " + this.descriptionForEnemy;
      enemy.saveNegativeEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
  }
};

module.exports.Firesphere = class Firesphere {
  constructor(duration = 999) {
    this.duration = duration;
  }

  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 1;
  spellName = "firesphere";
  russianName = "Огненная клетка";
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
  descriptionForUser = "";
  descriptionForEnemy = "";

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  decreaseDamage(points) {
    this.currentDamage -= points;
    if (this.currentDamage < 0) {
      this.currentDamage = 0;
    }
  }

  increaseDamage(points) {
    this.currentDamage += points;
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreasePlayerHealth(user, enemy) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser = " Огненная клетка не сработала. ";
      this.descriptionForEnemy = " Огненная клетка не сработала. ";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Огненная клетка наносит противнику " +
        this.currentDamage +
        " урона. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Огненная клетка наносит вам " +
        this.currentDamage +
        " урона. " +
        this.descriptionForEnemy;
      user.decreaseHealth(this.currentDamage);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось заключить противника в Огненную клетку. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось заключить вас в Огненную клетку. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы накладываете на противника Огненную клетку. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник накладывает на вас Огненную клетку. " +
        this.descriptionForEnemy;
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
  descriptionForUser = "";
  descriptionForEnemy = "";

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  increaseSpellDuration(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = " Клеймо огня не попадает в противника. ";
      this.descriptionForEnemy = "Клеймо огня не попадает в вас. ";
    } else {
      for (let i = 0; i < enemy.debuffs.length; i++) {
        enemy.debuffs[i].increaseDuration(this.pointsIncreaseDuration);
      }
      this.descriptionForUser =
        " Клеймо огня продлевает действие всех дебафов противника на два хода. ";
      this.descriptionForEnemy =
        " Клеймо огня продлевает действие всех ваших дебафов на два хода. ";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  deleteEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вы не смогли активировать Ключ огня " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник не смог активировать Ключ огня " + this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Ключ огня отменяет заклинание " +
        this.spellForDelete.russianName +
        ". " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Ключ огня отменяет заклинание " +
        this.spellForDelete.russianName +
        ". " +
        this.descriptionForEnemy;
      enemy.deletePositiveEffect(this.spellForDelete["spellName"]);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  decreaseDamage(points) {
    this.currentDamage -= points;
    if (this.currentDamage < 0) {
      this.currentDamage = 0;
    }
  }

  increaseDamage(points) {
    this.currentDamage += points;
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = " Струя пламени не попадает в противника. ";
      this.descriptionForEnemy = " Струя пламени не попадает в вас. ";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Струя пламени поражает противника и наносит " +
        this.currentDamage +
        " единиц урона." +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Струя пламени поражает вас и наносит " +
        this.currentDamage +
        " единиц урона." +
        this.descriptionForEnemy;
      enemy.decreaseHealth(this.currentDamage);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
  }
};

module.exports.Firepower = class Firepower {
  constructor(duration = 999) {
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
  pointsIncreaseDamage = 5;

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  increaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Власть огня не подействовала на " +
        spell.russianName +
        ". " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Власть огня не подействовала на " +
        spell.russianName +
        ". " +
        this.descriptionForEnemy;
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      spell.increaseDamage(this.pointsIncreaseDamage);
      this.descriptionForUser =
        " Власть огня увеличила урон на " +
        this.pointsIncreaseDamage +
        " единиц." +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Власть огня увеличила урон на " +
        this.pointsIncreaseDamage +
        " единиц." +
        this.descriptionForEnemy;
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на себя Власть огня. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на себя Власть огня. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы накладываете на себя Власть огня. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник накладывает на себя Власть огня. " +
        this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  decreaseDamage(points) {
    this.currentDamage -= points;
    if (this.currentDamage < 0) {
      this.currentDamage = 0;
    }
  }

  increaseDamage(points) {
    this.currentDamage += points;
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = " Ледяной осколок не попадает в противника. ";
      this.descriptionForEnemy = " Ледяной осколок не попадает в вас. ";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      let totalDamage = this.currentDamage + enemy["debuffs"].length * 5;
      this.descriptionForUser =
        " Ледяной осколок поражает противника и наносит " +
        totalDamage +
        " единиц урона. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Ледяной осколок поражает вас и наносит " +
        totalDamage +
        " единиц урона. " +
        this.descriptionForEnemy;
      enemy.decreaseHealth(totalDamage);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Ледяная стена не подействовала на " +
        spell.russianName +
        ". " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Ледяная стена не подействовала на " +
        spell.russianName +
        ". " +
        this.descriptionForEnemy;
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      let points = Math.round(
        (spell.currentDamage * this.percentDecreaseDamage) / 100
      );
      spell.decreaseDamage(points);
      this.descriptionForUser =
        " Ледяная стена уменьшила урон на " +
        points +
        " единиц." +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Ледяная стена уменьшила урон на " +
        points +
        " единиц." +
        this.descriptionForEnemy;
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось создать Ледяную стену. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось создать Ледяную стену. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы созадете Ледяную стену. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник создает Ледяную стену. " + this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Корона воды не подействовала на " +
        spell.russianName +
        ". " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Корона воды не подействовала на " +
        spell.russianName +
        ". " +
        this.descriptionForEnemy;
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      let points = Math.round(
        (spell.currentDamage * this.percentDecreaseDamage) / 100
      );
      spell.decreaseDamage(points);
      this.descriptionForUser =
        " Корона воды уменьшила урон на " +
        points +
        " единиц." +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Корона воды уменьшила урон на " +
        points +
        " единиц." +
        this.descriptionForEnemy;
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на себя Корону воды. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на себя Корону воды. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы накладываете на себя Корону воды. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник наложил на себя Корону воды. " + this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  deleteEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вы не смогли активировать Родник " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник не смог активировать Родник " + this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Родник отменяет заклинание " +
        this.spellForDelete.russianName +
        ". " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Родник отменяет заклинание " +
        this.spellForDelete.russianName +
        ". " +
        this.descriptionForEnemy;
      user.deleteNegativeEffect(this.spellForDelete["spellName"]);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  decreaseActivationProbability(percent) {
    this.activationProbability -= percent;
  }

  increaseActivationProbability(percent) {
    this.activationProbability += percent;
  }

  increaseDamage(points) {
    this.currentDamage += points;
  }

  decreaseDamage(points) {
    this.currentDamage -= points;
    if (this.currentDamage < 0) {
      this.currentDamage = 0;
    }
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  placement(spell, coordinates, coordinatesForEnemy, user, enemy) {
    this.descriptionForUser = "Вы размещаете на поле боя Ледяную сферу.";
    this.descriptionForEnemy = "Противник размещает Ледяную сферу на поле боя.";

    let battlefieldSpellForUser = [
      spell["spellName"],
      spell["duration"],
      coordinates,
    ];

    let battlefieldSpellForEnemy = [
      spell["spellName"],
      spell["duration"],
      coordinatesForEnemy,
    ];

    user.battlefield.push(battlefieldSpellForUser);
    enemy.battlefield.push(battlefieldSpellForEnemy);

    user.addDescription(this.descriptionForUser);
    enemy.addDescription(this.descriptionForEnemy);
  }

  decreasePlayerHealth(user, enemy) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser = " Ледяная сфера не сработала. ";
      this.descriptionForEnemy = " Ледяная сфера не сработала. ";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Ледяная сфера наносит вам " +
        this.currentDamage +
        " урона. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Ледяная сфера нанoсит противнику " +
        this.currentDamage +
        " урона. " +
        this.descriptionForEnemy;
      user.decreaseHealth(this.currentDamage);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Печать воды не подействовала на " +
        spell.russianName +
        ". " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Печать воды не подействовала на " +
        spell.russianName +
        ". " +
        this.descriptionForEnemy;
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      let points = Math.round(
        (spell.currentDamage * this.percentDecreaseDamage) / 100
      );
      spell.decreaseDamage(points);
      this.descriptionForUser =
        " Печать воды уменьшила урон на " +
        points +
        " единиц." +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Печать воды уменьшила урон на " +
        points +
        " единиц." +
        this.descriptionForEnemy;
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на себя Печать воды. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на себя Печать воды. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы накладываете на себя Печать воды. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник наложил на себя Печать воды. " + this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  deleteEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вы не смогли активировать Ключ воды " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник не смог активировать Ключ воды " + this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Ключ воды отменяет заклинание " +
        this.spellForDelete.russianName +
        ". " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Ключ воды отменяет заклинание " +
        this.spellForDelete.russianName +
        ". " +
        this.descriptionForEnemy;
      user.deleteNegativeEffect(this.spellForDelete["spellName"]);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  decreaseDamage(points) {
    this.currentDamage -= points;
    if (this.currentDamage < 0) {
      this.currentDamage = 0;
    }
  }

  increaseDamage(points) {
    this.currentDamage += points;
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = " Водный поток не попадает в противника. ";
      this.descriptionForEnemy = " Водный поток не попадает в вас. ";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Водный поток поражает противника и наносит " +
        this.currentDamage +
        " единиц урона. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Водный поток поражает вас и наносит " +
        this.currentDamage +
        " единиц урона. " +
        this.descriptionForEnemy;
      enemy.decreaseHealth(this.currentDamage);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
  }
};

module.exports.Waterpower = class Waterpower {
  constructor(duration = 999) {
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  increaseSpellDuration(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser = " Власть воды не сработала. ";
      this.descriptionForEnemy = " Власть воды не сработаyла. ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      spell.increaseDuration(this.pointsIncreaseDuration);
      this.descriptionForUser =
        " Власть воды увилчила продолжительность заклинания " +
        spell.russianName +
        " на " +
        this.pointsIncreaseDuration +
        ". ";
      this.descriptionForEnemy =
        " Власть воды увилчила продолжительность заклинания " +
        spell.russianName +
        " на " +
        this.pointsIncreaseDuration +
        ". ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на себя Власть воды. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на себя Власть воды. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы накладываете на себя Власть воды. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник наложил на себя Власть воды. " + this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  decreaseDamage(points) {
    this.currentDamage -= points;
    if (this.currentDamage < 0) {
      this.currentDamage = 0;
    }
  }

  increaseDamage(points) {
    this.currentDamage += points;
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = " Глыба не попадает в противника. ";
      this.descriptionForEnemy = " Глыба не попадает в вас. ";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Глыба поражает противника и наносит " +
        this.currentDamage +
        " единиц урона. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Глыба поражает вас и наносит " +
        this.currentDamage +
        " единиц урона. " +
        this.descriptionForEnemy;
      enemy.decreaseHealth(this.currentDamage);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
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

  placement(spell, coordinates, coordinatesForEnemy, user, enemy) {
    this.descriptionForUser = "Вы размещаете на поле боя Скалу.";
    this.descriptionForEnemy = "Противник размещает Скалу на поле боя.";

    let battlefieldSpellForUser = [
      spell["spellName"],
      spell["duration"],
      coordinates,
    ];

    let battlefieldSpellForEnemy = [
      spell["spellName"],
      spell["duration"],
      coordinatesForEnemy,
    ];

    user.battlefield.push(battlefieldSpellForUser);
    enemy.battlefield.push(battlefieldSpellForEnemy);

    user.addDescription(this.descriptionForUser);
    enemy.addDescription(this.descriptionForEnemy);

    this.descriptionForUser = "";
    this.descriptionForEnemy = "";
  }
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  increaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Корона земли не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      this.descriptionForEnemy =
        " Корона земли не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      spell.increaseHitProbability(this.percentIncreaseHitProbability);
      this.descriptionForUser =
        " Корона земли увеличила вероятность попадания на " +
        100 * this.percentIncreaseHitProbability +
        " процентов. ";
      this.descriptionForEnemy =
        " Корона земли увеличила вероятность попадания на " +
        100 * this.percentIncreaseHitProbability +
        " процентов. ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на себя Корону земли. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на себя Корону земли. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы накладываете на себя Корону земли. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник наложил на себя Корону земли. " + this.descriptionForEnemy;
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
  pointsIncreaseDamage = 15;
  pointsIncreaseDuration = 1;

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  increaseSpellDuration(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser = " Земные недра не сработали. ";
      this.descriptionForEnemy = " Земные недра не сработали. ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      spell.increaseDuration(this.pointsIncreaseDuration);
      this.descriptionForUser =
        " Земные недра увeличили продолжительность заклинания " +
        spell.russianName +
        " на " +
        this.pointsIncreaseDuration +
        ". ";
      this.descriptionForEnemy =
        " Земные недра увeличили продолжительность заклинания " +
        spell.russianName +
        " на " +
        this.pointsIncreaseDuration +
        ". ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  increaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Земные недра не подействовали на " +
        spell.russianName +
        ". " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Земные недра не подействовали на " +
        spell.russianName +
        ". " +
        this.descriptionForEnemy;
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Земные недра увеличили урон на " +
        this.pointsIncreaseDamage +
        " единиц." +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Земные недра увеличили урон на " +
        this.pointsIncreaseDamage +
        " единиц." +
        this.descriptionForEnemy;
      spell.increaseDamage(this.pointsIncreaseDamage);
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на себя Земные недра. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на себя Земные недра. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы накладываете на себя Земные недра. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник наложил на себя Земные недра. " + this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  increaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Склеп не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      this.descriptionForEnemy =
        " Склеп не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Склеп увеличил вероятность попадания на " +
        100 * this.percentIncreaseHitProbability +
        " процентов. ";
      this.descriptionForEnemy =
        " Склеп увеличил вероятность попадания на " +
        100 * this.percentIncreaseHitProbability +
        " процентов. ";
      spell.increaseHitProbability(this.percentIncreaseHitProbability);
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось зключить противника в Склеп. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось заключить вас в Склеп. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы заключили противника в Склеп. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник заключил вас в Склеп. " + this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Печать земли не подействовала на " +
        spell.russianName +
        ". " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Печать земли не подействовала на " +
        spell.russianName +
        ". " +
        this.descriptionForEnemy;
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      let points = Math.round(
        (spell.currentDamage * this.percentDecreaseDamage) / 100
      );
      spell.decreaseDamage(points);
      this.descriptionForUser =
        " Печать земли уменьшила урон на " +
        points +
        " единиц." +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Печать земли уменьшила урон на " +
        points +
        " единиц." +
        this.descriptionForEnemy;
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на себя Печать земли. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на себя Печать земли. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы наложили на себя Печать земли. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник наложил на себя Печать земли. " + this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  deleteEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вы не смогли активировать Ключ земли " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник не смог активировать Ключ земли " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Ключ земли отменяет заклинание " +
        this.spellForDelete.russianName +
        ". " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Ключ земли отменяет заклинание " +
        this.spellForDelete.russianName +
        ". " +
        this.descriptionForEnemy;
      user.deleteNegativeEffect(this.spellForDelete["spellName"]);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  decreaseDamage(points) {
    this.currentDamage -= points;
  }

  increaseDamage(points) {
    this.currentDamage += points;
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = " Сель не попадает в противника. ";
      this.descriptionForEnemy = " Сель не попадает в вас. ";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Сель поражает противника и наносит " +
        this.currentDamage +
        " единиц урона. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Сель поражает вас и наносит " +
        this.currentDamage +
        " единиц урона. " +
        this.descriptionForEnemy;
      enemy.decreaseHealth(this.currentDamage);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  increaseSpellDuration(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser = " Власть земли не сработала. ";
      this.descriptionForEnemy = " Власть земли не сработаyла. ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      spell.increaseDuration(this.pointsIncreaseDuration);
      this.descriptionForUser =
        " Власть земли увеличила продолжительность заклинания " +
        spell.russianName +
        " на " +
        this.pointsIncreaseDuration +
        ". ";
      this.descriptionForEnemy =
        " Власть земли увеличила продолжительность заклинания " +
        spell.russianName +
        " на " +
        this.pointsIncreaseDuration +
        ". ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на себя Власть земли. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на себя Власть земли. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы наложили на себя Власть земли. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник наложил на себя Власть земли. " + this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  decreaseDamage(points) {
    this.currentDamage -= points;
    if (this.currentDamage < 0) {
      this.currentDamage = 0;
    }
  }

  increaseDamage(points) {
    this.currentDamage += points;
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = " Копье воздуха не попадает в противника. ";
      this.descriptionForEnemy = " Копье воздуха не попадает в вас. ";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Копье воздуха поражает противника и наносит " +
        this.currentDamage +
        " единиц урона. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Копье воздуха поражает вас и наносит " +
        this.currentDamage +
        " единиц урона. " +
        this.descriptionForEnemy;
      enemy.decreaseHealth(this.currentDamage);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
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
  descriptionForUser = "";
  descriptionForEnemy = "";

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Вихрь не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      this.descriptionForEnemy =
        " Вихрь не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вихрь уменьшил вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      this.descriptionForEnemy =
        " Вихрь уменьшил вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      spell.decreaseHitProbability(this.percentDecreaseHitProbability);
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось окружить противника Вихрем. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось окружить вас Вихрем. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы окружили противника Вихрем. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник окружил вас Вихрем. " + this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Корона воздуха не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      this.descriptionForEnemy =
        " Корона воздуха не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      spell.decreaseHitProbability(this.percentDecreaseHitProbability);
      this.descriptionForUser =
        " Корона воздуха уменьшила вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      this.descriptionForEnemy =
        " Корона воздуха уменьшила вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на противника Корону воздуха. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на вас Корону воздуха. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы наложили на противника Корону воздуха. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник наложил на вас Корону воздуха. " + this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  increaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.increaseHitProbability(this.percentIncreaseHitProbability);
  }

  increaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Врата воздуха не оказывают действия на заклинание " +
        spell.russianName +
        ". ";
      this.descriptionForEnemy =
        " Врата воздуха не оказывают действия на заклинание " +
        spell.russianName +
        ". ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      spell.decreaseHitProbability(this.percentIncreaseHitProbability);
      this.descriptionForUser =
        " Врата воздуха увеличили вероятность попадания на " +
        100 * this.percentIncreaseHitProbability +
        " процентов. ";
      this.descriptionForEnemy =
        " Врата воздуха увеличили вероятность попадания на " +
        100 * this.percentIncreaseHitProbability +
        " процентов. ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось открыть Врата воздуха. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось открыть Врата воздуха. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы открыли Врата воздуха. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник открыл Врата воздуха. " + this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Воздушный кокон не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      this.descriptionForEnemy =
        " Воздушный кокон не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      spell.decreaseHitProbability(this.percentDecreaseHitProbability);
      this.descriptionForUser =
        " Воздушный кокон уменьшил вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      this.descriptionForEnemy =
        " Воздушный кокон уменьшил вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось заключить противника в Воздушный кокон. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось заключить вас в Воздушный кокон. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы заключили противника в Воздушный кокон. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник заключил вас в Воздушный кокон. " +
        this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Печать воздуха не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      this.descriptionForEnemy =
        " Печать воздуха не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      spell.decreaseHitProbability(this.percentDecreaseHitProbability);
      this.descriptionForUser =
        " Печать воздуха уменьшила вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      this.descriptionForEnemy =
        " Печать воздуха уменьшила вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на противника Печать воздуха. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на вас Печать воздуха. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы наложили на противника Печать воздуха. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник наложил на вас Печать воздуха. " + this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  deleteEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вы не смогли активировать Ключ воздуха " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник не смог активировать Ключ воздуха " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Ключ воздуха отменяет заклинание " +
        this.spellForDelete.russianName +
        ". " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Ключ воздуха отменяет заклинание " +
        this.spellForDelete.russianName +
        ". " +
        this.descriptionForEnemy;
      enemy.deletePositiveEffect(this.spellForDelete["spellName"]);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  decreaseDamage(points) {
    this.currentDamage -= points;
    if (this.currentDamage < 0) {
      this.currentDamage = 0;
    }
  }

  increaseDamage(points) {
    this.currentDamage += points;
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = " Ударная волна не попадает в противника. ";
      this.descriptionForEnemy = " Ударная волна не попадает в вас. ";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Ударная волна поражает противника и наносит " +
        this.currentDamage +
        " единиц урона. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Ударная волна поражает вас и наносит " +
        this.currentDamage +
        " единиц урона. " +
        this.descriptionForEnemy;
      enemy.decreaseHealth(this.currentDamage);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
  }
};

module.exports.Airpower = class Airpower {
  constructor(duration = 999) {
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Власть воздуха не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      this.descriptionForEnemy =
        " Власть воздуха не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      spell.decreaseHitProbability(this.percentDecreaseHitProbability);
      this.descriptionForUser =
        " Власть воздуха уменьшила вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      this.descriptionForEnemy =
        " Власть воздуха уменьшила вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на себя Власть воздуха. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на себя Власть воздуха. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы наложили на себя Власть воздуха. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник наложил на себя Власть воздуха. " +
        this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  deleteEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вы не смогли применить Касание жизни " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник не смог применить Касание жизни " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Касание жизни отменяет заклинание " +
        this.spellForDelete.russianName +
        ". " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Касание жизни отменяет заклинание " +
        this.spellForDelete.russianName +
        ". " +
        this.descriptionForEnemy;
      user.deleteNegativeEffect(this.spellForDelete["spellName"]);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
  }
};

module.exports.Lifeshild = class Lifeshild {
  constructor(duration = 999) {
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Щит жизни не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      this.descriptionForEnemy =
        " Щит жизни не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      spell.decreaseHitProbability(this.percentDecreaseHitProbability);
      this.descriptionForUser =
        " Щит жизни уменьшил вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      this.descriptionForEnemy =
        " Щит жизни уменьшил вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на себя Щит жизни. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на себя Щит жизни. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы наложили на себя Щит жизни. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник наложил на себя Щит жизни. " + this.descriptionForEnemy;
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
  pointsIncreaseMaxHealth = 15;
  descriptionForUser = "";
  descriptionForEnemy = "";

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  increasePlayerMaxHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = " Вам не удалось применить Корону жизни. ";
      this.descriptionForEnemy = " Вам не удалось применить Корону жизни. ";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Корона жизни увеличивает ваш максимальный запас здоровья на " +
        this.pointsIncreaseMaxHealth +
        " единиц. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Корона жизни увеличивает максимальный запас здоровья противника " +
        this.pointsIncreaseMaxHealth +
        " единиц. " +
        this.descriptionForEnemy;
      user.increaseMaxHealth(this.pointsIncreaseMaxHealth);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  increasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = " Вам не удалось применить Источник жизни. ";
      this.descriptionForEnemy =
        " Противнику не удалось применить Источник жизни. ";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Источник жизни восстанавливает вам " +
        this.pointsIncreaseHealth +
        " единиц здоровья. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Источник жизни восстанавливает противнику " +
        this.pointsIncreaseHealth +
        " единиц здоровья. " +
        this.descriptionForEnemy;
      user.increaseHealth(this.pointsIncreaseHealth);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  increasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = " Сфера восстановления не сработала. ";
      this.descriptionForEnemy = " Сфера восстановления не сработала. ";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Сфера восстановления восстанавливает вам " +
        this.pointsIncreaseHealth +
        " единиц здоровья. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Сфера восстановления восстанавливает противнику " +
        this.pointsIncreaseHealth +
        " единиц здоровья. " +
        this.descriptionForEnemy;
      user.increaseHealth(this.pointsIncreaseHealth);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось окружить себя Сферой восстановления. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось окружить себя Сферой восстановления. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы окружили себя Сферой восстановления. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник окружил себя Сферой восстановления. " +
        this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Печать жизни не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      this.descriptionForEnemy =
        " Печать жизни не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Печать жизни уменьшила вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      this.descriptionForEnemy =
        " Печать жизни уменьшила вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      spell.decreaseHitProbability(this.percentDecreaseHitProbability);
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на себя Печать жизни. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на себя Печать жизни. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы наложили на себя Печать жизни. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник наложил на себя Печать жизни. " + this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  deleteEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вы не смогли применить Ключ жизни " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник не смог применить Ключ жизни " + this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Ключ жизни отменяет заклинание " +
        this.spellForDelete.russianName +
        ". " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Ключ жизни отменяет заклинание " +
        this.spellForDelete.russianName +
        ". " +
        this.descriptionForEnemy;
      user.deleteNegativeEffect(this.spellForDelete["spellName"]);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  increasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = " Поток жизни не сработал. ";
      this.descriptionForEnemy = " Поток жизни не сработал. ";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Поток жизни восстанавливает вам " +
        this.pointsIncreaseHealth +
        " единиц здоровья. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Поток жизни восстанавливает противнику " +
        this.pointsIncreaseHealth +
        " единиц здоровья. " +
        this.descriptionForEnemy;
      user.increaseHealth(this.pointsIncreaseHealth);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось создать Поток жизни. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось создать Поток жизни. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы создали Поток жизни. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник создал Поток жизни. " + this.descriptionForEnemy;
      user.savePositiveEffect(this);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
  }
};

module.exports.Lifepower = class Lifepower {
  constructor(duration = 999) {
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Власть жизни не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      this.descriptionForEnemy =
        " Власть жизни не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Власть жизни уменьшила вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      this.descriptionForEnemy =
        " Власть жизни уменьшила вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      spell.decreaseHitProbability(this.percentIncreaseHitProbability);
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на себя Власть жизни. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на себя Власть жизни. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы наложили на себя Власть жизни. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник наложил на себя Власть жизни. " + this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  deleteEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вы не смогли применить Касание смерти " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник не смог применить Касание смерти " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Касание смерти отменяет заклинание " +
        this.spellForDelete.russianName +
        ". " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Касание смерти отменяет заклинание " +
        this.spellForDelete.russianName +
        ". " +
        this.descriptionForEnemy;
      enemy.deletePositiveEffect(this.spellForDelete["spellName"]);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Пелена смерти не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      this.descriptionForEnemy =
        " Пелена смерти не оказывает действие на заклинание " +
        spell.russianName +
        ". ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Пелена смерти уменьшила вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      this.descriptionForEnemy =
        " Пелена смерти уменьшила вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      spell.decreaseHitProbability(this.percentDecreaseHitProbability);
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на противника Пелену смерти. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на вас Пелену смерти. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы наложили на противника Пелену смерти. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник наложил на вас Пелену смерти. " + this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreasePlayerMaxHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось применить Корону мертвеца. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Вам не удалось применить Корону мертвеца. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Корона мертвеца уменьшает максимальный запас здоровья противника на " +
        this.pointsDecreaseMaxHealth +
        " единиц. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Корона мертвеца уменьшает ваш максимальный запас здоровья " +
        this.pointsDecreaseMaxHealth +
        " единиц. " +
        this.descriptionForEnemy;
      enemy.decreaseMaxHealth(this.pointsDecreaseMaxHealth);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
  }
};

module.exports.Deathsource = class Deathsource {
  actionPoints = 1;
  energyPoints = 1;
  hitProbability = 0.05;
  spellName = "deathsource";
  russianName = "Смерть";
  descriptionForUser = "";
  descriptionForEnemy = "";

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreasePlayerHealth(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser = " Вам не удалось применить Смерть. ";
      this.descriptionForEnemy = " Противнику не удалось применить Смерть. ";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Смерть наносит противнику " +
        enemy.health +
        " урона. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Смерть наносит вам " +
        enemy.health +
        " урона. " +
        this.descriptionForEnemy;
      enemy.decreaseHealth(enemy.health);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
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
  pointsIncreaseDamage = 15;
  descriptionForUser = "";
  descriptionForEnemy = "";

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  increaseSpellDamage(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser =
        " Круг смерти не подействовал на " +
        spell.russianName +
        ". " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Круг смерти не подействовал на " +
        spell.russianName +
        ". " +
        this.descriptionForEnemy;
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Круг смерти увеличил урон от заклинания " +
        spell.russianName +
        " на " +
        this.pointsIncreaseDamage +
        " единиц." +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Круг смерти увеличил урон от заклинания " +
        spell.russianName +
        " на " +
        this.pointsIncreaseDamage +
        " единиц." +
        this.descriptionForEnemy;
      spell.increaseDamage(this.pointsIncreaseDamage);
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на противника Круг смерти. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на вас Круг смерти. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы наложили на противника Круг смерти. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник наложил на вас Круг смерти. " + this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) return;
    spell.decreaseHitProbability(this.percentDecreaseHitProbability);
  }

  decreaseSpellHitProbability(spell) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser = " Печать смерти не сработала. ";
      this.descriptionForEnemy = " Печать смерти не сработала. ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      spell.decreaseHitProbability(this.percentDecreaseHitProbability);
      this.descriptionForUser =
        " Печать смерти уменьшила вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      this.descriptionForEnemy =
        " Печать смерти уменьшила вероятность попадания на " +
        100 * this.percentDecreaseHitProbability +
        " процентов. ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на противника Печать смерти. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на вас Печать смерти. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы наложили на противника Печать смерти. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник наложил на вас Печать смерти. " + this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  deathKeyEffect(spell, enemy) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser = " Ключ от смерти не сработал. ";
      this.descriptionForEnemy = " Ключ от смерти не сработал. ";
      spell.addDescriptionForUser(this.descriptionForUser);
      spell.addDescriptionForEnemy(this.descriptionForEnemy);
    } else {
      if (enemy.health <= spell.currentDamage) {
        this.descriptionForUser =
          " Ключ от смерти не позволяет снизить здоровья противника ниже 1.";
        this.descriptionForEnemy =
          " Ключ от смерти не позволяет снизить ваше здоровье ниже 1.";
        let damage = enemy.health - 1;
        spell.currentDamage = damage;
        spell.addDescriptionForUser(this.descriptionForUser);
        spell.addDescriptionForEnemy(this.descriptionForEnemy);
      }
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на себя Ключ от смерти. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на себя Ключ от смерти. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы наложили на себя Ключ от смерти. " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник наложил на себя Ключ от смерти. " +
        this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
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

  decreaseDamage(points) {
    this.currentDamage -= points;
    if (this.currentDamage < 0) {
      this.currentDamage = 0;
    }
  }

  increaseDamage(points) {
    this.currentDamage += points;
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  deathflowEffect(user, enemy) {
    if (this.activationProbability < Math.random()) {
      this.descriptionForUser = " Поток смерти не сработал. ";
      this.descriptionForEnemy = " Поток смерти не сработал. ";
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Поток смерти отнимает у вас " +
        this.currentDamage +
        " и прибавляет противнику " +
        this.pointsIncreaseHealth +
        " единиц здоровья. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Поток смерти отнимает у противника " +
        this.currentDamage +
        " и прибавляет вам " +
        this.pointsIncreaseHealth +
        " единиц здоровья. " +
        this.descriptionForEnemy;
      user.decreaseHealth(this.currentDamage);
      enemy.increaseHealth(this.pointsIncreaseHealth);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
  }

  saveEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вам не удалось наложить на противника Поток смерти. " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Противнику не удалось наложить на вас Поток смерти. " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Вы наложили на противника Поток смерти " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник наложил на вас Поток смерти. " + this.descriptionForEnemy;
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

  decreaseHitProbability(percent) {
    this.hitProbability = this.hitProbability - percent;
    if (this.hitProbability < 0) {
      this.hitProbability = 0;
    }
  }

  increaseHitProbability(percent) {
    this.hitProbability = this.hitProbability + percent;
    if (this.hitProbability > 1) {
      this.hitProbability = 1;
    }
  }

  addDescriptionForUser(description) {
    this.descriptionForUser = description + this.descriptionForUser;
  }

  addDescriptionForEnemy(description) {
    this.descriptionForEnemy = description + this.descriptionForEnemy;
  }

  deleteEffect(user, enemy) {
    if (this.hitProbability < Math.random()) {
      this.descriptionForUser =
        " Вы не смогли применить Власть смерти " + this.descriptionForUser;
      this.descriptionForEnemy =
        " Противник не смог применить Власть смерти " +
        this.descriptionForEnemy;
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    } else {
      this.descriptionForUser =
        " Власть смерти отменяет заклинание " +
        this.spellForDelete.russianName +
        ". " +
        this.descriptionForUser;
      this.descriptionForEnemy =
        " Власть смерти отменяет заклинание " +
        this.spellForDelete.russianName +
        ". " +
        this.descriptionForEnemy;
      enemy.deletePositiveEffect(this.spellForDelete["spellName"]);
      user.addDescription(this.descriptionForUser);
      enemy.addDescription(this.descriptionForEnemy);
    }
  }
};
