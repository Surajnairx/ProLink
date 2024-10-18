/* eslint-disable react/prop-types */
import LikeButtonComponent from "./LikeButtonComponent";
import { useNavigate } from "react-router-dom";
import { getCurrentuser } from "../api/FirestoreAPI";
import { useMemo, useState } from "react";

const PostCardComponent = ({ post }) => {
  let navigate = useNavigate();
  const [currUser, setCurrUser] = useState({});

  useMemo(() => {
    getCurrentuser(setCurrUser);
  }, []);

  return (
    <div className=" w-2/3  min-h-fit  m-[20px]  bg-white rounded-lg flex flex-col">
      <p
        className="pt-3 pl-3 font-medium underline cursor-pointer text-blue-600"
        onClick={() =>
          navigate("/profile", {
            state: { id: post?.userID, email: post.userEmail },
          })
        }
      >
        {post.userName}
      </p>
      <p className=" p-3 pl-3 text-sm pb-3 font-light text-slate-400">
        {post.timeStamp}
      </p>
      <pre className=" p-4 text-wrap font-poppins text-[14px] font-bold text-black">
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
