/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getConnections } from "../../api/FirestoreAPI"; // Import function to check if the user is already connected
import ButtonComponent from "../ButtonComponent"; // Import ButtonComponent to render the follow button

// ConnnectedUsersComponent: Displays a user profile with a follow button if not already connected
const ConnnectedUsersComponent = ({ currUser, user, connectUser }) => {
  const [isConnected, setIsConnected] = useState(false);

  // Effect to check if the current user is already connected to the displayed user
  useEffect(() => {
    getConnections(currUser.userID, user.userID, setIsConnected); // Fetch if there's a connection
  }, [currUser.userID, user.userID]); // Re-run when currUser or user changes

  // If the users are connected, render nothing
  return isConnected ? (
    <> </> // Empty fragment if the users are already connected
  ) : (
    // Display user card with profile details and follow button if not connected
    <div
      className="bg-gray-100 w-[300px] flex flex-col items-center justify-between h-[450px] rounded-xl p-5 m-4 border-stone-500 border-2 cursor-pointer hover:shadow-2xl "
      key={user.userID} // Use user.userID as the key for the component
    >
      {/* Display user profile picture */}
      <img
        className="object-cover object-center rounded-full p-3 ring-2 h-32 w-32 ring-gray-300 dark:ring-gray-500 sm:max-md:h-28 sm:max-md:w-28"
        src={user.imageLink} // Use user's image link for the profile picture
        alt="User Profile"
      />
      {/* Display user name */}
      <p className="font-bold p-3">{user.name}</p>
      {/* Display user's headline */}
      <p className="font-light p-3">{user.headline}</p>
      {/* Display user's location */}
      <p className="font-medium p-3">{user.location}</p>
      {/* Button to follow the user if not connected */}
      <div className="p-2 border-black flex items-center">
        <ButtonComponent
          title={"Follow 🌐"} // The text and emoji on the button
          onClick={() => connectUser(user.userID)} // Call connectUser function when the button is clicked
        />
      </div>
    </div>
  );
};

export default ConnnectedUsersComponent;
