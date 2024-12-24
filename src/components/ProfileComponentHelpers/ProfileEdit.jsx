/* eslint-disable react/prop-types */
import { useState } from "react";
import { editProfile } from "../../api/FirestoreAPI";
import { AiOutlineClose } from "react-icons/ai";

const ProfileEdit = ({ onEdit, currUser }) => {
  const [editInputs, setEditInputs] = useState(currUser); // Initializes form with current user data

  // Update state when form inputs change
  const getInput = (event) => {
    const { name, value } = event.target;
    setEditInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Update profile in the database
  const updateProfileData = () => {
    editProfile(currUser?.userID, editInputs); // Calls API to update profile
    onEdit(); // Close the edit modal/form
  };

  return (
    <div className="w-auto h-auto bg-neutral-100 m-8 rounded-md p-3 flex flex-col items-center">
      {/* Close button */}
      <div className="absolute right-14 p2">
        <AiOutlineClose
          className="text-4xl cursor-pointer hover:bg-slate-200 rounded-xl"
          onClick={onEdit}
        />
      </div>

      <div className="flex flex-col w-[60%] p-3 mt-3">
        {/* Form for updating profile information */}
        <label htmlFor="name">Name</label>
        <input
          className="p-1 text-cyan-50 rounded-md"
          type="text"
          name="name"
          value={editInputs?.name}
          onChange={getInput}
          required
        />

        <label htmlFor="headline" className="text-lg mt-3">
          Headline
        </label>
        <textarea
          className="text-cyan-50 rounded-md h-[55px]"
          name="headline"
          style={{ overflow: "hidden" }}
          value={editInputs?.headline}
          onChange={getInput}
          required
        ></textarea>

        <label htmlFor="position" className="text-lg mt-3">
          Position
        </label>
        <input
          className="p-1 text-cyan-50 rounded-md"
          type="text"
          name="position"
          value={editInputs?.position}
          onChange={getInput}
          required
        />

        <label htmlFor="company" className="text-lg mt-3">
          Company
        </label>
        <input
          className="p-1 text-cyan-50 rounded-md"
          type="text"
          name="company"
          value={editInputs?.company}
          onChange={getInput}
          required
        />

        <label htmlFor="industry" className="text-lg mt-3">
          Industry
        </label>
        <input
          className="p-1 text-cyan-50 rounded-md"
          type="text"
          name="industry"
          value={editInputs?.industry}
          onChange={getInput}
        />

        <label htmlFor="college" className="text-lg mt-3">
          College
        </label>
        <input
          className="p-1 text-cyan-50 rounded-md"
          type="text"
          name="college"
          value={editInputs?.college}
          onChange={getInput}
        />

        <label htmlFor="location" className="text-lg mt-3">
          Location
        </label>
        <input
          className="p-1 text-cyan-50 rounded-md"
          type="text"
          name="location"
          placeholder="City, Country/Region"
          value={editInputs?.location}
          onChange={getInput}
        />

        <label htmlFor="website" className="text-lg mt-2">
          Website
        </label>
        <input
          className="p-1 text-cyan-50 rounded-md"
          type="text"
          name="website"
          value={editInputs?.website}
          onChange={getInput}
        />

        <label htmlFor="about" className="text-lg flex gap-2 mt-2">
          About <p className="font-light">(Pre-formatted text only)</p>
        </label>
        <textarea
          className="text-cyan-50 rounded-md h-[55px]"
          name="about"
          value={editInputs?.about}
          onChange={getInput}
        ></textarea>

        <label htmlFor="skills" className="text-lg mt-2">
          Skills
        </label>
        <input
          className="p-1 text-cyan-50 rounded-md"
          type="text"
          name="skills"
          value={editInputs?.skills}
          onChange={getInput}
        />
      </div>

      {/* Save Button */}
      <button
        onClick={updateProfileData}
        className="w-44 border-2 border-teal-400 p-1 rounded-xl hover:bg-black hover:text-teal-400 hover:border-black"
      >
        Save
      </button>
    </div>
  );
};

export default ProfileEdit;
