import { useState, useEffect } from "react";
import "./about.css"
import Me from "../../images/main-pfp-blue-transparent.png"
import { FaAward, FaRobot } from "react-icons/fa";
import { TbWorld } from "react-icons/tb"
import AOS from "aos";
import "aos/dist/aos.css";
import { subscribeToLanyardUpdates, getDiscordAvatarUrl, getCustomData, getDiscordStatus } from "../../services/LanyardAPI";

const About = () => {
  const [aboutMeText, setAboutMeText] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(Me);
  const [isLoading, setIsLoading] = useState(true);
  const [discordStatus, setDiscordStatus] = useState("offline");

  useEffect(() => {
    AOS.init({ duration: 3000 });
    
    // Subscribe to Lanyard updates
    const unsubscribe = subscribeToLanyardUpdates((data) => {
      // Get custom about me text from Lanyard KV data
      const aboutMe = getCustomData(data, 'aboutme');
      if (aboutMe) {
        setAboutMeText(aboutMe);
        setIsLoading(false);
      }
      
      // Update Discord avatar URL
      const discordAvatar = getDiscordAvatarUrl(data);
      if (discordAvatar) {
        setAvatarUrl(discordAvatar);
      }
      
      // Update Discord status
      const status = getDiscordStatus(data);
      if (status) {
        setDiscordStatus(status);
      }
    });

    // Clean up subscription when component unmounts
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Default about text as fallback
  const defaultAboutText = `Waiting for API to load...`;

  return (
    <section id="about" data-aos="fade-up">
      <h5>Get to know</h5>
      <h2>About Me</h2>
      <div className="container about_container">
        <div className={`about_me status-bg-${discordStatus}`}>
          <div className="about_me-image">
            <img src={avatarUrl} alt="Me" className="about-profile-pic" />
          </div>
        </div>
        <div className="about_content">
          <div className="about_cards">
            <article className="about_card">
              <FaAward className="about_icon" />
              <h5>Education</h5>
              <small>Daffodil International University</small>
              <small>Bachelor of Real Estate</small>
            </article>
            <article className="about_card">
              <FaRobot className="about_icon" />
              <h5>Gaming</h5>
              <small>Minecraft, Valorant, GTA V Etc.</small>
            </article>
            <article className="about_card">
              <TbWorld className="about_icon" />
              <h5>Web Development</h5>
              <small>10+ Completed</small><br></br>
              <small>Gonna Show Later</small>
            </article>
          </div>
          {isLoading ? (
            <p>{defaultAboutText}</p>
          ) : (
            <div 
              className="about-text"
              dangerouslySetInnerHTML={{ __html: aboutMeText }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default About