<?php

class firespear extends BattleSpell {
  use ChangeHealth;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "BattleSpell";
    $this->damage = rand(20, 30);
    $this->damageNow = $this->damage;
  }

  public function battleEffect() {
    if ($this->activationProbability()) {
      $this->descriptionForUser = "Метеор не попадает в противника. ".$this->descriptionForUser;
      $this->descriptionForEnemy = "Метеор не попадает в вас. ".$this->descriptionForEnemy;
      return;
    }
    if ($this->damageNow < 0) $this->damageNow = 0;
    $this->descriptionForUser = "Метеор поражает противника и наносит ".$this->damageNow." единиц урона. ".$this->descriptionForUser;
    $this->descriptionForEnemy = "Метеор поражает вас и наносит ".$this->damageNow." единиц урона. ".$this->descriptionForEnemy;
    $this->decreaseEnemyHealth();
  }
}

class fireflow extends BattleSpell {
  use ChangeHealth;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "BattleSpell";
    $this->activationProbability = 0.66;
    $this->damage = rand(25, 35);
    $this->damageNow = $this->damage;
  }

  public function battleEffect() {
    if ($this->activationProbability()) {
      $this->descriptionForUser = "Струя пламени не попадает в противника. ".$this->descriptionForUser;
      $this->descriptionForEnemy = "Струя пламени не попадает в вас. ".$this->descriptionForEnemy;
      return;
    }
    if ($this->damageNow < 0) $this->damageNow = 0;
    $this->descriptionForUser = "Струя пламени поражает противника и наносит ".$this->damageNow." единиц урона. ".$this->descriptionForUser;
    $this->descriptionForEnemy = "Струя пламени поражает вас и наносит ".$this->damageNow." единиц урона. ".$this->descriptionForEnemy;
    $this->decreaseEnemyHealth();
  }
}

class waterspear extends BattleSpell {
  use ChangeHealth;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "BattleSpell";
    $this->damage = rand(5, 15);
    $tableName = $_SESSION['enemy']['id']."debuffs";
    $stmt = $this->pdo->query("SELECT COUNT(*) as debuffElement FROM $tableName");
    $result = $stmt->fetch();
    $this->damageNow = $this->damage + $result['debuffElement']*5;
  }

  public function battleEffect() {
    if ($this->activationProbability()) {
      $this->descriptionForUser = "Осколок льда не попадает в противника. ".$this->descriptionForUser;
      $this->descriptionForEnemy = "Осколок льда не попадает в вас. ".$this->descriptionForEnemy;
      return;
    }
    if ($this->damageNow < 0) $this->damageNow = 0;
    $this->descriptionForUser = "Осколок льда поражает противника и наносит ".$this->damageNow." единиц урона. ".$this->descriptionForUser;
    $this->descriptionForEnemy = "Осколок льда поражает вас и наносит ".$this->damageNow." единиц урона. ".$this->descriptionForEnemy;
    $this->decreaseEnemyHealth();
  }
}

class waterflow extends BattleSpell {
  use ChangeHealth;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "BattleSpell";
    $this->damage = 25;
    $this->damageNow = $this->damage;
  }

  public function battleEffect() {
    if ($this->activationProbability()) {
      $this->descriptionForUser = "Водный поток не попадает в противника. ".$this->descriptionForUser;
      $this->descriptionForEnemy = "Водный поток не попадает в вас. ".$this->descriptionForEnemy;
      return;
    }
    if ($this->damageNow < 0) $this->damageNow = 0;
    $this->descriptionForUser = "Водный поток поражает противника и наносит ".$this->damageNow." единиц урона. ".$this->descriptionForUser;
    $this->descriptionForEnemy = "Водный поток поражает вас и наносит ".$this->damageNow." единиц урона. ".$this->descriptionForEnemy;
    $this->decreaseEnemyHealth();
  }
}

class earthspear extends BattleSpell {
  use ChangeHealth;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "BattleSpell";
    $this->activationProbability = 0.33;
    $this->damage = rand(50, 70);
    $this->damageNow = $this->damage;
  }

  public function battleEffect() {
    if ($this->activationProbability()) {
      $this->descriptionForUser = "Глыба не попадает в противника. ".$this->descriptionForUser;
      $this->descriptionForEnemy = "Глыба не попадает в вас. ".$this->descriptionForEnemy;
      return;
    }
    if ($this->damageNow < 0) $this->damageNow = 0;
    $this->descriptionForUser = "Глыба поражает противника и наносит ".$this->damageNow." единиц урона. ".$this->descriptionForUser;
    $this->descriptionForEnemy = "Глыба поражает вас и наносит ".$this->damageNow." единиц урона. ".$this->descriptionForEnemy;
    $this->decreaseEnemyHealth();
  }
}

