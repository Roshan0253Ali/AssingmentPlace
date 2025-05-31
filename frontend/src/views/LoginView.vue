<template>
  <div>
    <h2>Login</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <p v-if="error">{{ error }}</p>
    <p>
      Don't have an account? <router-link to="/signup">Sign up here</router-link>
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
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email: this.email,
          password: this.password
        });
        localStorage.setItem('token', res.data.token);
        this.$router.push('/dashboard');
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed';
      }
    }
  }
};
</script>
