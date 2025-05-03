import LoginComponent from "../components/LoginComponent"; // Importing the LoginComponent, which handles user login functionality.
import { useState, useEffect } from "react"; // Importing React hooks: useState for managing state and useEffect for side effects.
import { useNavigate } from "react-router-dom"; // Importing the useNavigate hook to enable programmatic navigation.
import { onAuthStateChanged } from "firebase/auth"; // Importing the Firebase function to listen to authentication state changes.
import { auth } from "../firebaseConfig"; // Importing the auth instance configured with Firebase Authentication.
import Spinner from "../components/Spinner"; // Importing the Spinner component to show a loading animation while checking authentication.

const Login = () => {
  const [loader, setLoader] = useState(false); // State to manage the loading spinner visibility.
  let navigate = useNavigate(); // Using the useNavigate hook to programmatically navigate to different routes.

  // The useEffect hook runs when the component is mounted.
  useEffect(() => {
    // Listening to Firebase auth state changes to check if the user is already authenticated.
    onAuthStateChanged(auth, (res) => {
      // If the user is authenticated (res contains an accessToken), redirect to the home page.
      if (res?.accessToken && auth.currentUser.emailVerified) {
        console.log(auth.currentUser.emailVerified);
        // navigate("/home"); // Navigate the user to the '/home' route if authenticated.
      } else {
        setLoader(false); // If not authenticated, stop showing the loading spinner.
      }
    });
  }, []); // The empty dependency array means this effect runs only once when the component mounts.

  // Conditional rendering: If `loader` is true, show the Spinner, otherwise show the LoginComponent.
  return loader ? <Spinner /> : <LoginComponent />; // If loader is true, the Spinner component is displayed, otherwise the LoginComponent is displayed.
};

export default Login;
