<script setup>
import Navbar from '@/components/Navbar.vue';
import Header from '@/components/Header.vue';
import Balance from '@/components/Balance.vue';
import Add from '@/components/Add.vue';
import List from '@/components/List.vue';
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { db } from '@/firebase/firebaseInit';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();
const username = ref(localStorage.getItem('username') || '');
const transactions = ref([]);

const fetchTransactions = async () => {
  if (username.value) {
    const userDocRef = doc(db, "users", username.value);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      transactions.value = userDoc.data().transactions || [];
      console.log("Fetched transactions: ", transactions.value);
    }
  }
};

onMounted(fetchTransactions);

const total = computed(() => {
  const calculatedTotal = transactions.value.reduce((acc, transaction) => acc + transaction.amount, 0);
  console.log("Calculated total: ", calculatedTotal); 
  return calculatedTotal;
});

const handleTransactionSubmission = async (transactionData) => {
  if (!username.value) return;

  const newTransaction = {
    date: transactionData.date,
    description: transactionData.description,
    amount: transactionData.amount,
  };

  transactions.value.push(newTransaction);
  console.log("Added transaction: ", newTransaction); 

  const userDocRef = doc(db, "users", username.value);
  await setDoc(userDocRef, { transactions: transactions.value }, { merge: true });

  toast.success('Transaction added');
};

const handleTransactionDeletion = async (id) => {
  if (!username.value) return;

  transactions.value = transactions.value.filter(transaction => transaction.id !== id);

  const userDocRef = doc(db, "users", username.value);
  await setDoc(userDocRef, { transactions: transactions.value }, { merge: true });

  toast.success('Transaction deleted');
};

const logout = () => {
  localStorage.removeItem('username');
  toast.success('Logged out successfully');
  router.push('/login');
};
</script>

<template>
  <div class="home-container">
    <Navbar :onLogout="logout" />
    <div class="container">
      <Header />
      <Balance :total="total" />
      <div class="form-section">
        <Add @transactionSubmitted="handleTransactionSubmission" />
      </div>
      <div class="list-section">
        <List :transactions="transactions" @transactionDeleted="handleTransactionDeletion" />
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 900px;
  margin: 20px auto;
  padding: 2em;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

h1, h2, h3 {
  color: #333;
  text-align: center;
  margin-bottom: 1em;
}

.form-section {
  margin-top: 2em;
  padding: 1.5em;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.list-section {
  margin-top: 2em;
  padding: 1.5em;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 12px 20px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

input[type="text"], input[type="number"], input[type="date"] {
  width: 100%;
  padding: 15px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
}

input[type="text"]:focus, input[type="number"]:focus, input[type="date"]:focus {
  border: 2px solid #555;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.table th {
  background-color: #007BFF;
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table tr:hover {
  background-color: #ddd;
}
</style>
