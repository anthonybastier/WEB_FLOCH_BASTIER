var map = L.map('map').setView([-25.804837, 133.813477], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var depart = L.marker([-25.804837, 133.813477]).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);


Vue.createApp({
    data() {

    },
    methods: {
        fonction() {

        }
    },
  }).mount('#app');