import { BsLinkedin, BsInstagram, BsGithub, BsFacebook, BsDiscord } from "react-icons/bs";
import { useEffect, useState } from "react";
import { subscribeToLanyardUpdates } from "../../services/LanyardAPI";

const HeaderSocials = () => {
    const [discordId, setDiscordId] = useState("466182014614372362");

    useEffect(() => {
        // Subscribe to Lanyard updates to get latest Discord user ID if needed
        const unsubscribe = subscribeToLanyardUpdates((data) => {
            if (data && data.discord_user && data.discord_user.id) {
                setDiscordId(data.discord_user.id);
            }
        });

        // Clean up subscription when component unmounts
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    return (
        <div className="header_socials">
          <a href="https://www.linkedin.com/in/joynalbokhsho" target="_blank" rel="noreferrer">
            <BsLinkedin />
          </a>
          <a href="https://instagram.com/jo_jo.503" target="_blank" rel="noreferrer">
            <BsInstagram />
          </a>
          <a href="https://github.com/joynalbokhsho" target="_blank" rel="noreferrer">
            <BsGithub />
          </a>
          <a href="https://www.facebook.com/joynal.official" target="_blank" rel="noreferrer">
            <BsFacebook />
          </a>
          <a href={`https://discord.com/users/${discordId}`} target="_blank" rel="noreferrer">
            <BsDiscord />
          </a>
        </div>
    );
}

export default HeaderSocials