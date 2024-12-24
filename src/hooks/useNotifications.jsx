import { useEffect, useState } from "react";
import { getNotification } from "../api/FirestoreAPI";

export default function useFetchNotifications(currUser) {
  const [notifications, setNotification] = useState([]);

  const fetchNotification = async () => {
    if (currUser) {
      try {
        getNotification(currUser?.userID, setNotification);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchNotification();
  }, [currUser]);

  return { notifications };
}
