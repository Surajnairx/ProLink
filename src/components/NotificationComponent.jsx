import Navbar from "./NavbarComponent"; // Import Navbar component
import NotificationCard from "./NotificationComponentHelper/NotificationCard"; // Import NotificationCard component
import { getCurrentuser } from "../api/FirestoreAPI"; // Import the API function to fetch the current user
import { useMemo, useState } from "react"; // Import hooks
import useFetchNotifications from "../hooks/useNotifications"; // Custom hook for fetching notifications

const NotificationComponent = () => {
  // State to store the current user data
  const [currUser, setCurrUser] = useState({});

  // useMemo hook to fetch the current user's data when the component mounts
  useMemo(() => {
    // Fetch the current user data and set it to the 'currUser' state
    getCurrentuser(setCurrUser);
  }, []); // Empty dependency array ensures this runs only once, when the component mounts

  // Fetch notifications using a custom hook, passing the current user as a parameter
  let notifications = useFetchNotifications(currUser).notifications;

  return (
    <div className="min-h-screen">
      {/* Navbar component to display the navigation bar, passing current user data as prop */}
      <Navbar currUser={currUser} />

      {/* Main Notifications Container */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Title and description of the notifications section */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Your Notifications
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Stay updated with your latest notifications!
        </p>

        {/* List of Notifications */}
        <div className="">
          {/* Map over the notifications and render a NotificationCard for each */}
          {notifications.map((notification) => (
            <NotificationCard
              currUser={currUser}
              notification={notification} // Pass notification data to the NotificationCard component
              key={notification.id} // Set unique key for each notification card
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationComponent;
