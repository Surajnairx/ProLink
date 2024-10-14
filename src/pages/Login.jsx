import LoginComponent from "../components/LoginComponent";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Spinner from "../components/Spinner";

const Login = () => {
  const [loader, setLoader] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res.accessToken) {
        navigate("/home");
      } else {
        setLoader(false);
      }
    });
  });
  return loader ? <Spinner /> : <LoginComponent />;
};

export default Login;
