/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import PostCardComponent from "../PostComponentHelpers/PostCardComponent";
import {
  getPost,
  getSingleUser,
  getSingleStatus,
} from "../../api/FirestoreAPI";
import { imageUpload } from "../../api/ImageUploadAPI";
import { useLocation } from "react-router-dom";
import FileUploadModal from "./FileUploadModal";
import { HiOutlinePencil } from "react-icons/hi";

const ProfileCardComponent = ({ currUser, onEdit }) => {
  const [allPost, setAllPosts] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  let location = useLocation();

  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };

  const uploadImage = () => {
    imageUpload(
      currentImage,
      currUser.userID,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
  };

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllPosts, location?.state?.id);
    }
    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
    getPost(setAllPosts);
  }, []);

  return (
    <>
      {modalOpen && (
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
        {/* Profile Image */}
        <div className="profile-image-container flex justify-center mb-6 relative">
          <img
            className="profile-image object-cover object-center rounded-full border-4 border-gray-300 hover:ring-4 hover:ring-teal-400 transition-all duration-200 cursor-pointer"
            src={currentProfile?.imageLink || currUser?.imageLink}
            onClick={() =>
              (currUser.userID === currentProfile.userID ||
                !currentProfile.userID) &&
              setModalOpen(true)
            }
            alt="Profile"
          />
          {currUser.userID === currentProfile.userID ||
          !currentProfile.userID ? (
            <div className="edit-icon absolute top-0 right-0 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-200 transition">
              <HiOutlinePencil
                className="text-2xl text-gray-700 hover:text-teal-500"
                onClick={onEdit}
              />
            </div>
          ) : null}
        </div>

        {/* Profile Details */}
        <div className=" text-center">
          <h3 className="profile-name text-3xl font-semibold text-gray-800 mb-2">
            {currentProfile?.name || currUser?.name}
          </h3>
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
