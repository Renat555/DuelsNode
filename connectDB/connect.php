<?php

$dsn = "";

$opt = [
   PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
   PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
   PDO::ATTR_EMULATE_PREPARES   => false,
   PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
];

$DB = 'kz123755_organizer';
$userDB = 'kz123_user';
$passwordDB = 'asdf123456';
$pdo = new PDO("mysql:host=localhost;dbname=$DB", $userDB, $passwordDB, $opt);

session_start();

?>
