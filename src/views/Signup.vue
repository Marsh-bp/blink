<template>
  <div>
    <h2>Signup</h2>
    <form @submit.prevent="handleSignup">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Signup</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { signup } from '@/services/api';
import { useToast } from 'vue-toastification';

const email = ref('');
const password = ref('');
const toast = useToast();

const handleSignup = async () => {
  try {
    const user = await signup(email.value, password.value);
    localStorage.setItem('username', user.email);
    toast.success('Signup successful');
  } catch (error) {
    toast.error(error.message || 'Signup failed');
  }
};
</script>
