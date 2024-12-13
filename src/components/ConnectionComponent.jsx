/* eslint-disable react/jsx-key */
import { useMemo, useState } from "react";
import Navbar from "./NavbarComponent";
import ConnnectedUsersComponent from "./ConnectionComponentHelper/ConnnectedUsersComponent";
import {
  getAllUsers,
  getCurrentuser,
  addConnection,
} from "../api/FirestoreAPI";

const ConnectionComponent = () => {
  const [currUser, setCurrUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  const connectUser = (id) => {
    console.log(currUser.userID, id);
    addConnection(currUser.userID, id);
  };
  useMemo(() => {
    getCurrentuser(setCurrUser);
    getAllUsers(setAllUsers);
  }, []);

  return (
    <div className="flex flex-col bg-gray-300">
      <Navbar currUser={currUser} />

      <div className="h-screen w-screen m-5 p-3 grid grid-cols-4 gap-10  text-center ">
        {allUsers.map((user) =>
          currUser.userID == user.userID || !user.about ? (
            <></>
          ) : (
            <ConnnectedUsersComponent
              currUser={currUser}
              user={user}
              connectUser={connectUser}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ConnectionComponent;
