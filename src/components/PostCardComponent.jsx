/* eslint-disable react/prop-types */
import LikeButtonComponent from "./LikeButtonComponent";
import { useNavigate } from "react-router-dom";
import { getCurrentuser, deletePost } from "../api/FirestoreAPI";
import { getAllUsers } from "../api/FirestoreAPI";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useMemo, useState } from "react";

const PostCardComponent = ({ post, getEditData }) => {
  let navigate = useNavigate();
  const [currUser, setCurrUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  useMemo(() => {
    getCurrentuser(setCurrUser);
    getAllUsers(setAllUsers);
  }, []);

  return (
    <div className=" w-2/3  min-h-fit  m-[20px]  bg-white rounded-lg flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex m-3">
          <img
            className="object-cover object-center rounded-full p-2 ring-2 h-24 w-24 ring-gray-300 dark:ring-gray-500"
            src={
              allUsers
                .filter((item) => item.id === post.userID)
                .map((item) => item.imageLink)[0]
            }
            alt=""
          />
          <div className="flex flex-col m-3 ">
            <p
              className=" font-semibold cursor-pointer  hover:underline hover:text-blue-600"
              onClick={() =>
                navigate("/profile", {
                  state: { id: post?.userID, email: post.userEmail },
                })
              }
            >
              {post.userName}
            </p>
            <p className="text-sm font-normal text-gray-600 ">
              {allUsers
                .filter((item) => item.id == post.userID)
                .map((item) => item.headline)}
            </p>
            <p className="text-sm pb-3 font-normal text-slate-600">
              {post.timeStamp} 🌐
            </p>
          </div>
        </div>
        {currUser.userID == post.userID ? (
          <div className="flex gap-3 m-3">
            {" "}
            <BsPencil
              className="cursor-pointer p-4 hover:bg-slate-100 rounded-2xl "
              size={60}
              onClick={() => getEditData(post)}
            />
            <BsTrash
              className=" cursor-pointer p-4 hover:bg-slate-100 rounded-2xl "
              size={60}
              onClick={() => deletePost(post.id)}
            />
          </div>
        ) : (
          <></>
        )}
      </div>

      <pre className=" p-4 text-wrap font-poppins text-[14px] font-semibold text-black">
        {post.post}
      </pre>
      <LikeButtonComponent
        currUser={currUser}
        // userID={currUser?.userID}
        postID={post.postID}
      />
    </div>
  );
};

export default PostCardComponent;