class earthflow extends BattleSpell {
  use ChangeHealth;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "BattleSpell";
    $this->activationProbability = 0.25;
    $this->damage = 80;
    $this->damageNow = $this->damage;
  }

  public function battleEffect() {
    if ($this->activationProbability()) {
      $this->descriptionForUser = "Сель не попадает в противника. ".$this->descriptionForUser;
      $this->descriptionForEnemy = "Сель не попадает в вас. ".$this->descriptionForEnemy;
      return;
    }
    if ($this->damageNow < 0) $this->damageNow = 0;
    $this->descriptionForUser = "Сель поражает противника и наносит ".$this->damageNow." единиц урона. ".$this->descriptionForUser;
    $this->descriptionForEnemy = "Сель поражает вас и наносит ".$this->damageNow." единиц урона. ".$this->descriptionForEnemy;
    $this->decreaseEnemyHealth();
  }
}

class airspear extends BattleSpell {
  use ChangeHealth;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "BattleSpell";
    $this->activationProbability = 0.75;
    $this->damage = 25;
    $this->damageNow = $this->damage;
  }

  public function battleEffect() {
    if ($this->activationProbability()) {
      $this->descriptionForUser = "Копье воздуха не попадает в противника. ".$this->descriptionForUser;
      $this->descriptionForEnemy = "Копье воздуха не попадает в вас. ".$this->descriptionForEnemy;
      return;
    }
    if ($this->damageNow < 0) $this->damageNow = 0;
    $this->descriptionForUser = "Копье воздуха поражает противника и наносит ".$this->damageNow." единиц урона. ".$this->descriptionForUser;
    $this->descriptionForEnemy = "Копье воздуха поражает вас и наносит ".$this->damageNow." единиц урона. ".$this->descriptionForEnemy;
    $this->decreaseEnemyHealth();
  }
}

class airflow extends BattleSpell {
  use ChangeHealth;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "BattleSpell";
    $this->activationProbability = 0.5;
    $this->damage = 40;
    $this->damageNow = $this->damage;
  }

  public function battleEffect() {
    if ($this->activationProbability()) {
      $this->descriptionForUser = "Ударная волна не попадает в противника. ".$this->descriptionForUser;
      $this->descriptionForEnemy = "Ударная волна не попадает в вас. ".$this->descriptionForEnemy;
      return;
    }
    if ($this->damageNow < 0) $this->damageNow = 0;
    $this->descriptionForUser = "Ударная волна поражает противника и наносит ".$this->damageNow." единиц урона. ".$this->descriptionForUser;
    $this->descriptionForEnemy = "Ударная волна поражает вас и наносит ".$this->damageNow." единиц урона. ".$this->descriptionForEnemy;
    $this->decreaseEnemyHealth();
  }
}

class fireshild extends Buff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 4;
    $this->dependency["types"] = [0 => "debuff"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onEffectsEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    if ($spell->damage == 0) return;
    $damageReduction = round(($spell->damageNow*40)/100);
    $spell->damageNow = $spell->damageNow - $damageReduction;
    $spell->descriptionForUser .= "Огненный щит снизил урон от заклинания на ".$damageReduction." единиц. ";
    $spell->descriptionForEnemy .= "Огненный щит снизил урон от заклинания на ".$damageReduction." единиц. ";
  }
}

class firecrown extends Buff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 4;
    $this->dependency["types"] = [0 => "BattleSpell"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onSpellCreatingByUserEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $damageRaising = round(($spell->damageNow*25)/100);
    $spell->damageNow = $spell->damageNow + $damageRaising;
    $spell->descriptionForUser .= "Огненный венец увеличил урон от заклинания на ".$damageRaising." единиц. ";
    $spell->descriptionForEnemy .= "Огненный венец увеличил урон от заклинания на ".$damageRaising." единиц. ";
  }
}

class firepower extends Buff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 999;
    $this->dependency["types"] = [0 => "BattleSpell"];
    $this->dependency["elements"] = [0 => "fire"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onSpellCreatingByUserEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $spell->damageNow = $spell->damageNow + 5;
    $spell->descriptionForUser .= "Власть огня увеличила урон от заклинания на 5 единиц. ";
    $spell->descriptionForEnemy .= "Власть огня увеличила урон от заклинания на 5 единиц. ";
  }
}

