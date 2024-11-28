/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Modal, Flex, Progress } from "antd";
import { AiOutlinePicture } from "react-icons/ai";
const ModalComponent = ({
  status,
  setStatus,
  modalOpen,
  setModalOpen,
  handleStatus,
  isEdit,
  updateStatus,
  uploadPostImage,
  postImage,
  setPostImage,
  currentPost,
}) => {
  console.log(currentPost.postImage);

  const [progress, setProgress] = useState(0);
  return (
    <>
      <Modal
        title="Create a Post"
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage("");
          setProgress(0);
        }}
        onCancel={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage("");
          setProgress(0);
        }}
        footer={[
          <Button
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
            onClick={isEdit ? updateStatus : handleStatus}
          >
            {isEdit ? "Update" : "Submit"}
          </Button>,
        ]}
      >
        <textarea
          className="bg-white text-black font-[14px] border-2 w-full h-[105px]"
          type="text"
          placeholder="What do you want to talk about ? "
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        />
        {progress === 0 || progress === 100 ? (
          <></>
        ) : (
          <Flex className="flex justify-center" wrap gap="small">
            <Progress type="circle" percent={progress} size={80} />
          </Flex>
        )}

        {postImage.length > 0 || currentPost?.postImage.length ? (
          <img
            className="w-full"
            src={postImage || currentPost?.postImage}
            alt=""
          />
        ) : (
          <></>
        )}

        <label htmlFor="pic-upload">
          <AiOutlinePicture
            size={30}
            className=" text-[#0073b1] cursor-pointer absolute bottom-5"
          />
        </label>
        <input
          type="file"
          id="pic-upload"
          hidden
          onChange={(e) =>
            uploadPostImage(e.target.files[0], setPostImage, setProgress)
          }
        />
      </Modal>
    </>
  );
};
export default ModalComponent;
