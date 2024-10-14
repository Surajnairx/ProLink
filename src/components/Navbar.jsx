import Logo from "../assets/HomeLogo.png";
import User from "../assets/profile1.png";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="w-full h-[70px] bg-slate-200 flex justify-around items-center">
      <div className="flex justify-center items-center gap-5">
        <img className="w-[66px] rounded-lg " src={Logo} alt="" />
        <input
          type="text"
          name="search"
          placeholder="Search"
          className="bg-slate-200 px-5 py-1 rounded-sm"
        />
        <AiOutlineSearch className=" cursor-pointer" size={40} />
      </div>
      <div className="flex items-center gap-10">
        <AiOutlineHome size={40} className="w-[55%] cursor-pointer" />
        <AiOutlineUser size={40} className="w-[55%] cursor-pointer" />
        <BsBriefcase size={40} className="w-[55%]  cursor-pointer" />
        <AiOutlineMessage size={40} className="w-[55%]  cursor-pointer" />
        <AiOutlineBell size={40} className="w-[55%]  cursor-pointer" />
      </div>
      <div>
        <img className="w-[55px] rounded-lg  cursor-pointer " src={User} />
      </div>
    </div>
  );
};

export default Navbar;
