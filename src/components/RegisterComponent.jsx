import { useState } from "react";
import { Link } from "react-router-dom";
import { RegisterAPI } from "../api/API"; // API call for user registration
import Logo from "../assets/Logo.png"; // Logo image import
import { postUserData } from "../api/FirestoreAPI"; // Firestore function to store user data
import { toast } from "react-toastify"; // For showing toast notifications
import { useNavigate } from "react-router-dom"; // Hook to navigate to other routes

const RegisterComponent = () => {
  // State to store user credentials
  const [credentails, setCredentials] = useState({});

  // Hook to navigate to different routes
  let navigate = useNavigate();

  // Register function to handle user registration
  const register = async () => {
    try {
      // Call RegisterAPI to create a new user with the entered credentials
      let res = await RegisterAPI(credentails.email, credentails.password);

      // Navigate to the home page after successful registration
      navigate("/home");

      // Post user data to Firestore
      postUserData({
        name: credentails.name,
        email: credentails.email,
      });

      // Display success messages using toast notifications
      toast.success("Account Created Successfully");
      toast.success("Signed in Successfully");

      // Save the user's email in localStorage for later use
      localStorage.setItem("user-email", res.user.email);
    } catch (err) {
      // Handle errors (e.g., if the email is already registered)
      toast.error("Email Already Registered");
      console.log(err);
    }
  };

  return (
    <div className="h-lvh flex flex-col font-bold justify-center items-center sm:max-md:pt-10 bg-slate-200">
      {/* Logo */}
      <img
        src={Logo}
        alt="Logo"
        className="w-[120px] rounded-full absolute top-[20px] left-[20px] sm:max-md:w-[80px] sm:max-md:top-[5px] sm:max-md:left-36"
      />

      <div className="flex flex-col gap-5 m-3 p-10">
        <div className="mb-3 flex flex-col gap-2 ">
          {/* Heading */}
          <h1 className=" text-2xl font-bold sm:max-md:text-xl">
            Connect . Collaborate . Conquer
          </h1>
        </div>

        {/* Name input field */}
        <label htmlFor="name" className="text-lg">
          Enter your Name
        </label>
        <input
          className="p-3 text-cyan-50 rounded-md"
          type="text"
          name="name"
          onChange={(event) =>
            setCredentials({ ...credentails, name: event.target.value })
          }
        />

        {/* Email input field */}
        <label htmlFor="email" className="text-lg">
          Email or phone number
        </label>
        <input
          className="p-3 text-cyan-50 rounded-md"
          type="email"
          name="email"
          onChange={(event) =>
            setCredentials({ ...credentails, email: event.target.value })
          }
        />

        {/* Password input field */}
        <label htmlFor="password" className="text-lg">
          Password(6+ characters)
        </label>
        <input
          className="p-3 text-cyan-50 rounded-md"
          type="password"
          name="password"
          maxLength="6"
          onChange={(event) =>
            setCredentials({ ...credentails, password: event.target.value })
          }
        />

        {/* Register button and link to sign in */}
        <div className="flex flex-col justify-center">
          <button
            className="border-2 border-black w-full p-2.5 mb-3 rounded-3xl hover:bg-teal-400 hover:text-"
            type="button"
            onClick={register} // Trigger the register function on button click
          >
            Register
          </button>

          {/* Link to sign in page if the user already has an account */}
          <p>
            Already on ProLink ?{" "}
            <Link to="/" className=" text-teal-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
