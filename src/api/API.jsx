// Importing Firebase authentication methods for user login, registration, and logout
import {
  signInWithEmailAndPassword, // Used to sign in with email and password
  createUserWithEmailAndPassword, // Used to register a new user with email and password
  signOut, // Used to log out the current authenticated user
} from "firebase/auth";

// Importing the Firebase authentication instance
import { auth } from "../firebaseConfig";

/**
 * Function to handle user login with email and password
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise} - Returns the response from Firebase authentication
 */
export const LoginAPI = (email, password) => {
  try {
    // Attempting to sign in with email and password
    let response = signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    // Catching and returning any errors that occur during the login process
    return err;
  }
};

/**
 * Function to handle user registration with email and password
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise} - Returns the response from Firebase authentication
 */
export const RegisterAPI = (email, password) => {
  try {
    // Attempting to create a new user with email and password
    let response = createUserWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    // Catching and returning any errors that occur during registration
    return err;
  }
};

/**
 * Function to log out the current authenticated user
 */
export const onLogout = () => {
  try {
    // Attempting to sign out the current user
    signOut(auth);
  } catch (err) {
    // Catching and logging any errors that occur during the logout process
    console.log(err);
  }
};
