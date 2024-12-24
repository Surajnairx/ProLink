import { StrictMode } from "react"; // Importing StrictMode for highlighting potential problems in the app
import { createRoot } from "react-dom/client"; // Importing createRoot to render the root of the app
import { RouterProvider } from "react-router-dom"; // Importing RouterProvider to use React Router for routing
import { ToastContainer } from "react-toastify"; // Importing ToastContainer for showing notifications (from react-toastify)
import "react-toastify/dist/ReactToastify.css"; // Importing the CSS for react-toastify (styling for notifications)
import { Router } from "./routes/Router.jsx"; // Importing the Router component (where you define all routes)

import "./index.css"; // Importing global styles

// Rendering the app to the DOM
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* StrictMode helps to identify potential problems in the application */}
    <RouterProvider router={Router} />{" "}
    {/* Providing the router to the app, it will handle all the routing logic */}
    <ToastContainer />{" "}
    {/* Including the ToastContainer component, which will be responsible for rendering notifications in the app */}
  </StrictMode>
);
