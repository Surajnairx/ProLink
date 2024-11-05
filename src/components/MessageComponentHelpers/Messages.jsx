/* eslint-disable react/prop-types */
import Message from "./Message";
const Messages = ({ message, currUser }) => {
  return (
    <div className="">
      <Message message={message} currUser={currUser} />
    </div>
  );
};

export default Messages;
