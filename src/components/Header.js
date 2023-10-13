import { LOGO_URL } from "../utils/constants";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Header() {
  const [btnNameReact, setBtnNameReact] = useState('Login');

  useEffect(() =>{
    console.log('useEffect Called')
  })

  const handleLoginClick = () => {
    setBtnNameReact(btnNameReact === 'Login' ? 'Logout' : 'Login');
  };

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="FoodVillage" />
      </div>
      <div className="nav-items">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
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