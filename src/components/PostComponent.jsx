import { useState, useMemo } from "react";
import PostModalComponent from "./PostComponentHelpers/PostModalComponent"; // Modal component for creating/editing posts
import { Post, getPost, updatePost } from "../api/FirestoreAPI"; // Firestore functions for creating, retrieving, and updating posts
import PostCardComponent from "./PostComponentHelpers/PostCardComponent"; // Component to display individual posts
import { uploadPostImage } from "../api/ImageUploadAPI"; // API for handling image uploads in posts
import { useNavigate } from "react-router-dom"; // Hook for navigation
import moment from "moment"; // For formatting date/time
import uuid from "react-uuid"; // For generating unique IDs

const PostComponent = ({ currUser }) => {
  // State to control modal visibility, post status, and posts data
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allPost, setAllPosts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [postImage, setPostImage] = useState("");

  const navigate = useNavigate(); // Navigation hook to redirect users

  // Function to generate a unique post ID using UUID
  const getUniqueID = () => {
    let id = uuid();
    return id;
  };

  // Function to generate a formatted timestamp for when the post is created
  const timeStamp = () => {
    return moment().format("MMMM Do YYYY, h:mm");
  };

  // Function to handle creating a new post
  const handleStatus = async () => {
    // Create a post object with details like status, timestamp, and user info
    let object = {
      post: status,
      timeStamp: timeStamp(),
      userEmail: await currUser.email,
      userName: await currUser.name,
      userID: await currUser.userID,
      postID: getUniqueID(),
      postImage: postImage,
    };

    // Save the new post to the database
    await Post(object);
    // Close the modal and clear the status
    await setModalOpen(false);
    await setStatus("");
  };

  // Function to set up the modal for editing an existing post
  const getEditData = (post) => {
    setModalOpen(true); // Open the modal
    setCurrentPost(post); // Set the current post data
    setStatus(post.post); // Set the current post's status text
    setPostImage(post.postImage); // Set the current post's image
    setIsEdit(true); // Indicate that we're editing a post
  };

  // Function to update an existing post with new status and image
  const updateStatus = () => {
    updatePost(currentPost.id, status, postImage); // Update the post in the database
    setModalOpen(false); // Close the modal after updating
  };

  // Fetch all posts when the component first loads using useMemo (avoids re-fetching)
  useMemo(() => {
    getPost(setAllPosts);
  }, []); // Empty dependency array ensures this runs only once on initial render

  return (
    <div className="flex flex-col gap-10 rounded-md items-center px-4">
      {/* Check if the current user has a college or company set */}
      {currUser.college || currUser.company ? null : (
        <div className="pt-10">
          {/* Display a message prompting the user to complete their profile */}
          <div className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Welcome! Let&apos;s Set Up Your Profile
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm sm:text-base">
              Before you start exploring the app and its features, let&apos;s
              take a moment to complete your profile. This will help us
              personalize your experience and make sure you get the most out of
              all the app has to offer.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => navigate("/profile")} // Redirect to the profile setup page
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

      {/* Button to create a new post */}
      <div className="bg-white w-2/3 h-[100px] border rounded-md flex justify-center items-center gap-3 mt-5 sm:max-md:w-full">
        {/* User profile image */}
        <img
          className=" object-cover object-center rounded-full h-14 w-14 ring-gray-300 dark:ring-gray-500"
          src={currUser?.imageLink}
          alt=""
        />
        {/* Button to open the post creation modal */}
        <button
          className="bg-white w-3/4 border-2 border-teal-400 p-3 text-center rounded-full text-black hover:bg-black hover:text-teal-400 hover:border-black transform transition-all duration-200 ease-in-out"
          onClick={() => {
            setModalOpen(true); // Open modal for creating a post
            setIsEdit(false); // Indicate that it's not an edit, it's a new post
          }}
        >
          Start a post...
        </button>
      </div>

      {/* Modal for creating or editing a post */}
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

      {/* List of all posts */}
      <div className="w-full flex flex-col gap-10 items-center">
        {allPost.map((post) => {
          return (
            <PostCardComponent
              key={post.id} // Unique key for each post
              post={post}
              getEditData={getEditData} // Pass function to edit the post
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostComponent;
