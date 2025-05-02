import { useEffect, useState } from "react";
import Logo from "../assets/HomeLogo.png";
import ProfilePopup from "./ProfilePopup";
import {
  AiOutlineHome,
  AiOutlineUserAdd,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsBriefcase } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../api/FirestoreAPI";
import useFetchNotifications from "../hooks/useNotifications";

const NavbarComponent = ({ currUser }) => {
  // State for managing popup visibility, search box, and users search functionality
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false); // To control if search input box is expanded
  const [searchInput, setSearchInput] = useState(""); // Search input field value
  const [users, setUsers] = useState([]); // Stores all users
  const [searchUser, setSearchUser] = useState([]); // Stores filtered search results
  const [hamburger, setHamburger] = useState(false); // Manages hamburger menu visibility

  // Fetch unread notifications for the current user
  let notification = useFetchNotifications(currUser).notifications;

  // Filter unread notifications
  let isRead = notification
    ?.filter((item) => item.isRead === false)
    .map((notif) => notif.isRead);

  // Function to toggle the profile popup visibility
  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  // Navigation function for routing
  let navigate = useNavigate();
  const goToPage = (route) => {
    setHamburger(!hamburger); // Close hamburger menu after navigation
    navigate(route); // Navigate to the specified route
  };

  // Handle user search by filtering the user list based on the search input
  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("") // Joins all user properties as a string
          .toLowerCase()
          .includes(searchInput.toLowerCase()); // Filters based on lowercase search input
      });
      setSearchUser(searched); // Set filtered results
    } else {
      setSearchUser(users); // If no input, reset the search results
    }
  };

  // Close popup when clicked outside
  const handleClickOutside = (event) => {
    if (popupVisible && !event.target.closest(".popup")) {
      setPopupVisible(false);
    }
  };

  // Open specific user profile page
  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.userID,
        email: user.email,
      },
    });
  };

  // Debounce search functionality to improve performance (e.g., waits 1 second after typing)
  document.addEventListener("mousedown", handleClickOutside);
  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000); // Wait for 1 second before triggering search
    return () => {
      clearTimeout(debounced),
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchInput]); // Effect triggers when searchInput changes

  // Fetch users on component mount or when currUser changes
  useEffect(() => getAllUsers(setUsers), [currUser]);

  return (
    <div className="w-full h-[70px] bg-slate-200 flex justify-between shadow- items-center p-4 sm:max-md:flex-col sm:max-md:h-auto sm:max-md:gap-1">
      {/* Left Side: Logo and Search Box */}
      <div className="flex items-center gap-4 sm:max-md:flex-col sm:max-md:items-start sm:max-md:w-full sm:max-md:h-auto">
        <img
          className="w-[66px] rounded-lg cursor-pointer"
          src={Logo}
          alt="Logo"
          onClick={() => goToPage("/home")} // Go to home when logo is clicked
        />

        <div className="relative sm:max-md:w-full sm:max-md:m-auto">
          <input
            className={`p-3 border-none rounded-md bg-slate-300 transition-all duration-300 ease-in-out ${
              isSearch ? "w-[350px]" : "w-[200px]"
            } sm:max-md:w-full`}
            placeholder="Search Users..."
            type="text"
            onChange={(e) => setSearchInput(e.target.value)} // Update search input value
            onClick={() => setIsSearch(!isSearch)} // Toggle search box size on click
            value={searchInput} // Bind input value to state
          />
          <button
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xl p-2 ${
              isSearch ? "block" : "hidden"
            }`}
            onClick={() => {
              setIsSearch(false); // Close search box
              setSearchInput(""); // Clear input value
            }}
          >
            &#10006; {/* Close button for search */}
          </button>
        </div>
      </div>

      {/*Hamburger Menu*/}
      <div className="sm:max-md:block hidden">
        <GiHamburgerMenu
          className=" absolute top-7 right-10"
          size={30}
          onClick={() => setHamburger(!hamburger)} // Toggle hamburger menu visibility
        />
      </div>

      {/* Right Side: Navigation Items */}
      <div
        className={
          hamburger
            ? "flex sm:max-md:flex-col  items-center gap-10"
            : "sm:max-md:hidden flex items-center gap-10 sm:max-md:disabled"
        }
      >
        {/* Navigation Items */}
        <div className="flex flex-col items-center">
          <AiOutlineHome
            size={30}
            className="cursor-pointer"
            onClick={() => goToPage("/home")} // Navigate to home page
          />
          <span className="hidden sm:max-md:block">Home</span>
        </div>
        <div className="flex flex-col items-center">
          <AiOutlineUserAdd
            size={30}
            className="cursor-pointer"
            onClick={() => goToPage("/connections")} // Navigate to connections page
          />
          <span className="hidden sm:max-md:block">Connect</span>
        </div>
        <div className="flex flex-col items-center">
          <BsBriefcase
            size={30}
            className="cursor-pointer"
            onClick={() => goToPage("/jobs")} // Navigate to jobs page
          />
          <span className="hidden sm:max-md:block">Jobs</span>
        </div>
        <div className="flex flex-col items-center">
          <AiOutlineMessage
            size={30}
            className="cursor-pointer"
            onClick={() => goToPage("/messaging")} // Navigate to messaging page
          />
          <span className="hidden sm:max-md:block">Messaging</span>
        </div>
        <div className="flex flex-col items-center relative">
          <AiOutlineBell
            size={30}
            className="cursor-pointer"
            onClick={() =>
              navigate("/notification", {
                state: {
                  isRead: isRead.length, // Pass unread notifications count
                },
              })
            }
          />
          <span className="hidden sm:max-md:block">Notification</span>
          {/* Display unread notifications count */}
          {isRead.length ? (
            <div className="absolute bg-red-500 top-0 right-0 rounded-full text-white text-xs px-2 py-1">
              {isRead.length}
            </div>
          ) : null}
        </div>
        <div>
          <button className="flex flex-col items-center" onClick={displayPopup}>
            <img
              className="object-cover object-center rounded-full mt-2 h-12 w-12 ring-gray-400 dark:ring-gray-400"
              src={currUser?.imageLink}
              alt="Profile"
            />
            <span className="hidden sm:max-md:block">Me 🡇</span>
          </button>
          {/* Display profile popup if visible */}
          {popupVisible && (
            <div
              className="popup absolute top-20 right-5 z-[100] sm:max-md:flex sm:max-md:top-1/3
            sm:max-md:right-1/4 sm:max-md:mt-2"
            >
              <ProfilePopup currUser={currUser} />
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchInput.length === 0 ? (
        isSearch ? (
          <div className="absolute w-72 h-auto rounded-md top-20 left-48 bg-slate-300 z-50 p-3 sm:max-md:top-36 sm:max-md:left-10">
            No Results Found
          </div>
        ) : null
      ) : (
        <div className="absolute flex flex-col gap-3 w-72 h-auto rounded-md top-20 left-48 bg-slate-300 z-50 sm:max-md:top-40 sm:max-md:left-10">
          {searchUser.length > 0 ? (
            searchUser.map((user) => (
              <div
                className="flex rounded-md hover:bg-slate-100 p-3"
                key={user.id}
                onClick={() => openUser(user)} // Open user profile on click
              >
                <img
                  className="object-cover object-center rounded-full p-1 ring-2 h-10 w-10 ring-gray-300 dark:ring-gray-500"
                  src={user.imageLink}
                  alt="User"
                />
                <p className="p-2">{user.name}</p>
              </div>
            ))
          ) : (
            <div className="p-3 text-center">No Results Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarComponent;
