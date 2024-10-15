import { useState } from "react";
import ModalComponent from "./ModalComponent";
import { Post } from "../api/FirestoreAPI";

const PostComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const handleStatus = () => {
    Post(status);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-slate-200 w-1/3 h-[100px] m-[30px] border rounded-md flex justify-center items-center ">
        <button
          className="bg-slate-200 w-3/4 border-2  border-black p-3 text-start rounded-full text-slate-500 hover:bg-slate-300"
          onClick={() => setModalOpen(true)}
        >
          Start a Post
        </button>
      </div>
      <ModalComponent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setStatus={setStatus}
        status={status}
        handleStatus={handleStatus}
      />
    </div>
  );
};

export default PostComponent;
