import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue } from 'firebase/database'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, GithubAuthProvider ,FacebookAuthProvider   } from "firebase/auth";

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
const auth = getAuth();
const provider = new GoogleAuthProvider()
const providerGithub = new GithubAuthProvider()
const providerFacebook = new FacebookAuthProvider()

auth.languageCode = 'it';

provider.setCustomParameters({
  'login_hint': 'user@example.com'
});


providerGithub.addScope('repo');
providerGithub.setCustomParameters({
  'allow_signup': 'false'
});


providerFacebook.addScope('user_birthday');
providerFacebook.setCustomParameters({
  'display': 'popup'
});

export { 
  database,
  ref,
  push,
  onValue,
  auth,
  provider,
  signInWithPopup,
  GoogleAuthProvider,
  providerGithub ,
  signOut ,
  GithubAuthProvider ,
  FacebookAuthProvider,
  providerFacebook,
}
