import { useMemo, useState } from "react";
import { getCurrentuser } from "../api/FirestoreAPI";
import Navbar from "./NavbarComponent";
import ProfileCardComponent from "./ProfileComponentHelpers/ProfileCardComponent";
import ProfileEdit from "./ProfileComponentHelpers/ProfileEdit";

const ProfileComponent = () => {
  // State to track whether the user is editing their profile
  const [edit, setEdit] = useState(false);

  // State to store the current user's data
  const [currUser, setCurrUser] = useState({});

  // Function to toggle the 'edit' state (whether the user is in edit mode)
  const onEdit = () => {
    setEdit(!edit); // Toggle the value of 'edit'
  };

  // useMemo hook to fetch the current user's data when the component mounts
  useMemo(() => {
    // Fetch the current user's data and set it to the state
    getCurrentuser(setCurrUser);
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <>
      {/* Navbar component passing the current user data */}
      <Navbar currUser={currUser} />

      {/* Profile section */}
      <div className="pt-10">
        {/* Conditionally render ProfileCardComponent or ProfileEdit based on 'edit' state */}
        {edit ? (
          // If 'edit' is true, show the ProfileEdit component (for editing the profile)
          <ProfileEdit currUser={currUser} onEdit={onEdit} />
        ) : (
          // If 'edit' is false, show the ProfileCardComponent (for displaying the profile)
          <ProfileCardComponent currUser={currUser} onEdit={onEdit} />
        )}
      </div>
    </>
  );
};

export default ProfileComponent;