class watershild extends Buff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 6;
    $this->dependency["types"] = [0 => "BattleSpell"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}

  public function onSpellCreatingByEnemyEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $damageReduction = round(($spell->damageNow*40)/100);
    $spell->damageNow = $spell->damageNow - $damageReduction;
    $spell->descriptionForUser .= "Стена льда снизила урон от заклинания на ".$damageReduction." единиц. ";
    $spell->descriptionForEnemy .= "Стена льда снизила урон от заклинания на ".$damageReduction." единиц. ";
  }
}

class watercrown extends Buff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 6;
    $this->dependency["types"] = [0 => "debuff"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onEffectsEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    if ($spell->damage == 0) return;
    $damageReduction = round($spell->damageNow/2);
    $spell->damageNow = $spell->damageNow - $damageReduction;
    $spell->descriptionForUser .= "Корона воды снизила урон от заклинания на ".$damageReduction." единиц. ";
    $spell->descriptionForEnemy .= "Корона воды снизила урон от заклинания на ".$damageReduction." единиц. ";
  }
}

class watersphere extends Buff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 2;
    $this->dependency["types"] = [0 => "BattleSpell"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}

  public function onSpellCreatingByEnemyEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $spell->damageNow = 0;
    $spell->descriptionForUser .= "Ледяная сфера заблокировала урон от заклинания. ";
    $spell->descriptionForEnemy .= "Ледяная сфера заблокировала урон от заклинания. ";
  }
}

class waterstamp extends Buff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 6;
    $this->dependency["types"] = [0 => "BattleSpell"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}

  public function onSpellCreatingByEnemyEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $damageReduction = round(($spell->damageNow*33)/100);
    $spell->damageNow = $spell->damageNow - $damageReduction;
    $spell->descriptionForUser .= "Печать воды снизила урон от заклинания на ".$damageReduction." единиц. ";
    $spell->descriptionForEnemy .= "Печать воды снизила урон от заклинания на ".$damageReduction." единиц. ";
  }
}

class waterpower extends Buff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 999;
    $this->dependency["types"] = [0 => "buff"];
    $this->dependency["elements"] = [0 => "water"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onSpellCreatingByUserEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $spell->duration = $spell->duration + 2;
    $spell->descriptionForUser .= "Власть воды увеличила время действия заклинания на два хода. ";
    $spell->descriptionForEnemy .= "Власть воды увеличила время действия заклинания на два хода. ";
  }
}

class earthshild extends Buff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 8;
    $this->dependency["types"] = [0 => "debuff", 1 => "BattleSpell"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}

  public function onSpellCreatingByEnemyEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $spell->damageNow = $spell->damageNow - 10;
    $spell->descriptionForUser .= "Скала снизила урон от заклинания на 10 единиц. ";
    $spell->descriptionForEnemy .= "Скала снизила урон от заклинания на 10 единиц. ";
  }

  public function onEffectsEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    if ($spell->damage == 0) return;
    $spell->damageNow = $spell->damageNow - 10;
    $spell->descriptionForUser .= "Скала снизила урон от заклинания на 10 единиц. ";
    $spell->descriptionForEnemy .= "Скала снизила урон от заклинания на 10 единиц. ";
  }
}

class earthcrown extends Buff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 6;
    $this->dependency["types"] = [0 => "BattleSpell"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onSpellCreatingByUserEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $spell->activationProbability = $spell->activationProbability + 0.15;
    $spell->descriptionForUser .= "Корона земли увеличила вероятность попадания по противнику на 15%. ";
    $spell->descriptionForEnemy .= "Корона земли увеличила вероятность попадания по вам на 15%. ";
  }
}

class earthsource extends Buff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 2;
    $this->dependency["types"] = [0 => "debuff", 1 => "BattleSpell"];
    $this->dependency["elements"] = [0 => "earth"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onSpellCreatingByUserEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $spell->damageNow = $spell->damageNow + 15;
    $spell->descriptionForUser .= "Земные недра увеличили урон от заклинания на 15 единиц. ";
    $spell->descriptionForEnemy .= "Земные недра увеличили урон от заклинания на 15 единиц. ";
  }

  public function onEffectsEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $spell->duration = $spell->duration + 1;
    $spell->descriptionForUser .= "Земные недра увеличили длительность заклинания на один ход. ";
    $spell->descriptionForEnemy .= "Земные недра увеличили длительность заклинания на один ход. ";
  }
}

