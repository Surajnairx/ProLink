/* eslint-disable react/prop-types */
import { Flex, Progress, Modal } from "antd";

const FileUploadModal = ({
  modalOpen,
  setModalOpen,
  getImage,
  uploadImage,
  currentImage,
  progress,
}) => {
  return (
    <Modal
      title="Upload a Profie Picture
"
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={[
        <button
          key={1}
          disabled={currentImage.name ? true : false}
          // className=
          className={
            currentImage.name
              ? "text-gray-300  m-2"
              : "border-2 border-teal-400 p-1 rounded-xl hover:bg-black hover:text-teal-400 hover:border-black m-2"
          }
          onClick={uploadImage}
        >
          Delete Image
        </button>,
        <button
          key={2}
          disabled={currentImage.name ? false : true}
          // className=
          className={
            currentImage.name
              ? "border-2 border-teal-400 p-1 rounded-xl hover:bg-black hover:text-teal-400 hover:border-black  m-2"
              : "text-gray-300 m-2"
          }
          onClick={uploadImage}
        >
          Upload Image
        </button>,
      ]}
    >
      <div className="flex flex-col">
        <input type="file" onChange={getImage} />
        {progress === 0 ? (
          <></>
        ) : (
          <Flex className="flex justify-center" wrap gap="small">
            <Progress type="circle" percent={progress} size={80} />
          </Flex>
        )}
      </div>
    </Modal>
  );
};

export default FileUploadModal;
