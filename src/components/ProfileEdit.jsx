/* eslint-disable react/prop-types */
import { useState } from "react";
import { editProfile } from "../api/FirestoreAPI";

const ProfileEdit = ({ onEdit, currUser }) => {
  const [editInputs, setEditInputs] = useState({});
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
  };
  const updateProfileData = () => {
    editProfile(currUser.userID, editInputs);
    console.log(currUser.userID, editInputs);
    onEdit();
  };

  return (
    <div className="w-auto h-auto bg-neutral-100 m-8 rounded-md p-3 flex flex-col items-center">
      <div className="absolute right-14 border-2 border-black p2">
        <button onClick={onEdit} className="px-1 cursor-pointer">
          Go Back To Profile
        </button>
      </div>
      <div className="flex flex-col  w-full pt-3 ">
        <label htmlFor="password" className="">
          Name
        </label>
        <input
          className="p-1 text-cyan-50 rounded-md"
          type="name"
          name="name"
          onChange={getInput}
        />
        <label htmlFor="password" className="text-lg">
          Headline
        </label>
        <input
          className="p-1  text-cyan-50 rounded-md"
          type="name"
          name="headline"
          onChange={getInput}
        />
        <label htmlFor="password" className="text-lg">
          College
        </label>
        <input
          className="p-1  text-cyan-50 rounded-md"
          type="name"
          name="college"
          onChange={getInput}
        />
        <label htmlFor="password" className="text-lg">
          Company
        </label>
        <input
          className="p-1  text-cyan-50 rounded-md"
          type="name"
          name="company"
          onChange={getInput}
        />
        <label htmlFor="password" className="text-lg">
          Location
        </label>
        <input
          className="p-1  text-cyan-50 rounded-md"
          type="name"
          name="location"
          onChange={getInput}
        />
      </div>

      <button
        onClick={updateProfileData}
        className=" mt-3 border-2 border-black w-36 p-2 rounded-3xl hover:bg-teal-400"
      >
        Save
      </button>
    </div>
  );
};

export default ProfileEdit;
