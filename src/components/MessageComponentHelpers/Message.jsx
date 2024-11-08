/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const Message = ({ message, currUser }) => {
  const { data } = useContext(ChatContext);

  return (
    <div>
      {message?.senderId === currUser.userID ? (
        <div className="flex flex-row-reverse items-baseline gap-4 p-4 ">
          {/* <div className="m-2 flex">
            <img
              className=" flex-1 object-cover object-center w-14 h-14 rounded-full"
              src={currUser.imageLink}
              alt=""
            />
          </div> */}
          <div>
            <p className="border-2 p-3 rounded-e-lg rounded-bl-lg max-w-96">
              {message?.text}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-baseline gap-4 p-4">
          {/* <div className="m-2">
            <img
              className=" object-cover object-center w-14 h-14 rounded-full"
              src={data.user?.imageLink}
              alt=""
            />
          </div> */}
          <div>
            <p className="border-2 p-3  rounded-e-lg rounded-bl-lg max-w-96">
              {message.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
