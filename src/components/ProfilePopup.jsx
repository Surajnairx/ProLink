/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { onLogout } from "../api/API";
import ButtonComponent from "./ButtonComponent";

const ProfilePopup = ({ currUser }) => {
  let navigate = useNavigate();

  return (
    <div className="flex flex-col rounded-lg shadow-xl bg-slate-200 m-7 p-5 gap-3 z-[100] ">
      <p className=" font-extrabold text-2xl mt-10">{currUser.name}</p>
      <p className="text-gray-500">{currUser.headline}</p>
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
