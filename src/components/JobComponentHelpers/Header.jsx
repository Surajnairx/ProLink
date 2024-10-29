/* eslint-disable react/prop-types */
import { useState } from "react";
import NewJobModal from "./NewJobModal";

const Header = ({ search, setSearch, handleSearch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setSearch((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="bg-black text-white  p-5 py-16 flex justify-around items-center ">
        <h1 className="text-2xl p-2">Open Job Listing</h1>
        <button
          className="p-3 border-2 bg-teal-400 text-black border-black rounded-md "
          onClick={showModal}
        >
          Post a Job
        </button>
      </div>
      <div className=" flex justify-around m-auto p-3 shadow-lg w-2/3 rounded-sm bg-white -mt-10 mb-2">
        <select
          value={search.jobType}
          name="jobType"
          className="bg-slate-300 p-1 flex-1 mx-2 border-2 rounded-lg"
          onChange={(e) => handleChange(e)}
        >
          <option value="Full time">Full Time</option>
          <option value="Part time">Part time</option>
          <option value="Contract">Contract</option>
        </select>
        <select
          value={search.locationType}
          name="locationType"
          className="bg-slate-300 p-1 flex-1 mx-2 border-2 rounded-lg"
          onChange={(e) => handleChange(e)}
        >
          <option value="On-site">On-site</option>
          <option value="Remote">Remote</option>
        </select>
        <button
          className="p-3 border-2 bg-teal-400 text-black border-black rounded-md flex-1"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <NewJobModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default Header;
