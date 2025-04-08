/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getUserByID, readNotification } from "../../api/FirestoreAPI"; // Import required API functions

const NotificationCard = ({ notification }) => {
  const [currentProfile, setCurrentProfile] = useState([]); // State to store the user profile who triggered the notification

  // Function to mark notification as read when clicked
  const handleNotification = (notificationId) => {
    readNotification(notificationId); // Call the API to mark the notification as read
  };

  // Fetch the profile details of the user who triggered the notification
  useEffect(() => {
    if (notification?.userID) {
      getUserByID(notification?.userID, setCurrentProfile); // Fetch user profile details by userID
    }
  }, [notification]); // Run the effect when the notification changes

  return (
    <>
      {notification?.isRead ? (
        <></> // Return nothing if the notification is already read
      ) : (
        // Render the notification if it's unread
        <div className="flex justify-center items-center cursor-pointer m-5">
          <div
            className="flex border-2 p-2 gap-2 rounded-md"
            onClick={() => handleNotification(notification.id)} // Mark notification as read on click
          >
            {/* Display the profile picture of the user who triggered the notification */}
            <img
              className="object-cover object-center rounded-full p-2 ring-2 h-24 w-24 sm:max-md:w-20 sm:max-md:h-20 ring-gray-300 dark:ring-gray-500"
              src={currentProfile[0]?.imageLink} // Display the profile image of the user
              alt="Profile"
            />
            <div className="flex flex-col items-center justify-center">
              {/* Display the notification message based on the notification type */}
              {notification.type === "like" && (
                <p className="text-xl">
                  {currentProfile[0]?.name} liked your Post
                </p>
              )}
              {notification.type === "comment" && (
                <p className="text-xl">
                  {currentProfile[0]?.name} commented on your post
                </p>
              )}
              {/* Display the timestamp of the notification */}
              <p>{notification.timeStamp}</p>
              {console.log(notification)} {/* Logging for debugging */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationCard;
