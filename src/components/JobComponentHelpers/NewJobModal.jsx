/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { useState } from "react";

const NewJobModal = ({ isModalOpen, setIsModalOpen }) => {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "TailwindCSS",
    "Git",
    "GitHub",
  ];
  const [jobInputs, setJobInputs] = useState({
    jobTitle: "",
    jobType: "",
    companyName: "",
    websiteURL: "",
    location: "",
    locationType: "",
    skills: [],
  });
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setJobInputs({ ...jobInputs, ...input });
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setJobInputs({
      jobTitle: "",
      jobType: "",
      companyName: "",
      websiteURL: "",
      location: "",
      locationType: "",
      jobDescription: "",
      skills: [],
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleaddRemoveSkill = (skill) => {
    jobInputs.skills.includes(skill)
      ? setJobInputs((oldState) => ({
          ...oldState,
          skills: oldState.skills.filter((s) => s !== skill),
        }))
      : setJobInputs((oldState) => ({
          ...oldState,
          skills: oldState.skills.concat(skill),
        }));
  };
  console.log(jobInputs);

  return (
    <>
      <Modal
        title="Post Job"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        styles={{ body: { height: "450px" } }}
      >
        <div className="grid grid-cols-2 gap-2 justify-center text-white">
          <input
            className="p-3 text-base"
            type="text"
            name="jobTitle"
            placeholder="Job title *"
            value={jobInputs.jobTitle}
            onChange={getInput}
            required
          />

          <select
            name="jobType"
            className=" text-slate-400 p-3 text-base"
            onChange={getInput}
            required
          >
            <option value="">Select Job Type </option>
            <option value="Full time">Full Time</option>
            <option value="Part time">Part time</option>
            <option value="Contract">Contract</option>
          </select>

          <input
            className="p-3 text-base"
            name="companyName"
            type="text"
            placeholder="Company name"
            onChange={getInput}
            value={getInput.companyName}
            required
          />

          <input
            className="p-3 text-base"
            name="websiteURL"
            type="text"
            placeholder="Company URL"
            value={getInput.websiteURL}
            onChange={getInput}
          />

          <input
            className="p-3 text-base"
            type="type"
            name="location"
            onChange={getInput}
            value={getInput.location}
            placeholder="Location"
          />

          <select
            name="locationType"
            defaultValue="Location Type"
            className="p-3 text-gray-400 text-base"
            required
            value={getInput.locationType}
            onChange={getInput}
          >
            <option value="">Location Type</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
          </select>
        </div>
        <textarea
          rows={5}
          cols={7}
          className="w-full mt-3 p-3 text-base text-left text-white"
          name="jobDescription"
          id=""
          placeholder=" Job description *"
          required
          value={getInput.jobDescription}
          onChange={getInput}
        />
        <h2 className="text-base font-semibold">Skill</h2>
        <div className="flex gap-2 flex-wrap pb-2">
          {skills.map((skill) => (
            <div
              className="bg-white text-black border-2 border-black font-semibold rounded-lg p-3"
              key={skill}
              onClick={() => handleaddRemoveSkill(skill)}
            >
              {skill}
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default NewJobModal;
