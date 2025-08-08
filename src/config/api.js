
// API Configuration
const API_CONFIG = {
  // Change this URL based on your environment
  // Development: 'http://localhost:5000'
  // Production: 'https://site.dayannecosta.com'
  BASE_URL: 'http://0.0.0.0:5000',

  
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
