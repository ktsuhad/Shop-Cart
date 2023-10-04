import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "../../Features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/Store/store";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [toggleVisible, settoggleVisible] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is Required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await dispatch(login(values));
      if (isAuthenticated) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again.");
    }
  };

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

              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                {loading ? (
                  <LoadingSpinner color="secondary" size={20} />
                ) : (
                  "Sign in"
                )}
              </Button>

              <p className="text-sm mt-2 tracking-wide">
                Don't have an account?
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
