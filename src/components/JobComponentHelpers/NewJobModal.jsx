/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { useState } from "react";
import { postJob } from "../../api/FirestoreAPI";

// NewJobModal component for posting a new job
const NewJobModal = ({ isModalOpen, setIsModalOpen }) => {
  // State to hold job input fields
  const [jobInputs, setJobInputs] = useState({
    jobTitle: "",
    jobType: "",
    companyName: "",
    websiteURL: "",
    location: "",
    locationType: "",
    skills: [],
    time: "",
  });

  // Predefined list of skills to choose from
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "TailwindCSS",
    "Git",
    "GitHub",
  ];

  // Handle input field changes
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setJobInputs({ ...jobInputs, ...input });
  };

  // Handle the OK button to submit the job form
  const handleOk = () => {
    setIsModalOpen(false);
    postJob(jobInputs); // Call API to post the job
    setJobInputs({
      jobTitle: "",
      jobType: "",
      companyName: "",
      websiteURL: "",
      location: "",
      locationType: "",
      jobDescription: "",
      skills: [],
      time: "",
    }); // Reset input fields after submission
  };

  // Handle the Cancel button to close the modal without submitting
  const handleCancel = () => {
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
      time: "",
    }); // Reset input fields on cancel
  };

  // Add or remove skills from the selected skills array
  const handleaddRemoveSkill = (skill) => {
    jobInputs.skills.includes(skill)
      ? setJobInputs((oldState) => ({
          ...oldState,
          skills: oldState.skills.filter((s) => s !== skill),
        })) // Remove skill if it exists
      : setJobInputs((oldState) => ({
          ...oldState,
          skills: oldState.skills.concat(skill),
        })); // Add skill if not already present
  };

  return (
    <>
      <Modal
        title="Post Job"
        open={isModalOpen} // Open state of the modal
        onOk={handleOk} // Handle OK button click
        onCancel={handleCancel} // Handle Cancel button click
        styles={{ body: { height: "450px" } }}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={
              jobInputs.jobTitle &&
              jobInputs.companyName &&
              jobInputs.jobType &&
              jobInputs.location &&
              jobInputs.locationType &&
              jobInputs.websiteURL &&
              jobInputs.jobDescription
                ? false // Enable Submit if all required fields are filled
                : true
            }
            onClick={handleOk} // Submit job on click
          >
            Submit
          </Button>,
        ]}
      >
        {/* Job form inputs */}
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
            <option value="">Select Job Type * </option>
            <option value="Full time">Full time</option>
            <option value="Part time">Part time</option>
            <option value="Contract">Contract</option>
          </select>
          <input
            className="p-3 text-base"
            name="companyName"
            type="text"
            placeholder="Company name *"
            onChange={getInput}
            value={jobInputs.companyName}
            required
          />
          <input
            className="p-3 text-base"
            name="websiteURL"
            type="text"
            placeholder="Company URL *"
            value={jobInputs.websiteURL}
            onChange={getInput}
          />
          <input
            className="p-3 text-base"
            type="type"
            name="location"
            onChange={getInput}
            value={jobInputs.location}
            placeholder="Location"
          />
          <select
            name="locationType"
            defaultValue="Location Type"
            className="p-3 text-gray-400 text-base"
            required
            value={jobInputs.locationType}
            onChange={getInput}
          >
            <option value="">Location Type *</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

        {/* Job description textarea */}
        <textarea
          rows={5}
          cols={7}
          className="w-full mt-3 p-3 text-base text-left text-white"
          name="jobDescription"
          id=""
          placeholder=" Job description *"
          required
          value={jobInputs.jobDescription}
          onChange={getInput}
        />

        {/* Skills selection */}
        <h2 className="text-base font-semibold">Skill</h2>
        <div className="flex gap-2 flex-wrap pb-2">
          {skills.map((skill) => (
            <div
              className={
                jobInputs.skills.includes(skill)
                  ? "bg-black text-white border-2 border-black font-semibold rounded-lg p-3"
                  : "bg-white text-black border-2 border-black font-semibold rounded-lg p-3"
              }
              key={skill}
              onClick={() => handleaddRemoveSkill(skill)} // Toggle skill selection
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
