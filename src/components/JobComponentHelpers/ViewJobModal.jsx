import { useState } from "react";
import { Button, Modal } from "antd";

const ViewJobModal = ({ open, setOpen, data }) => {
  const [loading, setLoading] = useState(false);

  // Handle the "OK" button click to close the modal
  const handleOk = () => {
    setOpen(false);
  };

  // Handle the "Apply" button click to simulate applying for the job
  const handleApply = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000); // Simulate a delay of 3 seconds
  };

  // Handle the "Cancel" button click to close the modal without taking action
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
          <Button
            key="link"
            href={data.websiteURL}
            target="_blank"
            type="primary"
            loading={loading}
            onClick={handleApply}
          >
            Apply
          </Button>,
        ]}
      >
        <div className="flex flex-col gap-4">
          <p className="font-bold text-xl">
            {data.jobTitle} @ {data.companyName}
          </p>
          <p>Posted on: {data.time}</p>
          <p>Job Type: {data.jobType}</p>
          <p>Job Location: {data.location}</p>
          <p>Location Type: {data.locationType}</p>
          <p>
            Company name:{" "}
            <a className="font-bold underline" href={data.websiteURL}>
              {data.companyName}
            </a>
          </p>
          <div className="flex flex-wrap">
            <p className="flex flex-wrap">
              Job description: <span>{data.jobDescription}</span>
            </p>
          </div>

          {data.skills && (
            <p className="flex items-center gap-2">
              Skills:
              {data.skills.map((skill) => (
                <p className="bg-black text-white p-2 rounded-md" key={skill}>
                  {skill}
                </p>
              ))}
            </p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ViewJobModal;
