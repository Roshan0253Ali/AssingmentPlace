<template>
  <div>
    <h2>Charging Stations</h2>
    <div id="map" style="width: 100%; height: 500px;"></div>
  </div>
</template>

<script>
import axios from 'axios';
import { Loader } from '@googlemaps/js-api-loader';

export default {
  data() {
    return {
      stations: []
    };
  },
  async mounted() {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/stations', {
      headers: { Authorization: `Bearer ${token}` }
    });
    this.stations = res.data;
    this.loadMap();
  },
  methods: {
    loadMap() {
      const loader = new Loader({
        apiKey: 'AIzaSyDsPSIHMdnO8NVYTj8dGKjfNzPaPFMfCdA',
        version: 'weekly'
      });

      loader.load().then(() => {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: this.stations[0]?.location.lat || 0, lng: this.stations[0]?.location.lng || 0 },
          zoom: 10
        });

        this.stations.forEach(station => {
          const marker = new google.maps.Marker({
            position: station.location,
            map,
            title: station.name
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div>
                <strong>${station.name}</strong><br/>
                Status: ${station.status}<br/>
                Power: ${station.powerOutput} kW<br/>
                Connector: ${station.connectorType}
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });
      });
    }
  }
};
</script>
