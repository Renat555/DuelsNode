<?php

$dsn = "";

$opt = [
   PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
   PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
   PDO::ATTR_EMULATE_PREPARES   => false,
   PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
];

$DB = 'duels_db';
$userDB = 'mysql';
$passwordDB = 'mysql';
$pdo = new PDO("mysql:host=localhost;dbname=$DB", $userDB, $passwordDB, $opt);

session_start();

?>
