/* eslint-disable react/prop-types */
import { AiFillLike, AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import {
  likePost,
  getLikesByUser,
  postComment,
  getCommentsByUser,
} from "../../api/FirestoreAPI";
import { useMemo, useState } from "react";
import moment from "moment";

// LikeButtonComponent allows users to like posts, comment on posts, and view existing comments.
const LikeButtonComponent = ({ currUser, post }) => {
  // State hooks for managing like count, like status, comment box visibility, the comment itself, and post comments.
  const [likeCount, setLikesCount] = useState(""); // Number of likes on the post
  const [liked, setLiked] = useState(false); // Whether the current user has liked the post
  const [commentBox, setCommentBox] = useState(false); // Toggle for comment box visibility
  const [comment, setComment] = useState(""); // The comment text entered by the user
  const [postComments, setPostComments] = useState([]); // Array to store all comments on the post

  // Function to generate a timestamp using the moment library
  const timeStamp = () => {
    let timeStamp = moment().format("MMMM Do YYYY, h:mm"); // Format: "December 25th 2024, 3:00"
    return timeStamp;
  };

  // Handles the liking and unliking of a post
  const handleLike = () => {
    likePost(currUser, post, post.userID, post.postID, liked); // Call the API to like or unlike the post
  };

  // Handles the comment input change
  const getComment = (event) => {
    setComment(event.target.value); // Update the comment state with the new input
  };

  // Adds the comment to the post when the "Comment" button is clicked
  const addComment = () => {
    if (comment.length > 0) {
      // If there is a comment, post it
      postComment(
        currUser.name,
        currUser.headline,
        currUser,
        post.postID,
        post,
        comment,
        timeStamp()
      );
      setComment(""); // Clear the comment input after submission
    } else {
      setComment(""); // If the comment is empty, just reset the input
    }
  };

  // useMemo hook to fetch and set likes and comments for the post when the user or post changes
  useMemo(() => {
    getLikesByUser(currUser.userID, post.postID, setLiked, setLikesCount); // Get like data for the post
    getCommentsByUser(post.postID, setPostComments); // Get comments for the post
  }, [currUser.userID, post.postID]);

  return (
    <div className=" p-3 flex flex-col ">
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
      <p className="font-light mt-2">{likeCount} other liked this post</p>

      {/* Like and Comment Section */}
      <div className="flex justify-around items-center">
        {/* Like button */}
        <div className="flex justify-center items-center">
          {liked ? (
            <AiFillLike
              className=" text-4xl p-1 cursor-pointer hover:bg-slate-200 rounded-xl"
              onClick={handleLike} // Toggle like when clicked
            />
          ) : (
            <AiOutlineLike
              className=" text-4xl p-1 cursor-pointer hover:bg-slate-200 rounded-xl"
              onClick={handleLike} // Toggle like when clicked
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

        {/* Comment button */}
        <div className="flex justify-center items-center ">
          <AiOutlineComment
            className=" text-4xl p-1 cursor-pointer hover:bg-slate-200 rounded-xl"
            onClick={() => setCommentBox(!commentBox)} // Toggle comment box visibility
          />
          <p
            className={
              commentBox ? "text-blue-600 font-bold" : "text-black font-bold"
            }
          >
            Comment
          </p>
        </div>
      </div>

      {/* Comment box and existing comments */}
      <div className="flex flex-col justify-center p-4 gap-5">
        {commentBox ? (
          <>
            {/* Comment input and action buttons */}
            <div className="flex gap-5">
              <input
                type="text"
                onChange={(e) => getComment(e)} // Update comment state when typing
                className=" w-3/4 p-3 bg-black rounded-2xl text-white"
                name="comment"
                placeholder="Add a comment"
                value={comment}
              />
              <button
                className=" w-[150px] border-2 border-teal-400 rounded-full hover:bg-black hover:text-teal-400 hover:border-black"
                onClick={addComment} // Add comment to the post
              >
                Comment
              </button>
              <button
                className=" w-[150px] border-2 border-teal-400 rounded-full hover:bg-black hover:text-teal-400 hover:border-black"
                onClick={() => setCommentBox(!commentBox)} // Close comment box
              >
                Cancel
              </button>
            </div>

            {/* Display post comments */}
            <div>
              {postComments.length > 0 ? (
                postComments.map((comment) => {
                  return (
                    <div
                      key={comment.id}
                      className="w-full flex flex-col bg-black p-3 rounded-md text-white"
                    >
                      <div className="flex justify-between items-baseline">
                        {/* Commenter's name and timestamp */}
                        <p className="text-lg font-bold">{comment.userName}</p>
                        <p className="text-s font-light">{comment.timeStamp}</p>
                      </div>

                      {/* Comment headline and text */}
                      <p className="text-sm font-extralight mb-4">
                        {comment.headline}
                      </p>
                      <p className="text-lg font-light">{comment.comment}</p>
                    </div>
                  );
                })
              ) : (
                <></> // No comments to display if the array is empty
              )}
            </div>
          </>
        ) : (
          <></> // If the comment box is not visible, nothing is displayed here
        )}
      </div>
    </div>
  );
};

export default LikeButtonComponent;
