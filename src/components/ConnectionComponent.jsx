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
    <div className=" flex flex-col">
      <Navbar currUser={currUser} />

      <div className="h-full m-5 grid grid-cols-4 gap-10 text-center sm:max-md:flex sm:max-md:justify-center sm:max-md:items-center sm:max-md:flex-wrap md:max-lg:flex md:max-lg:flex-wrap md:max-lg:justify-center md:max-lg:gap-4 md:max-lg:items-center">
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
