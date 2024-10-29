import { useMemo, useState } from "react";
import Navbar from "./NavbarComponent";
import { getCurrentuser } from "../api/FirestoreAPI";
import Header from "./JobComponentHelpers/Header";
import JobCardComponent from "./JobComponentHelpers/JobCardComponent";
import { getJob } from "../api/FirestoreAPI";
import { searchJobs } from "../api/FirestoreAPI";

const JobsComponent = () => {
  const [currUser, setCurrUser] = useState({});
  const [jobs, setJobs] = useState([]);
  const [jobSearch, setJobSearch] = useState(false);
  const [search, setSearch] = useState({
    jobType: "Full time",
    locationType: "On-site",
  });

  const handleSearch = () => {
    setJobSearch(true);
    searchJobs(search, setJobs);
  };

  useMemo(() => {
    getCurrentuser(setCurrUser);
    if (!jobSearch) {
      getJob(setJobs);
    }
  }, [jobSearch]);

  return (
    <>
      <Navbar currUser={currUser} />
      <Header
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {jobSearch ? (
        <div
          className="flex justify-around m-auto cursor-pointer  shadow-lg w-2/3 rounded-sm bg-white mb-2 font-bold"
          onClick={() => setJobSearch(false)}
        >
          <p className="hover:bg-slate-200 p-2 m-3 rounded-md">
            ❌ Clear Search
          </p>
        </div>
      ) : (
        <></>
      )}
      {jobs.map((data) => (
        <JobCardComponent key={data.id} {...data} />
      ))}
    </>
  );
};

export default JobsComponent;
