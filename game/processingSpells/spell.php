<?php

abstract class Spell {
  public $pdo;
  public $element;
  public $form;
  public $type;
  public $influences = [];
  public $damageMaxHealth = 0;
  public $healMaxHealth = 0;
  public $damage = 0;
  public $damageNow;
  public $heal = 0;
  public $healNow = 0;
  public $activationProbability = 1;
  public $descriptionForUser = "";
  public $descriptionForEnemy = "";
  public $dictionary = [
    "firespear" => "Метеор",
    "fireshild" => "Огненный щит",
    "firecrown" => "Огненный венец",
    "firesource" => "Вулкан",
    "firesphere" => "Огненная клетка",
    "firestamp" => "Клеймо огня",
    "firekey" => "Ключ огня",
    "fireflow" => "Струя пламени",
    "firepower" => "Власть огня",
    "waterspear" => "Осколок льда",
    "watershild" => "Стена льда",
    "watercrown" => "Корона воды",
    "watersource" => "Родник",
    "watersphere" => "Ледяная сфера",
    "waterstamp" => "Печать воды",
    "waterkey" => "Ключ воды",
    "waterflow" => "Водный поток",
    "waterpower" => "Власть воды",
    "earthspear" => "Глыба",
    "earthshild" => "Скала",
    "earthcrown" => "Корона земли",
    "earthsource" => "Земные недра",
    "earthsphere" => "Склеп",
    "earthstamp" => "Печать земли",
    "earthkey" => "Ключ земли",
    "earthflow" => "Сель",
    "earthpower" => "Власть земли",
    "airspear" => "Копье воздуха",
    "airshild" => "Вихрь",
    "aircrown" => "Корона воздуха",
    "airsource" => "Врата воздуха",
    "airsphere" => "Воздушный кокон",
    "airstamp" => "Печать воздуха",
    "airkey" => "Ключ воздуха",
    "airflow" => "Ударная волна",
    "airpower" => "Власть воздуха",
    "lifespear" => "Касание жизни",
    "lifeshild" => "Щит жизни",
    "lifecrown" => "Корона жизни",
    "lifesource" => "Источник жизни",
    "lifesphere" => "Сфера восстановления",
    "lifestamp" => "Печать жизни",
    "lifekey" => "Ключ жизни",
    "lifeflow" => "Поток жизни",
    "lifepower" => "Власть жизни",
    "deathspear" => "Касание смерти",
    "deathshild" => "Пелена смерти",
    "deathcrown" => "Корона мертвеца",
    "deathsource" => "Смерть",
    "deathsphere" => "Круг смерти",
    "deathstamp" => "Печать смерти",
    "deathkey" => "Ключ от смерти",
    "deathflow" => "Поток смерти",
    "deathpower" => "Власть смерти"
  ];

  function __construct($element, $form, $pdo) {
    $this->element = $element;
    $this->form = $form;
    $this->pdo = $pdo;
  }

  public function activationProbability () {
    $chance = rand(0, 100)/100;
    if ($chance <= $this->activationProbability) return false;
    return true;
  }

}

abstract class BattleSpell extends Spell {
  abstract function battleEffect();
}

abstract class Other extends Spell {
  abstract function mainEffect();
}

abstract class Effect extends Spell {
  public $duration;
  public $dependency = [];
  public $saveEffectProbability = 1;

  public function writeEffect () {
    if ($this->saveEffectProbability()) return;

    if ($this->type == "buff") {
      $tableName = $_SESSION['user']['id']."buffs";

      $stmt = $this->pdo->query("SELECT * FROM $tableName");
      while ($row = $stmt->fetch()) {
        if ($row['buffForm'] == $this->form && $row['buffElement'] == $this->element) {
          $newDuration = floor($this->duration/2);
          $this->increaseDuration($tableName, $row['id'], $newDuration);
          return;
        }
      }

      $ElementName = '"'.$this->element.'"';
      $FormName = '"'.$this->form.'"';
      $stmt = $this->pdo->query("SELECT COUNT(*) as buffElement FROM $tableName");
      $result = $stmt->fetch();
      if ($result['buffElement'] >= 6) return;
      $stmt = $this->pdo->exec("INSERT INTO $tableName SET buffForm = $FormName, buffElement = $ElementName, duration = $this->duration");
    } else if ($this->type == "debuff") {
      $tableName = $_SESSION['enemy']['id']."debuffs";

      $stmt = $this->pdo->query("SELECT * FROM $tableName");
      while ($row = $stmt->fetch()) {
        if ($row['debuffForm'] == $this->form && $row['debuffElement'] == $this->element) {
          $newDuration = floor($this->duration/2);
          $this->increaseDuration($tableName, $row['id'], $newDuration);
          return;
        }
      }

      $ElementName = '"'.$this->element.'"';
      $FormName = '"'.$this->form.'"';
      $stmt = $this->pdo->query("SELECT COUNT(*) as debuffElement FROM $tableName");
      $result = $stmt->fetch();
      if ($result['debuffElement'] >= 6) return;
      $stmt = $this->pdo->exec("INSERT INTO $tableName SET debuffElement = $ElementName, debuffForm = $FormName, duration = $this->duration");
    }

  }

