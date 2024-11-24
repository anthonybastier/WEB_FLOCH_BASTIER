Vue.createApp({
    data() {
        return {
            joueurs: []
        };
    },

    mounted() {
        fetch('/joueurs')
            .then(result => result.json())
            .then(data => {
                this.joueurs = data;
                for (let joueur of this.joueurs) {
                    this.ajouterLigne(joueur);
                }
            })
    },

    methods: {
        ajouterLigne(joueur) {
            const tableau = document.getElementById("hall_of_fame");
            const tbody = tableau.getElementsByTagName("tbody")[0];

            const ligne = document.createElement("tr");

            const cellule1 = document.createElement("th");
            cellule1.textContent = player['pseudo'];
            const cellule2 = document.createElement("td");
            cellule2.textContent = player['score'];
            const cellule3 = document.createElement("td");
            cellule3.textContent = tbody.rows.length + 1;

            ligne.appendChild(cellule1);
            ligne.appendChild(cellule2);
            ligne.appendChild(cellule3);
            tbody.appendChild(ligne);
        }
    }
}).mount('#hall_of_fame');