import "./footer.css";
import { BsLinkedin, BsInstagram, BsGithub, BsFacebook } from "react-icons/bs";

const Footer = () => {
    return (
      <footer id="footer">
        <a href="#" className="footer_logo">
          Joynal Bokhsho
        </a>

        <ul className="permalinks">
          <li>
            <a href="#">Home</a> 
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#discord">Discord</a>
          </li>
          <li>
            <a href="#experience">Experiences</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>

        <div className="footer_socials">
          <a href="https://www.linkedin.com/in/joynalbokhsho">
            <BsLinkedin />
          </a>
          <a href="https://instagram.com/jo_jo.503">
            <BsInstagram />
          </a>
          <a href="https://github.com/joynalbokhsho">
            <BsGithub />
          </a>
          <a href="https://www.facebook.com/joynal.official">
            <BsFacebook />
          </a>
        </div>

        <div className="footer_copyright">
          <small>&copy; Joynal Bokhsho. All Rights Reserved</small>
        </div>
      </footer>
    );
};

export default Footer;
