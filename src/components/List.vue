<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['transactionDeleted']);

const deleteTransaction = (id) => {
  emit('transactionDeleted', id);
};
</script>

<template>
  <ul id="list" class="list">
    <li v-for="transaction in transactions" v-bind:key="transaction.id" class="transaction-item">
      <span class="transaction-date">{{ transaction.date }}</span>
      <span class="transaction-description">{{ transaction.description }}</span>
      <span class="transaction-amount">$ {{ transaction.amount }}</span>
      <button @click="deleteTransaction(transaction.id)" class="delete-btn">x</button>
    </li>
  </ul>
</template>

<style scoped>
.list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  margin-bottom: 0.5em;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.transaction-item:hover {
  background-color: #f1f1f1;
}

.transaction-date {
  font-weight: bold;
  color: #007BFF;
  flex: 1;
}

.transaction-description {
  flex: 3;
  text-align: center;
  color: #333;
}

.transaction-amount {
  flex: 2;
  text-align: right;
  color: #28a745;
}

.delete-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5em 1em;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #ff1a1a;
}
</style>
