import { useEffect, useState } from "react";
import { getNotification } from "../api/FirestoreAPI";

export default function useFetchNotifications(currUser) {
  const [notifications, setNotification] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const fetchNotification = async () => {
    setLoading(true);
    if (currUser) {
      try {
        getNotification(currUser?.userID, setNotification);
      } catch (err) {
        setError(true);
      }
    }
  };

  useEffect(() => {
    fetchNotification();
  }, [currUser]);

  return { notifications };
}
