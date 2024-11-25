Vue.createApp({
    data() {
        return {
            tab_obj: [],
            inventaire: [],
            carte: null, 
            marqueurs: [],
            heatmap: null,
            timer: null,
            tempsRestant: 600,
            score: 0,
            pseudo: ''
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
        this.pseudo = localStorage.getItem("pseudo");
    },
    methods: {
        // Démarrage d'un minuteur de 10min pour calcul du score
        demarrerMinuteur() {
            this.tempsRestant = 600; 
            const timeDisplay = document.getElementById('time-display');
        
            this.timer = setInterval(() => {
                if (this.tempsRestant > 0) {
                    this.tempsRestant--;
        
                    // Convertir le temps restant en minutes et secondes
                    const minutes = Math.floor(this.tempsRestant / 60);
                    const seconds = this.tempsRestant % 60;
        
                    // Maj affichage minuteur
                    timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                } else {
                    clearInterval(this.timer);
                    this.finJeu(false); 
                }
            }, 1000);
        },

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

                this.marqueurs.push({m : marqueur, objet, zoom : objet.minzoomvisible});

                //Liaison du popup avec le marqueur
                let msg = "Se rendre ici ?"
                if (objet.id == 13){
                    // ObjetBloque, on affiche l'indice
                    msg = "<br> <strong> Indice : </strong>" + objet.indice
                } else if (objet.id >= 8 && objet.id <= 12){
                    msg = objet.description
                }
                this.affichagePopup(objet, msg);

                marqueur.addTo(this.carte);

                marqueur.on('click', () => {  
                    this.derouleJeu(objet);
                });

                marqueur.on('mouseover',() => {   
                    marqueur.openPopup();
                  });
                
            };
        },

        affichagePopup(objet, msg){
            const marqueur = this.marqueurs.find(
                ({ objet: mObjet }) => mObjet.id === objet.id);
            marqueur.m.bindPopup(`<strong>${objet.nom}</strong><br>${msg}`);
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

        derouleJeu(objet) {
            if (!this.timer) {
                this.demarrerMinuteur(); // Démarrer le minuteur au début du jeu
            }
            let id = objet.id
            // Regarde si c'est un objet de départ
            if (objet.depart === "t" && id >= 8 && id <= 10){
                this.inventaire.push({...objet, selectionne: false}); 
                // Suppression des objets de départ
                for (let i = this.marqueurs.length - 1; i >= 0; i--) {
                    const { m, objet: mObjet } = this.marqueurs[i];
                    
                    if (mObjet.id >= 8 && mObjet.id <= 10) {
                        m.removeFrom(this.carte); 
                        this.marqueurs.splice(i, 1); // Supprime le marqueur de la liste
                    }
                }
                if (id === '10') {
                    this.chargerObj(4); // Fukushima
                    this.chargerObj(12); // Tchernobyl
                }else if (id === '9') {
                    this.chargerObj(13); // Aeroport Kuala Lumpur
                }else if (id === '8'){
                    this.chargerObj(1); // Statue Liberté
                }

            }
            // Etape 2
            if (id == '13'){
                // Clic sur Kuala Lumpur
                if ((this.inventaire[0].selectionne)){ 
                    // Clic avec le billet d'avion
                    this.finJeu(false, objet.description)
                }
            }
            if (id == '4'){
                // Clic sur Fukushima
                this.finJeu(false, objet.description)
            }
            if (id == '12'){
                // Clic sur Tchernobyl
                this.chargerObj(6) // Vésuve
                this.chargerObj(11) // Volcan Tambora
                txt = objet.description
                txt += "<br> <strong> Indice : </strong>" + objet.indice
                txt += "<br> <strong> Entrez le code de la boîte : </strong>"
                txt += "<form id='code-form' onsubmit='return false;'>"
                txt += "<input type='number' class='code' min='0' max='9'>"
                txt += "<input type='number' class='code' min='0' max='9'>"
                txt += "<input type='number' class='code' min='0' max='9'>"
                txt += "<input type='number' class='code' min='0' max='9'>"
                txt += "<button type='button' id='ouvrir'>Ouvrir</button> </form>"
                this.affichagePopup(objet, txt)

                // Vérification du code
                setTimeout(() => {
                    const ouverture = document.getElementById('ouvrir');
                    if (ouverture) {
                        ouverture.addEventListener('click', () => {
                            // Selection de tous les nombres
                            const nombres = Array.from(document.querySelectorAll('.code'));
                            const codeSaisi = nombres.map(input => input.value).join('');
                            if (codeSaisi === '0000') {
                                this.finJeu(true, "Bravo ! Vous avez ouvert la boîte de Pandore ?");
                            } else {
                                alert("Code incorrect. Réessayez !");
                            }
                        });
                    }
                }, 500);
            }
            if (id == '1'){
                // Clic sur la Statue de la Liberté
                this.chargerObj(7) // Titanic
                this.chargerObj(14) // Épave du Wilhelm Gustloff
                this.affichagePopup(objet, objet.description)
            }

            // Etape 3
            if (id == '14'){
                // Clic sur le Wilhelm Gustloff
                if ((this.inventaire[0].selectionne)){
                    txt = "Vous tirez sur le coffre de la vie éternelle avec le pistolet. Il s'ouvre, la vie éternelle s'offre à vous !"
                    this.finJeu(true, txt)
                }
                this.chargerObj(2) // Louvre
                this.chargerObj(3) // Khéops
                txt = objet.description
                txt += "<br> <strong> Indice : </strong>" + objet.indice
                this.affichagePopup(objet, txt)
            }
            if (id == '7'){
                // Clic sur le Titanic
                this.chargerObj(5) // WTC
                txt = objet.description
                txt += "<br> <strong> Indice : </strong> Rendez-vous en haut d'une tour de NYC."
                this.affichagePopup(objet, txt)
            }
            if (id == '11'){
                // Clic sur le volcan Tambora
                txt = objet.description
                txt += "<br> <strong> Code :</strong> " + "0000"
                this.affichagePopup(objet, txt)
            }
            if (id == '6'){
                // Clic sur le Vésuve
                this.finJeu(false, objet.description)
            }

            // Etape 4
            if (id == '5'){
                // Clic sur les Tours Jumelles
                this.finJeu(false, objet.description)
            }
            if (id == '2'){
                // Clic sur le Louvre
                this.finJeu(false, objet.description)
            }
            if (id == '3'){
                // Clic sur Khéops
                this.affichagePopup(objet, objet.description)
            }
        },

        finJeu(vict, msg) {
            clearInterval(this.timer);
            if (vict == true) {
                this.score = this.tempsRestant;
                alert(`Félicitations ! Vous vous êtes échappé à temps ! Votre score est : ${this.score} points.`);
            } else {
                this.score = 0;
                alert("Vous avez perdu, votre score est de 0. " + msg);
            }
            setTimeout(() => {
                window.location.href = "/accueil"; 
            }, 5000);

            this.addScore();
        },

        // Pour ajouter le pseudo dans la bdd //
        addScore() {
            const data = {
              pseudo: this.pseudo,
              score: this.score
            };
      
            fetch('/addscore', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data) 
            })
            .then(result => result.json())

            .then(result => {
                if (result.success) {
                    console.log('Score enregistré avec succès:', result.message);
                } else {
                    console.error('Erreur serveur:', result.error);
                }
            })
            .catch(error => {
              console.error('Erreur lors de la sauvegarde du score', error);
            });
          },
    }
}).mount('#appmap');
