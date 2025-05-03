import { useState } from "react";
import { LoginAPI } from "../api/API"; // API call for user login
import { Link } from "react-router-dom"; // Link component for navigation
import Logo from "../assets/Logo.png"; // Logo image import
import { useNavigate } from "react-router-dom"; // Hook for navigating to other routes
import { toast } from "react-toastify"; // For displaying toast notifications
import { auth } from "../firebaseConfig";

// LoginComponent functional component
const LoginComponent = () => {
  // State to store user credentials (email and password)
  const [credentials, setCredentials] = useState({});

  // State to control visibility of the password input field
  const [showPassword, setShowPassword] = useState(false);

  // Hook to navigate to different routes after login
  let navigate = useNavigate();

  // LogIn function to handle user login
  const logIn = async () => {
    try {
      // Call LoginAPI to authenticate the user with entered credentials
      let res = await LoginAPI(credentials.email, credentials.password);
      if (auth.currentUser.emailVerified) {
        // Display success message when login is successful
        toast.success("Signed in Successfully");

        // Store the user's email in localStorage for future use
        localStorage.setItem("user-email", res.user.email);

        // Navigate to the home page after successful login
        navigate("/home");
      } else {
        navigate("/");
        alert("Please Verify Your Email and Try Again");
      }
    } catch (err) {
      // Log error and display error message if login fails (e.g., incorrect password or username)
      console.log(err);
      toast.error("Password or Username is Incorrect");
    }
  };

  return (
    <div className="h-screen flex flex-col font-bold justify-center items-center px-5 bg-slate-200">
      {/* Logo */}
      <img
        src={Logo}
        alt="Logo"
        className="w-[145px] rounded-full absolute top-[20px] left-[20px] sm:max-md:w-[70px]"
      />

      <div className="flex flex-col gap-5 m-3 p-5 w-full max-w-md">
        {/* Title and description */}
        <div className="mb-3 flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Sign in</h1>
          <p className="font-normal text-lg sm:text-2xl">
            Stay updated on your professional world
          </p>
        </div>

        {/* Email input field */}
        <input
          className="p-3 text-cyan-50 rounded-md"
          type="email"
          name="email"
          placeholder="Email"
          onChange={(event) =>
            setCredentials({ ...credentials, email: event.target.value })
          }
        />

        {/* Password input field with toggle visibility functionality */}
        <div className="relative">
          <input
            className="p-3 text-cyan-50 rounded-md w-full"
            type={showPassword ? "text" : "password"} // Toggle between text and password input type
            name="password"
            placeholder="Password"
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
          />
          {/* Button to toggle password visibility */}
          <button
            type="button"
            className="absolute right-3 top-3 text-teal-400"
            onClick={() => setShowPassword((prevState) => !prevState)} // Toggle the state for password visibility
          >
            {showPassword ? "Hide" : "Show"} {/* Change text based on state */}
          </button>
        </div>

        {/* Login button and link to register page */}
        <div className="flex flex-col justify-center items-center">
          <button
            className="border-2 border-black w-full p-2.5 mb-3 rounded-3xl hover:bg-teal-400"
            type="button"
            onClick={logIn} // Trigger logIn function when clicked
          >
            Sign In
          </button>

          {/* Link to register page for new users */}
          <p className="text-sm sm:text-base ">
            New to ProLink?{" "}
            <Link to="/register" className="text-teal-400">
              Join Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
