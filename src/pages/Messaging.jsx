import MessagingComponent from "../components/MessagingComponent"; // Importing the MessagingComponent, which handles the messaging functionality.
import { onAuthStateChanged } from "firebase/auth"; // Importing the Firebase function to listen to authentication state changes.
import { useNavigate } from "react-router-dom"; // Importing the useNavigate hook to enable programmatic navigation between routes.
import { auth } from "../firebaseConfig"; // Importing the auth instance configured with Firebase Authentication.
import { useEffect, useState } from "react"; // Importing React hooks: useState for managing state and useEffect for side effects.
import Spinner from "../components/Spinner"; // Importing the Spinner component to display a loading animation while checking authentication.

const Messaging = () => {
  const navigate = useNavigate(); // Using useNavigate hook for navigation.
  const [loader, setLoader] = useState(false); // State to manage whether to display the loader (spinner).

  useEffect(() => {
    // Listening to Firebase auth state changes to check if the user is authenticated.
    onAuthStateChanged(auth, (res) => {
      // If the user is not authenticated (no accessToken), navigate to the login page.
      if (!res?.accessToken) {
        navigate("/"); // Redirect the user to the login page if not authenticated.
      } else {
        setLoader(false); // If the user is authenticated, stop showing the loading spinner.
      }
    });
  });

  // Conditional rendering: If `loader` is true, show the Spinner, otherwise show the MessagingComponent.
  return loader ? <Spinner /> : <MessagingComponent />; // If loader is true, show the loading spinner, else display the messaging component.
};

export default Messaging;
