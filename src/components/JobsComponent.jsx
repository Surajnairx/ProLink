import { useMemo, useState } from "react";
import Navbar from "./NavbarComponent";
import { getCurrentuser } from "../api/FirestoreAPI";
import Header from "./JobComponentHelpers/Header";
import JobCardComponent from "./JobComponentHelpers/JobCardComponent";

const JobsComponent = () => {
  const [currUser, setCurrUser] = useState({});
  useMemo(() => {
    getCurrentuser(setCurrUser);
  }, []);
  return (
    <>
      <Navbar currUser={currUser} />
      <Header />
      <JobCardComponent />
    </>
  );
};

export default JobsComponent;
