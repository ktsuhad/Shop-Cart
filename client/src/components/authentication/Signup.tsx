import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const [avatar, setavatar] = useState<File | null>(null);

  const [visible, setvisible] = useState<boolean>(false);

  const navigate = useNavigate();
  //handleFileinputChange
  const handleFileinputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setavatar(file || null);
  };

  //inital Values
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  };

  //validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "passwords match must").required("Confirm Password is required"),
  });

  //handleSubmit
  const handleSubmit = async (values: any) => {
    try {
      const newFormData = new FormData();

      if (avatar) {
        newFormData.append("avatar", avatar);
      }
      newFormData.append("name", values.name);
      newFormData.append("email", values.email);
      newFormData.append("password", values.password);

      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/signup`,
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data && data.success) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div className="bg-wh px-6 py-8  md:border rounded-lg md:border-gray-400  w-full">
        <h1 className="mb-8 text-3xl text-center font-bold  text-blue-500">
          Sign up
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              type="text"
              className="block border border-gray-500 focus:ring-1 placeholder:text-base outline-none ring-0  w-full p-3 rounded mb-4 bg-transparent text-gray-300"
              name="name"
              placeholder="Full Name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500"
            />

            <Field
              type="email"
              className="block border border-gray-500  focus:ring-1 placeholder:text-base outline-none ring-0  w-full p-3 rounded mb-4 bg-transparent text-gray-300"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />

            <div className="relative">
              <Field
                type={visible ? "text" : "password"}
                className="block border border-gray-500 focus:ring-1 placeholder:text-base outline-none ring-0  w-full p-3 rounded mb-4 bg-transparent text-gray-300"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
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

            <Field
              type="password"
              className="block border border-gray-500 focus:ring-1 placeholder:text-base outline-none ring-0  w-full p-3 rounded mb-4 bg-transparent text-gray-300"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500"
            />

            {/* image upload */}
            <div className="my-8 text-white flex items-center gap-5">
              <span className="inline-block h-12 w-12 rounded-full overflow-hidden">
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="avatar"
                    className="w-full h-full object-cover "
                  />
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
          </Form>
        </Formik>
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
