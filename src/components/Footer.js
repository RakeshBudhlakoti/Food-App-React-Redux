import { LOGO_URL } from "../utils/constants";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={LOGO_URL} alt="FoodVillage" />
        </div>
        <div className="footer-info">
          <p>&copy; 2023 FoodVillage. All rights reserved.</p>
          <p>Contact us at <a href="mailto:info@foodvillage.com">info@foodvillage.com</a></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;