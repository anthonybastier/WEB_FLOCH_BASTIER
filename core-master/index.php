<?php
declare(strict_types=1);
session_start();
require 'flight/Flight.php';
$link = pg_connect("host=localhost port=5432 dbname=escape_game user=postgres password=postgres");
Flight::set('db', $link);


Flight::route('/', function () {
  Flight::redirect('/accueil');
});

Flight::route('/accueil', function() {
    Flight::render('accueil');
});

Flight::route('/jeu', function() {
  Flight::render('jeu');
});

// Ajouter un pseudo à la bdd //

Flight::route('POST /addpseudobdd', function() {
	$link = Flight::get('db');
	$input = json_decode(file_get_contents('php://input'), true);
    if (isset($input['pseudo']) && !empty($input['pseudo'])) {
      $pseudo = pg_escape_string($link, $input['pseudo']);
      $query = "INSERT INTO joueurs (nom) VALUES ('$pseudo')";
      $result = pg_query($link, $query);
      if ($result) {
        echo json_encode(['redirect' => '/jeu']);
      } else {
        echo json_encode(['error' => 'Erreur lors de l\'ajout du pseudo.']);
      }
    } else {
    echo json_encode(['error' => 'Veuillez ajouter un pseudo.']);
    }
});

// Connexion à la BDD //

if (!$link) {
  die('Erreur de connexion : ' . pg_last_error());
}

// Stocker une variable globale //
Flight::set('db', $link);

Flight::route('/api/objets', function(){
  $lien = Flight::get('db');
  $tab_obj = [];

  if(isset($_GET['id_objet']) AND !(empty($_GET['id_objet']))){
    # Recherche d'un objet avec un identifiant spécifique
    $choix_objet = $_GET['id_objet'];
    $result = pg_query($lien, "SELECT id, nom, ST_X(point) AS y, ST_Y(point) AS x, description, url_icone, taille_icone, minZoomVisible, depart FROM objet WHERE id = '$choix_objet'");
    array_push($tab_obj, pg_fetch_assoc($result));

  } else {
    # Liste tous les objets
    
    $results = pg_query($lien, "SELECT id, nom, ST_X(point) AS x, ST_Y(point) AS y, description, url_icone, taille_icone, minZoomVisible, depart FROM objet WHERE depart IS True ");
    while ($row = pg_fetch_assoc($results)) {
      array_push($tab_obj, $row);
    }
    
  }
  Flight::json($tab_obj);
});



Flight::start();
?>
