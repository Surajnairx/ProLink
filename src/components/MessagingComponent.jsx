import Navbar from "./NavbarComponent";
import SideBar from "./MessageComponentHelpers/SideBar";
import ChatDialogBox from "./MessageComponentHelpers/ChatDialogBox";
import { getCurrentuser, getAllUsers } from "../api/FirestoreAPI";
import { useMemo, useState } from "react";
import { ChatContextProvider } from "../context/ChatContext";

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
      <div className=" h-[calc(100vh_-_70px)] p-5 bg-white flex  justify-around rounded-md">
        <ChatContextProvider>
          <SideBar currUser={currUser} allUsers={allUsers} />
          <ChatDialogBox currUser={currUser} />
        </ChatContextProvider>
      </div>
    </div>
  );
};

export default MessagingComponent;