  public function saveEffectProbability() {
    $chance = rand(0, 100)/100;
    if ($chance <= $this->saveEffectProbability) return false;
    return true;
  }

}

abstract class Buff extends Effect {
  abstract function onUserEffect();
  abstract function onEnemyEffect();

  abstract function onSpellCreatingByUserEffect(Spell $spell);
  abstract function onSpellCreatingByEnemyEffect(Spell $spell);

  abstract function onEffectsEffect(Spell $spell);
}

abstract class Debuff extends Effect {
  abstract function onUserEffect();
  abstract function onEnemyEffect();

  abstract function onSpellCreatingByUserEffect(Spell $spell);
  abstract function onSpellCreatingByEnemyEffect(Spell $spell);

  abstract function onEffectsEffect(Spell $spell);
}

abstract class Despell extends Spell {
  public $despellForm;
  public $despellElement;

  function __construct($element, $form, $pdo, $despellElement, $despellForm) {
    $this->element = $element;
    $this->form = $form;
    $this->despellForm = $despellForm;
    $this->despellElement = $despellElement;
    $this->pdo = $pdo;
  }

  public function despellEffect() {
    if ($this->activationProbability()) return;

    $tableName = $_SESSION['user']['id'].'debuffs';
    $stmt = $this->pdo->query("SELECT * FROM $tableName");
    while ($row = $stmt->fetch()) {
      if ($row['debuffForm'] == $this->despellForm && $row['debuffElement'] == $this->despellElement) {
        $stmt2 = $this->pdo->exec("DELETE FROM $tableName WHERE id = ".$row['id']);
      }
    }

    $tableName = $_SESSION['enemy']['id'].'buffs';
    $stmt = $this->pdo->query("SELECT * FROM $tableName");
    while ($row = $stmt->fetch()) {
      if ($row['buffForm'] == $this->despellForm && $row['buffElement'] == $this->despellElement) {
        $stmt2 = $this->pdo->exec("DELETE FROM $tableName WHERE id = ".$row['id']);
      }
    }

  }

}

trait ChangeDecrease {
  public function increaseDuration($tableName, $id, $increase) {
    $stmt = $this->pdo->query("SELECT duration FROM $tableName WHERE id = $id");
    $result = $stmt->fetch();
    $duration = $result['duration'] + $increase;
    $stmt = $this->pdo->exec("UPDATE $tableName SET duration = $duration WHERE id = $id");
  }

  public function decreaseDuration($tableName, $id, $decrease) {
    $stmt = $this->pdo->query("SELECT duration FROM $tableName WHERE id = $id");
    $result = $stmt->fetch();
    $duration = $result['duration'] - $decrease;
    if ($duration === 0) {
      $this->deleteEffect($tableName, $id);
    } else {
      $stmt = $this->pdo->exec("UPDATE $tableName SET duration = $duration WHERE id = $id");
    }
  }

  public function deleteEffect($tableName, $id) {
    $stmt = $this->pdo->exec("DELETE FROM $tableName WHERE id = ".$id);
  }
}

trait ChangeHealth {

  public function decreaseEnemyHealth () {
    $stmt = $this->pdo->query("SELECT currentHealth FROM heroes WHERE id = ".$_SESSION['enemy']['id']);
    $currenthealth = $stmt->fetch();

    if ($this->damageNow < 0) $this->damageNow = 0;
    $health = $currenthealth['currentHealth'] - $this->damageNow;
    if ($health < 0) $health = 0;

    $stmt = $this->pdo->exec("UPDATE heroes SET currentHealth = ".$health." WHERE id = ".$_SESSION['enemy']['id']);
  }

