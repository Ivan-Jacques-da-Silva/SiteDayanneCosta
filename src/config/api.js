// Função para detectar ambiente
const detectarBaseUrl = () => {
  if (window.location.hostname.includes('replit.dev') || window.location.hostname.includes('replit.co')) {
    return 'http://0.0.0.0:5000';
  }

  if (window.location.hostname === 'site.dayannecosta.com' || window.location.hostname === 'www.dayannecosta.com') {
    return 'https://site.dayannecosta.com';
  }

  return 'http://localhost:5000';
};

const API_CONFIG = {
  BASE_URL: detectarBaseUrl(),

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

export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

export const getBaseUrl = () => {
  return API_CONFIG.BASE_URL;
};

export default API_CONFIG;
