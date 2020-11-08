<?php
require_once "../../connectDB/connect.php";
require_once "dictionary.php";
require_once "spell.php";
require_once "spellList.php";
require_once "checkActivationEffects.php";

if (!isset($_POST['spells'])) exit;

$arrSpells = json_decode($_POST['spells'], true);

$tableName = $_SESSION['user']['id']."spells";
$stmt = $pdo->exec("TRUNCATE TABLE $tableName");

$stmt = $pdo->prepare("INSERT INTO $tableName(spellForm, spellElement) VALUES (:spellForm, :spellElement)");
$stmt->execute(array(
  "spellElement" => $arrSpells['firstElement'],
  "spellForm" => $arrSpells['firstForm']
));

$stmt = $pdo->prepare("INSERT INTO $tableName(spellForm, spellElement) VALUES (:spellForm, :spellElement)");
$stmt->execute(array(
  "spellElement" => $arrSpells['secondElement'],
  "spellForm" => $arrSpells['secondForm']
));

$stmt = $pdo->prepare("INSERT INTO $tableName(spellForm, spellElement) VALUES (:spellForm, :spellElement)");
$stmt->execute(array(
  "spellElement" => $arrSpells['thirdElement'],
  "spellForm" => $arrSpells['thirdForm']
));

$spells = [];
$spellName = $arrSpells['firstElement'].$arrSpells['firstForm'];
$spells[] = new  $spellName($arrSpells['firstElement'], $arrSpells['firstForm'], $pdo, $arrSpells['firstDespellElement'], $arrSpells['firstDespellForm']);
$spellName = $arrSpells['secondElement'].$arrSpells['secondForm'];
$spells[] = new  $spellName($arrSpells['secondElement'], $arrSpells['secondForm'], $pdo, $arrSpells['secondDespellElement'], $arrSpells['secondDespellForm']);
$spellName = $arrSpells['thirdElement'].$arrSpells['thirdForm'];
$spells[] = new  $spellName($arrSpells['thirdElement'], $arrSpells['thirdForm'], $pdo, $arrSpells['thirdDespellElement'], $arrSpells['thirdDespellForm']);

$userDescription = '';
$enemyDescription = '';

for ($i = 0; $i < count($spells); $i++) {
  influensEffectsOnSpells($spells[$i], $pdo);
  if ($spells[$i]->type == "BattleSpell") {
    $spells[$i]->battleEffect();
    $userDescription .= $spells[$i]->descriptionForUser."<br>";
    $enemyDescription .= $spells[$i]->descriptionForEnemy."<br>";
  } else if ($spells[$i]->type == "other") {
    $spells[$i]->mainEffect();
    $userDescription .= $spells[$i]->descriptionForUser."<br>";
    $enemyDescription .= $spells[$i]->descriptionForEnemy."<br>";
  } else if ($spells[$i]->type == "despell") {
    $spells[$i]->despellEffect();
    $userDescription .= $spells[$i]->descriptionForUser."<br>";
    $enemyDescription .= $spells[$i]->descriptionForEnemy."<br>";
  }
}

activationEffects($userDescription, $enemyDescription, $pdo);

for ($i = 0; $i < count($spells); $i++) {
  if ($spells[$i]->type != "buff" && $spells[$i]->type != "debuff") continue;
  $spells[$i]->writeEffect();
}

$tableName = $_SESSION['user']['id']."description";
$stmt = $pdo->exec("TRUNCATE TABLE $tableName");
$stmt = $pdo->exec("INSERT INTO $tableName(description) VALUES('".$userDescription."')");
$tableName = $_SESSION['enemy']['id']."description";
$stmt = $pdo->exec("TRUNCATE TABLE $tableName");
$stmt = $pdo->exec("INSERT INTO $tableName(description) VALUES('".$enemyDescription."')");

$stmt = $pdo->exec("UPDATE heroes SET muve = 1 WHERE id = ".$_SESSION['enemy']['id']);
