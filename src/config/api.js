
// API Configuration
const getBaseUrl = () => {
  // Check if running on Replit
  if (window.location.hostname.includes('replit.dev') || window.location.hostname.includes('replit.co')) {
    return 'http://0.0.0.0:5000';
  }
  
  // Check if in production
  if (window.location.hostname === 'site.dayannecosta.com' || window.location.hostname === 'www.dayannecosta.com') {
    return 'https://site.dayannecosta.com';
  }
  
  // Default to localhost for local development (VS Code)
  return 'http://localhost:5000';
};

const API_CONFIG = {
  BASE_URL: getBaseUrl(),
  
  // API endpoints
  ENDPOINTS: {
    PROPERTIES: '/api/properties',
    PROPERTIES_BY_CATEGORY: '/api/properties-by-category',
    ADMIN: '/api/admin',
    USERS: '/api/users',
    CONTACTS: '/api/contacts',
    FAVORITES: '/api/favorites',
    AMENITIES: '/api/amenities',
    FEATURES: '/api/features',
    CATEGORIES: '/api/categories',
    HEALTH: '/api/health'
  }
};

// Helper function to build full URL
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get base URL
export const getBaseUrl = () => {
  return API_CONFIG.BASE_URL;
};

export default API_CONFIG;
