/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { onLogout } from "../api/API";
import ButtonComponent from "./ButtonComponent";

const ProfilePopup = ({ currUser }) => {
  let navigate = useNavigate();

  return (
    <div className="w-[400px] flex flex-col rounded-lg shadow-xl bg-slate-200 m-7 gap-2 p-5  z-[100] ">
      <div className="flex flex-col items-center ">
        <img
          className="object-cover object-center rounded-full p-3 m-3 ring-2 h-44 w-44 ring-gray-400 dark:ring-gray-400"
          src={currUser.imageLink}
          alt=""
        />
        <div className="p-2">
          <p className=" font-extrabold ">{currUser.name}</p>
          <p className=" text-sm text-gray-500">{currUser.headline}</p>
        </div>
      </div>

      <ButtonComponent
        title="View Profile"
        onClick={() =>
          navigate("/profile", {
            state: {
              id: currUser?.email,
            },
          })
        }
      />
      <ButtonComponent title="Logout" onClick={onLogout} />
    </div>
  );
};

export default ProfilePopup;
