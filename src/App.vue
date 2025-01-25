<script setup>
import Navbar from '@/components/Navbar.vue';
import Header from '@/components/Header.vue';
import Balance from '@/components/Balance.vue';
import Add from '@/components/Add.vue';
import List from '@/components/List.vue';
import { RouterView, useRouter } from 'vue-router';

import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { db } from '@/firebase/firebaseInit';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
    }
  }
};

onMounted(fetchTransactions);

const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => acc + transaction.amount, 0);
});

const handleTransactionSubmission = async (transactionData) => {
  if (!username.value) return;
  
  const newTransaction = {
    date: transactionData.date,
    description: transactionData.description,
    amount: transactionData.amount,
  };

  transactions.value.push(newTransaction);

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
  <RouterView />
</template>
