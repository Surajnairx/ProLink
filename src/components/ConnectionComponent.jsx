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
  // State for managing the current logged-in user
  const [currUser, setCurrUser] = useState({});

  // State for storing the list of all users
  const [allUsers, setAllUsers] = useState([]);

  // Function to handle the connection request between the current user and another user
  const connectUser = (id) => {
    console.log(currUser.userID, id); // Logging the connection attempt (current user and target user)
    addConnection(currUser.userID, id); // Add the target user to current user's connection list
  };

  // useMemo hook to fetch the current user and all users once when the component mounts
  useMemo(() => {
    // Fetch the current user data and update the state
    getCurrentuser(setCurrUser);
    // Fetch all users data and update the state
    getAllUsers(setAllUsers);
  }, []); // Empty dependency array to ensure this only runs once on component mount

  return (
    <div className="flex flex-col">
      {/* Navbar component that passes the current user data */}
      <Navbar currUser={currUser} />

      {/* Section for displaying header and description */}
      <div className="mt-3 bg-white w-fit m-auto rounded-lg p-5">
        <h2 className="text-4xl font-semibold text-gray-800 text-center">
          Connect with Users
        </h2>
        <p className="text-lg text-gray-600 text-center">
          Discover and connect with professionals & friends in your network!
        </p>
      </div>

      {/* Section for displaying the list of users to connect with */}
      <div className="h-full flex justify-around gap-10 text-center sm:max-md:flex sm:max-md:justify-center sm:max-md:items-center sm:max-md:flex-wrap md:max-lg:flex md:max-lg:flex-wrap md:max-lg:justify-center md:max-lg:gap-4 md:max-lg:items-center">
        {/* Loop through all users */}
        {allUsers.map((user) =>
          // Skip if the user is the current logged-in user or if the user doesn't have an 'about' field
          currUser.userID == user.userID || !user.about ? (
            <></> // Skip rendering if it's the current user or if 'about' field is missing
          ) : (
            // Render the ConnnectedUsersComponent for each user that can be connected with
            <ConnnectedUsersComponent
              currUser={currUser} // Pass current user data
              user={user} // Pass the user data to display and interact with
              connectUser={connectUser} // Pass the function to handle connecting users
            />
          )
        )}
      </div>
    </div>
  );
};

export default ConnectionComponent;
