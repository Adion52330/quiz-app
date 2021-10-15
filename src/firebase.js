// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA6Wcxj_GjS856ubv0p5fmWazfTLZKwMhA",
  authDomain: "harry-potter-quiz-494db.firebaseapp.com",
  projectId: "harry-potter-quiz-494db",
  storageBucket: "harry-potter-quiz-494db.appspot.com",
  messagingSenderId: "258321628525",
  appId: "1:258321628525:web:ef49e6be177d7f7570ee64",
});

// Initialize Firebase
const db = firebaseApp.firestore();
const database = firebase.storage();

export { database, db };
