import { LOGO_URL } from "../utils/constants";

function Footer() {
  return (
    <div className="footer">
      Created By<i className="fa fa-solid fa-heart"></i>
      <a
        href="https://www.linkedin.com/in/rakesh-budhlakoti/"
        target="_blank"
        title="Rakesh Budhlakoti's Linkedin Profile"
      >
        Rakesh Budhlakoti
      </a>
      <i className="fa fa-solid fa-copyright"></i>2023
      <strong>
        Food<span>Villa</span>
      </strong>
    </div>
  );
}

export default Footer;
