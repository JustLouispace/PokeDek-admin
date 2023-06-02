import React from 'react'
import Custominput from '../components/Custominput'


const Resetpassword = () => {
  return (
    <div className="py-5" style={{ background: "#282625", minHeight: "100vh" }} >
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="py-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h2 className="text-center title">Reset your Password</h2>
        <p className="text-center">Enter your New Password..</p>
        <form action="">
          <Custominput type='password' label="New password" id="password" />
          <Custominput type='password' label="Confirm password" id="confirmpassword" />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5 "
            style={{ background: "#282625" }}
            type="submit"
          >
            Reset Password
          </button>
        </form>

      </div>
    </div>
  )
}

export default Resetpassword