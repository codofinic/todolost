import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/login",
          values
        );

        console.log("Login successful:", response.data);

        resetForm({
          values: {
            email: "",
            password: "",
          },
        });

        // Redirect to "/user" after successful login
        navigate("/user");
      } catch (error) {
        console.error("Error logging in: ", error.message);
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
      }
    },
  });

  return (
    <div className="login-container">
      <h2>Login Form</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        {formik.touched.email && formik.errors.email && (
          <div className="error-message">{formik.errors.email}</div>
        )}

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        {formik.touched.password && formik.errors.password && (
          <div className="error-message">{formik.errors.pass}</div>
        )}

        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
