Vue.createApp({
    data() {
        return {
            tab_obj: [],
            inventaire: [],
            carte: null, 
            marqueurs: [],
            heatmap: null,
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
            if (objet.selectionne) {
                objet.selectionne = false;
            } else {
                this.inventaire.forEach(item => item.selectionne = false);
                objet.selectionne = true;
            }
        },

        initMap() {
            this.carte = L.map('map').setView([-25.804837, 133.813477], 6);

            L.tileLayer('https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=e9da8ed0987a4ccdb4bb1710f21e0ee6', {
                attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 22
            }).addTo(this.carte);

            //Initialisation de la carte de chaleur pour tricher
            this.heatmap = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
                layers : 'BastierAnthony:objet' ,
                format : 'image/png',
                transparent : true
            })

            L.marker([-25.804837, 133.813477]).addTo(this.carte);

            this.carte.on('zoomend', this.updateMarkersVisibility);
        },

        activerTriche(){
            
            if (this.carte.hasLayer(this.heatmap)) {
                this.heatmap.removeFrom(this.carte);
            }else{
                this.heatmap.addTo(this.carte)

            }
        },

        ajoutMarqueurs() {
            for (let objet of this.tab_obj) { 
                // Configuration de la taille de l'icône dans un format lisible par Javascript
                taille_icone = objet.taille_icone.match(/[\w.-]+/g).map(Number);

                const icon = L.icon({
                    iconUrl: objet.url_icone,
                    iconSize: [taille_icone[0],taille_icone[1]],
                    iconAnchor: [objet.y, objet.x],
                });
                
                const marqueur = L.marker([objet.y, objet.x], { icon });

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
            if (objet.depart === "t" && id >= 8 && id <= 10){
                this.inventaire.push({...objet, selectionne: false}); 
                // Suppression des objets de départ
                for (let i = this.marqueurs.length - 1; i >= 0; i--) {
                    const { m, objet: mObjet } = this.marqueurs[i];
                    
                    if (mObjet.id >= 8 && mObjet.id <= 10) {
                        m.removeFrom(this.carte); // Supprime le marqueur de la carte
                        this.marqueurs.splice(i, 1); // Supprime le marqueur de la liste
                    }
                }
                if (id === '10') {
                    // Chargement Fukushima + Tchernobyl
                    this.chargerObj(5);
                    this.chargerObj(6);
                }else if (id === '9') {
                    // Chargement de l'aéroport
                    this.chargerObj(1);
                }else if (id === '8'){
                    // Chargement WTC
                    this.chargerObj(7);
                }

            }

        }
    }
}).mount('#appmap');
