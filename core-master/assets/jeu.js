Vue.createApp({
    data() {
        return {
            tab_obj: [], // Liste des objets à afficher
            carte: 0,  // Référence à la carte
        };
    },
    created() {
        // Charger les objets dès la création du composant
        this.charger_obj();
    },
    mounted() {
        // Initialiser la carte et ajouter les marqueurs une fois la carte chargée
        this.$nextTick(() => {
            this.initMap() // Initialisation de la carte
        });
    },
    methods: {
        // Méthode pour charger les objets depuis l'API
        charger_obj(id = null) {
            this.tab_obj = []; // Réinitialiser la liste des objets
            let url = '/api/objets';
            if (id) {
                url += `?id_objet=${encodeURIComponent(id)}`;
            }
            fetch(url)
                .then(result => result.json())
                .then(result => {
                    // Transformation de la liste de dict en liste de listes
                    this.tab_obj = result
                    console.log(this.tab_obj)
                    this.addMarkers();
                });
        },

        // Méthode pour initialiser la carte
        initMap() {
            // Création de la carte avec un centre initial et un zoom
            this.carte = L.map('map').setView([-25.804837, 133.813477], 4);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(this.carte);

            // Ajouter un marqueur de départ
            L.marker([-25.804837, 133.813477]).addTo(this.carte);
        },

        // Méthode pour ajouter les marqueurs à la carte
        addMarkers() {
            // Itérer sur chaque objet et ajouter un marqueur
            
            for (objet of this.tab_obj) { 
                // Configuration de l'icône
                const icon = L.icon({
                    iconUrl: objet.url_icone,
                    iconSize: objet.taille_icone/8,
                    iconAnchor: [objet.point[0], objet.point[1]],
                });
                console.log(objet.point)
                // Ajouter le marqueur à la carte
                const marker = L.marker([objet.point[1], objet.point[0]], { icon });

                // Ajouter un popup au marqueur
                marker.bindPopup(`<strong>${objet.nom}</strong><br>${objet.description}`);
                marker.addTo(this.carte);
                
            };
        }
    }
}).mount('#appmap');

/*
let map = Vue.createApp({});


// Composant de la carte //
map.component('my-component', {
    template: '<div id="map"></div>',
    data() {
        return {
            carte:null,
        };
    },
    mounted() {
        this.$nextTick(() => {
            var carte = this.initMap();
        });
    },
    methods: {
        initMap() {
            var map = L.map('map').setView([-25.804837, 133.813477], 4);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            var depart = L.marker([-25.804837, 133.813477]).addTo(map);
            var popup = L.popup();
            // fonction à retirer avant de rendre 
            function onMapClick(e) {
                popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(map);
            }
            map.on('click', onMapClick);
            return map;
        }
    },
});

map.mount('#appmap');        

Vue.createApp({
    data() {
        return {
            tab_obj:[],
        };
    },
    created() {
        this.charger_obj();
        this.$nextTick(() => {
            this.addMarkers(carte);
        });
      },
    methods: {
        charger_obj(id = null){
            this.tab_obj=[];
            url = '/api/objets';
            if (id) {
                url += `?id_objet=${encodeURIComponent(id)}`
            }
            fetch(url)
              .then(result => result.json())
              .then(result => {
                this.tab_obj = result
                console.log(result)
            })
        },
        addMarkers(map) {
            this.tab_obj.forEach(objet => {
                var icon = L.icon({
                    iconUrl: objet.url_icone,
                    iconSize: objet.taille_icone,
                    iconAnchor: [objet.taille_icone[0] / 2, objet.taille_icone[1]]
                });

                console.log("aaaa")
                // Ajouter le marqueur avec l'icône
                var marker = L.marker([objet.point[1], objet.point[0]], { icon });
                // Ajouter un popup au marqueur
                marker.bindPopup(`<strong>${objet.nom}</strong><br>${objet.description}`);
                marker.addTo(map);
            });
        }
    },
  }).mount('#inventaire');
*/