class earthstamp extends Buff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 2;
    $this->dependency["types"] = [0 => "BattleSpell"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}

  public function onSpellCreatingByEnemyEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $damageReduction = round($spell->damageNow/2);
    $spell->damageNow = $spell->damageNow - $damageReduction;
    $spell->descriptionForUser .= "Печать земли уменьшает урон от заклинания на ".$damageReduction." единиц. ";
    $spell->descriptionForEnemy .= "Печать земли уменьшает урон от заклинания на ".$damageReduction." единиц. ";
  }
}

class earthpower extends Buff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 4;
    $this->activationProbability = 0.5;
    $this->dependency["types"] = [0 => "buff"];
    $this->dependency["elements"] = [0 => "earth"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onSpellCreatingByUserEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    if ($spell->spellChanged == "yes") return;
    $spell->spellChanged = "yes";
    $spell->duration = $spell->duration + 4;
    $spell->descriptionForUser .= "Власть земли увеличила продолжительность заклинания на четыре хода. ";
    $spell->descriptionForEnemy .= "Власть земли увеличила продолжительность заклинания на четыре хода. ";
  }
}

class airsource extends Buff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 6;
    $this->dependency["types"] = [0 => "BattleSpell", 1 => "debuff"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onSpellCreatingByUserEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    if ($spell->type == "debuff") {
      $spell->saveEffectProbability = $spell->saveEffectProbability + 0.1;
    } else if ($spell->type == "BattleSpell") {
      $spell->activationProbability = $spell->activationProbability + 0.1;
    }
    $spell->descriptionForUser .= "Врата воздуха увеличили вероятность попадания заклинанием на 10% ";
    $spell->descriptionForEnemy .= "Врата воздуха увеличили вероятность попадания заклинанием на 10% ";
  }
}

class airpower extends Buff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 999;
    $this->dependency["types"] = [0 => "BattleSpell"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}

  public function onSpellCreatingByEnemyEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $spell->activationProbability = $spell->activationProbability - 0.2;
    $spell->descriptionForUser .= "Власть воздуха уменьшила вероятность попадания заклинанием на 20% ";
    $spell->descriptionForEnemy .= "Власть воздуха уменьшила вероятность попадания заклинанием на 20% ";
  }
}

class lifeshild extends Buff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 999;
    $this->dependency["types"] = [0 => "debuff", 1 => "BattleSpell"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}

  public function onSpellCreatingByEnemyEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    if ($spell->damageMaxHealth === 0) return;
    $spell->damageMaxHealth = 0;
    $spell->descriptionForUser .= "Щит жизни не позволил уменьшить максимальный запас здоровья. ";
    $spell->descriptionForEnemy .= "Щит жизни не позволил уменьшить максимальный запас здоровья. ";
  }

  public function onEffectsEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    if ($spell->damageMaxHealth === 0) return;
    $spell->damageMaxHealth = 0;
    $spell->descriptionForUser .= "Щит жизни не позволил уменьшить максимальный запас здоровья. ";
    $spell->descriptionForEnemy .= "Щит жизни не позволил уменьшить максимальный запас здоровья. ";
  }
}

class lifesphere extends Buff {
  use ChangeHealth, ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 5;
    $this->heal = 10;
    $this->healNow = $this->heal;
  }
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onUserEffect() {
    if ($this->activationProbability()) return;
    $this->increaseUserHealth();
    $this->descriptionForUser = "Сфера восстановления пополнила ваш запас здоровья на ".$this->healNow." единиц. ".$this->descriptionForUser;
    $this->descriptionForEnemy = "Сфера восстановления пополнила запас здоровья противника на ".$this->healNow." единиц. ".$this->descriptionForEnemy;
  }

  public function onEnemyEffect() {
    if ($this->activationProbability()) return;
    $this->increaseEnemyHealth();
    $this->descriptionForUser = "Сфера восстановления пополнила запас здоровья противника на ".$this->healNow." единиц. ".$this->descriptionForUser;
    $this->descriptionForEnemy = "Сфера восстановления пополнила ваш запас здоровья на ".$this->healNow." единиц. ".$this->descriptionForEnemy;
  }
}

