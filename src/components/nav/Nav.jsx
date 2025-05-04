import "./nav.css";
import {
  AiOutlineHome,
  AiOutlineUser,
} from "react-icons/ai";
import { BiBook, BiMessageSquareDetail } from "react-icons/bi";
import { FaDiscord } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-scroll"

const Nav = () => {
  const [activeNav, setActiveNav] = useState("#")

    return (
      <nav>
        <Link
          to="home"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          onClick={() => setActiveNav("#")}
          className={activeNav === "#" ? "active" : ""}
        >
          <AiOutlineHome />
        </Link>
        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          onClick={() => setActiveNav("#about")}
          className={activeNav === "#about" ? "active" : ""}
        >
          <AiOutlineUser />
        </Link>
        <Link
          to="discord"
          spy={true}
          smooth={true}
          offset={-20}  // Adjusted offset for better positioning
          duration={500}
          onClick={() => setActiveNav("#discord")}
          className={activeNav === "#discord" ? "active" : ""}
          activeClass="active"  // Added explicit activeClass
          onSetActive={() => setActiveNav("#discord")}  // Set active on scroll
        >
          <FaDiscord />
        </Link>
        <Link
          to="experience"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          onClick={() => setActiveNav("#experience")}
          className={activeNav === "#experience" ? "active" : ""}
        >
          <BiBook />
        </Link>
        <Link
          to="contact"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          onClick={() => setActiveNav("#contact")}
          className={activeNav === "#contact" ? "active" : ""}
        >
          <BiMessageSquareDetail />
        </Link>
      </nav>
    );
}

export default Nav;