  public function decreaseUserHealth () {
    $stmt = $this->pdo->query("SELECT currentHealth FROM heroes WHERE id = ".$_SESSION['user']['id']);
    $currenthealth = $stmt->fetch();

    if ($this->damageNow < 0) $this->damageNow = 0;
    $health = $currenthealth['currentHealth'] - $this->damageNow;
    if ($health < 0) $health = 0;

    $stmt = $this->pdo->exec("UPDATE heroes SET currentHealth = ".$health." WHERE id = ".$_SESSION['user']['id']);
  }

  public function increaseUserHealth () {
    $stmt = $this->pdo->query("SELECT currentHealth FROM heroes WHERE id = ".$_SESSION['user']['id']);
    $currentHealth = $stmt->fetch();

    if ($this->healNow < 0) $this->healNow = 0;
    $health = $currentHealth['currentHealth'] + $this->healNow;

    $stmt = $this->pdo->query("SELECT maxHealth FROM heroes WHERE id = ".$_SESSION['user']['id']);
    $maxHealth = $stmt->fetch();

    if ($health > $maxHealth['maxHealth']) $health = $maxHealth['maxHealth'];

    $stmt = $this->pdo->exec("UPDATE heroes SET currentHealth = ".$health." WHERE id = ".$_SESSION['user']['id']);
  }

  public function increaseEnemyHealth () {
    $stmt = $this->pdo->query("SELECT currentHealth FROM heroes WHERE id = ".$_SESSION['enemy']['id']);
    $currentHealth = $stmt->fetch();

    if ($this->healNow < 0) $this->healNow = 0;
    $health = $currentHealth['currentHealth'] + $this->healNow;

    $stmt = $this->pdo->query("SELECT maxHealth FROM heroes WHERE id = ".$_SESSION['enemy']['id']);
    $maxHealth = $stmt->fetch();

    if ($health > $maxHealth['maxHealth']) $health = $maxHealth['maxHealth'];

    $stmt = $this->pdo->exec("UPDATE heroes SET currentHealth = ".$health." WHERE id = ".$_SESSION['enemy']['id']);
  }

  public function increaseUserMaxHealth () {
    $stmt = $this->pdo->query("SELECT maxHealth FROM heroes WHERE id = ".$_SESSION['user']['id']);
    $currentMaxHealth = $stmt->fetch();

    $maxHealth = $currentMaxHealth['maxHealth'] + $this->healMaxHealth;

    $stmt = $this->pdo->exec("UPDATE heroes SET maxHealth = ".$maxHealth." WHERE id = ".$_SESSION['user']['id']);
  }

  public function increaseEnemyMaxHealth () {
    $stmt = $this->pdo->query("SELECT maxHealth FROM heroes WHERE id = ".$_SESSION['enemy']['id']);
    $currentMaxHealth = $stmt->fetch();

    $maxHealth = $currentMaxHealth['maxHealth'] + $this->healMaxHealth;

    $stmt = $this->pdo->exec("UPDATE heroes SET maxHealth = ".$maxHealth." WHERE id = ".$_SESSION['enemy']['id']);
  }

  public function decreaseUserMaxHealth () {
    $stmt = $this->pdo->query("SELECT maxHealth FROM heroes WHERE id = ".$_SESSION['user']['id']);
    $currentMaxHealth = $stmt->fetch();

    $maxHealth = $currentMaxHealth['maxHealth'] - $this->damageMaxHealth;
    if ($maxHealth < 0) $maxHealth = 0;

    $stmt = $this->pdo->exec("UPDATE heroes SET maxHealth = ".$maxHealth." WHERE id = ".$_SESSION['user']['id']);
  }

  public function decreaseEnemyMaxHealth () {
    $stmt = $this->pdo->query("SELECT maxHealth FROM heroes WHERE id = ".$_SESSION['enemy']['id']);
    $currentMaxHealth = $stmt->fetch();

    $maxHealth = $currentMaxHealth['maxHealth'] - $this->damageMaxHealth;
    if ($maxHealth < 0) $maxHealth = 0;

    $stmt = $this->pdo->exec("UPDATE heroes SET maxHealth = ".$maxHealth." WHERE id = ".$_SESSION['enemy']['id']);
  }

}
