import { LOGO_URL } from "../utils/constants";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

function Header() {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  const handleLoginClick = () => {
    setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login");
  };

  const onlineStatus = useOnlineStatus(); // Custom Hook for online status

  const {loggedInUser} = useContext(UserContext);

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          {" "}
          <img className="logo" src={LOGO_URL} alt="FoodVillage" />{" "}
        </Link>
      </div>
      <div className="nav-items">
        <ul>
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
            <Link to="/grocery">Grocery</Link>
          </li>
         
          <li>
          {
            !loggedInUser ? <Link to="/login">Login</Link> : <Link to="#">{loggedInUser}</Link>
          }
          </li>
          {/* <li>
            <button className="login" onClick={handleLoginClick}>
              {btnNameReact}
            </button>
            {onlineStatus ? <span>&#128994;</span> : <span>&#128308;</span>}
          </li> */}
          {/* <li><Link to="#">{loggedInUser}</Link></li> */}
        </ul>
      </div>
    </div>
  );
}

export default Header;
