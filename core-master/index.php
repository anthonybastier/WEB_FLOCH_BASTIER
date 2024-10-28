<?php

declare(strict_types=1);
session_start();
require 'flight/Flight.php';

Flight::route('/', function () {
  echo 'hello world!';
});

Flight::route('/accueil', function() {
    Flight::render('accueil');
});

Flight::start();
?>
