import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dbs-music-library.firebaseapp.com",
  projectId: "dbs-music-library",
  storageBucket: "dbs-music-library.firebasestorage.app",
  messagingSenderId: "518441666386",
  appId: "1:518441666386:web:897f7cf9e9f1d563ba9c8b",
  measurementId: "G-W6K9G9D5YN"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore(app);
