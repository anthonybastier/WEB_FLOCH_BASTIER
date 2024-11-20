<?php
declare(strict_types=1);
session_start();
require 'flight/Flight.php';


Flight::route('/', function () {
  Flight::redirect('/accueil');
});

Flight::route('/accueil', function() {
    Flight::render('accueil');
});

Flight::route('/jeu', function() {
  Flight::render('jeu');
});

// Route pour afficher la page d'accueil //
Flight::route('GET /', function () {
  Flight::render('jeu');
});

// Route pour sauvegarder le pseudo //
Flight::route('POST /sauvegarderpseudo', function () {
  $pseudo = Flight::request()->data->pseudo;

  if (empty($pseudo) || strlen($pseudo) > 12) {
      Flight::json(['success' => false, 'message' => 'Pseudo invalide.']);
  } else {
      session_start();
      $_SESSION['pseudo'] = $pseudo;
      Flight::json(['success' => true, 'message' => 'Pseudo sauvegardé.', 'pseudo' => $pseudo]);
  }
});


// Connexion à la BDD //
$link = pg_connect("host=localhost port=5432 dbname=escape_game user=postgres password=postgres");

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
    $result = pg_query($lien, "SELECT id, nom, ST_X(point) AS x, ST_Y(point) AS y, description, url_icone, taille_icone, minZoomVisible, depart FROM objet WHERE depart IS True AND id = '$choix_objet'");
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
