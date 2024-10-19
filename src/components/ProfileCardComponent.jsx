/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import PostCardComponent from "./PostCardComponent";
import { getPost, getSingleUser, getSingleStatus } from "../api/FirestoreAPI";
import { imageUpload } from "../api/ImageUploadAPI";
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
      {modalOpen ? (
        <FileUploadModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          getImage={getImage}
          uploadImage={uploadImage}
          currentImage={currentImage}
          progress={progress}
        />
      ) : (
        <></>
      )}

      <div className="bg-neutral-100 m-8 rounded-md p-3">
        <img
          className="object-cover object-center rounded-full p-3 m-3 ring-2 h-64 w-64 ring-gray-300 dark:ring-gray-500"
          src={
            Object.values(currentProfile).length === 0
              ? currUser.imageLink
              : currentProfile?.imageLink
          }
          onClick={() => setModalOpen(true)}
          alt=""
        />

        <div className=" w-auto h-auto  absolute right-14  p2">
          <HiOutlinePencil
            className=" text-4xl p-1 cursor-pointer hover:bg-slate-200 rounded-xl"
            onClick={onEdit}
          />
        </div>
        <h3 className="text-black font-bold text-2xl">
          {Object.values(currentProfile).length === 0
            ? currUser.name
            : currentProfile?.name}
        </h3>
        <div className="flex justify-between mt-2 ">
          <p className="w-[350px] font-semibold">
            {Object.values(currentProfile).length === 0
              ? currUser.headline
              : currentProfile?.headline}
          </p>

          <div className="flex flex-col">
            <p className="font-extrabold">
              {Object.values(currentProfile).length === 0
                ? currUser.company
                : currentProfile?.company}
            </p>
            <p className="font-extrabold">
              {Object.values(currentProfile).length === 0
                ? currUser.college
                : currentProfile?.college}
            </p>
          </div>
        </div>
        <p className="py-5 font-semibold">
          {Object.values(currentProfile).length === 0
            ? currUser.location
            : currentProfile?.location}
        </p>
        <a
          href={
            Object.values(currentProfile).length === 0
              ? currUser.website
              : currentProfile?.website
          }
          className=" underline text-blue-600 cursor-pointer font-medium"
        >
          {Object.values(currentProfile).length === 0
            ? currUser.website
            : currentProfile?.website}
        </a>
      </div>
      <div className="w-auto h-auto bg-neutral-100 m-8 p-3 rounded-md ">
        <h1 className="font-bold text-xl mb-2">About</h1>
        <pre className="font-poppins text-pretty ">
          {Object.values(currentProfile).length === 0
            ? currUser.about
            : currentProfile?.about}
        </pre>
        <h1 className="font-bold text-xl mt-5"> 💎 Top Skill</h1>
        <p className="text-lg">
          {Object.values(currentProfile).length === 0
            ? currUser.skills
            : currentProfile?.skills}
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        {Object.values(currentProfile).length === 0
          ? allPost
              .filter((item) => {
                return item.userEmail === currUser.email;
              })
              .map((post) => {
                return <PostCardComponent key={post.id} post={post} />;
              })
          : allPost
              .filter((item) => {
                return item.userEmail === currentProfile.email;
              })
              .map((post) => {
                return <PostCardComponent key={post.id} post={post} />;
              })}
      </div>
    </>
  );
};

export default ProfileCardComponent;
