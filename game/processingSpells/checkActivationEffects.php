<?php

function checkDependency (Spell $spell, Spell $effect) {
  if (!isset($effect->dependency['types'])) return false;
    foreach ($effect->dependency['types'] as $type) {
      if ($type == $spell->type || $type == "All") {
        foreach ($effect->dependency['elements'] as $element) {
          if ($element == $spell->element || $element == "All") {
            return true;
          }
        }
      }
    }
}

function influensEffectsOnSpells(Spell $spell, $pdo) {

  $tableName = $_SESSION['user']['id']."buffs";
  $stmt3 = $pdo->query("SELECT * FROM $tableName");
  while ($row = $stmt3->fetch()) {
    $spellName = $row['buffElement'].$row['buffForm'];
    $buff = new $spellName($row['buffElement'], $row['buffForm'], $pdo);
    if (!checkDependency($spell, $buff)) continue;
    $buff->onSpellCreatingByUserEffect($spell);
  }

  $tableName = $_SESSION['user']['id']."debuffs";
  $stmt3 = $pdo->query("SELECT * FROM $tableName");
  while ($row = $stmt3->fetch()) {
    $spellName = $row['debuffElement'].$row['debuffForm'];
    $debuff = new $spellName($row['debuffElement'], $row['debuffForm'], $pdo);
    if (!checkDependency($spell, $debuff)) continue;
    $debuff->onSpellCreatingByUserEffect($spell);
  }

  $tableName = $_SESSION['enemy']['id']."buffs";
  $stmt3 = $pdo->query("SELECT * FROM $tableName");
  while ($row = $stmt3->fetch()) {
    $spellName = $row['buffElement'].$row['buffForm'];
    $buff = new $spellName($row['buffElement'], $row['buffForm'], $pdo);
    if (!checkDependency($spell, $buff)) continue;
    $buff->onSpellCreatingByEnemyEffect($spell);
  }

  $tableName = $_SESSION['enemy']['id']."debuffs";
  $stmt3 = $pdo->query("SELECT * FROM $tableName");
  while ($row = $stmt3->fetch()) {
    $spellName = $row['debuffElement'].$row['debuffForm'];
    $debuff = new $spellName($row['debuffElement'], $row['debuffForm'], $pdo);
    if (!checkDependency($spell, $debuff)) continue;
    $debuff->onSpellCreatingByEnemyEffect($spell);
  }

}

function checkUserEffects(Spell $spell, $pdo) {
  $tableName = $_SESSION['user']['id']."buffs";
  $stmt = $pdo->query("SELECT * FROM $tableName");
  while ($row = $stmt->fetch()) {
    $spellName = $row['buffElement'].$row['buffForm'];
    $buff = new $spellName($row['buffElement'], $row['buffForm'], $pdo);
    if (!checkDependency($spell, $buff)) continue;
    $buff->onEffectsEffect($spell);
  }

  $tableName = $_SESSION['user']['id']."debuffs";
  $stmt = $pdo->query("SELECT * FROM $tableName");
  while ($row = $stmt->fetch()) {
    $spellName = $row['debuffElement'].$row['debuffForm'];
    $debuff = new $spellName($row['debuffElement'], $row['debuffForm'], $pdo);
    if (!checkDependency($spell, $debuff)) continue;
    $debuff->onEffectsEffect($spell);
  }
}

function checkEnemyEffects(Spell $spell, $pdo) {
  $tableName = $_SESSION['enemy']['id']."buffs";
  $stmt = $pdo->query("SELECT * FROM $tableName");
  while ($row = $stmt->fetch()) {
    $spellName = $row['buffElement'].$row['buffForm'];
    $buff = new $spellName($row['buffElement'], $row['buffForm'], $pdo);
    if (!checkDependency($spell, $buff)) continue;
    $buff->onEffectsEffect($spell);
  }

  $tableName = $_SESSION['enemy']['id']."debuffs";
  $stmt = $pdo->query("SELECT * FROM $tableName");
  while ($row = $stmt->fetch()) {
    $spellName = $row['debuffElement'].$row['debuffForm'];
    $debuff = new $spellName($row['debuffElement'], $row['debuffForm'], $pdo);
    if (!checkDependency($spell, $debuff)) continue;
    $debuff->onEffectsEffect($spell);
  }
}

function activationEffects(&$userDescription, &$enemyDescription, $pdo) {

  $tableName = $_SESSION['user']['id']."buffs";
  $stmt = $pdo->query("SELECT * FROM $tableName");
  while ($row = $stmt->fetch()) {
    $spellName = $row['buffElement'].$row['buffForm'];
    $buff = new $spellName($row['buffElement'], $row['buffForm'], $pdo);
    checkUserEffects($buff, $pdo);
    $buff->onUserEffect();
    $userDescription .= $buff->descriptionForUser."<br>";
    $enemyDescription .= $buff->descriptionForEnemy."<br>";
    $buff->decreaseDuration($tableName, $row['id'], 1);
  }

  $tableName = $_SESSION['user']['id']."debuffs";
  $stmt = $pdo->query("SELECT * FROM $tableName");
  while ($row = $stmt->fetch()) {
    $spellName = $row['debuffElement'].$row['debuffForm'];
    $debuff = new $spellName($row['debuffElement'], $row['debuffForm'], $pdo);
    checkUserEffects($debuff, $pdo);
    $debuff->onUserEffect();
    $userDescription .= $debuff->descriptionForUser."<br>";
    $enemyDescription .= $debuff->descriptionForEnemy."<br>";
    $debuff->decreaseDuration($tableName, $row['id'], 1);
  }

  $tableName = $_SESSION['enemy']['id']."buffs";
  $stmt = $pdo->query("SELECT * FROM $tableName");
  while ($row = $stmt->fetch()) {
    $spellName = $row['buffElement'].$row['buffForm'];
    $buff = new $spellName($row['buffElement'], $row['buffForm'], $pdo);
    checkEnemyEffects($buff, $pdo);
    $buff->onEnemyEffect();
    $userDescription .= $buff->descriptionForUser."<br>";
    $enemyDescription .= $buff->descriptionForEnemy."<br>";
    $buff->decreaseDuration($tableName, $row['id'], 1);
  }

  $tableName = $_SESSION['enemy']['id']."debuffs";
  $stmt = $pdo->query("SELECT * FROM $tableName");
  while ($row = $stmt->fetch()) {
    $spellName = $row['debuffElement'].$row['debuffForm'];
    $debuff = new $spellName($row['debuffElement'], $row['debuffForm'], $pdo);
    checkEnemyEffects($debuff, $pdo);
    $debuff->onEnemyEffect();
    $userDescription .= $debuff->descriptionForUser."<br>";
    $enemyDescription .= $debuff->descriptionForEnemy."<br>";
    $debuff->decreaseDuration($tableName, $row['id'], 1);
  }
}
