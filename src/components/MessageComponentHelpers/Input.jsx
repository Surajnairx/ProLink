/* eslint-disable react/prop-types */
import { useState } from "react";

import { updateMessages } from "../../api/FirestoreAPI";

const Input = ({ currUser, data }) => {
  const [text, setText] = useState("");

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  const handleSend = () => {
    if (text != "")
      updateMessages(data.chatId, currUser.userID, data.user.currUserID, text);
    setText("");
  };

  return (
    <div className="flex items-center rounded-md bg-stone-800 border-t-2 ">
      <input
        className="p-5 w-3/4 text-teal-400 bg-stone-800 flex-1"
        type="text"
        placeholder="Type Something"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKey}
      />
      <div className="flex justify-between items-center gap-2 mx-7 px-4 ">
        <button className="border-2 px-4 py-3 bg-teal-400" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
