/* eslint-disable react/prop-types */
import Message from "./Message";

// The Messages component is responsible for rendering a single message by passing it to the Message component.
const Messages = ({ message, currUser }) => {
  return (
    <div className="">
      {/* Pass the individual message and current user information to the Message component */}
      <Message message={message} currUser={currUser} />
    </div>
  );
};

export default Messages;
