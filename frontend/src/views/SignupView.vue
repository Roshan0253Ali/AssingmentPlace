<template>
  <div class="container">
    <div class="form-box">
      <h2>SIGN UP</h2>
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <input v-model="email" type="email" placeholder="Email" required />
          <span class="error" v-if="emailError">{{ emailError }}</span>
        </div>

        <div class="input-group">
          <input v-model="password" type="password" placeholder="Password" required />
          <span class="error" v-if="passwordError">{{ passwordError }}</span>
        </div>

         <button   class="submit-btn" @click="signup">Register</button>

        

        <p class="login-link">
          Already a user? <router-link to="/login">LOGIN</router-link>
        </p>
      </form>
    </div>
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
        await axios.post('https://assingmentplace.onrender.com/api/auth/signup', {
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

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
  padding: 20px;
}

.form-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.input-group {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.error {
  color: #ff4b7d;
  font-size: 12px;
  margin-top: 5px;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #ff4b7d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.submit-btn:not(:disabled):hover {
  background: #ff3567;
}

.divider {
  text-align: center;
  margin: 20px 0;
}

.social-links {
  display: flex;
  justify-content: space-around;
  gap: 10px;
}

.social-btn {
  flex: 1;
  padding: 10px;
  background: #eee;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-link {
  text-align: center;
  margin-top: 20px;
}
</style>
