import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "../../Features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/Store/store";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [toggleVisible, settoggleVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state: RootState) => state.auth.loading);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  console.log(isAuthenticated);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is Required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      dispatch(login(values));
    } catch (error) {
      console.log(error);
    }
  };

  if (isAuthenticated) {
    navigate("/");
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="container mx-auto px-6">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            {/* //left */}
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone"
              />
            </div>
            {/* Right */}

            <div className="md:w-8/12 lg:ml-6 lg:w-5/12 ">
              <h1 className="text-center font-bold text-2xl text-blue-600 pb-7">
                LogIn
              </h1>

              <Field
                type="email"
                name="email"
                as={TextField}
                label="Email address"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />

              <div className="relative">
                <Field
                  type={`${toggleVisible ? "text" : "password"}`}
                  name="password"
                  label="Password"
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <span className="absolute top-7 right-4">
                  {toggleVisible ? (
                    <Visibility
                      color="success"
                      className="cursor-pointer"
                      onClick={() => settoggleVisible(false)}
                    />
                  ) : (
                    <VisibilityOff
                      color="success"
                      className="cursor-pointer"
                      onClick={() => settoggleVisible(true)}
                    />
                  )}
                </span>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <Button type="submit" variant="contained" fullWidth>
                {loading ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  "Sign in"
                )}
              </Button>

              <p className="text-sm mt-2 tracking-wide">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-400 text-base">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default Login;