class lifestamp extends Buff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 8;
    $this->dependency["types"] = [0 => "debuff"];
    $this->dependency["elements"] = [0 => "death"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}

  public function onSpellCreatingByEnemyEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $spell->saveEffectProbability = 0;
    $spell->descriptionForUser .= "Печать жизни не позволила наложить дебаф смерти на противника. ";
    $spell->descriptionForEnemy .= "Печать жизни не позволила наложить на вас дебаф смерти. ";
  }
}

class lifeflow extends Buff {
  use ChangeHealth, ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 2;
    $this->heal = 25;
    $this->healNow = $this->heal;
  }

  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onEnemyEffect() {
    if ($this->activationProbability()) return;
    $this->increaseEnemyHealth();
    $this->descriptionForUser = "Поток жизни пополнил запас здоровья противника на ".$this->healNow." единиц. ".$this->descriptionForUser;
    $this->descriptionForEnemy = "Поток жизни пополнил ваш запас здоровья на ".$this->healNow." единиц. ".$this->descriptionForEnemy;
  }

  public function onUserEffect() {
    if ($this->activationProbability()) return;
    $this->increaseUserHealth();
    $this->descriptionForUser = "Поток жизни пополнил ваш запас здоровья на ".$this->healNow." единиц. ".$this->descriptionForUser;
    $this->descriptionForEnemy = "Поток жизни пополнил запас здоровья противника на ".$this->healNow." единиц. ".$this->descriptionForEnemy;
  }
}

class lifepower extends Buff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 999;
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}
}

class deathkey extends Buff {
  use ChangeHealth, ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "buff";
    $this->duration = 4;
    $this->activationProbability = 0.5;
  }

  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onUserEffect() {
    if ($this->activationProbability()) return;
    $stmt = $this->pdo->query("SELECT currentHealth FROM heroes WHERE id = ".$_SESSION['user']['id']);
    $health = $stmt->fetch();
    if ($health['currentHealth'] <= 0) {
      $stmt = $this->pdo->exec("UPDATE heroes SET currentHealth = 1 WHERE id = ".$_SESSION['user']['id']);
    }
    $this->descriptionForUser .= "Ключ от смерти восстановил ваше здоровье до единицы. ";
    $this->descriptionForEnemy .= "Ключ от смерти восстановил здоровье противника до единицы. ";
  }

  public function onEnemyEffect() {
    if ($this->activationProbability()) return;
    $stmt = $this->pdo->query("SELECT currentHealth FROM heroes WHERE id = ".$_SESSION['enemy']['id']);
    $health = $stmt->fetch();
    if ($health['currentHealth'] <= 0) {
      $stmt = $this->pdo->exec("UPDATE heroes SET currentHealth = 1 WHERE id = ".$_SESSION['enemy']['id']);
    }
    $this->descriptionForUser .= "Ключ от смерти восстановил здоровье противника до единицы. ";
    $this->descriptionForEnemy .= "Ключ от смерти восстановил ваше здоровье до единицы. ";
  }
}

class firesource extends Debuff {
  use ChangeHealth, ChangeDecrease;
  function __construct($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "debuff";
    $this->duration = 3;
    $this->damage = rand(5, 12);
    $this->damageNow = $this->damage;
  }

  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onUserEffect() {
    if ($this->activationProbability()) return;
    $this->decreaseUserHealth();
    $this->descriptionForUser = "Вулкан наносит вам ".$this->damageNow." единиц урона. ".$this->descriptionForUser;
    $this->descriptionForEnemy = "Вулкан наносит противнику ".$this->damageNow." единиц урона. ".$this->descriptionForEnemy;
  }

  public function onEnemyEffect() {
    if ($this->activationProbability()) return;
    $this->decreaseEnemyHealth();
    $this->descriptionForUser = "Вулкан наносит противнику ".$this->damageNow." единиц урона. ".$this->descriptionForUser;
    $this->descriptionForEnemy = "Вулкан наносит вам ".$this->damageNow." единиц урона. ".$this->descriptionForEnemy;
  }
}

class firesphere extends Debuff {
  use ChangeHealth, ChangeDecrease;
  function __construct($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "debuff";
    $this->duration = 999;
    $this->damage = rand(5, 10);
    $this->damageNow = $this->damage;
    $this->dependency["types"] = [0 => "BattleSpell"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}

  public function onSpellCreatingByEnemyEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $this->decreaseEnemyHealth();
    $spell->descriptionForUser .= "Огненная клетка наносит противнику ".$this->damageNow." единиц урона. ";
    $spell->descriptionForEnemy .= "Огненная клетка наносит вам ".$this->damageNow." единиц урона. ";
  }
}

