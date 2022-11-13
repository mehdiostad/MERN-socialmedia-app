import React from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useState } from "react";
import {useDispatch, useSelector } from "react-redux"
import { logIn, signUp } from "../../Actions/AuthAction";
const Auth = () => {
  const dispatch = useDispatch()
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });
  const [confirmPass, setConfirmPass] = useState(true);
  const loading = useSelector((state)=> state.authReducer.loading)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
     data.password === data.confirmpass ? dispatch(signUp(data)) : setConfirmPass(false)
    }else{
      dispatch(logIn(data))
    }
  };
  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  };

  return (
    <div className="Auth">
      {/* Left Side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="WebName">
          <h1>MEHDI Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      {/* Right side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                name="firstname"
                className="infoInput"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                className="infoInput"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}
          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                placeholder="Confirm Password"
                name="confirmpass"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              alignSelf: "flex-end",
              fontSize: "12px",
              marginRight: "15px",
            }}
          >
            * Confirm Password is not same.
          </span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignUp((prev) => !prev)
                  resetForm()
              }}
            >
              {isSignUp
                ? "Already have an account? Login!"
                : "Don't have an account? Signup."}
            </span>
          </div>
          <button type="submit" className="button infoButton" disabled={loading}>
            {loading?"loading...": isSignUp ? "Signup" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};


export default Auth;
