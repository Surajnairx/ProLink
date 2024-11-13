/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getConnections } from "../../api/FirestoreAPI";
import ButtonComponent from "../ButtonComponent";

const ConnnectedUsersComponent = ({ currUser, user, connectUser }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    getConnections(currUser.userID, user.userID, setIsConnected);
  }, [currUser.userID, user.userID]);

  return isConnected ? (
    <> </>
  ) : (
    <div
      className=" w-[300px] flex flex-col items-center justify-between h-[450px] rounded-xl p-5 border-stone-500 border-2 cursor-pointer hover:shadow-2xl"
      key={user.userID}
    >
      <img
        className=" object-cover object-center rounded-full p-3 ring-2 h-32 w-32 ring-gray-300 dark:ring-gray-500"
        src={user.imageLink}
        alt=""
      />
      <p className="font-bold p-3">{user.name}</p>
      <p className="font-light p-3">{user.headline}</p>
      <p className="font-medium p-3">{user.location}</p>
      <div className="p-2 border-black flex items-center">
        <ButtonComponent
          title={"Follow 🌐"}
          onClick={() => connectUser(user.userID)}
        />
      </div>
    </div>
  );
};

export default ConnnectedUsersComponent;
