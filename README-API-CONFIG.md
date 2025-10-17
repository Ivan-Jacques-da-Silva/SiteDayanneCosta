# 🔧 Configuração Flexível de API

Este projeto possui um sistema de configuração flexível que detecta automaticamente o ambiente e ajusta as URLs da API conforme necessário.

## 📁 Arquivo Principal

O arquivo `src/config/apiConfig.js` é responsável por gerenciar todas as URLs da API de forma centralizada.

## 🌍 Ambientes Suportados

### 1. **Desenvolvimento Local (localhost)**
- **URL**: `http://localhost:5000`
- **Detecção**: Automática quando `hostname === 'localhost'`
- **Uso**: Desenvolvimento local no Windows/Mac/Linux

### 2. **Replit/Codespace (0.0.0.0)**
- **URL**: `http://0.0.0.0:5000`
- **Detecção**: Automática quando hostname contém 'replit', 'repl.co', ou 'csb.app'
- **Uso**: Desenvolvimento em ambientes online

### 3. **Produção**
- **URL**: Configurável via `VITE_API_URL`
- **Detecção**: Quando `import.meta.env.MODE === 'production'`
- **Uso**: Deploy em produção

## ⚙️ Como Configurar

### Para Desenvolvimento Local
Não é necessário configurar nada. O sistema detecta automaticamente.

### Para Replit/Codespace
1. **Opção 1 - Detecção Automática**: O sistema detecta automaticamente
2. **Opção 2 - Manual**: Descomente a linha no `.env`:
   ```env
   VITE_USE_REPLIT_CONFIG=true
   ```

### Para Produção
Configure a variável de ambiente:
```env
VITE_API_URL=https://sua-api-de-producao.com
```

## 🚀 Como Usar nos Componentes

### Importação Básica
```javascript
import { API_ENDPOINTS } from '../config/apiConfig';

// Usar endpoints pré-definidos
const response = await fetch(API_ENDPOINTS.CATEGORIES);
```

### Requisições Autenticadas
```javascript
import { authenticatedFetch, API_ENDPOINTS } from '../config/apiConfig';

// Adiciona automaticamente o token de autorização
const response = await authenticatedFetch(API_ENDPOINTS.PROPERTIES, {
  method: 'POST',
  body: JSON.stringify(data)
});
```

### URLs com Parâmetros
```javascript
import { buildApiUrl } from '../config/apiConfig';

// Constrói URL com query parameters
const url = buildApiUrl('/api/properties-by-category', { 
  category: 'LIFESTYLE_PROPERTIES',
  page: 1 
});
```

## 📋 Endpoints Disponíveis

```javascript
API_ENDPOINTS = {
  // Propriedades
  PROPERTIES: '/api/properties',
  PROPERTIES_BY_CATEGORY: '/api/properties-by-category',
  FEATURED_LISTINGS: '/api/featured-listings',
  
  // Categorias
  CATEGORIES: '/api/categories',
  
  // Usuários
  USERS: '/api/users',
  LOGIN: '/api/users/login',
  REGISTER: '/api/users/register',
  
  // Favoritos
  FAVORITES: '/api/favorites',
  ADMIN_FAVORITES: '/api/admin/favorites',
  
  // Outros
  CONTACTS: '/api/contacts',
  SEARCH: '/api/search',
  AMENITIES: '/api/amenities',
  FEATURES: '/api/features',
  ADMIN: '/api/admin',
  EMAILS: '/api/emails'
}
```

## 🔍 Debug

O sistema automaticamente loga no console:
- Ambiente detectado
- URL base sendo usada
- Timestamp da configuração

## 🛠️ Migração de Código Existente

### Antes (URLs hardcoded):
```javascript
const response = await fetch('http://localhost:5000/api/categories');
```

### Depois (Configuração flexível):
```javascript
import { API_ENDPOINTS } from '../config/apiConfig';
const response = await fetch(API_ENDPOINTS.CATEGORIES);
```

## ✅ Vantagens

1. **Flexibilidade**: Funciona em qualquer ambiente automaticamente
2. **Manutenibilidade**: URLs centralizadas em um só lugar
3. **Segurança**: Função `authenticatedFetch` adiciona tokens automaticamente
4. **Debug**: Logs automáticos para troubleshooting
5. **Produtividade**: Não precisa alterar código ao mudar de ambiente

## 🚨 Troubleshooting

### Problema: API não conecta no Replit
**Solução**: Adicione `VITE_USE_REPLIT_CONFIG=true` no `.env`

### Problema: URLs ainda apontam para localhost
**Solução**: Verifique se importou corretamente:
```javascript
import { API_ENDPOINTS } from '../config/apiConfig';
```

### Problema: Token não é enviado automaticamente
**Solução**: Use `authenticatedFetch` em vez de `fetch`:
```javascript
import { authenticatedFetch } from '../config/apiConfig';
```