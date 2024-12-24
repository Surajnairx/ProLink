// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app"; // Initialize the Firebase app
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Import Firestore database
import { getStorage } from "firebase/storage"; // Import Firebase Storage
import { getMessaging } from "firebase/messaging"; // Import Firebase Messaging (for push notifications)

// Your web app's Firebase configuration
// These values are specific to your Firebase project and can be found in your Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyDGA7ZF0FqS9CC0oaQyXXaV-N8m0GEIoU4", // API Key for Firebase
  authDomain: "prolink-17eac.firebaseapp.com", // Authentication domain
  projectId: "prolink-17eac", // Firebase project ID
  storageBucket: "prolink-17eac.appspot.com", // Firebase Storage bucket
  messagingSenderId: "177507532602", // Sender ID for Firebase Cloud Messaging
  appId: "1:177507532602:web:c1e53b0c7604aa755c1a03", // Firebase App ID
  measurementId: "G-9F1E5RZ7LD", // Firebase Analytics Measurement ID (optional)
};

// Initialize Firebase using the configuration object
const app = initializeApp(firebaseConfig); // This initializes the Firebase app with the provided config

// Initialize Firebase Authentication, Firestore, Storage, and Messaging services
const auth = getAuth(app); // Firebase Authentication instance
const firestore = getFirestore(app); // Firestore database instance
const storage = getStorage(app); // Firebase Storage instance
const message = getMessaging(app); // Firebase Messaging instance for push notifications

// Export the initialized Firebase services for use throughout your app
export { app, auth, firestore, storage, message };
