import { useState } from "react";
import { Link } from "react-router-dom";
import { RegisterAPI } from "../api/API";
import Logo from "../assets/Logo.png";
import { toast } from "react-toastify";

const RegisterComponent = () => {
  const [credentails, setCredentials] = useState({});

  const register = async () => {
    try {
      let res = await RegisterAPI(credentails.email, credentails.password);
      console.log(res);
      toast.success("Account Created Successfully");
      toast.success("You can now Sign in using the same credentials");
    } catch (err) {
      toast.error("Email Already Registered");
      console.log(err);
    }
  };

  return (
    <div className="h-lvh flex flex-col font-bold justify-center items-center">
      <img
        src={Logo}
        alt=""
        className="w-[120px] rounded-full absolute top-[20px] left-[20px]"
      />

      <div className="flex flex-col gap-5 m-3 p-10">
        <div className="mb-3 flex flex-col gap-2">
          <h1 className=" text-2xl font-bold">
            Connect . Collaborate . Conquer
          </h1>
        </div>
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
        <label htmlFor="password" className="text-lg">
          Password(6+ characters)
        </label>
        <input
          className="p-3 text-cyan-50 rounded-md"
          type="password"
          name="password"
          max="6"
          onChange={(event) =>
            setCredentials({ ...credentails, password: event.target.value })
          }
        />
        <div className="flex flex-col justify-center">
          <button
            className="border-2 border-black w-full p-2.5 mb-3 rounded-3xl hover:bg-teal-400 hover:text-"
            type="button"
            onClick={register}
          >
            Register
          </button>

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
