import { useState } from "react"; // Importing useState to manage component state
import ViewJobModal from "./ViewJobModal"; // Importing modal component to view job details

const JobCardComponent = (props) => {
  const [open, setOpen] = useState(false); // State to track whether the modal is open or not

  // Function to show the modal
  const showModal = () => {
    setOpen(true); // Set modal visibility to true (open)
  };

  return (
    <div className="flex justify-center p-2">
      {/* Job Card Layout */}
      <div className="flex justify-between w-2/3 bg-white p-3 rounded-sm hover:shadow-2xl hover:border-l-8 hover:border-l-teal-400 ease-in duration-100 sm:max-md:w-screen sm:max-md:flex-col">
        {/* Job Title and Company Section */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="p-3 font-semibold">{props.jobTitle}</h1>{" "}
          {/* Job title from props */}
          <button className="bg-teal-400 text-black font-semibold py-3 px-4 rounded-md">
            {/* Link to company website */}
            <a href={props.websiteURL} target="_blank">
              {props.companyName}
            </a>
          </button>
        </div>

        {/* Job Info Section */}
        <div className="flex flex-col px-10 justify-evenly items-center gap-2 pt-3">
          <div className="flex gap-3">
            {/* Displaying job type, location, and time */}
            <p>
              {props.jobType} | {props.locationType} | {props.time}
            </p>
          </div>

          {/* Button to open job details modal */}
          <button
            className="border-2 bg-black text-white font-semibold py-3 px-4 rounded-full"
            onClick={showModal}
          >
            Check
          </button>

          {/* Job Modal to view job details */}
          <ViewJobModal open={open} setOpen={setOpen} data={props} />
        </div>
      </div>
    </div>
  );
};

export default JobCardComponent;
