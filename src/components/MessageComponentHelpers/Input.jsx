/* eslint-disable react/prop-types */
import { useState } from "react";
import { updateMessages } from "../../api/FirestoreAPI";

const Input = ({ currUser, data }) => {
  const [text, setText] = useState(""); // Holds the typed message

  // Handles the "Enter" key press to send the message
  const handleKey = (e) => {
    e.code === "Enter" && handleSend(); // Send message on "Enter"
  };

  // Handles the sending of the message
  const handleSend = () => {
    if (text !== "") {
      // Update the messages in Firestore with the new message
      updateMessages(data.chatId, currUser.userID, data.user.currUserID, text);
      setText(""); // Clear the input field after sending the message
    }
  };

  return (
    <div className="flex items-center rounded-md bg-stone-800 border-t-2">
      {/* Input field for typing the message */}
      <input
        className="p-5 w-3/4 text-teal-400 bg-stone-800 flex-1"
        type="text"
        placeholder="Type Something"
        onChange={(e) => setText(e.target.value)} // Update state on input change
        value={text} // Bind the state to the input field
        onKeyDown={handleKey} // Trigger send on "Enter" key press
      />
      <div className="flex justify-between items-center gap-2 mx-7 px-4">
        {/* Button to manually send the message */}
        <button className="border-2 px-4 py-3 bg-teal-400" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
