import NotificationComponent from "../components/NotificationComponent"; // Importing the NotificationComponent to display notifications.
import { onAuthStateChanged } from "firebase/auth"; // Importing Firebase's onAuthStateChanged to listen to authentication state changes.
import { useNavigate } from "react-router-dom"; // Importing the useNavigate hook to enable programmatic navigation between routes.
import { auth } from "../firebaseConfig"; // Importing the auth instance from the Firebase configuration to interact with Firebase Authentication.
import { useEffect, useState } from "react"; // Importing React hooks: useState to manage state and useEffect for side effects.
import Spinner from "../components/Spinner"; // Importing the Spinner component to show a loading indicator while checking authentication.

const Notification = () => {
  const navigate = useNavigate(); // Using useNavigate hook to allow navigation.
  const [loader, setLoader] = useState(false); // State to manage whether the loading spinner should be shown.

  useEffect(() => {
    // Checking the authentication status of the user when the component is mounted.
    onAuthStateChanged(auth, (res) => {
      // If there is no valid access token (i.e., user is not authenticated), navigate to the login page.
      if (!res?.accessToken) {
        navigate("/"); // Redirect to the login page.
      } else {
        setLoader(false); // If authenticated, stop showing the loading spinner.
      }
    });
  });

  // Conditional rendering: If `loader` is true, show the Spinner, otherwise show the NotificationComponent.
  return loader ? <Spinner /> : <NotificationComponent />; // If the loader is true, show the Spinner, else show the NotificationComponent.
};

export default Notification;
