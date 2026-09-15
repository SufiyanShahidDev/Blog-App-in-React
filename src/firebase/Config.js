// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAn0x4IejzMJioWyjO5I0SLoGTVoJ6okYA",
    authDomain: "blog-app-507e0.firebaseapp.com",
    projectId: "blog-app-507e0",
    storageBucket: "blog-app-507e0.firebasestorage.app",
    messagingSenderId: "709877982887",
    appId: "1:709877982887:web:9bd41a4b334bdf984b1d82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
