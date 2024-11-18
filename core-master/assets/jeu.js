// Définition des icônes des objets
const epave = L.icon({
    iconUrl: "sprite/shipwreck.png",
    iconSize: [32, 32],
});


let map = Vue.createApp({});

/* Composant de la carte */
map.component('my-component', {
    template: '<div id="map"></div>',
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            var map = L.map('map').setView([-25.804837, 133.813477], 4);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            var depart = L.marker([-25.804837, 133.813477]).addTo(map);
            var popup = L.popup();
            /* fonction à retirer avant de rendre */
            function onMapClick(e) {
                popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(map);
            }
            map.on('click', onMapClick);
        }
    },
});

map.mount('#appmap');        



Vue.createApp({
    data() {
        return {
            list_obj:[],
        };
    },
    created() {
        this.charger_obj();
      },
    methods: {
        charger_obj(id = null){
            this.list_obj=[];
            url = '/api/objets';
            if (id) {
                url += `?id_objet=${encodeURIComponent(id)}`
            }
            fetch(url)
              .then(result => result.json())
              .then(result => {
                this.list_obj = result
                console.log(result)
            })
        }
    },
  }).mount('#inventaire');