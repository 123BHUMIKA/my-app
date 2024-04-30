import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignInAccount from "./component/SignInAccount";
import SignUp from "./component/SignUp";
import Profile from "./component/Profile";
import { useLayoutEffect } from "react";
import { setUserData } from "./component/slice2";
import { useDispatch, useSelector } from "react-redux";
import Protected from "./Protected";

const App = () => {
  console.log("iii");
  const { userData } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const getData = async () => {
      const res = localStorage.getItem("userData");
      if (res) {
        const resData = JSON.parse(res);
        dispatch(setUserData(resData));
      }
    };
    getData();
  }, []);
    return (
      <BrowserRouter>
  
        <Routes>
          <Route
            path="/"
            element={
              userData.uid? (
                <Navigate to={"/Profile"} />
              ) : (
                <Navigate to={"/signInAccount"} />
              )
            }
          />
          <Route
            path="*"
            element={
              userData.uid? (
                <Navigate to={"/Profile"} />
              ) : (
                <Navigate to={"/signInAccount"} />
              )
            }
          />
          {!userData.uid && (
            <>
              <Route path="/signInAccount" element={<SignInAccount />} />
              <Route path="/signUp" element={<SignUp />} />
            </>
          )}
          {userData.uid && (
            <>
              <Route
                path="/Profile"
                element={<Protected Component={Profile} />}
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    )}
          
export default App;
