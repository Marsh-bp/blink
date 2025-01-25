<template>
  <div class="login-container">
    <div class="login-box">
      <h2 style="font-size: 30px;">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input type="email" v-model="email" placeholder="Email" required />
        </div>
        <div class="form-group">
          <input type="password" v-model="password" placeholder="Password" required />
        </div>
        <button type="submit" class="btn">Login</button>
      </form>
      <p class="signup-link">Don't have an account? <router-link to="/signup">Signup</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '@/services/api';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const toast = useToast();
const router = useRouter();

const handleLogin = async () => {
  try {
    const user = await login(email.value, password.value);
    localStorage.setItem('username', user.email);
    toast.success('Login successful');
    router.push('/home'); 
  } catch (error) {
    toast.error(error.message || 'Login failed');
  }
};
</script>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  padding: 0;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  background-color: #fff;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.login-box h2 {
  margin-bottom: 1.5em;
  color: #333;
}

.form-group {
  margin-bottom: 1.5em;
}

.form-group input {
  width: 100%;
  padding: 0.75em;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 1em;
}

.form-group input:focus {
  border-color: #007BFF;
  outline: none;
}

.btn {
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 0.75em 1.5em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
  margin: 0.5em 0;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}

.signup-link {
  margin-top: 1em;
  color: #333;
}

.signup-link a {
  color: #007BFF;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style>
