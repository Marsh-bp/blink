<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
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
      router.push('/'); // Redirect to the home page
    } catch (error) {
      toast.error(error.message || 'Login failed');
    }
  };
  </script>
  