/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getUserByID, readNotification } from "../../api/FirestoreAPI";

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
        <div className=" flex justify-center items-center cursor-pointer">
          <div
            className="flex border-2 p-2 gap-2 rounded-md "
            onClick={() => handleNotification(notification.id)}
          >
            <img
              className=" object-cover object-center rounded-full p-2 ring-2 h-24 w-24 sm:max-md:w-20 sm:max-md:h-20 ring-gray-300 dark:ring-gray-500"
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
              {console.log(notification)}
            </div>{" "}
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationCard;
