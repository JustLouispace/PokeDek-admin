import React, { useEffect } from "react";
import Custominput from "../components/Custominput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });


  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading]);
  return (
    <div className="py-5" style={{ background: "#282625", minHeight: "100vh" }} >
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="py-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h2 className="text-center title">Login</h2>
        <p className="text-center">Login to your account to continue.</p>
        <form action="" onSubmit={formik.handleSubmit}>
          <Custominput
            type='text'
            name="email"
            label="Email Address"
            id="email"
            onCh={formik.handleChange("email")}
            onBl={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>
          <Custominput
            type='password'
            name="password"
            label="Password"
            id="password"
            onCh={formik.handleChange("password")}
            onBl={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <div className="mb-3 text-end ">
            <Link to="forgot-password" className="" style={{ color: "#342c2c" }}>
              Forgot Password?
            </Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5 "
            style={{ background: "#282625" }}
            type="submit"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  )
}

export default Login