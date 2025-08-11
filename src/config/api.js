// Função para detectar ambiente
const detectarBaseUrl = () => {
  const hostname = window.location.hostname;
  const port = window.location.port;
  
  // Para Replit, usar a URL base do replit mas com porta 5000
  if (hostname.includes('replit.dev') || hostname.includes('replit.co')) {
    // Pegar o nome do projeto do replit e criar URL da porta 5000
    const projectName = hostname.split('.')[0];
    const replitDomain = hostname.split('.').slice(1).join('.');
    return `${window.location.protocol}//${projectName}-5000.${replitDomain}`;
  }

  // Para produção dayannecosta.com - usar subdomínio api
  if (hostname === 'site.dayannecosta.com' || hostname === 'www.dayannecosta.com' || hostname === 'dayannecosta.com' || hostname.includes('dayannecosta.com')) {
    return 'https://api.dayannecosta.com';
  }

  // Para desenvolvimento local - sempre usar porta 5000 para backend
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }

  // Default para desenvolvimento
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

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/no-image.png';
  
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
  
  console.log('Image URL constructed:', {
    original: imagePath,
    cleanPath,
    finalPath,
    baseUrl,
    fullUrl
  });
  
  return fullUrl;
};

export default API_CONFIG;
