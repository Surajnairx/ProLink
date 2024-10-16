import ProfileComponent from "../components/ProfileComponent";
import Spinner from "../components/Spinner";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useEffect, useState } from "react";

const Profile = () => {
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
  return loader ? <Spinner /> : <ProfileComponent />;
};

export default Profile;
