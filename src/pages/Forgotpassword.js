import React from 'react'
import Custominput from '../components/Custominput'
import { Link } from 'react-router-dom'

const Forgotpassword = () => {
  return (
    <div className="py-5" style={{ background: "#282625", minHeight: "100vh" }} >
      <br />
      <br />
      <br />
      <div className="py-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h2 className="text-center title">Forgot Password</h2>
        <p className="text-center">Please Enter your Email..</p>
        <form action="">
          <Custominput type='text' label="Email Address" id="email" />
          <Link
            to="/reset-password"
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5 "
            style={{ background: "#282625" }}
            type="submit"
          >
            Send
          </Link>
        </form>

      </div>
    </div>
  )
}

export default Forgotpassword