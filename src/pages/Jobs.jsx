import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useEffect, useState } from "react";
import JobsComponent from "../components/JobsComponent";
import Spinner from "../components/Spinner";

const Jobs = () => {
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
  return loader ? <Spinner /> : <JobsComponent />;
};

export default Jobs;
