import { useNavigate } from "react-router-dom"; // Importing useNavigate to programmatically navigate to different routes
import { onLogout } from "../api/API"; // Importing the logout function
import ButtonComponent from "./ButtonComponent"; // Importing the ButtonComponent for creating buttons

const ProfilePopup = ({ currUser }) => {
  // Using useNavigate hook to handle navigation actions
  let navigate = useNavigate();

  return (
    <div className="w-[400px] flex flex-col rounded-lg shadow-xl bg-slate-200 gap-2 p-5 z-[100] sm:max-md:w-[200px]">
      {/* Profile Information Section */}
      <div className="flex flex-col items-center ">
        {/* Profile Image */}
        <img
          className="object-cover object-center rounded-full p-3 m-3 ring-2 h-44 w-44 ring-gray-400 dark:ring-gray-400"
          src={currUser?.imageLink} // Displaying the current user's profile image
          alt="" // Empty alt text as the image is decorative
        />
        {/* User Info */}
        <div className="p-2">
          {/* Displaying User Name */}
          <p className="font-extrabold">{currUser?.name}</p>
          {/* Displaying User Headline */}
          <p className="text-sm text-gray-500">{currUser?.headline}</p>
        </div>
      </div>
      {/* View Profile Button */}
      <ButtonComponent
        title="View Profile" // Button title
        onClick={() =>
          // When the button is clicked, navigate to the user's profile page with their email as state
          navigate("/profile", {
            state: {
              id: currUser?.email,
            },
          })
        }
      />
      {/* Logout Button */}
      <ButtonComponent title="Logout" onClick={onLogout} />{" "}
      {/* When clicked, triggers the logout function */}
    </div>
  );
};

export default ProfilePopup;
