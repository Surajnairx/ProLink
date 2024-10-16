/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { onLogout } from "../api/API";
import ButtonComponent from "./ButtonComponent";

const ProfilePopup = ({ currUser }) => {
  let navigate = useNavigate();

  return (
    <div className="flex flex-col w-auto rounded-lg shadow-xl bg-slate-200 mt-3 p-3 gap-3 z-[100] ">
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
