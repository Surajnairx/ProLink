import Navbar from "./NavbarComponent";
import NotificationCard from "./NotificationComponentHelper/NotificationCard";
import { getCurrentuser } from "../api/FirestoreAPI";
import { useMemo, useState } from "react";
import useFetchNotifications from "../hooks/useNotifications";

const NotificationComponent = () => {
  const [currUser, setCurrUser] = useState({});

  useMemo(() => {
    getCurrentuser(setCurrUser);
  }, []);

  let notifications = useFetchNotifications(currUser).notifications;

  return (
    <div>
      <Navbar currUser={currUser} />

      {notifications.map((notification) => {
        // console.log(notification);

        return (
          <NotificationCard notification={notification} key={notification.id} />
        );
      })}
    </div>
  );
};

export default NotificationComponent;
