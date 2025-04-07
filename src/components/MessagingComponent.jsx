import Navbar from "./NavbarComponent"; // Import the Navbar component for navigation
import SideBar from "./MessageComponentHelpers/SideBar"; // Import SideBar component for displaying users/messages list
import ChatDialogBox from "./MessageComponentHelpers/ChatDialogBox"; // Import ChatDialogBox component for the chat interface
import { getCurrentuser, getAllUsers } from "../api/FirestoreAPI"; // Import functions to fetch current user and all users data
import { useMemo, useState } from "react"; // Import React hooks for state management and memoization
import { ChatContextProvider } from "../context/ChatContext"; // Import context provider for chat state management

const MessagingComponent = () => {
  // State to store the current logged-in user data
  const [currUser, setCurrentUser] = useState({});

  // State to store the list of all users in the system
  const [allUsers, setAllUsers] = useState([]);

  // useMemo hook to fetch the current user and all users data when the component mounts
  useMemo(() => {
    getCurrentuser(setCurrentUser); // Fetch current user data and update the state
    getAllUsers(setAllUsers); // Fetch all users data and update the state
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      {/* Navbar component displaying the navigation bar with current user info */}
      <Navbar currUser={currUser} />

      {/* Main container for the messaging UI, adjusting height to fill the screen minus navbar */}
      <div className="h-[calc(100vh_-_70px)] p-5 flex justify-around rounded-md sm:max-md:hidden">
        {/* ChatContextProvider component to provide chat-related context to child components */}
        <ChatContextProvider>
          {/* SideBar component displaying a list of users and message threads */}
          <SideBar currUser={currUser} allUsers={allUsers} />

          {/* ChatDialogBox component for displaying the selected chat's conversation */}
          <ChatDialogBox currUser={currUser} />
        </ChatContextProvider>
      </div>
      <div className="sm:max-md:block hidden mt-16 px-8 py-6 text-lg border-2 border-red-500 rounded-lg bg-white shadow-xl text-center">
        <h1 className="font-semibold text-red-600">
          To fully use this functionality, switch to desktop mode.
        </h1>
      </div>
    </div>
  );
};

export default MessagingComponent;
