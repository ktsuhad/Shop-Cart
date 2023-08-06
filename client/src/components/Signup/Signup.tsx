import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setname] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [confirmPassword, setconfirmPassword] = useState<string>("");
  const [visible, setvisible] = useState<boolean>(false);
  const [avatar, setavatar] = useState(null);

  //handleFileinputChange
  const handleFileinputChange = (e: any) => {
    const file = e.target.files[0];
    setavatar(file);
  };

  return (
    <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div className="bg-wh px-6 py-8  md:border rounded-lg md:border-gray-400  w-full">
        <h1 className="mb-8 text-3xl text-center font-bold  text-blue-500">
          Sign up
        </h1>
        <input
          type="text"
          className="block border border-gray-500 focus:ring-1 placeholder:text-base outline-none ring-0  w-full p-3 rounded mb-4 bg-transparent text-gray-300"
          name="fullname"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />

        <input
          type="email"
          className="block border border-gray-500  focus:ring-1 placeholder:text-base outline-none ring-0  w-full p-3 rounded mb-4 bg-transparent text-gray-300"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />

        <div className="relative">
          <input
            type={visible ? "text" : "password"}
            className="block border border-gray-500 focus:ring-1 placeholder:text-base outline-none ring-0  w-full p-3 rounded mb-4 bg-transparent text-gray-300"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          {visible ? (
            <Visibility
              color="success"
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setvisible(false)}
            />
          ) : (
            <VisibilityOff
              color="success"
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setvisible(true)}
            />
          )}
        </div>

        <input
          type="password"
          className="block border border-gray-500 focus:ring-1 placeholder:text-base outline-none ring-0  w-full p-3 rounded mb-4 bg-transparent text-gray-300"
          name="confirm_password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
        />

        {/* image upload */}
        <div className="my-8 text-white flex items-center gap-5">
          <span className="inline-block h-12 w-12 rounded-full overflow-hidden">
            {avatar ? (
              <img src={URL.createObjectURL(avatar)} alt="avatar" className="w-full h-full object-cover "/>
            ) : (
              <Avatar />
            )}
          </span>
          <label
            htmlFor="file-input"
            className="flex items-center justify-center border border-gray-400 px-5 py-2 rounded-md text-sm font-medium cursor-pointer"
          >
            <span>Upload a Photo</span>
            <input
              type="file"
              name="avatar"
              id="file-input"
              accept=".jpg,.jpeg,.png"
              className="sr-only"
              onChange={handleFileinputChange}
            />
          </label>
        </div>
        <Button
          type="submit"
          variant="contained"
          size="large"
          className="w-full"
        >
          Create Account
        </Button>

        <div className="text-center text-sm text-grey-dark mt-6 text-gray-400">
          By signing up, you agree to the
          <a
            className="no-underline border-b border-grey-dark text-grey-dark"
            href="#"
          >
            Terms of Service
          </a>{" "}
          and
          <a
            className="no-underline border-b border-gray-400 text-gray-400"
            href="#"
          >
            Privacy Policy
          </a>
        </div>
      </div>

      <div className="text-grey-dark mt-6 text-gray-400">
        Already have an account?
        <Link to="/login" className="text-blue-400">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Signup;
