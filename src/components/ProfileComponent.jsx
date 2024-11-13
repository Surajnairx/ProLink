import { useMemo, useState } from "react";
import { getCurrentuser } from "../api/FirestoreAPI";
import Navbar from "./NavbarComponent";
import ProfileCardComponent from "./ProfileComponentHelpers/ProfileCardComponent";
import ProfileEdit from "./ProfileComponentHelpers/ProfileEdit";

const ProfileComponent = () => {
  const [edit, setEdit] = useState(false);
  const [currUser, setCurrUser] = useState({});
  const onEdit = () => {
    setEdit(!edit);
  };

  useMemo(() => {
    getCurrentuser(setCurrUser);
  }, []);
  return (
    <div>
      <Navbar currUser={currUser} />

      {edit ? (
        <ProfileEdit currUser={currUser} onEdit={onEdit} />
      ) : (
        <ProfileCardComponent currUser={currUser} onEdit={onEdit} />
      )}
    </div>
  );
};

export default ProfileComponent;
