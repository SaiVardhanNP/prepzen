// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_uDvywjdbk2Dp_2C9mGtfQSfL65QMZ_g",
  authDomain: "prepzen-8e478.firebaseapp.com",
  projectId: "prepzen-8e478",
  storageBucket: "prepzen-8e478.firebasestorage.app",
  messagingSenderId: "487756332601",
  appId: "1:487756332601:web:1e30cddb9bc3a69c1f57e8",
  measurementId: "G-EPW1443P7M"
};

// Initialize Firebase
const app =!getApps.length ? initializeApp(firebaseConfig):getApp();


export const auth=getAuth(app);


export const db=getFirestore(app);  