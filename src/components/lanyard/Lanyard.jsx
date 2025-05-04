import React, { useState, useEffect } from 'react';
import './lanyard.css';
import { 
  subscribeToLanyardUpdates, 
  getDiscordName, 
  getDiscordAvatarUrl, 
  getDiscordStatus,
  getDiscordActivities,
  getCustomData
} from '../../services/LanyardAPI';
import AOS from "aos";
import "aos/dist/aos.css";

const Lanyard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 2000 });
    
    let unsubscribe;

    try {
      // Subscribe to real-time Lanyard updates
      unsubscribe = subscribeToLanyardUpdates((data) => {
        if (data) {
          setUserData(data);
          setLoading(false);
        }
      });
    } catch (err) {
      console.error('Error setting up Lanyard subscription:', err);
      setError('Failed to load Discord presence data');
      setLoading(false);
    }

    // Clean up subscription when component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Helper function to format activity timestamps
  const formatElapsedTime = (timestamp) => {
    if (!timestamp) return '';
    
    const startTime = timestamp;
    const now = Date.now();
    const elapsed = Math.floor((now - startTime) / 1000);
    
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  // Function to get status class
  const getStatusClass = (status) => {
    switch (status) {
      case 'online': return 'status-online';
      case 'idle': return 'status-idle';
      case 'dnd': return 'status-dnd';
      default: return 'status-offline';
    }
  };

  if (loading) {
    return (
      <section id="discord" data-aos="fade-up">
        <h5>Real-Time</h5>
        <h2>Discord Presence</h2>
        <div className="container lanyard_container loading">
          <div className="loading-spinner"></div>
          <p>Loading Discord status...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="discord" data-aos="fade-up">
        <h5>Real-Time</h5>
        <h2>Discord Presence</h2>
        <div className="container lanyard_container error">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (!userData) {
    return (
      <section id="discord" data-aos="fade-up">
        <h5>Real-Time</h5>
        <h2>Discord Presence</h2>
        <div className="container lanyard_container error">
          <p>No Discord data available</p>
        </div>
      </section>
    );
  }

  const activities = getDiscordActivities(userData);
  
  // Filter out "Custom Status" from activities
  const displayActivities = activities.filter(activity => activity.name !== "Custom Status");
  const customStatus = activities.find(activity => activity.name === "Custom Status");
  
  const discordName = getDiscordName(userData);
  const avatarUrl = getDiscordAvatarUrl(userData);
  const discordStatus = getDiscordStatus(userData);
  const message = getCustomData(userData, 'rpc');

  return (
    <section id="discord" data-aos="fade-up">
      <h5>Real-Time</h5>
      <h2>Discord Presence</h2>

      <div className="container lanyard_container">
        <div className="discord-card">
          <div className="discord-profile">
            <div className={`avatar-container ${getStatusClass(discordStatus)}-border`}>
              <img src={avatarUrl} alt="Discord Avatar" className="discord-avatar" />
              <div className={`status-indicator ${getStatusClass(discordStatus)}`}></div>
            </div>
            <div className="discord-user-info">
              <h3>{discordName}</h3>
              <span className="discord-tag">@{userData.discord_user?.username}</span>
              {customStatus && (
                <div className="custom-status">
                  {customStatus.emoji && (
                    <img 
                      src={customStatus.emoji.id 
                        ? `https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${customStatus.emoji.animated ? 'gif' : 'png'}` 
                        : ''}
                      alt={customStatus.emoji.name}
                      className="custom-emoji"
                    />
                  )}
                  {customStatus.state && <span>{customStatus.state}</span>}
                </div>
              )}
            </div>
          </div>

          {displayActivities.length > 0 && (
            <div className="discord-activities">
              <h4>Current Activities</h4>
              <div className="activities-grid">
                {displayActivities.map((activity, index) => (
                  <div className="activity-card" key={index}>
                    {activity.assets && activity.assets.large_image && (
                      <img 
                        src={activity.assets.large_image.startsWith('mp:external/') 
                          ? activity.assets.large_image.split('/')[4]
                          : (activity.assets.large_image.startsWith('spotify:') 
                            ? `https://i.scdn.co/image/${activity.assets.large_image.substring(8)}`
                            : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`)}
                        alt={activity.assets.large_text || activity.name}
                        className="activity-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="activity-details">
                      <span className="activity-name">{activity.name}</span>
                      {activity.details && <p className="activity-info">{activity.details}</p>}
                      {activity.state && <p className="activity-info">{activity.state}</p>}
                      {activity.timestamps && activity.timestamps.start && (
                        <p className="activity-time">
                          <span className="time-elapsed">{formatElapsedTime(activity.timestamps.start)}</span> elapsed
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {message && (
            <div className="kv-section">
              <div className="kv-item"><span className="kv-label">Status Message:</span> {message}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Lanyard;