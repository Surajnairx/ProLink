import { useMemo, useState } from "react";
import Navbar from "./NavbarComponent";
import { getCurrentuser } from "../api/FirestoreAPI";
import Header from "./JobComponentHelpers/Header";
import JobCardComponent from "./JobComponentHelpers/JobCardComponent";
import { getJob } from "../api/FirestoreAPI";

const JobsComponent = () => {
  const [currUser, setCurrUser] = useState({});
  const [jobs, setJobs] = useState([]);

  useMemo(() => {
    getCurrentuser(setCurrUser);
    getJob(setJobs);
  }, []);
  console.log(jobs);

  return (
    <>
      <Navbar currUser={currUser} />
      <Header />
      {jobs.map((data) => (
        <JobCardComponent key={data.id} {...data} />
      ))}
    </>
  );
};

export default JobsComponent;
