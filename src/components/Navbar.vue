<template>
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-left">
          <router-link to="/home">Blink</router-link>
        </div>
        <div class="nav-right">
          <button @click="onLogout">Logout</button>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    onLogout: {
      type: Function,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .navbar {
    width: 100%;
    background-color: #007BFF;
    padding: 1em 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;
  }
  
  .nav-left a {
    background: #22E0DE;
    background: linear-gradient(to right, #22E0DE 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    text-decoration: none;
    font-size: 40px;
    display: block; 
    margin: 0 auto; 
  }
  
  .nav-right button {
    background-color: #0056b3;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .nav-right button:hover {
    background-color: #003d7a;
  }
  </style>
  
