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

Flight::route('/jeu', function() {
  Flight::render('jeu');
});

// Connexion à la BDD
$link = pg_connect("host=localhost port=5432 dbname=escape_game user=postgres password=postgres");

if (!$link) {
  die('Erreur de connexion : ' . pg_last_error());
}

// stocker une variable globale
Flight::set('db', $link);

Flight::route('/api/objets', function(){
  $lien = Flight::get('db');
  $tab_obj = [];

  if(isset($_GET['id_objet']) AND !(empty($_GET['id_objet']))){
    # Recherche d'un objet avec un identifiant spécifique
    $choix_objet = $_GET['id_objet'];
    $result = pg_query($lien, "SELECT * FROM objet WHERE depart IS True AND id = '$choix_objet'");
    array_push($tab_obj, pg_fetch_assoc($result));

  } else {
    # Liste tous les objets
    
    $results = pg_query($lien, "SELECT * FROM objet WHERE depart IS True ");
    while ($row = pg_fetch_assoc($results)) {
      array_push($tab_obj, $row);
    }
    
  }
  Flight::json($tab_obj);
});


Flight::start();
?>
