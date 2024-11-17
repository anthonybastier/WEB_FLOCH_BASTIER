<!DOCTYPE html>
<html lang="fr">
    
    <head>
        <meta charset="UTF-8">
        <title>Escape Death</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>        
        <link rel="stylesheet" href="assets/jeu.css">
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
        <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    </head>

    <body>
        <h1>Escape Death</h1>
        <div id="map">
            <my-component></my-component>
        </div>
        <footer id="inventaire">
            <h3>Inventaire</h3>
            <ul>
                <li v-for="objet in list_obj" :key="objet.id">{{objet.nom}}
            </ul>
        </footer>
        <script src="assets/jeu.js"></script>
    </body>

</html>