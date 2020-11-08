<?php
require_once "../../connectDB/connect.php";

function exchangeMuves ($pdo) {

  if (isset($_POST['requestMuve'])) {
    $stmt = $pdo->query("SELECT muve FROM heroes WHERE id = ".$_SESSION['user']['id']);
    $muve = $stmt->fetch();
    echo $muve['muve'];
  }

}

function makeMuve ($pdo) {

  if (isset($_POST['makeMuve'])) {
    $stmt = $pdo->exec("UPDATE heroes SET muve = 0 WHERE id = ".$_SESSION['user']['id']);
  }

}

exchangeMuves($pdo);
makeMuve($pdo);

?>
