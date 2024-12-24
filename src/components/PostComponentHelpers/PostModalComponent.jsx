/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Modal, Flex, Progress } from "antd";
import { AiOutlinePicture } from "react-icons/ai";

// ModalComponent for creating or updating a post
const ModalComponent = ({
  status,
  setStatus,
  modalOpen,
  setModalOpen,
  handleStatus,
  isEdit,
  updateStatus,
  uploadPostImage,
  setPostImage,
  postImage,
  currentPost,
  setCurrentPost,
}) => {
  // State to track the progress of the image upload
  const [progress, setProgress] = useState(0);

  // Function to reset all states when the modal is closed or submitted
  const resetStates = () => {
    setStatus(""); // Clear the status input field
    setModalOpen(false); // Close the modal
    setPostImage(""); // Reset the uploaded image
    setProgress(0); // Reset the upload progress
    setCurrentPost({}); // Reset the current post object
  };

  return (
    <>
      {/* Modal to create or update a post */}
      <Modal
        title="Create a Post" // Modal title
        centered // Center the modal
        open={modalOpen} // Control whether the modal is open or not
        onOk={() => {
          resetStates(); // Reset states on OK button click
        }}
        onCancel={() => {
          resetStates(); // Reset states on Cancel button click
        }}
        footer={[
          // Footer with the submit or update button
          <Button
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true} // Disable the button if the status is empty
            onClick={
              // If it's an edit, update the status; otherwise, handle the status submission
              isEdit
                ? async () => {
                    await updateStatus(), resetStates(); // Update status if in edit mode
                  }
                : handleStatus // Handle status submission for new posts
            }
          >
            {isEdit ? "Update" : "Submit"}{" "}
            {/* Button text changes based on edit mode */}
          </Button>,
        ]}
      >
        {/* Text area to enter the status/post content */}
        <textarea
          className="bg-white text-black font-[14px] border-2 w-full h-[105px]" // Styling for the text area
          type="text"
          placeholder="What do you want to talk about ? " // Placeholder text
          onChange={(e) => setStatus(e.target.value)} // Update status when typing
          value={status} // Set the current value of the status
        />

        {/* Progress circle shown during image upload (if applicable) */}
        {progress === 0 || progress === 100 ? null : (
          <Flex className="flex justify-center" wrap gap="small">
            <Progress type="circle" percent={progress} size={80} />{" "}
            {/* Display progress circle */}
          </Flex>
        )}

        {/* Display uploaded image or image from current post */}
        {postImage?.length > 0 || currentPost?.postImage?.length ? (
          <img src={postImage || currentPost.postImage} alt="" />
        ) : (
          <></> // Empty if there's no image
        )}

        {/* Image upload button */}
        <label htmlFor="pic-upload">
          <AiOutlinePicture
            size={30}
            className=" text-[#0073b1] cursor-pointer absolute bottom-5" // Styling for the image upload button
          />
        </label>

        {/* Hidden file input for image upload */}
        <input
          type="file"
          id="pic-upload"
          hidden
          onChange={
            (e) => uploadPostImage(e.target.files[0], setPostImage, setProgress) // Handle image upload and progress
          }
        />
      </Modal>
    </>
  );
};

export default ModalComponent;
