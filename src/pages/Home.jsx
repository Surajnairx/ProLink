import HomeComponent from "../components/HomeComponent";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const Home = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res.accessToken) {
        navigate("/home");
      } else {
        setLoader(false);
      }
    });
  });
  return loader ? <Spinner /> : <HomeComponent />;
};

export default Home;
