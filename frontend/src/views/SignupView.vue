<template>
  <div>
    <h2>Signup</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="signup">Register</button>
    <p v-if="message">{{ message }}</p>
    <p>
      Already have an account? <router-link to="/login">Login here</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async signup() {
      try {
        await axios.post('http://localhost:5000/api/auth/signup', {
          email: this.email,
          password: this.password
        });
        this.message = 'User created! Redirecting to login...';
        setTimeout(() => this.$router.push('/login'), 1500);
      } catch (err) {
        this.message = err.response?.data?.message || 'Signup failed';
      }
    }
  }
};
</script>
