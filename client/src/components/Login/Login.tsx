import { Button } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visible, setvisible] = useState<boolean>(false);
  return (
    <div className="container mx-auto px-6">
      <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
        {/* <!-- Left column container with background--> */}
        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="w-full"
            alt="Phone image"
          />
        </div>

        {/* <!-- Right column container with form --> */}
        <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
          <form>
            {/* <!-- Email input --> */}
            <label className="  max-w-[90%] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8]  dark:text-neutral-200 dark:peer-focus:text-primary">
              Email address
            </label>
            <div className="mb-6">
              <input
                type="email"
                value={email}
                className="peer text-white block min-h-[auto] w-full rounded border border-gray-500 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 "
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* <!-- Password input --> */}
            <div className="mb-6">
              <label className=" mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] dark:text-neutral-200 dark:peer-focus:text-primary">
                Password
              </label>
              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  value={password}
                  className="peer text-white block min-h-[auto] w-full rounded border border-gray-500 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                  id="exampleFormControlInput33"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {visible ? (
                  <Visibility
                    color="success"
                    className="absolute top-3 right-5 cursor-pointer"
                    onClick={() => setvisible(false)}
                  />
                ) : (
                  <VisibilityOff
                    color="success"
                    className="absolute top-3 right-5 cursor-pointer"
                    onClick={() => setvisible(true)}
                  />
                )}
              </div>
            </div>

            {/* <!-- Remember me checkbox --> */}
            <div className="mb-6 flex items-center justify-between">
              <div className="">
                <input className="mr-2 cursor-pointer" type="checkbox" />
                <label className="hover:cursor-pointer text-neutral-500">
                  Remember me
                </label>
              </div>

              {/* <!-- Forgot password link --> */}
              <a
                href="#!"
                className="text-blue-400 text-sm transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
              >
                Forgot password?
              </a>
            </div>

            {/* <!-- Submit button --> */}
            <Button variant="contained" className="w-full">Sign in</Button>

            {/* Not have any account? */}
            <p className="text-white text-sm mt-2 tracking-wide">
              Not have any account? <Link to="/signup" className="text-blue-400 text-base">Sign Up</Link>
            </p>
            {/* <!-- Divider --> */}
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold text-neutral-200">
                OR
              </p>
            </div>

            {/* <!-- Social login buttons --> */}
            <div className="flex flex-col items-center gap-4">
              <Button
                variant="contained"
                size="large"
                color="inherit"
                className="w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
                Continue with Facebook
              </Button>

              {/* <!-- Twitter --> */}

              <Button
                variant="contained"
                size="large"
                color="inherit"
                className="w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
                Continue with Twitter
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
