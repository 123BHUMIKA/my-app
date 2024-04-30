import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();
  useState(() => {
    let userData = localStorage.getItem("userData");
    if (!userData ) {
      navigate("/signInAccount");
    }
    
});
  
  return (
    <div>
      <Component/>
    </div>
  );
}
export default Protected;
