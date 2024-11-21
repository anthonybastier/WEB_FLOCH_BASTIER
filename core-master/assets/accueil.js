Vue.createApp({
    data() {
      return {
        pseudo: '',
        max: 12,
        message: '',
        success: false
      };
    },
    methods: {
        async play() {
    		try {
        		const response = await fetch('/addpseudobdd', {
            		method: 'POST',
            		headers: {
                		'Content-Type': 'application/json'
            		},
            		body: JSON.stringify({
                		pseudo: this.pseudo
            		})
        		});

        		const data = await response.json();
        		console.log('Données reçues:', data);

        		this.message = data.message;
        		this.success = data.success;

        		if (this.success) {
        		    this.pseudo = '';
        		    window.location.href = '/jeu';
        		}
    		} catch (error) {
        		this.message = "Erreur lors de l'ajout du pseudo.";
        		this.success = false;
        		console.error('Fetch Error:', error);
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