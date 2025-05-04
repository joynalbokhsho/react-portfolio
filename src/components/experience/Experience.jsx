import "./experience.css";
import { BsCheck2Circle } from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Experience = () => {

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

    return (
      <section id="experience" data-aos="fade-up">
        <h5>What Skills I Have</h5>
        <h2>My Experience</h2>

        <div className="container experience_container">
          <div className="experience_all">
            <h2>Language and Frameworks</h2>
            <div className="experience_content">
              <article className="experience_details">
                <BsCheck2Circle className="experience_details-icon" />
                <div>
                  <h4>HTML 5</h4>
                  <small className="text-light">Experienced</small>
                </div>
              </article>
              <article className="experience_details">
                <BsCheck2Circle className="experience_details-icon" />
                <div>
                  <h4>CSS 3</h4>
                  <small className="text-light">Intermediate</small>
                </div>
              </article>
              <article className="experience_details">
                <BsCheck2Circle className="experience_details-icon" />
                <div>
                  <h4>JavaScript</h4>
                  <small className="text-light">Professional</small>
                </div>
              </article>
              <article className="experience_details">
                <BsCheck2Circle className="experience_details-icon" />
                <div>
                  <h4>React JS</h4>
                  <small className="text-light">Intermediate</small>
                </div>
              </article>
              <article className="experience_details">
                <BsCheck2Circle className="experience_details-icon" />
                <div>
                  <h4>Node JS</h4>
                  <small className="text-light">Experienced</small>
                </div>
              </article>
              <article className="experience_details">
                <BsCheck2Circle className="experience_details-icon" />
                <div>
                  <h4>Tailwind CSS</h4>
                  <small className="text-light">Intermediate</small>
                </div>
              </article>
              <article className="experience_details">
                <BsCheck2Circle className="experience_details-icon" />
                <div>
                  <h4>Discord JS</h4>
                  <small className="text-light">Professional</small>
                </div>
              </article>
              <article className="experience_details">
                <BsCheck2Circle className="experience_details-icon" />
                <div>
                  <h4>Mongo DB</h4>
                  <small className="text-light">Intermediate</small>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Experience;
