/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { useState } from "react";
import { postJob } from "../../api/FirestoreAPI";

// NewJobModal component for posting a new job
const NewJobModal = ({ isModalOpen, setIsModalOpen, currUser }) => {
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
    userId: currUser.userID,
  });

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

  return (
    <>
      <Modal
        title="Post Job"
        open={isModalOpen} // Open state of the modal
        onOk={handleOk} // Handle OK button click
        onCancel={handleCancel} // Handle Cancel button click
        styles={{ body: { height: "320px" } }}
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
      </Modal>
    </>
  );
};

export default NewJobModal;
