import "./projects.css";
import { AiOutlineEye } from "react-icons/ai"
import project1 from "../../images/project1final.jpg"
import project2 from "../../images/savorhub.png";
import project4 from "../../images/project4.png";
import project5 from "../../images/project5.jpg";
import project6 from "../../images/project6.jpg";
import project7 from "../../images/project7.jpg";
import project8 from "../../images/project8.png";
import project9 from "../../images/main-logo.png"
import project10 from "../../images/project10.png";
import project11 from "../../images/project11.png";
import project12 from "../../images/project12.png";
import project13 from "../../images/light.png"
import project14 from "../../images/rai-lofi.png"
import project15 from "../../images/profile.png"
import project16 from "../../images/terminal.png"

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Projects = () => {

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <section id="projects" data-aos="fade-up">
      <h5>My Recent Work</h5>
      <h2>Projects</h2>

      <div className="container project_container">
        <article className="project_item">
          <div className="project_item-image">
            <img src={project1} alt="" />
          </div>
          <h3>Weather</h3>
          <a
            href="https://weather-web.ikraiyan.repl.co/"
            className="btn btn-primary"
          >
            <AiOutlineEye />
          </a>
        </article>
        <article className="project_item">
          <div className="project_item-image">
            <img src={project2} alt="" />
          </div>
          <h3>SavorHub</h3>
          <a
            href="https://savorhub.vercel.app"
            className="btn btn-primary"
          >
            <AiOutlineEye />
          </a>
        </article>
        <article className="project_item">
          <div className="project_item-image">
            <img src={project4} alt="" />
          </div>
          <h3>Space Invaders</h3>
          <a
            href="https://invaders.ikraiyan.repl.co/"
            className="btn btn-primary"
          >
            <AiOutlineEye />
          </a>
        </article>
        <article className="project_item">
          <div className="project_item-image">
            <img src={project5} alt="" />
          </div>
          <h3>Covid 19</h3>
          <a
            href="https://covid19.ikraiyan.repl.co/"
            className="btn btn-primary"
          >
            <AiOutlineEye />
          </a>
        </article>
        <article className="project_item">
          <div className="project_item-image">
            <img src={project6} alt="" />
          </div>
          <h3>Smart City</h3>
          <a
            href="https://smart-city.ikraiyan.repl.co/"
            className="btn btn-primary"
          >
            <AiOutlineEye />
          </a>
        </article>
        <article className="project_item">
          <div className="project_item-image">
            <img src={project7} alt="" />
          </div>
          <h3>Space</h3>
          <a href="https://space.ikraiyan.repl.co/" className="btn btn-primary">
            <AiOutlineEye />
          </a>
        </article>
        <article className="project_item">
          <div className="project_item-image">
            <img src={project8} alt="" />
          </div>
          <h3>Typing Test</h3>
          <a
            href="https://typing-test.ikraiyan.repl.co/"
            className="btn btn-primary"
          >
            <AiOutlineEye />
          </a>
        </article>
        <article className="project_item">
          <div className="project_item-image">
            <img src={project9} alt="" />
          </div>
          <h3>Biotech Concern</h3>
          <a
            href="https://biotech-concern.vercel.app"
            className="btn btn-primary"
          >
            <AiOutlineEye />
          </a>
        </article>
        <article className="project_item">
          <div className="project_item-image">
            <img src={project13} alt="" height="300px"/>
          </div>
          <h3>Light Yagami</h3>
          <a
            href="https://light-yagami.vercel.app"
            className="btn btn-primary"
          >
            <AiOutlineEye />
          </a>
        </article>
        <article className="project_item">
          <div className="project_item-image">
            <img src={project14} alt="" />
          </div>
          <h3>Rai Lofi</h3>
          <a
            href="https://rai-lofi.vercel.app/"
            className="btn btn-primary"
          >
            <AiOutlineEye />
          </a>
        </article>
        <article className="project_item">
          <div className="project_item-image">
            <img src={project15} alt="" />
          </div>
          <h3>Discord</h3>
          <a
            href="https://discord-ikraiyan.vercel.app/"
            className="btn btn-primary"
          >
            <AiOutlineEye />
          </a>
        </article>
        <article className="project_item">
          <div className="project_item-image">
            <img src={project16} alt="" />
          </div>
          <h3>RaiTerm</h3>
          <a
            href="https://raiterm.vercel.app/"
            className="btn btn-primary"
          >
            <AiOutlineEye />
          </a>
        </article>
        <article className="project_item">
          <div className="project_item-image">
            <img src={project10} alt="" />
          </div>
          <h3>Helper 2.0</h3>
          <a
            href="https://discord.com/oauth2/authorize?client_id=816596547801972777&permissions=1380201851926&scope=applications.commands%20bot"
            className="btn btn-primary"
          >
            <AiOutlineEye />
          </a>
        </article>
        <article className="project_item">
          <div className="project_item-image">
            <img src={project11} alt="" />
          </div>
          <h3>Rai 2.0</h3>
          <a
            href="https://discord.com/oauth2/authorize?client_id=908415070235664416&permissions=275187362816&scope=bot%20applications.commands"
            className="btn btn-primary"
          >
            <AiOutlineEye />
          </a>
        </article>
        <article className="project_item">
          <div className="project_item-image">
            <img src={project12} alt="" />
          </div>
          <h3>Amano San</h3>
          <a
            href="https://discord.com/oauth2/authorize?client_id=895733874246680626&permissions=275049212992&scope=bot%20applications.commands"
            className="btn btn-primary"
          >
            <AiOutlineEye />
          </a>
        </article>
      </div>
    </section>
  );
};

export default Projects;
