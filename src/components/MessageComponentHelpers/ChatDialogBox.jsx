import Input from "./Input";
import Messages from "./Messages";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { getMessages } from "../../api/FirestoreAPI";

const ChatDialogBox = ({ currUser }) => {
  const [messages, setMessages] = useState([]);

  // Getting chat data from the context
  const { data } = useContext(ChatContext);

  // Fetch messages whenever chatId changes
  useEffect(() => {
    getMessages(data.chatId, setMessages);
  }, [data.chatId]);

  return (
    <div className="flex-[3] flex flex-col justify-between rounded-md sm:max-md:flex-1">
      {messages[0] ? (
        <>
          {/* Chat header with user's profile image and username */}
          <div className="flex items-center bg-stone-800 text-teal-400 h-14 border-b-2 border-black rounded-tr-lg ">
            <img
              className="object-cover object-center rounded-full p-1 h-12 w-12 ring-gray-300 dark:ring-gray-500"
              src={data.user?.imageLink}
              alt=""
            />
            <h1 className="p-4">{data.user.userName}</h1>
          </div>

          {/* Message display area */}
          <div className="overflow-auto overflow-x-hidden scroll h-full bg-stone-800">
            <div className=" text-teal-400">
              {messages[0]?.messages.map((m) => (
                <Messages key={m.id} message={m} currUser={currUser} />
              ))}
            </div>
          </div>

          {/* Input for new messages */}
          <Input currUser={currUser} data={data} />
        </>
      ) : (
        // If no messages, display a placeholder message
        <>
          <div className="flex items-center justify-center bg-stone-800 text-teal-400 border-b-2 border-black rounded-tr-lg h-full ">
            Select a Chat to start Conversation
          </div>
        </>
      )}
    </div>
  );
};

export default ChatDialogBox;
