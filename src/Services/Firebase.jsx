
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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

// Initialize Firestore
export const fireDB = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;

