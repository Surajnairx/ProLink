/* eslint-disable react/jsx-key */
import { useMemo, useState } from "react";
import Navbar from "./NavbarComponent";
import ConnnectedUsersComponent from "./ConnnectedUsersComponent";
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
    <div className="flex flex-col">
      <Navbar currUser={currUser} />

      <div className=" m-5 p-3 grid grid-cols-4 gap-10  text-center ">
        {allUsers.map((user) =>
          currUser.userID == user.userID ? (
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

      {/* {allUsers.map((user) => {
        <ConnnectedUsersComponent
          currUser={currUser}
          user={user}
          connectUser={connectUser}
        />;
      })} */}
    </div>
  );
};

export default ConnectionComponent;
