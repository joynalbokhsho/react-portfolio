/**
 * LanyardAPI.js
 * A service for interacting with the Lanyard API to fetch Discord user data
 */

const LANYARD_API_URL = 'https://api.lanyard.rest/v1/users';
const LANYARD_WEBSOCKET_URL = 'wss://api.lanyard.rest/socket';
const DISCORD_USER_ID = '466182014614372362';

// Event listeners for Lanyard updates
const listeners = new Set();

// Current data from Lanyard
let currentData = null;

// WebSocket connection
let ws = null;
let heartbeatInterval = null;

/**
 * Initialize the WebSocket connection to Lanyard
 */
const initializeWebSocket = () => {
  if (ws) return; // Don't create multiple connections

  ws = new WebSocket(LANYARD_WEBSOCKET_URL);
  
  ws.onopen = () => {
    console.log('Lanyard WebSocket connected');
    // Subscribe to the user's presence updates
    ws.send(
      JSON.stringify({
        op: 2,
        d: {
          subscribe_to_id: DISCORD_USER_ID,
        },
      })
    );
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    
    // Handle different message types
    switch (message.op) {
      case 0: // Event
        if (message.t === 'INIT_STATE') {
          currentData = message.d[DISCORD_USER_ID];
          notifyListeners();
        } else if (message.t === 'PRESENCE_UPDATE' && message.d.user_id === DISCORD_USER_ID) {
          currentData = message.d;
          notifyListeners();
        }
        break;
        
      case 1: // Hello
        // Set up heartbeat interval
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        heartbeatInterval = setInterval(() => {
          if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify({ op: 3 }));
          }
        }, message.d.heartbeat_interval);
        break;
        
      default:
        break;
    }
  };

  ws.onclose = () => {
    console.log('Lanyard WebSocket disconnected, reconnecting in 5 seconds...');
    clearInterval(heartbeatInterval);
    ws = null;
    
    // Attempt to reconnect after a delay
    setTimeout(initializeWebSocket, 5000);
  };

  ws.onerror = (error) => {
    console.error('Lanyard WebSocket error:', error);
    ws.close();
  };
};

/**
 * Notify all listeners of data updates
 */
const notifyListeners = () => {
  if (!currentData) return;
  
  // Call each listener with the current data
  listeners.forEach(listener => {
    try {
      listener(currentData);
    } catch (error) {
      console.error('Error in Lanyard listener:', error);
    }
  });
};

/**
 * Fetch the Discord user data from the Lanyard API using HTTP
 * @returns {Promise<Object>} The Discord user data
 */
export const fetchDiscordData = async () => {
  try {
    const response = await fetch(`${LANYARD_API_URL}/${DISCORD_USER_ID}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Lanyard data');
    }
    
    const data = await response.json();
    
    if (data.success) {
      currentData = data.data;
      notifyListeners();
      return data.data;
    } else {
      throw new Error('Lanyard API returned unsuccessful response');
    }
  } catch (error) {
    console.error('Error fetching Discord data:', error);
    throw error;
  }
};

/**
 * Subscribe to real-time updates from Lanyard
 * @param {Function} callback A function to call whenever the data updates
 * @returns {Function} A function to unsubscribe from updates
 */
export const subscribeToLanyardUpdates = (callback) => {
  // Initialize WebSocket if not already done
  initializeWebSocket();
  
  // Add the callback to the listeners
  listeners.add(callback);
  
  // If we already have data, notify this listener immediately
  if (currentData) {
    try {
      callback(currentData);
    } catch (error) {
      console.error('Error in initial Lanyard callback:', error);
    }
  } else {
    // Otherwise fetch the data first
    fetchDiscordData().catch(console.error);
  }
  
  // Return an unsubscribe function
  return () => {
    listeners.delete(callback);
  };
};

/**
 * Get the Discord user's name (global_name or username)
 * @param {Object} data The Lanyard data object
 * @returns {string} The user's display name
 */
export const getDiscordName = (data) => {
  if (!data) return '';
  
  const user = data.discord_user;
  return user ? (user.global_name || user.username) : '';
};

/**
 * Get the Discord user's avatar URL
 * @param {Object} data The Lanyard data object
 * @param {number} size The size of the avatar in pixels (default: 512)
 * @returns {string} The avatar URL
 */
export const getDiscordAvatarUrl = (data, size = 512) => {
  if (!data || !data.discord_user || !data.discord_user.avatar) {
    return 'https://cdn.discordapp.com/embed/avatars/0.png'; // Default Discord avatar
  }
  
  const { id, avatar } = data.discord_user;
  return `https://cdn.discordapp.com/avatars/${id}/${avatar}.${avatar.startsWith('a_') ? 'gif' : 'png'}?size=${size}`;
};

/**
 * Get the Discord user's status (online, idle, dnd, offline)
 * @param {Object} data The Lanyard data object
 * @returns {string} The user's status
 */
export const getDiscordStatus = (data) => {
  return data ? data.discord_status : 'offline';
};

/**
 * Get the Discord user's activities
 * @param {Object} data The Lanyard data object
 * @returns {Array} The user's activities
 */
export const getDiscordActivities = (data) => {
  return data && data.activities ? data.activities : [];
};

/**
 * Get custom data from the user's kv storage
 * @param {Object} data The Lanyard data object
 * @param {string} key The key to retrieve
 * @returns {string|null} The value if found, null otherwise
 */
export const getCustomData = (data, key) => {
  return data && data.kv && data.kv[key] ? data.kv[key] : null;
};

/**
 * Get the CV download link from the user's kv storage
 * @param {Object} data The Lanyard data object
 * @returns {string|null} The CV download URL if found, null otherwise
 */
export const getCVDownloadLink = (data) => {
  return getCustomData(data, 'cvdl') || null;
};

// Export a default object with all functions
export default {
  fetchDiscordData,
  subscribeToLanyardUpdates,
  getDiscordName,
  getDiscordAvatarUrl,
  getDiscordStatus,
  getDiscordActivities,
  getCustomData,
  getCVDownloadLink,
};