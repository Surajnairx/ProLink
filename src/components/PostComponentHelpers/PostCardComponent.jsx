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

// PostCardComponent is used to display individual posts and includes options to like, comment, and delete posts.
const PostCardComponent = ({ post, getEditData }) => {
  let navigate = useNavigate(); // Hook to navigate between pages
  const [currUser, setCurrUser] = useState({}); // Store current user data
  const [allUsers, setAllUsers] = useState([]); // Store all users for displaying user info
  const [isConnected, setIsConnected] = useState(false); // Check if the current user is connected to the post's author

  // useMemo hook to fetch current user and all users when the component is mounted
  useMemo(() => {
    getCurrentuser(setCurrUser); // Fetch the current user's data
    getAllUsers(setAllUsers); // Fetch all users' data
  }, []);

  // useEffect hook to check if the current user is connected to the post's author
  useEffect(() => {
    getConnections(currUser?.userID, post.userID, setIsConnected); // Check connection status
  }, [currUser?.userID, post.userID]);

  // Only render the post if the current user is connected to the post author or is the author themselves
  return isConnected || currUser.userID === post.userID ? (
    <div className="w-2/3 bg-white rounded-lg flex flex-col shadow-md sm:max-md:w-full">
      <div className="flex flex-row justify-between items-start sm:max-md:flex-col sm:max-md:items-center sm:max-md:border-b-4 sm:max-md:border-black">
        {/* Post header: User profile image, name, headline, and timestamp */}
        <div className="flex m-4 sm:max-md:flex-col sm:max-md:items-center">
          <img
            className="object-cover object-center rounded-full p-2 ring-2 h-24 w-24 ring-gray-300 dark:ring-gray-500 sm:max-md:w-20 sm:max-md:h-20"
            src={
              allUsers
                .filter((item) => item.id === post.userID)
                .map((item) => item.imageLink)[0] // Get the user's image based on their ID
            }
            alt="User profile"
          />
          <div className="flex flex-col m-3 sm:max-md:items-center sm:max-md:m-0">
            {/* User's name that navigates to their profile when clicked */}
            <p
              className="font-semibold cursor-pointer hover:underline hover:text-blue-600 sm:max-md:text-base"
              onClick={
                () =>
                  navigate("/profile", {
                    state: { id: post?.userID, email: post.userEmail },
                  }) // Navigate to the user's profile page
              }
            >
              {allUsers.filter((item) => item.userID === post.userID)[0]?.name}
            </p>
            {/* User's headline */}
            <p className="text-sm font-normal text-gray-600 sm:max-md:text-xs">
              {allUsers
                .filter((item) => item.id == post.userID)
                .map((item) => item.headline)}
            </p>
            {/* Post timestamp */}
            <p className="text-sm pb-3 font-normal text-slate-600 sm:max-md:pb-0">
              {post.timeStamp} 🌐
            </p>
          </div>
        </div>

        {/* Render edit and delete buttons if the current user is the post's author */}
        {currUser.userID === post.userID ? (
          <div className="flex gap-3 p-6 sm:max-md:w-30 sm:max-md:p-0">
            {/* Edit button */}
            <BsPencil
              className="cursor-pointer p-4 hover:bg-slate-100 rounded-2xl"
              size={50}
              onClick={() => getEditData(post)} // Trigger the edit action
            />
            {/* Delete button */}
            <BsTrash
              className="cursor-pointer p-4 hover:bg-slate-100 rounded-2xl"
              size={50}
              onClick={() => deletePost(post.id)} // Trigger the delete action
            />
          </div>
        ) : null}
      </div>

      {/* Post content: text of the post */}
      <pre className="p-4 text-wrap font-poppins text-[14px] font-semibold text-black">
        {post.post}
      </pre>

      {/* Post image (if available) */}
      {post.postImage ? (
        <div className="w-full m-auto rounded-lg p-20 sm:max-md:p-0">
          {post.postImage && (
            <img
              className="rounded-lg w-full h-auto"
              src={post.postImage}
              alt="Post content"
            />
          )}
        </div>
      ) : null}

      {/* Like button and comments section */}
      <LikeButtonComponent currUser={currUser} post={post} />
    </div>
  ) : null; // If not connected, do not render the post
};

export default PostCardComponent;
