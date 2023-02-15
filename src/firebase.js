// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1ATkfWIyhIakBsQHTyGBnRI3raXvR8-A",
  authDomain: "chatruntime-7bf39.firebaseapp.com",
  projectId: "chatruntime-7bf39",
  storageBucket: "chatruntime-7bf39.appspot.com",
  messagingSenderId: "637493477918",
  appId: "1:637493477918:web:383e15629bf49ac440a40f",
  measurementId: "G-L0JE63S93Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

console.log("data : ", onValue(ref(database, "message"), (i) => {
    console.log(i)
}))
onValue(ref(database), (i) => {
    console.log("i : ",i)
})
console.log("database ", database)

export { database, ref, push, onValue }
