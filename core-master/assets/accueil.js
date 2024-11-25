Vue.createApp({
    el: '#hall_of_fame',
    data() {
      return {
        pseudo: '',
        max: 12,
        joueurs: []
      };
    },

    methods: {

        // Enregistrer localement le pseudo du joueur et lancer la partie //

        async play() {
            try {
                const result = await fetch('/addpseudobdd', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        pseudo: this.pseudo
                    })
                });
    
                if (!result.ok) {
                    const errorData = await result.json();
                    console.error('Erreur:', errorData.error);
                    throw new Error('Erreur serveur');
                }

                const data = await result.json();
                if (data.redirect) {
                    localStorage.setItem('pseudo', this.pseudo);
                    console.log(this.pseudo);
                    this.pseudo = '';
                    window.location.href = data.redirect;
                }
            } catch (error) {
                console.error('Erreur :', error);
            }
        }
    },

    computed: {
        nbrCaracRestants() {
            return (this.max - this.pseudo.length);
            },
    },

    // Chargement des données du hall of fame //

    created() {
        console.log(this.pseudo);
        fetch('/halloffame')
          .then(response => response.json())
          .then(data => {
            if (!data.error) {
              this.joueurs = data;
            } else {
              console.error(data.error);
            }
          })
          .catch(error => console.error('Erreur lors du chargement des données:', error));
      }
  }).mount('#login');