<?php
require_once "../connectDB/connect.php";

  $stmt = $pdo->query("SELECT * FROM heroes");

  while ($row = $stmt->fetch()) {
    $timeNow = time();
    if ($timeNow - $row['timeGame'] < 1) continue;

    $TableName = $row['id']."buffs";
    $stmt2 = $pdo->exec("DROP TABLE $TableName");
    $TableName = $row['id']."debuffs";
    $stmt2 = $pdo->exec("DROP TABLE $TableName");
    $TableName = $row['id']."forms";
    $stmt2 = $pdo->exec("DROP TABLE $TableName");
    $TableName = $row['id']."elements";
    $stmt2 = $pdo->exec("DROP TABLE $TableName");
    $TableName = $row['id']."spells";
    $stmt2 = $pdo->exec("DROP TABLE $TableName");
    $TableName = $row['id']."description";
    $stmt2 = $pdo->exec("DROP TABLE $TableName");
    $stmt2 = $pdo->exec("DELETE FROM heroes WHERE id = ".$row['id']);

  }

  $stmt = $pdo->exec("DROP TABLE heroes");
