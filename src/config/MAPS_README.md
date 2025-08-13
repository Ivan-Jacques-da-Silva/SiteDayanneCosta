
# Google Maps Integration

## Setup Instructions

Para habilitar a funcionalidade de mapa com marcadores das propriedades, siga estas etapas:

### 1. Obter API Key do Google Maps

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um projeto existente
3. Habilite as seguintes APIs:
   - **Maps JavaScript API**
   - **Places API** (opcional, para recursos avançados)
4. Vá para "Credentials" e clique em "Create Credentials" > "API Key"
5. Copie a API key gerada

### 2. Configurar a API Key no projeto

Crie um arquivo `.env` na raiz do projeto (se não existir) e adicione:

```env
VITE_GOOGLE_MAPS_API_KEY=sua_api_key_aqui
```

### 3. Configurar restrições da API Key (Recomendado)

Para segurança, configure restrições na sua API key:

1. No Google Cloud Console, vá para "Credentials"
2. Clique na sua API key
3. Em "Application restrictions", selecione "HTTP referrers"
4. Adicione os domínios permitidos:
   - `http://localhost:*` (para desenvolvimento)
   - `https://seu-dominio.com/*` (para produção)
5. Em "API restrictions", selecione "Restrict key" e escolha:
   - Maps JavaScript API
   - Places API (se usando)

### 4. Funcionalidades Implementadas

- ✅ **Marcadores dinâmicos**: Cada propriedade com latitude/longitude aparece como um marcador
- ✅ **Marcador selecionado**: Propriedade selecionada aparece com marcador diferenciado (maior e vermelho)
- ✅ **Centralização automática**: Mapa centraliza na propriedade selecionada
- ✅ **Info Windows**: Clique no marcador mostra detalhes da propriedade
- ✅ **Lista sincronizada**: Lista de propriedades na lateral sincroniza com o mapa
- ✅ **Detecção automática**: Sistema detecta propriedades sem coordenadas

### 5. Como Funciona

1. **Cadastro de Propriedades**: Quando cadastrar propriedades, inclua latitude e longitude
2. **Visualização**: No modo "Map", propriedades com coordenadas aparecerão como marcadores
3. **Interação**: 
   - Clique na lista para centralizar no mapa
   - Clique no marcador para ver detalhes
   - Propriedade selecionada fica destacada (marcador vermelho maior)

### 6. Estrutura de Dados

As propriedades devem ter as seguintes propriedades para aparecer no mapa:

```javascript
{
  id: "property-id",
  latitude: 25.7617,  // número (obrigatório)
  longitude: -80.1918, // número (obrigatório)
  address: "Endereço completo",
  city: "Miami",
  state: "FL",
  price: 500000,
  bedrooms: 2,
  bathrooms: 2,
  sqft: 1200,
  image: "url-da-imagem"
}
```

### 7. Custo da API

O Google Maps cobra por uso:
- **Primeiras 28.500 carregamentos/mês**: Gratuitos
- **Após limite**: ~$7 por 1000 carregamentos adicionais

### 8. Troubleshooting

**Problema**: Mapa não carrega
- ✅ Verifique se a API key está correta no arquivo `.env`
- ✅ Confirme que a Maps JavaScript API está habilitada
- ✅ Verifique se não há restrições impedindo o acesso

**Problema**: Propriedades não aparecem no mapa
- ✅ Confirme que as propriedades têm `latitude` e `longitude`
- ✅ Verifique se os valores são números válidos
- ✅ Teste com coordenadas conhecidas (ex: 25.7617, -80.1918 para Miami)

**Problema**: Erro de CORS
- ✅ Configure as restrições de domínio na API key
- ✅ Adicione o domínio local e de produção nas restrições
