<!DOCTYPE html>
<html lang="fr">
    
    <head>
        <meta charset="UTF-8">
        <title>Escape Death</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>        
        <link rel="stylesheet" href="assets/jeu.css">
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
        <script src="https://cdn.jsdelivr.net/npm/vue"></script>
        <link rel="icon" href="assets/sprite/death.ico">
    </head>

    <body>
        <h1>Escape Death</h1>
        <div id="appmap">
            <div id="map"></div>
            <footer id="inventaire">
                <h3>Inventaire</h3>
                <ul>
                    <li v-for="objet in inventaire" :key="objet.id" :class="{ selected: objet.selected }" @click="selectionnerObjet(objet)">
                        <img :src="objet.url_icone" :alt="objet.nom" style="width: 50px; height: auto;" />
                        <span> {{ objet.nom }}</span>
                    </li>
                </ul>
            </footer>
        </div>
        <script src="assets/jeu.js"></script>
    </body>

</html>