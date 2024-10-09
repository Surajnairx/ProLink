import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
export const Router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);
