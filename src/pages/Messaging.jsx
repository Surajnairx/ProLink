import MessagingComponent from "../components/MessagingComponent";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const Messaging = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/");
      } else {
        setLoader(false);
      }
    });
  });
  return loader ? <Spinner /> : <MessagingComponent />;
};

export default Messaging;
