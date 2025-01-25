<!-- <script setup>
import Header from '@/components/Header.vue';
import Balance from '@/components/Balance.vue';
import List from '@/components/List.vue';
import Add from '@/components/Add.vue'
import Navbar from '@/components/Navbar.vue';

import { RouterView } from 'vue-router';

import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { db } from './firebase/firebaseInit';
import { query, orderBy, addDoc, collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

const toast = useToast();

const transactions = ref([
]);

const transactionsCollectionRef = collection(db, "transactions");
const transactionsCollectionQuery = query(transactionsCollectionRef, orderBy("date", "desc"));

onMounted(() => {
  onSnapshot(transactionsCollectionQuery, (querySnapshot) => {
    const localStore = [];
    querySnapshot.forEach((doc) => {
      const transaction = {
        id: doc.id,
        date: doc.data().date,
        description: doc.data().description,
        amount: doc.data().amount,
      };
      localStore.push(transaction);
    });
    transactions.value = localStore;
  })
});

const total = computed(() => {
  return transactions.value
  .reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
});

const handleTransactionSubmission = (transactionData) => {
  addDoc(transactionsCollectionRef, {
    date: transactionData.date,
    description: transactionData.description,
    amount: transactionData.amount
  });

  toast.success('Transaction added');
};

const handleTransactionDeletion = (id) => {
  deleteDoc(doc(transactionsCollectionRef, id));

  toast.success('Transaction deleted');
};
</script>

<template>
  <Navbar />
  <Header />
  <div class="container">
    <Balance :total="+total" />
    <br />
    <Add @transactionSubmitted="handleTransactionSubmission" />
    <br />
    <List :transactions="transactions" @transactionDeleted="handleTransactionDeletion" /> 
  </div>
</template> -->
<script setup>
import Header from '@/components/Header.vue';
import Balance from '@/components/Balance.vue';
import List from '@/components/List.vue';
import Add from '@/components/Add.vue';
import Navbar from '@/components/Navbar.vue';
import { RouterView } from 'vue-router';

import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { db } from './firebase/firebaseInit';
import { query, orderBy, collection, onSnapshot, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

const toast = useToast();
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
</script>

<template>
  <Navbar />
  <Header />
  <div class="container">
    <Balance :total="total" />
    <br />
    <Add @transactionSubmitted="handleTransactionSubmission" />
    <br />
    <List :transactions="transactions" @transactionDeleted="handleTransactionDeletion" />
  </div>
</template>
