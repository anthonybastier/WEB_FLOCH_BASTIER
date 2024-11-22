Vue.createApp({
    data() {
      return {
        pseudo: '',
        max: 12,
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
  }).mount('#login');