class earthsphere extends Debuff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "debuff";
    $this->duration = 10;
    $this->dependency["types"] = [0 => "BattleSpell", 1 => "debuff"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}

  public function onSpellCreatingByEnemyEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    if ($spell->type == "BattleSpell") {
      $spell->activationProbability = $spell->activationProbability + 0.2;
    } else if ($spell->type == "debuff") {
      $spell->saveEffectProbability = $spell->saveEffectProbability + 0.2;
    }
    $spell->descriptionForUser .= "Склеп увеличил вероятность попадания заклинанием на 20%. ";
    $spell->descriptionForEnemy .= "Склеп увеличил вероятность попадания заклинанием на 20%. ";
  }
}

class airshild extends Debuff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "debuff";
    $this->duration = 4;
    $this->dependency["types"] = [0 => "BattleSpell"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onSpellCreatingByUserEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $spell->activationProbability = $spell->activationProbability - 0.33;
    $spell->descriptionForUser .= "Вихрь снизил вероятность попадания заклинанием на 33%. ";
    $spell->descriptionForEnemy .= "Вихрь снизил вероятность попадания заклинанием на 33%. ";
  }
}

class aircrown extends Debuff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "debuff";
    $this->duration = 4;
    $this->dependency["types"] = [0 => "buff"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onSpellCreatingByUserEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $spell->saveEffectProbability = $spell->saveEffectProbability - 0.33;
    $spell->descriptionForUser .= "Корона воздуха снизила вероятность успешного наложения заклинания на 33%. ";
    $spell->descriptionForEnemy .= "Корона воздуха снизила вероятность успешного наложения заклинания на 33%. ";
  }
}

class airsphere extends Debuff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "debuff";
    $this->duration = 4;
    $this->dependency["types"] = [0 => "debuff"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onSpellCreatingByUserEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $spell->saveEffectProbability = $spell->saveEffectProbability - 0.33;
    $spell->descriptionForUser .= "Воздушный кокон снизил вероятность успешного наложения заклинания на 33%. ";
    $spell->descriptionForEnemy .= "Воздушный кокон снизил вероятность успешного наложения заклинания на 33%. ";
  }
}

class airstamp extends Debuff{
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "debuff";
    $this->duration = 10;
    $this->dependency["types"] = [0 => "buff"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onSpellCreatingByUserEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $spell->saveEffectProbability = $spell->saveEffectProbability - 0.1;
    $spell->descriptionForUser .= "Печать воздуха снизила вероятность успешного наложения заклинания на 10%. ";
    $spell->descriptionForEnemy .= "Печать воздуха снизила вероятность успешного наложения заклинания на 10%. ";
  }
}

class deathshild extends Debuff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "debuff";
    $this->duration = 4;
    $this->dependency["types"] = [0 => "buff"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onSpellCreatingByUserEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $spell->saveEffectProbability = $spell->saveEffectProbability - 0.5;
    $spell->descriptionForUser .= "Пелена смерти снизила вероятность успешного наложения заклинания на 50%. ";
    $spell->descriptionForEnemy .= "Печать воздуха снизила вероятность успешного наложения заклинания на 50%. ";
  }
}

class deathsphere extends Debuff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "debuff";
    $this->duration = 2;
    $this->dependency["types"] = [0 => "debuff"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onEffectsEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    if ($spell->damage == 0) return;
    $spell->damageNow = $spell->damageNow + 15;
    $spell->descriptionForUser .= "Круг смерти увеличил урон от заклинания на 15 единиц. ";
    $spell->descriptionForEnemy .= "Круг смерти увеличил урон от заклинания на 15 единиц. ";
  }
}

class deathstamp extends Debuff {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "debuff";
    $this->duration = 2;
    $this->dependency["types"] = [0 => "buff"];
    $this->dependency["elements"] = [0 => "All"];
  }

  public function onUserEffect() {}
  public function onEnemyEffect() {}
  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onSpellCreatingByUserEffect(Spell $spell) {
    if ($this->activationProbability()) return;
    $spell->saveEffectProbability = 0;
    $spell->descriptionForUser .= "Печать смерти заблокировала заклинание. ";
    $spell->descriptionForEnemy .= "Печать смерти заблокировала заклинание. ";
  }
}

