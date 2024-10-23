/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { AiFillLike, AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import {
  likePost,
  getLikesByUser,
  postComment,
  getCommentsByUser,
} from "../api/FirestoreAPI";
import { useMemo, useState } from "react";
import moment from "moment";

const LikeButtonComponent = ({ currUser, post }) => {
  const [likeCount, setLikesCount] = useState("");
  const [liked, setLiked] = useState(false);
  const [commentBox, setCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState([]);

  const timeStamp = () => {
    let timeStamp = moment().format("MMMM Do YYYY, h:mm");
    return timeStamp;
  };

  const handleLike = () => {
    likePost(currUser, post.userID, post.postID, liked);
  };
  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    if (comment.length > 0) {
      postComment(
        currUser.name,
        currUser.headline,
        currUser,
        post.postID,
        post,
        comment,
        timeStamp()
      );
      setComment("");
    } else {
      setComment("");
    }
  };

  useMemo(() => {
    getLikesByUser(currUser.userID, post.postID, setLiked, setLikesCount);
    getCommentsByUser(post.postID, setPostComments);
    // console.log(currUser);
  }, [currUser.userID, post.postID]);

  return (
    <div className=" p-3 flex flex-col ">
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
      <p className="font-light mt-2">{likeCount} other liked this post</p>

      <div className="flex  justify-around items-center">
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
            className={
              liked ? "text-blue-600 font-bold" : "text-black font-bold"
            }
          >
            Like
          </p>
        </div>
        <div className="flex justify-center items-center ">
          <AiOutlineComment
            className=" text-4xl p-1 cursor-pointer hover:bg-slate-200 rounded-xl"
            onClick={() => setCommentBox(!commentBox)}
          />

          <p
            className={
              commentBox ? "text-blue-600 font-bold " : "text-black font-bold"
            }
          >
            Comment
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center p-4 gap-5">
        {commentBox ? (
          <>
            <div className="flex gap-5">
              <input
                type="text"
                onChange={(e) => getComment(e)}
                className=" w-3/4 p-3 bg-black rounded-2xl text-white"
                name="comment"
                placeholder="Add a comment"
                value={comment}
              />
              <button
                className="  w-[150px] border-2 border-teal-400 rounded-full hover:bg-black hover:text-teal-400 hover:border-black"
                onClick={addComment}
              >
                Comment
              </button>{" "}
              <button
                className=" w-[150px] border-2 border-teal-400 rounded-full hover:bg-black hover:text-teal-400 hover:border-black"
                onClick={() => setCommentBox(!commentBox)}
              >
                Cancel
              </button>
            </div>
            <div>
              {postComments.length > 0 ? (
                postComments.map((comment) => {
                  return (
                    <div className="w-fullflex flex-col bg-black p-3 rounded-md text-white">
                      {console.log(comment)}
                      <div className="flex justify-between items-baseline">
                        <p className="text-lg font-bold">{comment.userName}</p>
                        <p className="text-s font-light">{comment.timeStamp}</p>
                      </div>

                      <p className="text-sm font-extralight mb-4">
                        {comment.headline}
                      </p>
                      <p className="text-lg font-light">{comment.comment}</p>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default LikeButtonComponent;
