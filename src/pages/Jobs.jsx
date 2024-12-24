import { onAuthStateChanged } from "firebase/auth"; // Importing the function to check the user's authentication status from Firebase.
import { useNavigate } from "react-router-dom"; // Importing the `useNavigate` hook to allow programmatic navigation between pages.
import { auth } from "../firebaseConfig"; // Importing the `auth` instance configured with Firebase Authentication.
import { useEffect, useState } from "react"; // Importing React hooks: `useState` for managing state and `useEffect` for side effects.
import JobsComponent from "../components/JobsComponent"; // Importing the `JobsComponent` that will be displayed when the user is authenticated.
import Spinner from "../components/Spinner"; // Importing the `Spinner` component to show a loading animation while the authentication is being checked.

const Jobs = () => {
  const navigate = useNavigate(); // `useNavigate` hook is used for navigation in React Router.
  const [loader, setLoader] = useState(false); // State variable to track whether the app is loading.

  // The `useEffect` hook runs when the component is mounted.
  useEffect(() => {
    // Listening to Firebase auth state changes.
    onAuthStateChanged(auth, (res) => {
      // If there's no access token in the response, it means the user is not authenticated.
      if (!res?.accessToken) {
        navigate("/"); // Redirect the user to the home page if they are not authenticated.
      } else {
        setLoader(false); // If authenticated, stop the loading spinner.
      }
    });
  });

  // Conditional rendering: If `loader` is true, show the `Spinner`, otherwise show the `JobsComponent`.
  return loader ? <Spinner /> : <JobsComponent />;
};

export default Jobs;
