import { LOGO_URL } from "../utils/constants";
import React, { useState } from 'react';

function Header() {
  const [btnNameReact, setBtnNameReact] = useState('Login');

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
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Cart</a></li>
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