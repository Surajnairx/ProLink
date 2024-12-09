/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Logo from "../assets/HomeLogo.png";
import ProfilePopup from "./ProfilePopup";
import {
  AiOutlineHome,
  AiOutlineUserAdd,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../api/FirestoreAPI";
import useFetchNotifications from "../hooks/useNotifications";

const NavbarComponent = ({ currUser }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState([]);

  let notification = useFetchNotifications(currUser).notifications;

  let isRead = notification
    ?.filter((item) => item.isRead === false)
    .map((notif) => notif.isRead);

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  let navigate = useNavigate();
  const goToPage = (route) => {
    navigate(route);
  };

  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setSearchUser(searched);
      console.log(searchUser);
    } else {
      setSearchUser(users);
    }
  };

  const handleClickOutside = (event) => {
    if (popupVisible && !event.target.closest(".popup")) {
      setPopupVisible(false);
    }
  };

  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.userID,
        email: user.email,
      },
    });
  };

  document.addEventListener("mousedown", handleClickOutside);
  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);
    return () => {
      clearTimeout(debounced),
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchInput]);

  useEffect(() => getAllUsers(setUsers), []);

  return (
    <div className="w-full h-[70px] bg-slate-200 flex justify-around items-center ">
      <div className=" flex justify-center items-center gap-5">
        <img
          className="w-[66px] rounded-lg cursor-pointer"
          src={Logo}
          alt=""
          onClick={() => goToPage("/home")}
        />

        <div className="flex items-center">
          <input
            // className="p-3 border-none rounded-md bg-slate-300"
            className={`p-3 border-none rounded-md bg-slate-300 transition-all duration-300 ease-in-out ${
              isSearch ? "w-[350px]" : "w-[200px]"
            }`}
            placeholder="Search Users..."
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            onClick={() => setIsSearch(!isSearch)}
            value={searchInput}
          />

          <button
            className={isSearch ? "text-xl p-2 w-1" : "hidden"}
            onClick={() => {
              setIsSearch(false), setSearchInput("");
            }}
          >
            &#10006;
          </button>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex flex-col items-center">
          <AiOutlineHome
            size={40}
            className="w-[80px] cursor-pointer"
            onClick={() => goToPage("/home")}
          />
          Home
        </div>
        <div className="flex flex-col justify-center items-center">
          {" "}
          <AiOutlineUserAdd
            size={40}
            className="w-[80px] cursor-pointer"
            onClick={() => goToPage("/connections")}
          />
          Network
        </div>
        <div className="flex flex-col items-center">
          <BsBriefcase
            size={40}
            className="w-[80px]  cursor-pointer"
            onClick={() => goToPage("/jobs")}
          />
          Jobs
        </div>
        <div className="flex flex-col items-center">
          <AiOutlineMessage
            size={40}
            className="w-[80px]  cursor-pointer"
            onClick={() => goToPage("/messaging")}
          />
          Messaging
        </div>
        <div className="flex flex-col items-center relative">
          {" "}
          <AiOutlineBell
            size={40}
            className="w-[80px]  cursor-pointer "
            // onClick={() => goToPage("/notification")}
            onClick={() =>
              navigate("/notification", {
                state: {
                  isRead: isRead.length,
                },
              })
            }
          />
          Notification
          {isRead.length ? (
            <div className="absolute  bg-red-500 top-0 right-0 rounded-full text-white text-xs px-2 py-1">
              {isRead.length}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="">
        <button className="flex flex-col items-center">
          <img
            className="w-[45px] rounded-lg  cursor-pointer mt-2"
            src={currUser.imageLink}
            onClick={displayPopup}
          />
          <p>Me 🡇</p>
        </button>
        {popupVisible ? (
          <div className=" popup absolute top-20 right-5 z-[100]   ">
            <ProfilePopup currUser={currUser} />
          </div>
        ) : (
          <></>
        )}
      </div>
      {searchInput.length === 0 ? (
        isSearch ? (
          <div className=" absolute  w-72 h-auto rounded-md top-20 left-80 bg-slate-300 z-50 p-3">
            No Results Found
          </div>
        ) : (
          <></>
        )
      ) : (
        <div className=" absolute flex flex-col gap-3 w-72 h-auto rounded-md top-20 left-80 bg-slate-300 z-50">
          {searchUser.map((user) => (
            <div
              className="flex rounded-md hover:bg-slate-100 p-3"
              key={user.id}
              onClick={() => openUser(user)}
            >
              <img
                className="object-cover object-center rounded-full p-1 ring-2 h-10 w-10 ring-gray-300 dark:ring-gray-500"
                src={user.imageLink}
                alt=""
              />
              <p className="p-2">{user.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavbarComponent;
