import { useEffect, useState } from "react";
import { getNotification } from "../api/FirestoreAPI";
// Importing the necessary hooks from React and the `getNotification` function from FirestoreAPI.

export default function useFetchNotifications(currUser) {
  // State variable to hold the fetched notifications
  const [notifications, setNotification] = useState([]);

  // Function to fetch notifications for the current user
  const fetchNotification = async () => {
    // Ensure currUser exists before making the API call
    if (currUser) {
      try {
        // Calling the `getNotification` function to fetch the notifications for the user.
        // `currUser?.userID` is the userID of the current user, and `setNotification` will update the state.
        getNotification(currUser?.userID, setNotification);
      } catch (err) {
        // Catch and log any errors encountered during the API call
        console.log(err);
      }
    }
  };

  // useEffect hook to run the fetchNotification function when the component mounts or when `currUser` changes
  useEffect(() => {
    fetchNotification(); // Trigger the fetch when `currUser` changes
  }, [currUser]); // Dependency array ensures this effect runs when `currUser` changes

  // Return the `notifications` state so other components can access the fetched notifications
  return { notifications };
}
