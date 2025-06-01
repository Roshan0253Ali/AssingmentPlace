<template>
  <div>
    <h2>Charging Stations</h2>
    <div id="map" style="width: 100%; height: 500px;"></div>
    
       <!-- Form -->
    <h3>Add Charging Station</h3>
    <input v-model="name" placeholder="Name" />
    <input v-model.number="lat" placeholder="Latitude" />
    <input v-model.number="lng" placeholder="Longitude" />
    <input v-model.number="powerOutput" placeholder="Power Output (kW)" />
    <input v-model="connectorType" placeholder="Connector Type" />
    <select v-model="status">
      <option>Active</option>
      <option>Inactive</option>
    </select>
    <button @click="addStation">Add</button>
  </div>
</template>

<script>
import axios from 'axios';
import { Loader } from '@googlemaps/js-api-loader';

export default {
  data() {
    return {
      stations: [],
       name: '',
      lat: '',
      lng: '',
      status: 'Active',
      powerOutput: '',
      connectorType: '',
      map: null
    };
  },
  async mounted() {
    const token = localStorage.getItem('token');
    const res = await axios.get('https://assingmentplace.onrender.com/api/stations', {
      headers: { Authorization: `Bearer ${token}` }
    });
    this.stations = res.data;
    this.loadMap();
  },
  methods: {
     async fetchStations() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://assingmentplace.onrender.com/api/stations', {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.stations = res.data;
        this.loadMap();
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    },

    async addStation() {
      try {
        const token = localStorage.getItem('token');
        await axios.post('https://assingmentplace.onrender.com/api/stations', {
          name: this.name,
          location: { lat: this.lat, lng: this.lng },
          status: this.status,
          powerOutput: this.powerOutput,
          connectorType: this.connectorType
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Clear form
        this.name = '';
        this.lat = '';
        this.lng = '';
        this.status = 'Active';
        this.powerOutput = '';
        this.connectorType = '';

        await this.fetchStations(); // refresh map
      } catch (error) {
        console.error('Error adding station:', error);
      }
    },



    loadMap() {
      const loader = new Loader({
        apiKey: 'AIzaSyDTlBno_1byiGr_vRL_GaH8sGV6gQQg0KA',
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