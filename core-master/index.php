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
      $score = isset($input['score']) ? intval($input['score']) : 0;
      $query = "INSERT INTO joueurs (nom, date) VALUES ('$pseudo', NOW())";
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
    $result = pg_query($lien, "SELECT objet.id, objet.nom, ST_X(objet.point) AS x, ST_Y(objet.point) AS y, objet.description, objet.url_icone, objet.taille_icone, objet.minZoomVisible, objet.depart, indice, idBloque 
    FROM objet 
    LEFT JOIN ObjetBloqueParObjet ON objet.id = ObjetBloqueParObjet.id
    WHERE objet.id = '$choix_objet'");
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

// Afficher le hall of fame //

Flight::route('GET /halloffame', function() {
  $link = Flight::get('db');
  $query = "SELECT nom AS pseudo, score, date FROM joueurs ORDER BY score DESC, date ASC";
  $result = pg_query($link, $query);
  if ($result) {
      $joueurs = pg_fetch_all($result);
      echo json_encode($joueurs);
  } else {
      echo json_encode(['error' => 'Erreur lors de la récupération des données.']);
  }
});

// Ajouter le score à la BDD //

Flight::route('POST /addscore', function() {
	$link = Flight::get('db');
	$input = json_decode(file_get_contents('php://input'), true);
    if (isset($input['pseudo']) && isset($input['score'])) {
      $pseudo = ($input['pseudo']);
      $score = ($input['score']);
      $query = "UPDATE joueurs SET score = $2 WHERE pseudo = $1";
      $result = pg_query_params($link, $query, array($pseudo, $score));
      
    } else {
    echo json_encode(['error' => 'Le score n\'a pas été ajouté à la BDD.']);
    }
});



Flight::start();
?>
