/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
const PostCardComponent = ({ post }) => {
  let navigate = useNavigate();
  return (
    <div className=" w-2/3  min-h-fit  mt-[30px] border-2 pb-8 bg-white rounded-lg flex flex-col    ">
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
      <p className=" pl-3 font-light text-slate-400">{post.timeStamp}</p>
      <p className=" px-5  pl-3 text-[14px] font-bold text-black">
        {post.post}
      </p>
    </div>
  );
};

export default PostCardComponent;
