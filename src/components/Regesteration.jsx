import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

const Registration = () => {
  const navigate = useNavigate();
  const lognHandler = () => {
    navigate("/login");
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/signup",
          values
        );

        console.log("Registration successful:", response.data);

        resetForm({
          values: {
            name: "",
            email: "",
            password: "",
          },
        });

        // Redirect to "/login" after successful registration
        navigate("/login");
      } catch (error) {
        console.error("Error submitting registration: ", error.message);
        toast.error("Registration failed. Please try again.");
      }
    },
  });

  return (
    <div className="feedback-container">
      <h2>Registration Form</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder=" Name"
          />
        </label>
        {formik.touched.name && formik.errors.name && (
          <div className="error-message">{formik.errors.name}</div>
        )}
        <label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="  Email"
          />
        </label>
        {formik.touched.email && formik.errors.email && (
          <div className="error-message">{formik.errors.email}</div>
        )}
        <label>
          <input
            type="password"
            name="password"
            value={formik.values.pass}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder=" Password"
          />
        </label>
        {formik.touched.password && formik.errors.password && (
          <div className="error-message">{formik.errors.password}</div>
        )}
        <button type="submit">Register</button>
        <span>or</span>
        <button onClick={lognHandler}>Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Registration;
