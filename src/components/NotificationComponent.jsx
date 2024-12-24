import Navbar from "./NavbarComponent";
import NotificationCard from "./NotificationComponentHelper/NotificationCard";
import { getCurrentuser } from "../api/FirestoreAPI";
import { useMemo, useState } from "react";
import useFetchNotifications from "../hooks/useNotifications";

const NotificationComponent = () => {
  const [currUser, setCurrUser] = useState({});

  // Fetch the current user on component mount
  useMemo(() => {
    getCurrentuser(setCurrUser);
  }, []);

  // Get notifications using the custom hook
  let notifications = useFetchNotifications(currUser).notifications;

  return (
    <div className="min-h-screen">
      <Navbar currUser={currUser} />

      {/* Main Notifications Container */}
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Your Notifications
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Stay updated with your latest notifications!
        </p>

        {/* List of Notifications */}
        <div className="">
          {notifications.map((notification) => (
            <NotificationCard
              notification={notification}
              key={notification.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationComponent;
