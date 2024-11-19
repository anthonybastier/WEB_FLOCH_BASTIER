Vue.createApp({
    data() {
        return {
            tab_obj: [],
            carte: 0, 
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
                // Configuration de la taille de l'icône dans un format lisible par Javascript
                taille_icone = objet.taille_icone.match(/[\w.-]+/g).map(Number)
                
                const icon = L.icon({
                    iconUrl: objet.url_icone,
                    iconSize: [taille_icone[0],taille_icone[1]],
                    iconAnchor: [objet.x, objet.y],
                });
                // Ajouter le marqueur à la carte
                const marker = L.marker([objet.x, objet.y], { icon });

                // Ajouter un popup au marqueur
                marker.bindPopup(`<strong>${objet.nom}</strong><br>${objet.description}`);
                marker.addTo(this.carte);
                
            };
        }
    }
}).mount('#appmap');