class deathflow extends Debuff {
  use ChangeHealth, ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "debuff";
    $this->duration = 5;
    $this->heal = 5;
    $this->healNow = $this->heal;
    $this->damage = 5;
    $this->damageNow = $this->damage;
  }

  public function onEffectsEffect(Spell $spell) {}
  public function onSpellCreatingByUserEffect(Spell $spell) {}
  public function onSpellCreatingByEnemyEffect(Spell $spell) {}

  public function onUserEffect() {
    if ($this->activationProbability()) return;
    $this->decreaseUserHealth();
    $this->increaseEnemyHealth();
    $this->descriptionForUser .= "Поток смерти отнял ".$this->damageNow." единиц здоровья у вас и восстановил ".$this->healNow." единиц здоровья противнику. ";
    $this->descriptionForEnemy .= "Поток смерти отнял ".$this->damageNow." единиц здоровья у противника и восстановил ".$this->healNow." единиц здоровья вам. ";
  }

  public function onEnemyEffect() {
    if ($this->activationProbability()) return;
    $this->decreaseEnemyHealth();
    $this->increaseUserHealth();
    $this->descriptionForUser .= "Поток смерти отнял ".$this->damageNow." единиц здоровья у противника и восстановил ".$this->healNow." единиц здоровья вам. ";
    $this->descriptionForEnemy .= "Поток смерти отнял ".$this->damageNow." единиц здоровья у вас и восстановил ".$this->healNow." единиц здоровья противнику. ";
  }
}

class firekey extends Despell {
  function __construct ($element, $form, $pdo, $despellElement, $despellForm) {
    parent::__construct($element, $form, $pdo, $despellElement, $despellForm);
    $this->type = "despell";
    $this->descriptionForUser .= "Ключ огня отменяет заклинание ".$this->dictionary[$this->despellElement.$this->despellForm].". ";
    $this->descriptionForEnemy .= "Ключ огня отменяет заклинание ".$this->dictionary[$this->despellElement.$this->despellForm].". ";
  }
}

class watersource extends Despell {
  function __construct ($element, $form, $pdo, $despellElement, $despellForm) {
    parent::__construct($element, $form, $pdo, $despellElement, $despellForm);
    $this->type = "despell";
    $this->activationProbability = 0.66;
    $this->descriptionForUser .= "Родник отменяет заклинание ".$this->dictionary[$this->despellElement.$this->despellForm].". ";
    $this->descriptionForEnemy .= "Родник отменяет заклинание ".$this->dictionary[$this->despellElement.$this->despellForm].". ";
  }
}

class waterkey extends Despell {
  function __construct ($element, $form, $pdo, $despellElement, $despellForm) {
    parent::__construct($element, $form, $pdo, $despellElement, $despellForm);
    $this->type = "despell";
    $this->descriptionForUser .= "Ключ воды отменяет заклинание ".$this->dictionary[$this->despellElement.$this->despellForm].". ";
    $this->descriptionForEnemy .= "Ключ воды отменяет заклинание ".$this->dictionary[$this->despellElement.$this->despellForm].". ";
  }
}

class earthkey extends Despell {
  function __construct ($element, $form, $pdo, $despellElement, $despellForm) {
    parent::__construct($element, $form, $pdo, $despellElement, $despellForm);
    $this->type = "despell";
    $this->descriptionForUser .= "Ключ земли отменяет заклинание ".$this->dictionary[$this->despellElement.$this->despellForm].". ";
    $this->descriptionForEnemy .= "Ключ земли отменяет заклинание ".$this->dictionary[$this->despellElement.$this->despellForm].". ";
  }
}

class airkey extends Despell {
  function __construct ($element, $form, $pdo, $despellElement, $despellForm) {
    parent::__construct($element, $form, $pdo, $despellElement, $despellForm);
    $this->type = "despell";
    $this->descriptionForUser .= "Ключ воздуха отменяет заклинание ".$this->dictionary[$this->despellElement.$this->despellForm].". ";
    $this->descriptionForEnemy .= "Ключ воздуха отменяет заклинание ".$this->dictionary[$this->despellElement.$this->despellForm].". ";
  }
}

class lifespear extends Despell {
  function __construct ($element, $form, $pdo, $despellElement, $despellForm) {
    parent::__construct($element, $form, $pdo, $despellElement, $despellForm);
    $this->type = "despell";
    $this->descriptionForUser .= "Касание жизни отменяет заклинание ".$this->dictionary[$this->despellElement.$this->despellForm].". ";
    $this->descriptionForEnemy .= "Касание жизни отменяет заклинание ".$this->dictionary[$this->despellElement.$this->despellForm].". ";
  }
}

