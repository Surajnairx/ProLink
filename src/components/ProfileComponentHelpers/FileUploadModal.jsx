import { Flex, Progress, Modal } from "antd";

// FileUploadModal component for uploading or deleting profile picture
const FileUploadModal = ({
  modalOpen, // Controls whether the modal is open or closed
  setModalOpen, // Function to close the modal
  getImage, // Function to handle the file input and get the selected image
  uploadImage, // Function to handle image upload (or deletion)
  currentImage, // Object that holds the current image details
  progress, // Progress of image upload (if applicable)
}) => {
  return (
    <Modal
      title="Upload a Profile Picture" // Modal title
      centered // Center the modal on the screen
      open={modalOpen} // Whether the modal is open or not
      onOk={() => setModalOpen(false)} // Close modal on OK
      onCancel={() => setModalOpen(false)} // Close modal on Cancel
      footer={[
        // Footer with buttons for deleting or uploading the image
        <button
          key={1}
          disabled={currentImage.name ? true : false} // Disable delete button if there's no current image
          className={
            // Styling for delete button
            currentImage.name
              ? "text-gray-300  m-2" // Disabled styling when image exists
              : "border-2 border-teal-400 p-1 rounded-xl hover:bg-black hover:text-teal-400 hover:border-black m-2" // Active delete button style
          }
          onClick={uploadImage} // Trigger image deletion on click
        >
          Delete Image
        </button>,
        <button
          key={2}
          disabled={currentImage.name ? false : true} // Disable upload button if no image is selected
          className={
            // Styling for upload button
            currentImage.name
              ? "border-2 border-teal-400 p-1 rounded-xl hover:bg-black hover:text-teal-400 hover:border-black  m-2" // Active upload button style
              : "text-gray-300 m-2" // Disabled styling when no image is selected
          }
          onClick={uploadImage} // Trigger image upload or action on click
        >
          Upload Image
        </button>,
      ]}
    >
      <div className="flex flex-col">
        {/* Input field for file upload */}
        <input type="file" onChange={getImage} />

        {/* Display progress circle if the progress is not 0 */}
        {progress === 0 ? (
          <></> // No progress circle shown when upload progress is 0
        ) : (
          <Flex className="flex justify-center" wrap gap="small">
            <Progress type="circle" percent={progress} size={80} />{" "}
            {/* Show progress circle with percentage */}
          </Flex>
        )}
      </div>
    </Modal>
  );
};

export default FileUploadModal;
