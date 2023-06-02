import React from 'react'
import Custominput from '../components/Custominput'
import { Link } from 'react-router-dom'

const Login = () => {
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
        <form action="">
          <Custominput type='text' label="Email Address" id="email" />
          <Custominput type='password' label="Password" id="password" />
          <div className="mb-3 text-end ">
            <Link to="forgot-password" className="" style={{ color: "#342c2c" }}>
              Forgot Password?
            </Link>
          </div>
          <Link
            to="/admin"
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5 "
            style={{ background: "#282625" }}
            type="submit"
          >
            Login
          </Link>
        </form>

      </div>
    </div>
  )
}

export default Login