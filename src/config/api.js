// Função para detectar ambiente
const detectarBaseUrl = () => {
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  
  console.log('🔍 Detecting API URL:', { hostname, protocol });
  
  // Para qualquer domínio dayannecosta.com - sempre usar subdomínio api
  if (hostname.includes('dayannecosta.com')) {
    return 'https://api.dayannecosta.com';
  }

  // Para desenvolvimento local - sempre usar porta 5000 para backend
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }

  // Default para desenvolvimento (incluindo Replit)
  const fallbackUrl = 'https://api.dayannecosta.com';
  console.log('🔍 Final API URL:', fallbackUrl);
  return fallbackUrl;
};

// Log the detected base URL when the module loads
console.log('🔍 API Base URL detected as:', detectarBaseUrl());

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

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/default.png';
  
  // Se a imagem já tem protocolo, retorna como está
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Remove barra inicial se existir para evitar dupla barra
  const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
  
  // Se não começa com uploads/, adiciona o prefixo completo
  let finalPath;
  if (cleanPath.startsWith('uploads/')) {
    finalPath = cleanPath;
  } else {
    finalPath = `uploads/properties/${cleanPath}`;
  }
  
  // Construir URL correta para o backend
  const baseUrl = API_CONFIG.BASE_URL.endsWith('/') ? API_CONFIG.BASE_URL.slice(0, -1) : API_CONFIG.BASE_URL;
  const fullUrl = `${baseUrl}/${finalPath}`;
  
  return fullUrl;
};

export default API_CONFIG;
