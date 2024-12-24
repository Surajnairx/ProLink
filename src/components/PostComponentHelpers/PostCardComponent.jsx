/* eslint-disable react/prop-types */
import LikeButtonComponent from "./LikeButtonComponent";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers,
  getCurrentuser,
  deletePost,
  getConnections,
} from "../../api/FirestoreAPI";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useMemo, useState, useEffect } from "react";

const PostCardComponent = ({ post, getEditData }) => {
  let navigate = useNavigate();
  const [currUser, setCurrUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useMemo(() => {
    getCurrentuser(setCurrUser);
    getAllUsers(setAllUsers);
  }, []);

  useEffect(() => {
    getConnections(currUser.userID, post.userID, setIsConnected);
  }, [currUser?.userID, post.userID]);

  return isConnected || currUser.userID === post.userID ? (
    <div className="w-2/3 bg-white rounded-lg flex flex-col shadow-md sm:max-md:w-full">
      <div className="flex flex-row justify-between items-start  sm:max-md:flex-col sm:max-md:items-center sm:max-md:border-b-4 sm:max-md:border-black">
        <div className="flex m-4 sm:max-md:flex-col sm:max-md:items-center">
          <img
            className="object-cover object-center rounded-full p-2 ring-2 h-24 w-24 ring-gray-300 dark:ring-gray-500 sm:max-md:w-20 sm:max-md:h-20 "
            src={
              allUsers
                .filter((item) => item.id === post.userID)
                .map((item) => item.imageLink)[0]
            }
            alt=""
          />
          <div className="flex flex-col m-3 sm:max-md:items-center sm:max-md:m-0">
            <p
              className="font-semibold cursor-pointer hover:underline hover:text-blue-600 sm:max-md:text-base"
              onClick={() =>
                navigate("/profile", {
                  state: { id: post?.userID, email: post.userEmail },
                })
              }
            >
              {allUsers.filter((item) => item.userID === post.userID)[0]?.name}
            </p>
            <p className="text-sm font-normal text-gray-600 sm:max-md:text-xs ">
              {allUsers
                .filter((item) => item.id == post.userID)
                .map((item) => item.headline)}
            </p>
            <p className="text-sm pb-3 font-normal text-slate-600 sm:max-md:pb-0">
              {post.timeStamp} 🌐
            </p>
          </div>
        </div>

        {currUser.userID === post.userID ? (
          <div className="flex gap-3 p-6 sm:max-md:w-30 sm:max-md:p-0 ">
            <BsPencil
              className="cursor-pointer p-4 hover:bg-slate-100 rounded-2xl"
              size={50}
              onClick={() => getEditData(post)}
            />
            <BsTrash
              className="cursor-pointer p-4 hover:bg-slate-100 rounded-2xl"
              size={50}
              onClick={() => deletePost(post.id)}
            />
          </div>
        ) : null}
      </div>

      <pre className="p-4 text-wrap font-poppins text-[14px] font-semibold text-black">
        {post.post}
      </pre>

      <div className="w-full m-auto rounded-lg p-20 sm:max-md:p-0">
        {post.postImage && (
          <img
            className=" rounded-lg  w-full h-auto"
            src={post.postImage}
            alt=""
          />
        )}
      </div>

      <LikeButtonComponent currUser={currUser} post={post} />
    </div>
  ) : null;
};

export default PostCardComponent;
