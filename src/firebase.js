// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv3S5UcVIb3Y8UxATuAFhZ6VJIhxfRHds",
  authDomain: "capexptracker.firebaseapp.com",
  databaseURL: "https://capexptracker-default-rtdb.firebaseio.com",
  projectId: "capexptracker",
  storageBucket: "capexptracker.appspot.com",
  messagingSenderId: "1065860678225",
  appId: "1:1065860678225:web:80f6300462760dceae2e70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);