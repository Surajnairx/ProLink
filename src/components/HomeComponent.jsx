import { useMemo, useState } from "react";
import Navbar from "./NavbarComponent";
import PostComponent from "./PostComponent";
import { getCurrentuser } from "../api/FirestoreAPI";

const HomeComponent = () => {
  const [currUser, setCurrUser] = useState({});
  useMemo(() => {
    getCurrentuser(setCurrUser);
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar currUser={currUser} />
      <PostComponent currUser={currUser} />
    </div>
  );
};

export default HomeComponent;
