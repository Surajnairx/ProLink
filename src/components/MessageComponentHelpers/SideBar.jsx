import Chats from "./Chats";
import { useState } from "react";
import { handleChats } from "../../api/FirestoreAPI";

// The SideBar component represents the sidebar where users can search and select other users to chat with.
const SideBar = ({ currUser, allUsers }) => {
  // State hooks for managing the search input and the filtered user list
  const [searchInput, setSearchInput] = useState("");
  const [searchUser, setSearchUser] = useState();

  // Handles the search functionality when the user types in the search bar
  const handleSearch = (e) => {
    // Update the search input state
    setSearchInput(e.target.value);

    // Filter users based on the search input, excluding the current user from search results
    let searched = allUsers.filter((user) => {
      if (user.userID !== currUser.userID) {
        // Check if any of the user's properties contain the search term
        return Object.values(user)
          .join("") // Join all the values in the user object
          .toLowerCase() // Convert to lowercase for case-insensitive comparison
          .includes(searchInput.toLowerCase()); // Check if the search term exists
      } else {
        return; // Exclude the current user from the search results
      }
    });

    // Update the state with the filtered user list
    setSearchUser(searched);
  };

  // Handles the selection of a user from the search results
  const handleSelect = (user) => {
    // Handle starting a new chat with the selected user
    handleChats(currUser, user);
    // Clear the search input after selection
    setSearchInput("");
  };

  return (
    <div className=" bg-stone-800  rounded-s-lg flex-1 border-r-2 border-slate-600">
      {/* Header section with user details */}
      <div className=" p-2 bg-black text-white rounded-tl-lg">
        <div className=" flex justify-between sm:max-md:flex-col">
          <p className="font-bold text-sm p-2 text-teal-400 sm:max-md:text-center">
            Messaging
          </p>
          <div className="flex items-center gap-2">
            {/* User image and name in the sidebar */}
            <img
              className="object-cover object-center rounded-full ring-2 h-8 w-8 ring-gray-400 dark:ring-gray-400"
              src={currUser.imageLink}
              alt="userImage"
            />
            <p className="font-semibold text-sm">{currUser.name}</p>
          </div>
        </div>
      </div>
      {/* Search input for finding users */}
      <div>
        <input
          className="w-full p-3 bg-transparent text-white border-b-2 border-slate-600"
          placeholder="Find User"
          type="text"
          value={searchInput}
          onChange={(e) => handleSearch(e)} // Trigger search on input change
        />
      </div>

      {/* Chats component to display the list of available chats */}
      <Chats allUsers={allUsers} currUser={currUser} />

      {/* Display search results as a dropdown when there is search input */}
      {searchInput ? (
        <div className=" absolute flex flex-col gap-3 w-72 h-auto rounded-md top-48 bg-slate-300 z-50">
          {searchUser?.map((user) => (
            <div
              className="flex rounded-md hover:bg-slate-100 p-3"
              key={user.id} // Unique key for each user in search results
              onClick={() => handleSelect(user)} // Handle user selection
            >
              {/* User image and name displayed in the search results */}
              <img
                className="object-cover object-center rounded-full p-1 ring-2 h-10 w-10 ring-gray-300 dark:ring-gray-500"
                src={user.imageLink}
                alt=""
              />
              <p className="p-2">{user.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <></> // No search results displayed when there's no input
      )}
    </div>
  );
};

export default SideBar;
