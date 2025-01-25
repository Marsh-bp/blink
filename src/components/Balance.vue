<template>
    <div class="balance">
      <h3>Your Balance</h3>
      <h1><span class="dollar-sign">$</span>{{ total }}</h1>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { ref } from 'vue';
  
  const total = ref(0);
  
  // Replace with your actual computation logic
  // const total = computed(() => { return your_total_value; });
  </script>
  
  <style scoped>
  .balance {
    text-align: center;
    margin-bottom: 2em;
  }
  
  .balance h1 {
    font-size: 48px;
    margin: 0;
  }
  
  .dollar-sign {
    color: green;
  }
  </style>
  