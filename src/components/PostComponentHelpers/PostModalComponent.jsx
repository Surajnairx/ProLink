/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
const ModalComponent = ({
  status,
  setStatus,
  modalOpen,
  setModalOpen,
  handleStatus,
  isEdit,
  updateStatus,
}) => {
  return (
    <>
      <Modal
        title="Create a Post"
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("");
          setModalOpen(false);
        }}
        onCancel={() => {
          setStatus("");
          setModalOpen(false);
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
      </Modal>
    </>
  );
};
export default ModalComponent;
