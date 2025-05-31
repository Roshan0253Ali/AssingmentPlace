<template>
  <div>
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

export default {
  data() {
    return {
      name: '',
      lat: '',
      lng: '',
      status: 'Active',
      powerOutput: '',
      connectorType: ''
    };
  },
  methods: {
    async addStation() {
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
      this.$emit('added');
    }
  }
};
</script>
