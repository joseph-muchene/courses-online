// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaejJpD3pWoJfqk69zYCTz8jEiHR9sl1M",
  authDomain: "social-400c6.firebaseapp.com",
  projectId: "social-400c6",
  storageBucket: "social-400c6.appspot.com",
  messagingSenderId: "1097036038743",
  appId: "1:1097036038743:web:b5a9d88bd082082ae6d912",
  measurementId: "G-9B0NG4BT4D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();
export { app };
export { db };
export { auth };
export { storage };
