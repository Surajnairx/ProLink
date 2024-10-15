import { onLogout } from "../api/API";
const ProfilePopup = () => {
  return (
    <div className="border-2 w-[200px] h-auto rounded-sm flex justify-center flex-col p-20">
      <ul>
        <li onClick={onLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default ProfilePopup;
