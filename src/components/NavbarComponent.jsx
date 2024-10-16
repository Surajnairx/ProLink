/* eslint-disable react/prop-types */
import { useState } from "react";
import Logo from "../assets/HomeLogo.png";
import User from "../assets/profile1.png";
import ProfilePopup from "./ProfilePopup";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const NavbarComponent = ({ currUser }) => {
  const [popupVisible, setPopupVisible] = useState(false);

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
        <input
          type="text"
          name="search"
          placeholder="Search"
          className="bg-slate-200 px-5 py-1 rounded-sm"
        />
        <AiOutlineSearch className=" cursor-pointer" size={40} />
      </div>
      <div className="flex items-center gap-10">
        <AiOutlineHome
          size={40}
          className="w-[55%] cursor-pointer"
          onClick={() => goToPage("/home")}
        />
        <AiOutlineUser
          size={40}
          className="w-[55%] cursor-pointer"
          onClick={() => goToPage("/profile")}
        />
        <BsBriefcase
          size={40}
          className="w-[55%]  cursor-pointer"
          onClick={() => goToPage("/jobs")}
        />
        <AiOutlineMessage size={40} className="w-[55%]  cursor-pointer" />
        <AiOutlineBell size={40} className="w-[55%]  cursor-pointer" />
      </div>
      <div className="flex flex-col items-center">
        <button>
          <img
            className="w-[55px] rounded-lg  cursor-pointer "
            src={User}
            onClick={displayPopup}
          />
        </button>
        {popupVisible ? (
          <div className="absolute top-16 z-[100]">
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
