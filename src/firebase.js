import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4-faS2N2BVP1MFS6a_OyWiEnHkxAzziA",
  authDomain: "mj-restaurant.firebaseapp.com",
  projectId: "mj-restaurant",
  storageBucket: "mj-restaurant.firebasestorage.app",
  messagingSenderId: "628493991419",
  appId: "1:628493991419:web:3d9250a5ee89139e9f9f5e",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);