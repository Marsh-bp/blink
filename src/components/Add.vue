<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const date = ref('');
const description = ref('');
const amount = ref('');

const emit = defineEmits(['transactionSubmitted']);

const toast = useToast();

const addTransaction = () => {
  if (!date.value || !description.value || !amount.value) {
    toast.error('All fields must be filled');
    return;
  }

  const transactionData = {
    date: date.value,
    description: description.value,
    amount: parseFloat(amount.value),
  };

  emit('transactionSubmitted', transactionData);

  date.value = '';
  description.value = '';
  amount.value = '';
};
</script>

<template>
  <form id="form" @submit.prevent="addTransaction">
    <div class="form-control">
      <label for="date">Date</label>
      <input type="date" id="date" placeholder="Date" v-model="date" />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <input type="text" id="description" placeholder="Description" v-model="description" />
    </div>
    <div class="form-control">
      <label for="amount">Amount</label>
      <input type="number" id="amount" placeholder="Amount" v-model="amount" />
    </div>
    <button class="btn">Add Transaction</button>
  </form>
</template>

<style scoped>
#form {
  background: #fff;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.form-control {
  margin-bottom: 1em;
}

.form-control label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
  color: #333;
}

input[type="text"], input[type="number"], input[type="date"] {
  width: 100%;
  padding: 0.75em;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 1em;
  color: #333;
}

input[type="text"]:focus, input[type="number"]:focus, input[type="date"]:focus {
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
</style>
