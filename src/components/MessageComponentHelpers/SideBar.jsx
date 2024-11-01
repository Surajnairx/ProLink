/* eslint-disable react/prop-types */
import Chats from "./Chats";
const SideBar = ({ currUser, allUsers }) => {
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
        />
      </div>
      <Chats allUsers={allUsers} />
    </div>
  );
};

export default SideBar;
