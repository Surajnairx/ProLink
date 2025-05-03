import { useState, useMemo, useEffect } from "react";
import PostCardComponent from "../PostComponentHelpers/PostCardComponent";
import {
  getPost,
  getSingleUser,
  getSingleStatus,
  getConnections,
  addConnection,
} from "../../api/FirestoreAPI";
import { imageUpload } from "../../api/ImageUploadAPI";
import ButtonComponent from "../ButtonComponent";
import { useLocation } from "react-router-dom";
import FileUploadModal from "./FileUploadModal";
import { HiOutlinePencil } from "react-icons/hi";

// ProfileCardComponent for displaying and editing a user profile
const ProfileCardComponent = ({ currUser, onEdit }) => {
  const [allPost, setAllPosts] = useState([]); // Stores all posts
  const [currentProfile, setCurrentProfile] = useState({}); // Stores current profile information
  const [currentImage, setCurrentImage] = useState({}); // Stores image to upload
  const [modalOpen, setModalOpen] = useState(false); // Controls the modal visibility for image upload
  const [progress, setProgress] = useState(0); // Tracks the progress of the image upload
  const [isConnected, setIsConnected] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  let location = useLocation(); // Get the current location, used for user profile

  useEffect(() => {
    if (currentProfile?.userID) {
      getConnections(currUser?.userID, currentProfile.userID, setIsConnected);
    }
    // Fetch if there's a connection
  }, [currUser?.userID, currentProfile?.userID]);

  // Function to handle file input and set selected image
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };

  // Function to upload image using the imageUpload API
  const uploadImage = () => {
    imageUpload(
      currentImage,
      currUser?.userID,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
  };

  const connectUser = (id) => {
    console.log(currUser.userID, id); // Logging the connection attempt (current user and target user)
    addConnection(currUser.userID, id); // Add the target user to current user's connection list
    getConnections(currUser.userID, currentProfile?.userID, setIsConnected);
    console.log(isConnected);
  };

  // useMemo hook to fetch data only when needed
  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllPosts, location?.state?.id); // Fetch posts for a single user
    }
    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email); // Fetch user data by email
    }
    getPost(setAllPosts); // Fetch all posts
  }, []); // Empty dependency array to run this code only once after initial render

  return (
    <>
      {modalOpen && (
        // FileUploadModal for handling image uploads
        <FileUploadModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          getImage={getImage}
          uploadImage={uploadImage}
          currentImage={currentImage}
          progress={progress}
        />
      )}

      <div className=" bg-neutral-100 rounded-md p-6  mx-auto shadow-lg mb-8 max-w-4xl">
        {/* Profile Image Section */}
        <div className="profile-image-container flex justify-center mb-6 relative">
          <img
            className="h-60 w-60 profile-image object-cover object-center rounded-full border-4 border-gray-300 hover:ring-4 hover:ring-teal-400 transition-all duration-200 cursor-pointer"
            src={currentProfile?.imageLink || currUser?.imageLink}
            onClick={() =>
              // If the user is viewing their own profile or no profile is available, open the upload modal
              (currUser?.userID === currentProfile.userID ||
                !currentProfile.userID) &&
              setModalOpen(true)
            }
            alt="Profile"
          />
          {/* Edit Icon visible if the current user is the same as the profile user */}
          {currUser?.userID === currentProfile.userID ||
          !currentProfile.userID ? (
            <div className="edit-icon absolute top-0 right-0 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-200 transition">
              <HiOutlinePencil
                className="text-2xl text-gray-700 hover:text-teal-500"
                onClick={onEdit} // Trigger onEdit function on clicking the pencil icon
              />
            </div>
          ) : null}
        </div>

        {/* Profile Details */}
        <div className=" text-center">
          <h3 className="profile-name text-3xl font-semibold text-gray-800 mb-2">
            {currentProfile?.name || currUser?.name}
          </h3>
          {currentProfile.userID !== currUser?.userID &&
          currentProfile?.name ? (
            isConnected ? (
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">
                Following
              </h3>
            ) : (
              <>
                <div className=" border-black">
                  <ButtonComponent
                    title={"Follow 🌐"} // The text and emoji on the button
                    onClick={() => connectUser(currentProfile?.userID)} // Call connectUser function when the button is clicked
                  />
                </div>
              </>
            )
          ) : null}

          <div className=" flex justify-center mb-4">
            <p className=" text-lg font-medium text-gray-600">
              {currentProfile?.headline || currUser?.headline}
            </p>
          </div>
          <div className="profile-companies flex justify-center mb-4">
            <div className="company-info text-sm text-gray-700">
              <p className="company-name font-semibold">
                {currentProfile?.company || currUser?.company}
              </p>
              <p className="college-name font-semibold">
                {currentProfile?.college || currUser?.college}
              </p>
            </div>
          </div>
          <p className="profile-location py-2 text-sm font-medium text-gray-700">
            {currentProfile?.location || currUser?.location}
          </p>

          <a
            href={currentProfile?.website || currUser?.website}
            className="profile-website text-blue-600 hover:text-blue-800 font-medium"
          >
            {currentProfile?.website || currUser?.website}
          </a>
        </div>

        {/* About Section */}
        <div className="about-section mt-8">
          <h1 className="about-header font-semibold text-xl mb-2 text-gray-800">
            🌐 About
          </h1>
          <p className="about-text font-poppins text-gray-700">
            {Object.values(currentProfile).length === 0
              ? currUser?.about
              : currentProfile?.about}
          </p>
        </div>

        {/* Top Skills Section */}
        <div className="skills-section mt-5">
          <h1 className="skills-header font-semibold text-xl mb-2 text-gray-800">
            💎 Top Skill
          </h1>
          <p className="skills-text text-lg text-gray-700">
            {Object.values(currentProfile).length === 0
              ? currUser?.skills
              : currentProfile?.skills}
          </p>
        </div>

        {/* Posts Section */}
        <div className=" w-full flex flex-col justify-center items-center mt-8">
          {(currentProfile?.email || currUser?.email) && (
            <>
              {/* Display user's posts filtered by email */}
              {allPost
                .filter(
                  (item) =>
                    item.userEmail ===
                    (currentProfile?.email || currUser?.email)
                )
                .map((post) => (
                  <PostCardComponent key={post.id} post={post} />
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileCardComponent;
