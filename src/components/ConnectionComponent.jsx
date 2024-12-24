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
      <div className="mt-3 bg-white w-fit m-auto rounded-lg p-5">
        <h2 className="text-4xl font-semibold text-gray-800 text-center">
          Connect with Users
        </h2>
        <p className="text-lg text-gray-600 text-center">
          Discover and connect with professionals & friends in your network!
        </p>
      </div>

      <div className="h-full flex justify-around gap-10 text-center sm:max-md:flex sm:max-md:justify-center sm:max-md:items-center sm:max-md:flex-wrap md:max-lg:flex md:max-lg:flex-wrap md:max-lg:justify-center md:max-lg:gap-4 md:max-lg:items-center">
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
