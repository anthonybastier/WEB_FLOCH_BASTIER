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
        limite() {
            if (this.nbrCaracRestants >= 0) {
                return true;
            }else{
                return false;
            };
        },
    },
    created() {
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