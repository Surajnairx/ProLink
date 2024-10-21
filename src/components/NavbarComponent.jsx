/* eslint-disable react/prop-types */
import { useState } from "react";
import Logo from "../assets/HomeLogo.png";
import User from "../assets/profile1.png";
import ProfilePopup from "./ProfilePopup";
import SearchUsers from "./SearchUsers";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineUserAdd,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
// import { useStyleRegister } from "antd/es/theme/internal";

const NavbarComponent = ({ currUser }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  let navigate = useNavigate();
  const goToPage = (route) => {
    navigate(route);
  };

  return (
    <div className="w-full h-[70px] bg-slate-200 flex justify-around items-center">
      <div className="flex justify-center items-center gap-5">
        <img
          className="w-[66px] rounded-lg cursor-pointer"
          src={Logo}
          alt=""
          onClick={() => goToPage("/home")}
        />
        {isSearch ? <SearchUsers></SearchUsers> : <></>}
        {/* <input
          type="text"
          name="search"
          placeholder="Search"
          className="bg-slate-200 px-5 py-1 rounded-sm"
        /> */}
        <AiOutlineSearch
          className=" cursor-pointer"
          size={40}
          onClick={() => setIsSearch(true)}
        />
      </div>
      <div className="flex items-center gap-10">
        <div className="flex flex-col items-center">
          {" "}
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
          <AiOutlineMessage size={40} className="w-[80px]  cursor-pointer" />
          Messaging
        </div>
        <div className="flex flex-col items-center">
          {" "}
          <AiOutlineBell size={40} className="w-[80px]  cursor-pointer" />
          Notification
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button>
          <img
            className="w-[45px] rounded-lg  cursor-pointer "
            src={User}
            onClick={displayPopup}
          />
          <p>Me ⬇️</p>
        </button>
        {popupVisible ? (
          <div className="absolute top-16 right-5 z-[100]">
            <ProfilePopup currUser={currUser} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NavbarComponent;
