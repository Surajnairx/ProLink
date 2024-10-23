/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getUserByID, readNotification } from "../api/FirestoreAPI";

const NotificationCard = ({ notification }) => {
  const [currentProfile, setCurrentProfile] = useState([]);

  const handleNotification = (notificatioId) => {
    readNotification(notificatioId);
  };

  useEffect(() => {
    getUserByID(notification?.userID, setCurrentProfile);
  }, [notification]);

  return (
    <>
      {notification?.isRead ? (
        <></>
      ) : (
        <div className="p-3">
          <div
            className="flex border-2 p-2 gap-2 "
            onClick={() => handleNotification(notification.id)}
          >
            <img
              className="object-cover object-center rounded-full p-3 ring-2 h-24 w-24 ring-gray-300 dark:ring-gray-500"
              src={currentProfile[0]?.imageLink}
              alt=""
            />
            <div className="flex flex-col items-center justify-center">
              {notification.type === "like" && (
                <p className="text-xl">
                  {currentProfile[0]?.name} liked your Post
                </p>
              )}
              {notification.type == "comment" && (
                <p className="text-xl">
                  {currentProfile[0]?.name} commented on your post
                </p>
              )}
              <p>{notification.timeStamp}</p>
            </div>{" "}
          </div>

          {/* <div>{notification}</div> */}
        </div>
      )}
    </>
  );
};

export default NotificationCard;
