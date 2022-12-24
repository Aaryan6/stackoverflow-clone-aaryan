// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "smcommunity-abb37.firebaseapp.com",
  projectId: "smcommunity-abb37",
  storageBucket: "smcommunity-abb37.appspot.com",
  messagingSenderId: "56699718100",
  appId: "1:56699718100:web:3436e1877ebfceda08ae41",
  measurementId: "G-Y0N8DC2YDL",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
