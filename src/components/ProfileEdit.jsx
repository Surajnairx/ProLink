/* eslint-disable react/prop-types */
import { useState } from "react";
import { editProfile } from "../api/FirestoreAPI";
import { AiOutlineClose } from "react-icons/ai";

const ProfileEdit = ({ onEdit, currUser }) => {
  const [editInputs, setEditInputs] = useState({
    name: "",
    headline: "",
    position: "",
    company: "",
    industry: "",
    college: "",
    location: "",
    website: "",
    about: "",
    skills: "",
  });
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
  };
  const updateProfileData = () => {
    editProfile(currUser?.userID, editInputs);
    onEdit();
  };

  return (
    <div className="w-auto h-auto bg-neutral-100 m-8 rounded-md p-3 flex flex-col items-center">
      <div className="absolute right-14 p2">
        <AiOutlineClose
          className=" text-4xl cursor-pointer hover:bg-slate-200 rounded-xl"
          onClick={onEdit}
        />
      </div>
      <div className="flex flex-col w-[60%] p-3 mt-3 ">
        <label htmlFor="ame" className="">
          Name
        </label>
        <input
          className="p-1 text-cyan-50 rounded-md"
          type="name"
          name="name"
          value={editInputs?.name}
          onChange={getInput}
        />
        <label htmlFor="headline" className="text-lg mt-3 ">
          Headline
        </label>
        <textarea
          className=" text-cyan-50 rounded-md h-[55px]"
          name="headline"
          style={{ overflow: "hidden" }}
          value={editInputs?.headline}
          onChange={getInput}
        ></textarea>

        <label htmlFor="company" className="text-lg mt-3">
          Position
        </label>
        <input
          className="p-1   text-cyan-50 rounded-md"
          type="name"
          name="position"
          value={editInputs?.position}
          onChange={getInput}
        />
        <label htmlFor="company" className="text-lg mt-3">
          Company
        </label>
        <input
          className="p-1   text-cyan-50 rounded-md "
          type="name"
          name="company"
          value={editInputs?.company}
          onChange={getInput}
        />
        <label htmlFor="industry" className="text-lg mt-3">
          Industry
        </label>
        <input
          className="p-1   text-cyan-50 rounded-md"
          type="name"
          name="industry"
          value={editInputs?.industry}
          onChange={getInput}
        />

        <label htmlFor="college" className="text-lg mt-3">
          College
        </label>
        <input
          className="p-1  text-cyan-50 rounded-md"
          type="name"
          name="college"
          onChange={getInput}
          value={editInputs?.college}
        />
        <label htmlFor="location" className="text-lg mt-3">
          Location
        </label>
        <input
          className="p-1  text-cyan-50 rounded-md"
          type="name"
          placeholder="City,Country/Region"
          name="location"
          value={editInputs?.location}
          onChange={getInput}
        />
        <label htmlFor="college" className="text-lg mt-2">
          Website
        </label>
        <input
          className="p-1  text-cyan-50 rounded-md"
          type="text"
          name="website"
          onChange={getInput}
          value={editInputs?.website}
        />
        <label htmlFor="headline" className="text-lg flex gap-2 mt-2">
          About <p className="font-light">(Pre-fromated text only)</p>
        </label>
        <textarea
          className=" text-cyan-50 rounded-md h-[55px]"
          name="about"
          style={{ overflow: "hidden" }}
          value={editInputs?.about}
          onChange={getInput}
        ></textarea>

        <label htmlFor="college" className="text-lg mt-2">
          Skills
        </label>
        <input
          className="p-1  text-cyan-50 rounded-md"
          type="text"
          name="skills"
          onChange={getInput}
          value={editInputs?.skills}
        />
      </div>

      <button
        onClick={updateProfileData}
        className=" w-44 border-2 border-teal-400 p-1 rounded-xl hover:bg-black hover:text-teal-400 hover:border-black "
      >
        Save
      </button>
    </div>
  );
};

export default ProfileEdit;
