/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import PostModalComponent from "./PostComponentHelpers/PostModalComponent";
import { Post, getPost, updatePost } from "../api/FirestoreAPI";
import PostCardComponent from "./PostComponentHelpers/PostCardComponent";
import { uploadPostImage } from "../api/ImageUploadAPI";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import uuid from "react-uuid";

const PostComponent = ({ currUser }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allPost, setAllPosts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [postImage, setPostImage] = useState("");

  const navigate = useNavigate();
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
      postImage: postImage,
    };

    await Post(object);
    await setModalOpen(false);
    await setStatus("");
  };

  const getEditData = (post) => {
    setModalOpen(true);
    setCurrentPost(post);
    setStatus(post.post);
    setPostImage(post.postImage);
    setIsEdit(true);
  };
  const updateStatus = () => {
    updatePost(currentPost.id, status, postImage);
    setModalOpen(false);
  };

  useMemo(() => {
    getPost(setAllPosts);
  }, []);

  return (
    <div className="flex flex-col gap-10  rounded-md items-center">
      {console.log(currUser)}
      {currUser.college || currUser.company ? null : (
        <div className="pt-10">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Welcome! Let&apos;s s Set Up Your Profile
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Before you start exploring the app and its features, let&apos;s
              take a moment to complete your profile. This will help us
              personalize your experience and make sure you get the most out of
              all the app has to offer.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => navigate("/profile")}
            >
              Set Up Profile
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      )}

      <div className="bg-white w-2/3 h-[100px] border rounded-md flex justify-center items-center mt-5">
        <div className="flex justify-center items-center w-full gap-10">
          <img
            className="object-cover object-center rounded-full ring-2 h-12 w-12 ring-gray-300 dark:ring-gray-500"
            src={currUser?.imageLink}
            alt=""
          />
          <button
            className="bg-white w-3/4 border-2  border-teal-400 p-3 text-center rounded-full text-black hover:bg-black hover:text-teal-400 hover:border-black"
            onClick={() => {
              setModalOpen(true);
              setIsEdit(false);
            }}
          >
            Start a post...
          </button>
        </div>
      </div>
      <PostModalComponent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setStatus={setStatus}
        status={status}
        handleStatus={handleStatus}
        isEdit={isEdit}
        updateStatus={updateStatus}
        uploadPostImage={uploadPostImage}
        setPostImage={setPostImage}
        postImage={postImage}
        currentPost={currentPost}
        setCurrentPost={setCurrentPost}
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
