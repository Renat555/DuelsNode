<?php
require_once "../../connectDB/connect.php";

function addToSix(&$arr) {

  if (count($arr) < 6) {
	  $arr[] = "";
	  addToSix($arr);
  } else {
	  return;
  }

}

function muveInformation($pdo) {
  if (isset($_POST['requestMuve'])) {
    $resultArr = [];

    $stmt = $pdo->query("SELECT muve FROM heroes WHERE id = ".$_SESSION['user']['id']);
    $result = $stmt->fetch();
    $resultArr['muve'] = $result['muve'];

    $stmt = $pdo->query("SELECT name FROM heroes WHERE id = ".$_SESSION['enemy']['id']);
    $result = $stmt->fetch();
    $resultArr['enemyName'] = $result['name'];

    $stmt = $pdo->query("SELECT currentHealth FROM heroes WHERE id = ".$_SESSION['user']['id']);
    $result = $stmt->fetch();
    $resultArr['currentHealth'] = $result['currentHealth'];

    $stmt = $pdo->query("SELECT maxHealth FROM heroes WHERE id = ".$_SESSION['user']['id']);
    $result = $stmt->fetch();
    $resultArr['maxHealth'] = $result['maxHealth'];

    $stmt = $pdo->query("SELECT currentHealth FROM heroes WHERE id = ".$_SESSION['enemy']['id']);
    $result = $stmt->fetch();
    $resultArr['currentHealthEnemy'] = $result['currentHealth'];

    $stmt = $pdo->query("SELECT maxHealth FROM heroes WHERE id = ".$_SESSION['enemy']['id']);
    $result = $stmt->fetch();
    $resultArr['maxHealthEnemy'] = $result['maxHealth'];

    $tableName = $_SESSION['user']['id']."forms";
    $stmt = $pdo->query("SELECT * FROM $tableName");
    $result = [];
    while ($row = $stmt->fetch()) {
      $result[] = $row;
    }
    $resultArr['forms'] = $result;

    $tableName = $_SESSION['user']['id']."elements";
    $stmt = $pdo->query("SELECT * FROM $tableName");
    $result = [];
    while ($row = $stmt->fetch()) {
      $result[] = $row;
    }
    $resultArr['elements'] = $result;

    $tableName = $_SESSION['user']['id']."buffs";
    $stmt = $pdo->query("SELECT * FROM $tableName");
    $result = [];
    while ($row = $stmt->fetch()) {
      $result[] = $row;
    }
    addToSix($result);
    $resultArr['buffs'] = $result;

    $tableName = $_SESSION['user']['id']."debuffs";
    $stmt = $pdo->query("SELECT * FROM ".$tableName);
    $result = [];
    while ($row = $stmt->fetch()) {
      $result[] = $row;
    }
    addToSix($result);
    $resultArr['debuffs'] = $result;

    $tableName = $_SESSION['enemy']['id']."debuffs";
    $stmt = $pdo->query("SELECT * FROM ".$tableName);
    $result = [];
    while ($row = $stmt->fetch()) {
      $result[] = $row;
    }
    addToSix($result);
    $resultArr['debuffsEnemy'] = $result;

    $tableName = $_SESSION['enemy']['id']."buffs";
    $stmt = $pdo->query("SELECT * FROM ".$tableName);
    $result = [];
    while ($row = $stmt->fetch()) {
      $result[] = $row;
    }
    addToSix($result);
    $resultArr['buffsEnemy'] = $result;

    $tableName = $_SESSION['enemy']['id']."spells";
    $stmt = $pdo->query("SELECT * FROM ".$tableName);
    $result = [];
    while ($row = $stmt->fetch()) {
      $result[] = $row;
    }
    $resultArr['spells'] = $result;

    $tableName = $_SESSION['user']['id']."description";
    $stmt = $pdo->query("SELECT * FROM ".$tableName);
    $result = $stmt->fetch();
    $resultArr['description'] = $result['description'];

    echo json_encode($resultArr);
  }
}

muveInformation($pdo);
