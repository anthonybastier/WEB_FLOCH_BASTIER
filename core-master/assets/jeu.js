Vue.createApp({
    data() {
        return {
            tab_obj: [],
            inventaire: [],
            carte: 0, 
            marqueurs: [],
        };
    },
    created() {
        // Charger les objets dès la création du composant
        this.chargerObj();
    },
    mounted() {
        // Initialiser la carte et ajouter les marqueurs une fois la carte chargée
        this.$nextTick(() => {
            this.initMap() // Initialisation de la carte
        });
    },
    methods: {
        // Méthode pour charger les objets depuis l'API
        chargerObj(id = null) {
            let url = '/api/objets';
            if (id) {
                url += `?id_objet=${encodeURIComponent(id)}`;
            }

            let donnees = new FormData();
            donnees.append('id_objet',id);
            fetch(url, {  
                method: 'post',
                body: donnees
            })
                .then(result => result.json())
                .then(result => {
                    // Transformation de la liste de dict en liste de listes
                    this.tab_obj = result
                    this.ajoutMarqueurs();
                });
        },

        selectionnerObjet(objet) {
            this.inventaire.forEach(item => item.selected = false);

            objet.selected = true;
        },

        // Méthode pour initialiser la carte
        initMap() {
            // Création de la carte avec un centre initial et un zoom
            this.carte = L.map('map').setView([-25.804837, 133.813477], 6);

            L.tileLayer('https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=e9da8ed0987a4ccdb4bb1710f21e0ee6', {
                attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 22
            }).addTo(this.carte);

            L.marker([-25.804837, 133.813477]).addTo(this.carte);

            this.carte.on('zoomend', this.updateMarkersVisibility);
        },

        ajoutMarqueurs() {
            for (let objet of this.tab_obj) { 
                // Configuration de la taille de l'icône dans un format lisible par Javascript
                taille_icone = objet.taille_icone.match(/[\w.-]+/g).map(Number);

                const icon = L.icon({
                    iconUrl: objet.url_icone,
                    iconSize: [taille_icone[0],taille_icone[1]],
                    iconAnchor: [objet.x, objet.y],
                });
                
                const marqueur = L.marker([objet.x, objet.y], { icon });

                marqueur.bindPopup(`<strong>${objet.nom}</strong><br>${objet.description}`);
                this.marqueurs.push({m : marqueur, objet, zoom : objet.minzoomvisible});

                marqueur.addTo(this.carte);

                marqueur.on('click', () => {  
                    this.departJeu(objet);
                });

                marqueur.on('mouseover',() => {   
                    marqueur.openPopup();
                  });
                
            };
        },

        updateMarkersVisibility() {
            const zoomLevel = this.carte.getZoom();
            this.marqueurs.forEach(({ m, zoom }) => {
                if (zoom <= zoomLevel) {
                    m.addTo(this.carte);
                } else {
                    m.removeFrom(this.carte); 
                }
            })
        },

        departJeu(objet) {
            // Regarde si c'est un objet de départ
            let id = objet.id
            if (objet.depart === "t" && id >= 12 && id <= 14){
                this.inventaire.push(objet); 
                // Suppression des objets de départ
                for (let i = this.marqueurs.length - 1; i >= 0; i--) {
                    const { m, objet: mObjet } = this.marqueurs[i];
                    //let m = this.marqueurs[i].m
                    //let obj = m.objet
                    
                    if (mObjet.id >= 12 && mObjet.id <= 14) {
                        m.removeFrom(this.carte); // Supprime le marqueur de la carte
                        console.log(this.marqueurs)
                        this.marqueurs.splice(i, 1); // Supprime le marqueur de la liste
                    }
                }
                if (id === '14') {
                    // Chargement Fukushima + Tchernobyl
                    this.charger_obj(5);
                    this.charger_obj(6);
                }else if (id === '13') {
                    // Chargement de l'aéroport
                    this.charger_obj(1);
                }else if (id === '12'){
                    // Chargement WTC
                    this.charger_obj(7);
                }

            }

        }
    }
}).mount('#appmap');
