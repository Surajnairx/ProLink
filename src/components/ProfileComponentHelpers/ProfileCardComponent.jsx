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

      <div className="bg-neutral-100 m-8 rounded-md p-6 relative">
        <img
          className="object-cover object-center rounded-full p-2 ring-2 h-64 w-64 ring-gray-300 dark:ring-gray-500 cursor-pointer hover:ring-teal-400 transition-all duration-200"
          src={currentProfile?.imageLink || currUser?.imageLink}
          onClick={() =>
            (currUser.userID === currentProfile.userID ||
              !currentProfile.userID) &&
            setModalOpen(true)
          }
          alt="Profile"
        />
        {currUser.userID === currentProfile.userID || !currentProfile.userID ? (
          <div className="absolute top-3 right-3">
            <HiOutlinePencil
              className="text-3xl p-1 cursor-pointer hover:bg-slate-200 rounded-full transition-all"
              onClick={onEdit}
            />
          </div>
        ) : null}

        <h3 className="text-black font-bold text-2xl mt-4">
          {currentProfile?.name || currUser?.name}
        </h3>
        <div className="flex justify-between mt-2">
          <p className="w-[350px] font-semibold text-gray-600">
            {currentProfile?.headline || currUser?.headline}
          </p>

          <div className="flex flex-col text-gray-700">
            <p className="font-extrabold">
              {currentProfile?.company || currUser?.company}
            </p>
            <p className="font-extrabold">
              {currentProfile?.college || currUser?.college}
            </p>
          </div>
        </div>

        <p className="py-4 font-semibold text-gray-700">
          {currentProfile?.location || currUser?.location}
        </p>

        <a
          href={currentProfile?.website || currUser?.website}
          className="underline text-blue-600 cursor-pointer font-medium"
        >
          {currentProfile?.website || currUser?.website}
        </a>
      </div>

      <div className="w-auto h-auto bg-neutral-100 m-8 p-3 rounded-md ">
        <h1 className="font-bold text-xl mb-2">🌐About</h1>
        <pre className="font-poppins text-pretty ">
          {Object.values(currentProfile).length === 0
            ? currUser?.about
            : currentProfile?.about}
        </pre>
        <h1 className="font-bold text-xl mt-5"> 💎 Top Skill</h1>
        <p className="text-lg">
          {Object.values(currentProfile).length === 0
            ? currUser?.skills
            : currentProfile?.skills}
        </p>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        {(currentProfile?.email || currUser?.email) && (
          <>
            {allPost
              .filter(
                (item) =>
                  item.userEmail === (currentProfile?.email || currUser?.email)
              )
              .map((post) => (
                <PostCardComponent key={post.id} post={post} />
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default ProfileCardComponent;
