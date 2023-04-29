// Your web app's Firebase configuration

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "projects-ab0c9.firebaseapp.com",
  projectId: "projects-ab0c9",
  storageBucket: "projects-ab0c9.appspot.com",
  messagingSenderId: "568037047229",
  appId: "1:568037047229:web:a793793b95d4989d3bb0d4",
  measurementId: "G-SZRLL0P2V8",
};

// Initialize Fiberbase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
