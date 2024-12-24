import ConnectionComponent from "../components/ConnectionComponent"; // Importing the ConnectionComponent to be used in the UI.
import { onAuthStateChanged } from "firebase/auth"; // Importing the Firebase authentication function to monitor auth state changes.
import { useNavigate } from "react-router-dom"; // Importing `useNavigate` to redirect the user based on their auth state.
import { auth } from "../firebaseConfig"; // Importing the `auth` instance from Firebase configuration to interact with Firebase Auth.
import { useEffect, useState } from "react"; // Importing `useEffect` and `useState` hooks from React for side effects and managing state.
import Spinner from "../components/Spinner"; // Importing a Spinner component to show a loading animation while fetching auth state.

const Connections = () => {
  const navigate = useNavigate(); // Using `useNavigate` hook to navigate between routes programmatically.
  const [loader, setLoader] = useState(false); // State variable to manage whether the loading spinner should be displayed.

  // useEffect hook runs once when the component mounts
  useEffect(() => {
    // onAuthStateChanged listens for changes in authentication state
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        // If the user is not authenticated (no accessToken), redirect to the home page.
        navigate("/"); // Navigate the user to the home page ("/") if they are not authenticated.
      } else {
        setLoader(false); // If the user is authenticated, stop showing the loader.
      }
    });
  });

  // Conditional rendering: If `loader` is true, show the spinner, else render the `ConnectionComponent`.
  return loader ? <Spinner /> : <ConnectionComponent />;
};

export default Connections;
