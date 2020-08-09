<?php
require_once "../connectDB/connect.php";

$parameters = json_decode($_POST['parameters']);

$stmt = $pdo->exec("CREATE TABLE IF NOT EXISTS heroes(id INTEGER(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(250), currentHealth FLOAT (11), maxHealth FLOAT (11), mark VARCHAR(250), idGame VARCHAR(250) DEFAULT NULL, muve INTEGER(11) DEFAULT NULL, timeGame VARCHAR(250))");

$stmt = $pdo->prepare("INSERT INTO heroes (name, currentHealth, maxHealth, mark, timeGame) VALUES (:name, :currentHealth, :maxHealth, :mark, :timeGame)");
$stmt->execute(array(
  "name" => $parameters->name,
  "currentHealth" => 200,
  "maxHealth" => 200,
  "mark" => 0,
  "timeGame" => time()
));

$stmt = $pdo->query("SELECT * FROM heroes ORDER BY id DESC LIMIT 1");
$row = $stmt->fetch();

$_SESSION['user'] = $row;
if (isset($_SESSION['enemy'])) unset($_SESSION['enemy']);
if (isset($_SESSION['checkUser'])) unset($_SESSION['checkUser']);

$formsTableName = $row['id']."forms";
$stmt = $pdo->exec("CREATE TABLE $formsTableName (id INTEGER (11) NOT NULL PRIMARY KEY AUTO_INCREMENT, form VARCHAR (250))");

foreach ($parameters as $key=>$value) {
  if (substr($key, 0, 4) == "form") {
    $stmt = $pdo->prepare("INSERT INTO $formsTableName (form) VALUES (:form)");
    $stmt->execute(array(
      "form" => $value
    ));
  }
}

$elementsTableName = $row['id']."elements";
$stmt = $pdo->exec("CREATE TABLE $elementsTableName (id INTEGER (11) NOT NULL PRIMARY KEY AUTO_INCREMENT, element VARCHAR (250))");

foreach ($parameters as $key=>$value) {
  if (substr($key, 0, 7) == "element") {
    $stmt = $pdo->prepare("INSERT INTO $elementsTableName (element) VALUES (:element)");
    $stmt->execute(array(
      "element" => $value
    ));
  }
}

$spellTableName = $row['id']."spells";
$stmt = $pdo->exec("CREATE TABLE $spellTableName (id INTEGER (11) NOT NULL PRIMARY KEY AUTO_INCREMENT, spellElement VARCHAR (250), spellForm VARCHAR (250))");

$buffTableName = $row['id']."buffs";
$stmt = $pdo->exec("CREATE TABLE $buffTableName (id INTEGER (11) NOT NULL PRIMARY KEY AUTO_INCREMENT, buffElement VARCHAR (250), buffForm VARCHAR (250), duration INTEGER(11))");

$debuffTableName = $row['id']."debuffs";
$stmt = $pdo->exec("CREATE TABLE $debuffTableName (id INTEGER (11) NOT NULL PRIMARY KEY AUTO_INCREMENT, debuffElement VARCHAR (250), debuffForm VARCHAR (250), duration INTEGER(11))");

$descriptionTableName = $row['id']."description";
$stmt = $pdo->exec("CREATE TABLE $descriptionTableName (id INTEGER (11) NOT NULL PRIMARY KEY AUTO_INCREMENT, description TEXT DEFAULT NULL)")

?>
