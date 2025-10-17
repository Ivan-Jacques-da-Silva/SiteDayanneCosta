/**
 * Configuração centralizada para URLs da API
 * Este arquivo gerencia automaticamente as URLs do backend baseado no ambiente
 */

// Configurações de ambiente
const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  REPLIT: 'replit'
};

// Configurações de URL por ambiente
const API_CONFIGS = {
  [ENVIRONMENTS.DEVELOPMENT]: {
    baseUrl: 'http://localhost:5000',
    description: 'Ambiente de desenvolvimento local'
  },
  [ENVIRONMENTS.REPLIT]: {
    baseUrl: 'http://0.0.0.0:5000',
    description: 'Ambiente Replit/Codespace'
  },
  [ENVIRONMENTS.PRODUCTION]: {
    baseUrl: import.meta.env.VITE_API_URL || 'https://your-production-api.com',
    description: 'Ambiente de produção'
  }
};

/**
 * Detecta automaticamente o ambiente baseado em várias condições
 * @returns {string} O ambiente detectado
 */
const detectEnvironment = () => {
  // Verifica se está no Replit
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Replit geralmente usa hostnames específicos
    if (hostname.includes('replit') || hostname.includes('repl.co') || hostname.includes('csb.app')) {
      return ENVIRONMENTS.REPLIT;
    }
    
    // Verifica se está em localhost
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return ENVIRONMENTS.DEVELOPMENT;
    }
  }
  
  // Verifica variáveis de ambiente
  if (import.meta.env.MODE === 'production') {
    return ENVIRONMENTS.PRODUCTION;
  }
  
  // Verifica se está no Replit através de variáveis específicas
  if (import.meta.env.VITE_REPLIT_ENV === 'true' || 
      typeof window !== 'undefined' && window.location.port === '3000') {
    // Adicional verificação para Replit
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    if (userAgent.includes('replit') || import.meta.env.VITE_USE_REPLIT_CONFIG === 'true') {
      return ENVIRONMENTS.REPLIT;
    }
  }
  
  // Default para desenvolvimento
  return ENVIRONMENTS.DEVELOPMENT;
};

/**
 * Obtém a configuração da API baseada no ambiente atual
 * @returns {Object} Configuração da API
 */
const getApiConfig = () => {
  const environment = detectEnvironment();
  const config = API_CONFIGS[environment];
  
  console.log(`🔧 API Config - Ambiente detectado: ${environment} (${config.description})`);
  console.log(`🌐 Base URL: ${config.baseUrl}`);
  
  return config;
};

// Configuração atual
const currentConfig = getApiConfig();

/**
 * URL base da API
 */
export const API_BASE_URL = currentConfig.baseUrl;

/**
 * URLs específicas da API
 */
export const API_ENDPOINTS = {
  // Propriedades
  PROPERTIES: `${API_BASE_URL}/api/properties`,
  PROPERTIES_BY_CATEGORY: `${API_BASE_URL}/api/properties-by-category`,
  FEATURED_LISTINGS: `${API_BASE_URL}/api/featured-listings`,
  
  // Categorias
  CATEGORIES: `${API_BASE_URL}/api/categories`,
  
  // Usuários e Autenticação
  USERS: `${API_BASE_URL}/api/users`,
  LOGIN: `${API_BASE_URL}/api/users/login`,
  REGISTER: `${API_BASE_URL}/api/users/register`,
  
  // Favoritos
  FAVORITES: `${API_BASE_URL}/api/favorites`,
  ADMIN_FAVORITES: `${API_BASE_URL}/api/admin/favorites`,
  
  // Contatos
  CONTACTS: `${API_BASE_URL}/api/contacts`,
  
  // Busca
  SEARCH: `${API_BASE_URL}/api/search`,
  
  // Amenidades e Features
  AMENITIES: `${API_BASE_URL}/api/amenities`,
  FEATURES: `${API_BASE_URL}/api/features`,
  
  // Admin
  ADMIN: `${API_BASE_URL}/api/admin`,
  
  // Email
  EMAILS: `${API_BASE_URL}/api/emails`
};

/**
 * Função helper para construir URLs da API
 * @param {string} endpoint - O endpoint da API
 * @param {Object} params - Parâmetros de query string
 * @returns {string} URL completa
 */
export const buildApiUrl = (endpoint, params = {}) => {
  const url = new URL(endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`);
  
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });
  
  return url.toString();
};

/**
 * Configuração para requisições fetch
 */
export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
  // Adiciona automaticamente o token de autorização se disponível
  getAuthHeaders: () => {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
};

/**
 * Função helper para fazer requisições autenticadas
 * @param {string} url - URL da requisição
 * @param {Object} options - Opções do fetch
 * @returns {Promise} Promise da requisição
 */
export const authenticatedFetch = async (url, options = {}) => {
  const authHeaders = API_CONFIG.getAuthHeaders();
  
  return fetch(url, {
    ...options,
    headers: {
      ...API_CONFIG.headers,
      ...authHeaders,
      ...options.headers
    }
  });
};

// Log da configuração atual para debug
console.log('🚀 API Configuration loaded:', {
  environment: detectEnvironment(),
  baseUrl: API_BASE_URL,
  timestamp: new Date().toISOString()
});

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  buildApiUrl,
  authenticatedFetch,
  API_CONFIG,
  detectEnvironment,
  getApiConfig
};