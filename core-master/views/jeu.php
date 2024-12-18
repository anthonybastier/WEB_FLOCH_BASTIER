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
        <div id="timer">
            Temps restant : <span id="time-display">10:00</span>
        </div>
        <div id="appmap">
        <label>Triche ?<input type="checkbox" @click="activerTriche" ></label>
            <div id="map"></div>
            <div id="inventaire">
                <h3>Inventaire</h3>
                <ul>
                    <li v-for="objet in inventaire" :key="objet.id" :class="{ selectionne: objet.selectionne }" @click="selectionnerObjet(objet)">
                        <img :src="objet.url_icone" :alt="objet.nom" style="width: 50px; height: auto;" />
                        <span style="font-weight: bold;">  {{ objet.nom }}</span>
                    </li>
                </ul>
            </div>
        </div>

        <footer id="credits" style="text-align: center; margin-top: 20px;">
            <p>&copy; 2024 Escape Death - Développé par Anaïs Floch et Anthony Bastier - Tous droits réservés.</p>
        </footer>

        <script src="assets/jeu.js"></script>
    </body>

</html>