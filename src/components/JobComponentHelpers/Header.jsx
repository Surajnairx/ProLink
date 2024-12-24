import { useState } from "react"; // Importing useState for managing component state
import NewJobModal from "./NewJobModal"; // Import the modal for posting a new job

const Header = ({ search, setSearch, handleSearch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the modal visibility

  // Function to open the modal
  const showModal = () => {
    setIsModalOpen(true); // Set modal visibility to true
  };

  // Handle input changes for the search fields
  const handleChange = (e) => {
    setSearch((oldState) => ({
      ...oldState, // Preserve the existing state
      [e.target.name]: e.target.value, // Update the value of the specific field
    }));
  };

  return (
    <>
      {/* Job Listing Header Section */}
      <div className="bg-black text-white p-5 py-16 flex justify-around items-center">
        <h1 className="text-2xl p-2">Open Job Listing</h1>
        {/* Button to open the "Post a Job" modal */}
        <button
          className="p-3 border-2 bg-teal-400 text-black border-black rounded-md"
          onClick={showModal}
        >
          Post a Job
        </button>
      </div>

      {/* Search Filters Section */}
      <div className="flex justify-around m-auto p-3 shadow-lg w-2/3 rounded-sm bg-white -mt-10 mb-2 sm:max-md:w-full">
        {/* Job Type Dropdown */}
        <select
          value={search.jobType} // Value bound to search.jobType
          name="jobType" // Name attribute to identify the field
          className="bg-slate-300 p-1 flex-1 mx-2 border-2 rounded-lg"
          onChange={(e) => handleChange(e)} // Update search state on change
        >
          <option value="Full time">Full Time</option>
          <option value="Part time">Part time</option>
          <option value="Contract">Contract</option>
        </select>

        {/* Location Type Dropdown */}
        <select
          value={search.locationType} // Value bound to search.locationType
          name="locationType" // Name attribute to identify the field
          className="bg-slate-300 p-1 flex-1 mx-2 border-2 rounded-lg"
          onChange={(e) => handleChange(e)} // Update search state on change
        >
          <option value="On-site">On-site</option>
          <option value="Remote">Remote</option>
        </select>

        {/* Search Button */}
        <button
          className="p-3 border-2 bg-teal-400 text-black border-black rounded-md flex-1"
          onClick={handleSearch} // Trigger the search function when clicked
        >
          Search
        </button>
      </div>

      {/* New Job Modal */}
      <NewJobModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default Header;
