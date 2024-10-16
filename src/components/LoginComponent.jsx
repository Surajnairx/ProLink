import { useState } from "react";
import { LoginAPI } from "../api/API";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginComponent = () => {
  const [credentails, setCredentials] = useState({});
  let navigate = useNavigate();

  const logIn = async () => {
    try {
      let res = await LoginAPI(credentails.email, credentails.password);
      toast.success("Signed in Successfully");
      localStorage.setItem("user-email", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Password or Username is Incorrect");
    }
  };

  return (
    <div className="h-lvh flex flex-col font-bold justify-center items-center">
      <img
        src={Logo}
        alt=""
        className="w-[145px] rounded-full absolute top-[20px] left-[20px]"
      />

      <div className="flex flex-col gap-5 m-3 p-10">
        <div className="mb-3 flex flex-col gap-2">
          <h1 className=" text-3xl font-bold">Sign in</h1>
          <p className="font-normal text-2xl">
            Stay updated on your professional world
          </p>
        </div>

        <input
          className="p-3 text-cyan-50 rounded-md"
          type="email"
          name="email"
          placeholder="Email"
          onChange={(event) =>
            setCredentials({ ...credentails, email: event.target.value })
          }
        />
        <input
          className="p-3 text-cyan-50 rounded-md"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(event) =>
            setCredentials({ ...credentails, password: event.target.value })
          }
        />
        <div className="flex flex-col justify-center">
          <button
            className="border-2 border-black w-full p-2.5 mb-3 rounded-3xl hover:bg-teal-400"
            type="button"
            onClick={logIn}
          >
            Log In
          </button>

          <p>
            New to ProLink ?{" "}
            <Link to="/register" className=" text-teal-400">
              Join Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
