<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="balance-container">
    <h4>Balance</h4>
    <h1 id="balance"><span class="dollar-sign">$</span>{{ total }}</h1>
  </div>
</template>

<style scoped>
.balance-container {
  text-align: center;
  margin-top: 1em;
  background: #f9f9f9;
  padding: 1.5em;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.balance-container h4 {
  margin: 0;
  font-size: 1.5em;
  color: #007BFF;
}

.balance-container h1 {
  margin: 0.5em 0 0;
  font-size: 2.5em;
  color: #333;
}

.dollar-sign {
  color: green;
  font-weight: bold;
}
</style>
