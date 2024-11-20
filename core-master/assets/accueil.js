Vue.createApp({
    data() {
      return {
        pseudo: '',
        max: 12,
      };
    },
    methods: {
        identification() {
            return(this.liste.push(this.pseudo));}
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