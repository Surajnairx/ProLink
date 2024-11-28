/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";

const Message = ({ message, currUser }) => {
  const ref = useRef();
  console.log(message);

  useEffect(() => {
    ref.current?.scrollIntoView({ behaviour: "smooth" });
  }, [message]);

  return (
    <div ref={ref}>
      {message?.senderId === currUser.userID ? (
        <div className="flex flex-row-reverse items-baseline gap-4 p-4 ">
          <div className="border-2 p-3 rounded-s-lg rounded-br-lg max-w-96 ">
            {message?.text}
            <p className="text-xs font-extralight text-right">{message.date}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-baseline gap-4 p-4">
          <div className="border-2 p-3  rounded-e-lg rounded-bl-lg max-w-96">
            {message.text}
            <p className="text-xs font-extralight text-right">{message.date}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
