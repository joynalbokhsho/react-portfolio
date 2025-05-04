import "./footer.css";
import { BsLinkedin, BsInstagram, BsGithub, BsFacebook } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer id="footer">
        <div className="footer_container">
          <div className="footer_left">
            <a href="#" className="footer_logo">
              Joynal Bokhsho
            </a>
            <p className="footer_tagline">
              Crafting digital experiences with passion and precision
            </p>
            
            <div className="footer_socials">
              <a href="https://www.linkedin.com/in/joynalbokhsho" aria-label="LinkedIn" className="social_icon">
                <BsLinkedin />
              </a>
              <a href="https://instagram.com/jo_jo.503" aria-label="Instagram" className="social_icon">
                <BsInstagram />
              </a>
              <a href="https://github.com/joynalbokhsho" aria-label="GitHub" className="social_icon">
                <BsGithub />
              </a>
              <a href="https://www.facebook.com/joynal.official" aria-label="Facebook" className="social_icon">
                <BsFacebook />
              </a>
            </div>
          </div>
          
          <div className="footer_right">
            <div className="footer_links">
              <div className="footer_links_column">
                <h4>Navigation</h4>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#discord">Discord</a></li>
                </ul>
              </div>
              
              <div className="footer_links_column">
                <h4>More</h4>
                <ul>
                  <li><a href="#experience">Experience</a></li>
                  <li><a href="#contact">Contact</a></li>
                  <li><a href="#projects">Projects</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer_bottom">
          <div className="footer_copyright">
            <small>&copy; {currentYear} Joynal Bokhsho. Made with <FaHeart className="heart-icon" /> All Rights Reserved</small>
          </div>
        </div>
      </footer>
    );
};

export default Footer;
