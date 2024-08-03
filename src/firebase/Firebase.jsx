// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6ydLUJ4I6RMKbCuVQU0s_dmrKbrPI7KM",
  authDomain: "r-crud-1.firebaseapp.com",
  projectId: "r-crud-1",
  storageBucket: "r-crud-1.appspot.com",
  messagingSenderId: "541430229693",
  appId: "1:541430229693:web:5fdf70490dfca407dda5d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fireDB = getFirestore(app)