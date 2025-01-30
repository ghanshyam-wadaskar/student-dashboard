import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9hzsH2U22Jw2Z9j1Ac10Ln-xapQi9FfY",
  authDomain: "student-dashboard-56fe1.firebaseapp.com",
  projectId: "student-dashboard-56fe1",
  storageBucket: "student-dashboard-56fe1.appspot.com",  
  messagingSenderId: "299371503275",
  appId: "1:299371503275:web:76f0a4bd84df016143a1ee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
