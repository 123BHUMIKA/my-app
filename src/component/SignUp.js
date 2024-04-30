import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { auth, getAuth } from "./FireBase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setName, setEmail, setPassword } from "./slice.js";
import { setUserData } from "./slice2.js";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./FireBase";

function SignUp() {
  const { name, email, password } = useSelector((state) => state.signup);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("userData", JSON.stringify(user));
        dispatch(setUserData(user));
        console.log(user);
        const users = doc(db, "users", user.uid);
        setDoc(users, {
          name: name,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <div className="register">
      {false ? (
        <div className="loading"></div>
      ) : (
        <div className="col-1">
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "8%",
            }}
          >
            Sign Up
          </h2>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "-1%",
              marginBottom: "2%",
            }}
          >
            To make your time productive
          </span>

          <div id="form" className="flex flex-col">
            <div id="NameLabel">
              <label id="fName1">
                First Name<span style={{ color: "red" }}>*</span>
              </label>
              <label id="fName2" style={{ margin: "0 180px" }}>
                Last Name{" "}
              </label>
            </div>

            <div id="name">
              <input
                id="Name"
                type="text"
                value={name}
                style={{
                  borderStyle: "solid",
                  borderColor: "#bbbbbb",
                  borderRadius: "3px",
                }}
                onChange={(e) => {
                  dispatch(setName(e.target.value));
                }}
              />

              <input
                id="Name2"
                type="text"
                style={{
                  borderStyle: "solid",
                  borderColor: "#bbbbbb",
                  borderRadius: "3px",
                }}
              />
              <p id="nameError"></p>
            </div>

            <label id="mail">
              Email Address<span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="Mail"
              type="text"
              value={email}
              style={{
                borderStyle: "solid",
                borderColor: "#bbbbbb",
                borderRadius: "3px",
              }}
              onChange={(e) => {
                dispatch(setEmail(e.target.value));
              }}
            />
            <p id="mailError"></p>
            <label id="password">
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="Password"
              type="text"
              value={password}
              style={{
                borderStyle: "solid",
                borderColor: "#bbbbbb",
                borderRadius: "3px",
              }}
              onChange={(e) => {
                dispatch(setPassword(e.target.value));
              }}
            />
            <p id="passwordError"></p>

            <button
              className="btn"
              id="submit"
              onClick={(e) => {
                onSubmit();
              }}
            >
              Sign Up
            </button>

            <footer id="footer">
              <p>
                Already Have An Account? <Link to="/SignInAccount">login</Link>
              </p>
            </footer>

            <exampleaxios />
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
