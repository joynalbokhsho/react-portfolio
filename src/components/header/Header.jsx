import "./header.css";
import Me from "../../images/main-pfp-blue.png" // Kept as fallback
import HeaderSocials from "./HeaderSocials";
import defaultCV from "./irfan-khan-raiyan-cv.pdf"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { subscribeToLanyardUpdates, getDiscordName, getDiscordStatus, getCVDownloadLink, getDiscordAvatarUrl } from "../../services/LanyardAPI";

const Header = () => {
  const [discordName, setDiscordName] = useState("Joynal Bokhsho");
  const [discordStatus, setDiscordStatus] = useState("offline");
  const [clanName, setClanName] = useState("");
  const [cvLink, setCvLink] = useState(defaultCV);
  const [avatarUrl, setAvatarUrl] = useState(Me); // Use static image as fallback
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    AOS.init({ duration: 2000 });

    // Handle window resize for responsive design
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Subscribe to Lanyard updates
    const unsubscribe = subscribeToLanyardUpdates((data) => {
      // Update Discord name
      const name = getDiscordName(data);
      if (name) {
        setDiscordName(name);
      }
      
      // Update Discord status
      const status = getDiscordStatus(data);
      if (status) {
        setDiscordStatus(status);
      }
      
      // Update Discord clan name
      if (data && data.discord_user && data.discord_user.clan) {
        setClanName(data.discord_user.clan.tag);
      }
      
      // Update CV download link
      const apiCvLink = getCVDownloadLink(data);
      if (apiCvLink) {
        setCvLink(apiCvLink);
      }
      
      // Update Discord avatar URL
      const discordAvatar = getDiscordAvatarUrl(data);
      if (discordAvatar) {
        setAvatarUrl(discordAvatar);
      }
    });

    // Clean up subscription and event listener when component unmounts
    return () => {
      if (unsubscribe) unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to get status text with proper capitalization
  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Online';
      case 'idle': return 'Idle';
      case 'dnd': return 'Do Not Disturb';
      default: return 'Offline';
    }
  };

  // Function to get status class for styling
  const getStatusClass = (status) => {
    switch (status) {
      case 'online': return 'status-online';
      case 'idle': return 'status-idle';
      case 'dnd': return 'status-dnd';
      default: return 'status-offline';
    }
  };

  // Function to get shorter status text for smaller screens
  const getShortStatusText = (status) => {
    switch (status) {
      case 'online': return 'Online';
      case 'idle': return 'Idle';
      case 'dnd': return 'DND';
      default: return 'Offline';
    }
  };

  const isMobile = windowWidth <= 600;
  const isTablet = windowWidth <= 1024 && windowWidth > 600;

  return (
    <header id="home" data-aos="fade-up">
      <div className={`header_container ${isMobile ? 'mobile' : ''} ${isTablet ? 'tablet' : ''}`}>
        <h4>Hello, I'm</h4>
        <h1 className="responsive-name">{discordName}</h1>
        <h5 className="text-light">
          <span className={`status-dot ${getStatusClass(discordStatus)}`}></span>
          {isMobile ? getShortStatusText(discordStatus) : getStatusText(discordStatus)}
          {clanName && <span className="clan-tag"> • {clanName}</span>}
        </h5>
      </div>
    </header>
  );
};

export default Header;
