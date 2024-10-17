/* eslint-disable react/prop-types */
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { likePost, getLikesByUser } from "../api/FirestoreAPI";
import { useMemo, useState } from "react";
const LikeButtonComponent = ({ userID, postID }) => {
  const [likeCount, setLikesCount] = useState("");
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    likePost(userID, postID, liked);
  };

  useMemo(() => {
    getLikesByUser(userID, postID, setLiked, setLikesCount);
  }, [userID, postID]);

  return (
    <div className=" p-3 justify-center">
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
      <p className="font-light mt-2">{likeCount} other liked this post</p>

      <div className="flex justify-center items-center">
        {liked ? (
          <AiFillLike
            className=" text-4xl p-1 cursor-pointer hover:bg-slate-200 rounded-xl"
            onClick={handleLike}
          />
        ) : (
          <AiOutlineLike
            className=" text-4xl p-1 cursor-pointer hover:bg-slate-200 rounded-xl"
            onClick={handleLike}
          />
        )}
        <p
          className={liked ? "text-blue-600 font-bold" : "text-black font-bold"}
        >
          Like {/*{likeCount}*/}
        </p>{" "}
      </div>
    </div>
  );
};

export default LikeButtonComponent;
