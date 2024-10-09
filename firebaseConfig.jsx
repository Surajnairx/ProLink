// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);