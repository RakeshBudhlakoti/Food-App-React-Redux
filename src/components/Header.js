import { LOGO_URL } from "../utils/constants";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

function Header() {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  const handleLoginClick = () => {
    setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login");
  };

  const onlineStatus = useOnlineStatus(); // Custom Hook for online status

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="FoodVillage" />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            Online Status:{onlineStatus ? <span>&#128994;</span> : <span>&#128308;</span>}
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <button className="login" onClick={handleLoginClick}>
              {btnNameReact}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
