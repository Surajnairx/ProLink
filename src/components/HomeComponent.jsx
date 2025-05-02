import { useMemo, useState } from "react"; // Import React hooks
import Navbar from "./NavbarComponent"; // Import Navbar component to display navigation
import PostComponent from "./PostComponent"; // Import PostComponent to display posts
import { getCurrentuser } from "../api/FirestoreAPI"; // Import the function to fetch current user data

const HomeComponent = () => {
  // State to store the current user data
  const [currUser, setCurrUser] = useState({});

  // useMemo hook is used to fetch the current user's data when the component mounts
  useMemo(() => {
    // Fetch the current user data and set it to the 'currUser' state
    getCurrentuser(setCurrUser);
  }, []); // Empty dependency array ensures this effect runs only once, after the component mounts

  return (
    <div className="flex flex-col">
      {/* Navbar component to display the navigation bar, passing current user data as a prop */}
      <Navbar currUser={currUser} />

      {/* PostComponent to display the posts, passing the current user data as a prop */}
      <PostComponent currUser={currUser} />
      {console.log(currUser)}
    </div>
  );
};

export default HomeComponent;
