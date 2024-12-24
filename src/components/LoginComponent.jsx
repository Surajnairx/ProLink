import { useState } from "react";
import { LoginAPI } from "../api/API";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginComponent = () => {
  const [credentials, setCredentials] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const logIn = async () => {
    try {
      let res = await LoginAPI(credentials.email, credentials.password);
      toast.success("Signed in Successfully");
      localStorage.setItem("user-email", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Password or Username is Incorrect");
    }
  };

  return (
    <div className="h-screen flex flex-col font-bold justify-center items-center px-5 bg-slate-200">
      <img
        src={Logo}
        alt="Logo"
        className="w-[145px] rounded-full absolute top-[20px] left-[20px] sm:max-md:w-[80px]"
      />

      <div className="flex flex-col gap-5 m-3 p-5 w-full max-w-md">
        <div className="mb-3 flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Sign in</h1>
          <p className="font-normal text-lg sm:text-2xl">
            Stay updated on your professional world
          </p>
        </div>

        <input
          className="p-3 text-cyan-50 rounded-md"
          type="email"
          name="email"
          placeholder="Email"
          onChange={(event) =>
            setCredentials({ ...credentials, email: event.target.value })
          }
        />

        {/* Password input with show/hide functionality */}
        <div className="relative">
          <input
            className="p-3 text-cyan-50 rounded-md w-full"
            type={showPassword ? "text" : "password"}
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
            onClick={() => setShowPassword((prevState) => !prevState)} // Toggle state
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="flex flex-col justify-center">
          <button
            className="border-2 border-black w-full p-2.5 mb-3 rounded-3xl hover:bg-teal-400"
            type="button"
            onClick={logIn}
          >
            Log In
          </button>

          <p className="text-sm sm:text-base">
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
