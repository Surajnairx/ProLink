/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { getUserChats } from "../../api/FirestoreAPI";
import { ChatContext } from "../../context/ChatContext";

const Chats = ({ currUser }) => {
  const [chats, setChats] = useState([]);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    getUserChats(setChats, currUser.userID); // Fetch chats for the current user
  }, [currUser.userID]); // Runs when the user's ID changes

  const handleSelect = (e) => {
    // Dispatch the selected chat to the global context
    dispatch({ type: "CHANGE_USER", payload: e });
  };

  return (
    <div className="text-white">
      {chats ? (
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date) // Sort chats by date of last message
          .map((chat) => (
            <div
              className="flex rounded-md hover:bg-slate-100 p-3"
              key={chat[0]}
              onClick={() => handleSelect(chat)} // Set the selected chat in context
            >
              <img
                className="object-cover object-center rounded-full p-1 ring-2 h-12 w-12 ring-gray-300 dark:ring-gray-500"
                src={chat[1].userInfo?.imageLink}
                alt=""
              />
              <div className="ml-2">
                <h1 className="font-semibold">{chat[1].userInfo?.userName}</h1>
                {chat[1].read === false &&
                chat[1].recieverId === currUser.userID ? (
                  <p className="font-normal text-teal-400 truncate max-w-96">
                    {chat[1].lastMessage?.text}
                  </p>
                ) : (
                  <p className="font-extralight truncate max-w-96">
                    You: {chat[1].lastMessage?.text}
                    {/* Display the last message */}
                  </p>
                )}
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
