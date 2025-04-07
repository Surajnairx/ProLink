import { useMemo, useState } from "react"; // Import React hooks
import Navbar from "./NavbarComponent"; // Import Navbar component for navigation
import { getCurrentuser } from "../api/FirestoreAPI"; // Function to fetch current user data
import Header from "./JobComponentHelpers/Header"; // Import Header for the job search form
import JobCardComponent from "./JobComponentHelpers/JobCardComponent"; // Import JobCardComponent to display each job listing
import { getJob } from "../api/FirestoreAPI"; // Function to fetch all jobs
import { searchJobs } from "../api/FirestoreAPI"; // Function to search jobs based on filters

const JobsComponent = () => {
  // State to store the current user data
  const [currUser, setCurrUser] = useState({});

  // State to store the list of jobs
  const [jobs, setJobs] = useState([]);

  // State to manage whether the user is performing a job search
  const [jobSearch, setJobSearch] = useState(false);

  // State to store the search filters (job type and location type)
  const [search, setSearch] = useState({
    jobType: "Full time", // Default job type is "Full time"
    locationType: "On-site", // Default location type is "On-site"
  });

  // Handle search functionality by calling the searchJobs function
  const handleSearch = () => {
    setJobSearch(true); // Set jobSearch to true when search is triggered
    searchJobs(search, setJobs); // Perform job search with current filters and update jobs state
  };

  // useMemo hook is used to fetch current user and job data when the component mounts
  useMemo(() => {
    // Fetch current user data and update currUser state
    getCurrentuser(setCurrUser);

    // If no job search is performed, fetch all jobs
    if (!jobSearch) {
      getJob(setJobs);
    }
  }, [jobSearch]); // Effect depends on jobSearch, so it runs when jobSearch changes

  return (
    <>
      {/* Navbar component to display navigation bar, passing current user data */}
      <Navbar currUser={currUser} />

      {/* Header component for job search form, passing search state and handleSearch function */}
      <Header
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        currUser={currUser}
      />

      {/* If job search is active, display a button to clear the search */}
      {jobSearch ? (
        <div
          className="flex justify-around m-auto cursor-pointer shadow-lg w-2/3 rounded-sm bg-white mb-2 font-bold"
          onClick={() => setJobSearch(false)} // Reset search status when clicked
        >
          <p className="hover:bg-slate-200 p-2 m-3 rounded-md">
            ❌ Clear Search
          </p>
        </div>
      ) : null}

      {/* Render the list of jobs */}
      {jobs.map((data) => (
        <JobCardComponent key={data.id} {...data} />
      ))}
    </>
  );
};

export default JobsComponent;
