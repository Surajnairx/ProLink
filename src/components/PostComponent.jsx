/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import PostModalComponent from "./PostModalComponent";
import { Post, getPost, updatePost } from "../api/FirestoreAPI";
import PostCardComponent from "./PostCardComponent";
import moment from "moment";
import uuid from "react-uuid";

const PostComponent = ({ currUser }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allPost, setAllPosts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  const getUniqueID = () => {
    let id = uuid();
    return id;
  };

  const timeStamp = () => {
    return moment().format("MMMM Do YYYY, h:mm");
  };

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

  const getEditData = (post) => {
    setModalOpen(true);
    setCurrentPost(post);
    setStatus(post.post);
    setIsEdit(true);
  };
  const updateStatus = () => {
    updatePost(currentPost.id, status);
    setModalOpen(false);
  };

  useMemo(() => {
    getPost(setAllPosts);
  }, []);

  return (
    <div className="flex flex-col gap-10  rounded-md items-center">
      {currUser?.imageLink ? (
        <div className="bg-white w-2/3 h-1/3 mt-40  border rounded-md flex flex-col gap-7 justify-center items-center">
          <img
            className=" -mt-16 object-cover object-center rounded-full p-3 ring-2 h-32 w-32 ring-gray-300 dark:ring-gray-500"
            src={currUser?.imageLink}
            alt=""
          />
          <div className="flex flex-col items-center gap-5">
            <p className=" font-medium cursor-pointer hover:underline hover:text-blue-500">
              {" "}
              {currUser?.name}
            </p>
            <p className="font-light text-gray-400 pb-3">
              {currUser?.headline}
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="bg-white w-2/3 h-[100px] border rounded-md flex justify-center items-center mt-5">
        <button
          className="bg-white w-3/4 border-2  border-black p-3 text-start rounded-full text-slate-500 hover:bg-slate-200"
          onClick={() => {
            setModalOpen(true);
            setIsEdit(false);
          }}
        >
          Start a Post
        </button>
      </div>
      <PostModalComponent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setStatus={setStatus}
        status={status}
        handleStatus={handleStatus}
        isEdit={isEdit}
        updateStatus={updateStatus}
      />
      <div className="w-full flex flex-col gap-10 items-center">
        {allPost.map((post) => {
          return (
            <PostCardComponent
              key={post.id}
              post={post}
              getEditData={getEditData}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostComponent;
