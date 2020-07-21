<?php
require_once "../../connectDB/connect.php";

function clearTable ($playerId, $pdo) {
  $TableName = $playerId."buffs";
  $stmt = $pdo->exec("DROP TABLE $TableName");
  $TableName = $playerId."debuffs";
  $stmt = $pdo->exec("DROP TABLE $TableName");
  $TableName = $playerId."forms";
  $stmt = $pdo->exec("DROP TABLE $TableName");
  $TableName = $playerId."elements";
  $stmt = $pdo->exec("DROP TABLE $TableName");
  $TableName = $playerId."spells";
  $stmt = $pdo->exec("DROP TABLE $TableName");
  $stmt = $pdo->exec("DELETE FROM heroes WHERE id = $playerId");
}

function  searchEnemy($pdo, $DB) {

  if (isset($_POST['search'])) {
    $stmt = $pdo->query("SELECT idGame FROM heroes WHERE id = ".$_SESSION['user']['id']);
    $userIdGame = $stmt->fetch();

    if ($userIdGame['idGame'] != null) {

      $stmt = $pdo->query("SELECT * FROM heroes WHERE idGame = ".$userIdGame['idGame']." AND NOT id = ".$_SESSION['user']['id']);
      $enemy = $stmt->fetch();

      $tableName = $enemy['id']."debuffs";
      $stmt = $pdo->query("SHOW TABLES FROM ".$DB." LIKE '".$tableName."'");
      $result = $stmt->fetch();

      if (!empty($result)) {
        $_SESSION['enemy'] = $enemy;
        echo "done";
      }

      return;
    }

    $stmt = $pdo->query("SELECT * FROM heroes WHERE idGame IS NULL AND NOT id = ".$_SESSION['user']['id']);
    $result = $stmt->fetch();

    if (!empty($result)) {

      if (!isset($_SESSION['checkUser'])) {
        $_SESSION['checkUser'] = $result;
        echo "create checkUser";
        return;
      }

      if ($_SESSION['checkUser']['id'] != $result['id']) {
        $_SESSION['checkUser'] = $result;
        echo "user was changed";
        return;
      } else if ($_SESSION['checkUser']['mark'] == $result['mark']) {
        unset($_SESSION['checkUser']);
        clearTable($result['id'], $pdo);
        echo "clear table";
        return;
      }
      echo "player find";

      $idGame = $_SESSION['user']['id'].$result['id'];
      $stmt = $pdo->exec("UPDATE heroes SET idGame = ".$idGame." WHERE id = ".$_SESSION['user']['id']);
      $stmt = $pdo->exec("UPDATE heroes SET idGame = ".$idGame." WHERE id = ".$result['id']);

      $number = rand(0, 1);
      if ($number == 1) {
        $stmt = $pdo->exec("UPDATE heroes SET muve = 1 WHERE id = ".$_SESSION['user']['id']);
        $stmt = $pdo->exec("UPDATE heroes SET muve = 0 WHERE id = ".$result['id']);
        $stmt = $pdo->exec("UPDATE heroes SET maxHealth = 250 WHERE id = ".$result['id']);
        $stmt = $pdo->exec("UPDATE heroes SET currentHealth = 250 WHERE id = ".$result['id']);
      } else {
        $stmt = $pdo->exec("UPDATE heroes SET muve = 0 WHERE id = ".$_SESSION['user']['id']);
        $stmt = $pdo->exec("UPDATE heroes SET muve = 1 WHERE id = ".$result['id']);
        $stmt = $pdo->exec("UPDATE heroes SET maxHealth = 250 WHERE id = ".$_SESSION['user']['id']);
        $stmt = $pdo->exec("UPDATE heroes SET currentHealth = 250 WHERE id = ".$_SESSION['user']['id']);
      }

    }
  }

}

searchEnemy($pdo, $DB);

?>
