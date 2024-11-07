/* eslint-disable react/prop-types */
import Chats from "./Chats";
import { useState } from "react";
import { handleChats } from "../../api/FirestoreAPI";

const SideBar = ({ currUser, allUsers }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchUser, setSearchUser] = useState();

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    let searched = allUsers.filter((user) => {
      if (user.userID !== currUser.userID) {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      } else {
        return;
      }
    });
    setSearchUser(searched);
  };

  const handleSelect = (user) => {
    handleChats(currUser, user);
    setSearchInput("");
  };

  return (
    <div className=" bg-stone-800  rounded-s-lg flex-1 border-r-2 border-slate-600">
      <div className=" p-2 bg-black text-white  rounded-tl-lg">
        <div className=" flex justify-between">
          <p className="font-bold text-sm p-2 text-teal-400">Messaging</p>
          <div className="flex items-center gap-2">
            <img
              className="object-cover object-center rounded-full ring-2 h-8 w-8 ring-gray-400 dark:ring-gray-400"
              src={currUser.imageLink}
              alt="userImage"
            />
            <p className="font-semibold text-sm">{currUser.name}</p>
          </div>
        </div>
      </div>
      <div>
        <input
          className="w-full p-3 bg-transparent text-white border-b-2 border-slate-600"
          placeholder="Find User"
          type="text"
          value={searchInput}
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <Chats allUsers={allUsers} currUser={currUser} />
      {searchInput ? (
        <div className=" absolute flex flex-col gap-3 w-72 h-auto rounded-md top-48 bg-slate-300 z-50">
          {searchUser?.map((user) => (
            <div
              className="flex rounded-md hover:bg-slate-100 p-3"
              key={user.id}
              onClick={() => handleSelect(user)}
            >
              <img
                className="object-cover object-center rounded-full p-1 ring-2 h-10 w-10 ring-gray-300 dark:ring-gray-500"
                src={user.imageLink}
                alt=""
              />
              <p className="p-2">{user.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SideBar;
