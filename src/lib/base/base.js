import { initializeApp } from "firebase/app";
// import firestore from 'firebase/firestore'
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKBorm_hrUCvyJ9jdA1B10MggVBomId5g",
  authDomain: "tamplate-images.firebaseapp.com",
  projectId: "tamplate-images",
  storageBucket: "tamplate-images.appspot.com",
  messagingSenderId: "229209317376",
  appId: "1:229209317376:web:9e9ed10b385e428ce438e5",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { db, auth };
