
# API Configuration

Este arquivo controla a URL base para todas as requisições da API.

## Como usar

1. **Desenvolvimento local**: 
   ```javascript
   BASE_URL: 'http://0.0.0.0:5000'
   ```

2. **Produção**: 
   ```javascript
   BASE_URL: 'https://site.dayannecosta.com'
   ```

## Funções disponíveis

- `buildApiUrl(endpoint)`: Constrói a URL completa com o endpoint
- `getBaseUrl()`: Retorna apenas a URL base

## Exemplo de uso

```javascript
import { buildApiUrl } from '../config/api';

// Em vez de:
fetch('http://0.0.0.0:5000/api/properties')

// Use:
fetch(buildApiUrl('/api/properties'))
```

## Arquivos que precisam ser atualizados

Todos os arquivos que fazem requisições HTTP devem importar e usar as funções de configuração:

- `src/components/PropertyListing.jsx`
- `src/pages/AdminCondominios.jsx`
- `src/pages/AdminContacts.jsx`
- `src/pages/AdminDashboard.jsx`
- `src/pages/AdminUsuarios.jsx`
- `src/pages/Login.jsx`
- `src/pages/Register.jsx`
- E outros arquivos que fazem fetch para a API
