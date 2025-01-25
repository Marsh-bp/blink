import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcpFDVgOFFAo8iwx3IQoa8v9bBdFPYZn4",
  authDomain: "blink-167ee.firebaseapp.com",
  projectId: "blink-167ee",
  storageBucket: "blink-167ee.appspot.com",
  messagingSenderId: "162195289711",
  appId: "1:162195289711:web:75fe91b58ace05df09ff9a",
  measurementId: "G-JJD6GHPFQ2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { db , auth};