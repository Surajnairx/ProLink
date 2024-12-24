import HomeComponent from "../components/HomeComponent"; // Importing the HomeComponent to be displayed when the user is authenticated.
import { onAuthStateChanged } from "firebase/auth"; // Importing Firebase's authentication function to track auth state changes.
import { useNavigate } from "react-router-dom"; // Importing the `useNavigate` hook to programmatically navigate between routes.
import { auth } from "../firebaseConfig"; // Importing the `auth` instance to interact with Firebase Auth.
import { useEffect, useState } from "react"; // Importing `useEffect` and `useState` hooks from React to manage side effects and state.
import Spinner from "../components/Spinner"; // Importing the Spinner component to display a loading animation.

const Home = () => {
  const navigate = useNavigate(); // Using `useNavigate` hook to redirect users to different pages.
  const [loader, setLoader] = useState(false); // A state to manage whether the loading spinner should be shown.

  // useEffect hook to check the user's authentication status on component mount
  useEffect(() => {
    // Listening to changes in Firebase auth state
    onAuthStateChanged(auth, (res) => {
      // If no accessToken is found, it means the user is not authenticated
      if (!res?.accessToken) {
        navigate("/"); // Redirect to the home page ("/") if the user is not authenticated.
      } else {
        setLoader(false); // If the user is authenticated, stop showing the loading spinner.
      }
    });
  });

  // Conditional rendering: Show the Spinner component if `loader` is true, otherwise show the HomeComponent
  return loader ? <Spinner /> : <HomeComponent />;
};

export default Home;
