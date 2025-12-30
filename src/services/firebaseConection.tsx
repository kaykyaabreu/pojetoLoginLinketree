
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDD1u-j9MKS4-yFE-hyUwUmz677qjajKwE",
  authDomain: "react-15548.firebaseapp.com",
  projectId: "react-15548",
  storageBucket: "react-15548.firebasestorage.app",
  messagingSenderId: "1066504419221",
  appId: "1:1066504419221:web:28a1b0116f2c628adaa89c",
  measurementId: "G-DR9N628PRE"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };