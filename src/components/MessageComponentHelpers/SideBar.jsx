/* eslint-disable react/prop-types */
import Chats from "./Chats";
const SideBar = ({ currUser, allUsers }) => {
  return (
    <div className=" bg-stone-800  rounded-md flex-1">
      <div className=" p-2 bg-slate-400 rounded-t-md ">
        <div className=" flex justify-between">
          <p className="font-bold text-sm p-2">Messaging</p>
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
          className="w-full p-3 bg-transparent text-white"
          placeholder="Find User"
          type="text"
        />
      </div>
      <Chats allUsers={allUsers} />
    </div>
  );
};

export default SideBar;
