// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtkm79UzgGMcCaUvwH-qgNKROZUuDdNuM",
  authDomain: "react-ecommerce-50849.firebaseapp.com",
  projectId: "react-ecommerce-50849",
  storageBucket: "react-ecommerce-50849.firebasestorage.app",
  messagingSenderId: "925904637381",
  appId: "1:925904637381:web:1e09de38e772a8ddc6cfac",
  measurementId: "G-2ESLZN8PWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}