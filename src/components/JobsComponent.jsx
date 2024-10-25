import { useMemo, useState } from "react";
import Navbar from "./NavbarComponent";
import { getCurrentuser } from "../api/FirestoreAPI";
import Header from "./JobComponentHelpers/Header";
import JobCardComponent from "./JobComponentHelpers/JobCardComponent";
import dummyData from "./JobComponentHelpers/dummyData";

const JobsComponent = () => {
  const [currUser, setCurrUser] = useState({});

  useMemo(() => {
    getCurrentuser(setCurrUser);
  }, []);
  return (
    <>
      <Navbar currUser={currUser} />
      <Header />
      {dummyData.map((data) => (
        <JobCardComponent key={data.id} {...data} />
      ))}
    </>
  );
};

export default JobsComponent;
