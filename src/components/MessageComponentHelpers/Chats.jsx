/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getChats } from "../../api/FirestoreAPI";

const Chats = ({ currUser }) => {
  const [chats, setChats] = useState({});

  useEffect(() => {
    getChats(setChats, currUser.userID);
  }, []);

  return (
    <div className="text-white">
      {chats ? console.log(chats) : console.log("help")}
      {chats ? (
        Object.entries(chats).map((chat) => (
          <div className="flex rounded-md hover:bg-slate-100 p-3" key={chat[0]}>
            <img
              className="object-cover object-center rounded-full p-1 ring-2 h-12 w-12 ring-gray-300 dark:ring-gray-500"
              src={chat[1].userInfo.imageLink}
              alt=""
            />
            <div className="ml-2">
              <h1 className="font-semibold">{chat[1].userInfo.userName}</h1>
              <p className="font-thin">Hello</p>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Chats;
