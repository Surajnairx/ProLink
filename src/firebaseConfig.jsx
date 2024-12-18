// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGA7ZF0FqS9CC0oaQyXXaV-N8m0GEIoU4",
  authDomain: "prolink-17eac.firebaseapp.com",
  projectId: "prolink-17eac",
  storageBucket: "prolink-17eac.appspot.com",
  messagingSenderId: "177507532602",
  appId: "1:177507532602:web:c1e53b0c7604aa755c1a03",
  measurementId: "G-9F1E5RZ7LD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const message = getMessaging(app);
export { app, auth, firestore, storage, message };
