import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Connections from "../pages/Connections";
import Messaging from "../pages/Messaging";
import Notification from "../pages/Notification";
export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/connections",
    element: <Connections />,
  },
  {
    path: "/messaging",
    element: <Messaging />,
  },
  {
    path: "/notification",
    element: <Notification />,
  },
]);
