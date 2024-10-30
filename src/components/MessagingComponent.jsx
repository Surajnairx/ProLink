import Navbar from "./NavbarComponent";
import SideBar from "./MessageComponentHelpers/SideBar";
import ChatDialogBox from "./MessageComponentHelpers/ChatDialogBox";
import { getCurrentuser, getAllUsers } from "../api/FirestoreAPI";
import { useMemo, useState } from "react";

const MessagingComponent = () => {
  const [currUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  useMemo(() => {
    getCurrentuser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);
  return (
    <div>
      <Navbar currUser={currUser} />
      <div className=" h-screen p-5 ">
        <div className=" h-5/6 bg-white flex gap-5 justify-around rounded-md ">
          <SideBar currUser={currUser} allUsers={allUsers} />
          <ChatDialogBox currUser={currUser} />
        </div>
      </div>
    </div>
  );
};

export default MessagingComponent;
