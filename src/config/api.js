// Função para detectar ambiente
const detectarBaseUrl = () => {
  const hostname = window.location.hostname;
  const port = window.location.port;
  const protocol = window.location.protocol;
  
  // Para Replit, usar a URL base do replit mas com porta 5000
  if (hostname.includes('replit.dev') || hostname.includes('replit.co')) {
    // Pegar o nome do projeto do replit e criar URL da porta 5000
    const projectName = hostname.split('.')[0];
    const replitDomain = hostname.split('.').slice(1).join('.');
    return `${protocol}//${projectName}-5000.${replitDomain}`;
  }

  // Para qualquer domínio dayannecosta.com - sempre usar subdomínio api
  if (hostname.includes('dayannecosta.com')) {
    return 'https://api.dayannecosta.com';
  }

  // Para VPS Hostinger - mesmo domínio mas com porta 5000
  if (hostname && !hostname.includes('localhost') && !hostname.includes('127.0.0.1') && !hostname.includes('replit')) {
    // Se está em produção (HTTPS), usar HTTPS na porta 5000
    if (protocol === 'https:') {
      return `https://${hostname}:5000`;
    }
    // Se está em desenvolvimento no VPS (HTTP), usar HTTP na porta 5000
    return `http://${hostname}:5000`;
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
