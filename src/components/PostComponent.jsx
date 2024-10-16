/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import ModalComponent from "./ModalComponent";
import { Post, getPost } from "../api/FirestoreAPI";
import PostCardComponent from "./PostCardComponent";
import moment from "moment";
import uuid from "react-uuid";

const PostComponent = ({ currUser }) => {
  const timeStamp = () => {
    return moment().format("MMMM Do YYYY, h:mm");
  };
  const getUniqueID = () => {
    let id = uuid();
    return id;
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allPost, setAllPosts] = useState([]);

  const handleStatus = async () => {
    let object = {
      post: status,
      timeStamp: timeStamp(),
      userEmail: await currUser.email,
      userName: await currUser.name,
      userID: await currUser.userID,
      postID: getUniqueID(),
    };

    await Post(object);
    await setModalOpen(false);
    await setStatus("");
  };
  useMemo(() => {
    getPost(setAllPosts);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
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
      <div className="w-full flex flex-col justify-center items-center">
        {allPost.map((post) => {
          return <PostCardComponent key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default PostComponent;
