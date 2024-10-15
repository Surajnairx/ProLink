/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
const ModalComponent = ({
  status,
  setStatus,
  modalOpen,
  setModalOpen,
  handleStatus,
}) => {
  return (
    <>
      <Modal
        title="Create a Post"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="back">Return</Button>,
          <Button
            key="submit"
            type="primary"
            disabled={status.trim().length > 0 ? false : true}
            onClick={handleStatus}
          >
            Submit
          </Button>,
        ]}
      >
        <input
          className="bg-white text-black font-[14px] border-2 w-full"
          type="text"
          placeholder="What do you want to talk about ? "
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        />
      </Modal>
    </>
  );
};
export default ModalComponent;
