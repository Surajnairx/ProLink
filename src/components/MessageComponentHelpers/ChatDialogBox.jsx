/* eslint-disable react/prop-types */
import Input from "./Input";
import Messages from "./Messages";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { getMessages } from "../../api/FirestoreAPI";

const ChatDialogBox = ({ currUser }) => {
  const [messages, setMessages] = useState([]);

  const { data } = useContext(ChatContext);

  useEffect(() => {
    getMessages(data.chatId, setMessages);
  }, [data.chatId]);

  return (
    <div className="flex-[3] flex flex-col justify-between rounded-md">
      <div className="flex items-center bg-stone-800 text-teal-400 h-14 border-b-2 border-black rounded-tr-lg ">
        <img
          className="object-cover object-center rounded-full p-1  h-12 w-12 ring-gray-300 dark:ring-gray-500"
          src={data.user?.imageLink}
          alt=""
        />
        <h1 className="p-4">{data.user.userName}</h1>
      </div>
      <div className="overflow-auto overflow-x-hidden scroll h-full bg-stone-800">
        <div className=" text-teal-400 h-full">
          {messages[0]?.messages.map((m) => (
            <Messages key={m.id} message={m} currUser={currUser} />
          ))}
        </div>
      </div>
      <Input currUser={currUser} data={data} />
    </div>
  );
};

export default ChatDialogBox;