class lifekey extends Despell {
  function __construct ($element, $form, $pdo, $despellElement, $despellForm) {
    parent::__construct($element, $form, $pdo, $despellElement, $despellForm);
    $this->type = "despell";
    $this->activationProbability = 0.66;
    $this->descriptionForUser .= "Ключ жизни отменяет заклинание ".$this->dictionary[$this->despellElement.$this->despellForm].". ";
    $this->descriptionForEnemy .= "Ключ жизни отменяет заклинание ".$this->dictionary[$this->despellElement.$this->despellForm].". ";
  }
}

class deathspear extends Despell {
  function __construct ($element, $form, $pdo, $despellElement, $despellForm) {
    parent::__construct($element, $form, $pdo, $despellElement, $despellForm);
    $this->type = "despell";
    $this->activationProbability = 0.66;
    $this->descriptionForUser .= "Касание смерти отменяет заклинание ".$this->dictionary[$this->despellElement.$this->despellForm].". ";
    $this->descriptionForEnemy .= "Касание смерти отменяет заклинание ".$this->dictionary[$this->despellElement.$this->despellForm].". ";
  }
}

class deathpower extends Despell {
  function __construct ($element, $form, $pdo, $despellElement, $despellForm) {
    parent::__construct($element, $form, $pdo, $despellElement, $despellForm);
    $this->type = "despell";
    $this->activationProbability = 0.66;
    $this->descriptionForUser .= "Власть смерти отменяет заклинание ".$this->dictionary[$this->despellElement.$this->despellForm].". ";
    $this->descriptionForEnemy .= "Власть смерти отменяет заклинание ".$this->dictionary[$this->despellElement.$this->despellForm].". ";
  }
}

class firestamp extends Other {
  use ChangeDecrease;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "other";
  }

  public function mainEffect() {
    $tableName = $_SESSION['enemy']['id']."debuffs";
    $stmt = $this->pdo->query("SELECT * FROM $tableName");
    while ($row = $stmt->fetch()) {
      $this->increaseDuration($tableName, $row['id'], 2);
    }
  }

}

class lifecrown extends Other {
  use ChangeHealth;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "other";
    $this->healMaxHealth = 15;
  }

  public function mainEffect() {
    if ($this->activationProbability()) return;
    $this->increaseUserMaxHealth();
    $this->descriptionForUser .= "Корона жизни увеличивает ваш максимальный запас здоровья на 15 единиц. ";
    $this->descriptionForEnemy .= "Корона жизни увеличивает максимальный запас здоровья противника на 15 единиц. ";
  }
}

class lifesource extends Other {
  use ChangeHealth;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "other";
    $this->heal = 30;
    $this->healNow = $this->heal;
  }

  public function mainEffect() {
    if ($this->activationProbability()) return;
    $this->increaseUserHealth();
    $this->descriptionForUser .= "Источник жизни восстанавливает вам 30 единиц здоровья. ";
    $this->descriptionForEnemy .= "Источник жизни восстанавливает противнику 30 единиц здоровья. ";
  }
}

class deathcrown extends Other {
  use ChangeHealth;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "other";
    $this->damageMaxHealth = 15;
    $this->damage = 15;
    $this->damageNow = $this->damage;
  }

  public function mainEffect() {
    if ($this->activationProbability()) return;
    $this->decreaseEnemyHealth();
    $this->decreaseEnemyMaxHealth();
    $this->descriptionForUser .= "Корона мертвеца уменьшает максимальный запас здоровья противника на 15 единиц. ";
    $this->descriptionForEnemy .= "Корона мертвеца уменьшает ваш максимальный запас здоровьяна 15 единиц. ";
  }
}

class deathsource extends Other {
  use ChangeHealth;
  function __construct ($element, $form, $pdo) {
    parent::__construct($element, $form, $pdo);
    $this->type = "other";
    $this->damage = 999;
    $this->damageNow = $this->damage;
    $this->activationProbability = 0.05;
  }

  public function mainEffect() {
    $this->decreaseEnemyHealth();
    $this->descriptionForUser .= "Смерть убивает противника. ";
    $this->descriptionForEnemy .= "Смерть вас убивает. ";
  }
}
