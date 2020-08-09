<?php
require_once "../../connectDB/connect.php";

function sendMark ($pdo) {

  if (isset($_POST['mark'])) {
    $stmt = $pdo->prepare("UPDATE heroes SET mark = ? WHERE id = ?");
    $stmt->execute([$_POST['mark'], $_SESSION['user']['id']]);
  }

}

function checkMark($pdo) {

  if (isset($_POST['check'])) {

    if (!isset($_SESSION['enemy'])) return;

    $stmt = $pdo->query("SELECT idGame FROM heroes WHERE id = ".$_SESSION['user']['id']);
    $idGame = $stmt->fetch();

    $stmt = $pdo->query("SELECT mark FROM heroes WHERE idGame = ".$idGame['idGame']." AND id = ".$_SESSION['enemy']['id']);
    $result = $stmt->fetch();

    if ($result['mark'] == null) return;

    if ($_SESSION['enemy']['mark'] == $result['mark']) {
      echo "left";
    }
    $_SESSION['enemy']['mark'] = $result['mark'];
  }

}

sendMark($pdo);
checkMark($pdo);

?>
