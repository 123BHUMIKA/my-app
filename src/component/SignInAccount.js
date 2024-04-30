import React, { useState } from "react";
import "./SignInAccount.css";
import { Link } from "react-router-dom";
import "./SignUp.js";

import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from "./FireBase";
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./slice2.js";
import { setEmail,setPassword } from "./slice1.js";

function SignInAccount() {
  const {  email, password } = useSelector((state) => state.signin);
  const dispatch = useDispatch();

const onLogin = (e) => {
  
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("userData",JSON.stringify(user));
        dispatch(setUserData(user));
        console.log(user);
    })
  }

  return (
    <div>
      <header
        class="header"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",
          marginLeft: "5%",
        }}
      >
        <h1>Sign In To Your Account</h1>
        <p style={{ marginTop: "-1%" }}>add to your task</p>
      </header>
      <div>
        <div class="innerBox2">
          <label id="mailId">
            Email Address <span style={{ color: "red" }}>*</span>{" "}
          </label>
          <br />
          <input
            id="inputMail"
            type="text"
            value={email}
            onChange={(e) => {
              dispatch(setEmail(e.target.value));
            }}
            style={{
              borderStyle: "solid",
              borderColor: "#bbbbbb",
              borderRadius: "3px",
              borderHeight: "20px",
            }}
          ></input>
          <br />

          <label id="passwordId">
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <br />
          <input
            id="inputPassword"
            type="text"
            value={password}
            onChange={(e) => {
              dispatch(setPassword(e.target.value));
            }}
            style={{
              borderStyle: "solid",
              borderColor: "#bbbbbb",
              borderRadius: "3px",
            }}
          ></input>
          <br />
          <br />

          <div
            style={{
              display: "flex",
              height: "20px",
              alignItems: "center",
              marginTop: "-5%",
            }}
          >
            <input
              id="check"
              type="checkbox"
              value="Remember"
              style={{ width: 20, height: 20 }}
            />
            <span style={{ flexDirection: "column" }}>Remember</span>
          </div>
          <button
            onClick={(e) => {
                onLogin();
            }}
            style={{
              borderStyle: "solid",
              borderColor: "#bbbbbb",
              borderRadius: "3px",
              color: "white",
              backgroundColor: "rgb(86,152,252)",
              width: "50%",
              height: "5vh",
              marginLeft: "23%",
              marginTop: "5%",
              marginBottom: "8%",
            }}
          >
            SignIn
          </button>
          <footer id="footer">
            <p>
              Register here? <Link to="/SignUp">Register</Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SignInAccount