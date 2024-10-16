/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import PostCardComponent from "./PostCardComponent";
import { getPost, getSingleUser, getSingleStatus } from "../api/FirestoreAPI";
import { useLocation } from "react-router-dom";

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
        <div className=" absolute right-14 border-2 border-black p2">
          <button onClick={onEdit} className="px-1 cursor-pointer -z-10">
            Edit
          </button>
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

          <div className=" gap-8">
            <p className="">
              {Object.values(currentProfile).length === 0
                ? currUser.company
                : currentProfile?.company}
            </p>
            <p className="">
              {Object.values(currentProfile).length === 0
                ? currUser.company
                : currentProfile?.college}
            </p>
          </div>
        </div>

        <p className="mt-3">{currUser.location}</p>
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
