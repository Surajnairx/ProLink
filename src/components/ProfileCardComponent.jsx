/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import PostCardComponent from "./PostCardComponent";
import { getPost, getSingleUser, getSingleStatus } from "../api/FirestoreAPI";
import { useLocation } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";

const ProfileCardComponent = ({ currUser, onEdit }) => {
  const [allPost, setAllPosts] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  let location = useLocation();

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
      <div className="w-auto h-auto bg-neutral-100 m-8 rounded-md p-3">
        <div className=" w-auto h-auto  absolute right-14  p2">
          <HiOutlinePencil
            className=" text-4xl p-1 cursor-pointer hover:bg-slate-200 rounded-xl"
            onClick={onEdit}
          />
          {/* <button className=" w-44 border-2 border-teal-400 p-1 rounded-xl hover:bg-black hover:text-teal-400 hover:border-black">
            Edit
          </button> */}
        </div>
        <h3 className="text-black font-bold text-2xl">
          {Object.values(currentProfile).length === 0
            ? currUser.name
            : currentProfile?.name}
        </h3>
        <div className="flex justify-between mt-2 ">
          <p className="w-[350px]">
            {Object.values(currentProfile).length === 0
              ? currUser.headline
              : currentProfile?.headline}
          </p>

          <div className="flex flex-col">
            <p>
              {Object.values(currentProfile).length === 0
                ? currUser.company
                : currentProfile?.company}
            </p>
            <p>
              {Object.values(currentProfile).length === 0
                ? currUser.college
                : currentProfile?.college}
            </p>
          </div>
        </div>
        <p>
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
        <pre className="font-poppins">
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
