// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_4jE6nV4Dl76hwauZOIEb1yA_mVqxZQA",
  authDomain: "proyecto-prueba-fe575.firebaseapp.com",
  projectId: "proyecto-prueba-fe575",
  storageBucket: "proyecto-prueba-fe575.firebasestorage.app",
  messagingSenderId: "871860616638",
  appId: "1:871860616638:web:75d3a29e3b1a579023cdef",
  measurementId: "G-14B8WPSW99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

