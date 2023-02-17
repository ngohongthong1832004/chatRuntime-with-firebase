import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyC1ATkfWIyhIakBsQHTyGBnRI3raXvR8-A",
  authDomain: "chatruntime-7bf39.firebaseapp.com",
  databaseURL: "https://chatruntime-7bf39-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatruntime-7bf39",
  storageBucket: "chatruntime-7bf39.appspot.com",
  messagingSenderId: "637493477918",
  appId: "1:637493477918:web:babaeaa10b12bbc740a40f",
  measurementId: "G-N7YG9LM7GG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push, onValue }
