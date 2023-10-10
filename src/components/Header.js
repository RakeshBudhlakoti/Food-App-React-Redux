import { LOGO_URL } from "../utils/constants";
import { useState } from "react";

const Header = () => {
  let btnName = "Login";
  let [btnNameReact,setBtnNameReact] = useState("Login")
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="FoodVillage" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Cart</li>
          <ll>
            <button
              class="login"
              onClick={() => {
                setBtnNameReact("Logout");
              }}
            >
              {btnNameReact}
            </button>
          </ll>
        </ul>
      </div>
    </div>
  );
};
export default Header;
