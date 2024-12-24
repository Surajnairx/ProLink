import { createBrowserRouter } from "react-router-dom"; // Importing createBrowserRouter from 'react-router-dom' for defining routes
import Login from "../pages/Login"; // Importing the Login page component
import Register from "../pages/Register"; // Importing the Register page component
import Home from "../pages/Home"; // Importing the Home page component
import Profile from "../pages/Profile"; // Importing the Profile page component
import Connections from "../pages/Connections"; // Importing the Connections page component
import Messaging from "../pages/Messaging"; // Importing the Messaging page component
import Notification from "../pages/Notification"; // Importing the Notification page component
import Jobs from "../pages/Jobs"; // Importing the Jobs page component

// Defining the routing configuration using createBrowserRouter
export const Router = createBrowserRouter([
  {
    path: "/", // The root path of the app
    element: <Login />, // Rendering the Login component when the root path is visited
  },
  {
    path: "/register", // The '/register' path for user registration
    element: <Register />, // Rendering the Register component for registration
  },
  {
    path: "/home", // The '/home' path for the home page
    element: <Home />, // Rendering the Home component when the '/home' path is visited
  },
  {
    path: "/profile", // The '/profile' path for viewing user profile
    element: <Profile />, // Rendering the Profile component for the user's profile page
  },
  {
    path: "/connections", // The '/connections' path for viewing user connections
    element: <Connections />, // Rendering the Connections component
  },
  {
    path: "/messaging", // The '/messaging' path for messaging functionality
    element: <Messaging />, // Rendering the Messaging component
  },
  {
    path: "/notification", // The '/notification' path for viewing notifications
    element: <Notification />, // Rendering the Notification component
  },
  {
    path: "/jobs", // The '/jobs' path for browsing job opportunities
    element: <Jobs />, // Rendering the Jobs component
  },
]);
