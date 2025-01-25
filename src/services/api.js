import { db, auth } from '@/firebase/firebaseInit';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const signup = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const getTransactions = async (username) => {
  const userDoc = await getDoc(doc(db, "users", username));
  if (userDoc.exists()) {
    return userDoc.data().transactions;
  } else {
    return [];
  }
};

export const addTransaction = async (username, transaction) => {
  const userDocRef = doc(db, "users", username);
  const userDoc = await getDoc(userDocRef);
  let transactions = [];
  if (userDoc.exists()) {
    transactions = userDoc.data().transactions || [];
  }
  transactions.push(transaction);
  await setDoc(userDocRef, { transactions }, { merge: true });
  return transactions;
};
