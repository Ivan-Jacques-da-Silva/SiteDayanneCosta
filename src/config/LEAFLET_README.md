
# Leaflet + OpenStreetMap Integration

## Sobre esta implementação

Esta implementação usa **Leaflet** com **OpenStreetMap** em vez do Google Maps. Esta é uma solução gratuita e de código aberto que não requer API keys.

### Vantagens do Leaflet + OpenStreetMap:

- ✅ **Totalmente gratuito** - Sem limites de uso ou custos
- ✅ **Sem API key necessária** - Funciona imediatamente
- ✅ **Código aberto** - Leaflet e OpenStreetMap são projetos open source
- ✅ **Leve e rápido** - Biblioteca menor que o Google Maps
- ✅ **Personalizável** - Fácil de customizar aparência e comportamento
- ✅ **Dados atualizados** - OpenStreetMap é constantemente atualizado pela comunidade

### Funcionalidades Implementadas

- ✅ **Marcadores dinâmicos**: Cada propriedade com latitude/longitude aparece como um marcador customizado
- ✅ **Marcador selecionado**: Propriedade selecionada aparece com marcador diferenciado (maior e vermelho)
- ✅ **Centralização automática**: Mapa centraliza na propriedade selecionada
- ✅ **Popups informativos**: Clique no marcador mostra detalhes da propriedade
- ✅ **Lista sincronizada**: Lista de propriedades na lateral sincroniza com o mapa
- ✅ **Detecção automática**: Sistema detecta propriedades sem coordenadas
- ✅ **Responsivo**: Funciona bem em desktop e mobile

### Como Funciona

1. **Cadastro de Propriedades**: Quando cadastrar propriedades, inclua latitude e longitude
2. **Visualização**: No modo "Map", propriedades com coordenadas aparecerão como marcadores
3. **Interação**: 
   - Clique na lista para centralizar no mapa
   - Clique no marcador para ver popup com detalhes
   - Propriedade selecionada fica destacada (marcador vermelho maior)

### Estrutura de Dados

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

### Configuração

Não é necessária nenhuma configuração adicional. O mapa funcionará imediatamente após a instalação das dependências.

As configurações podem ser ajustadas no arquivo `src/config/maps.js`:

```javascript
export const MAPS_CONFIG = {
  DEFAULT_CENTER: [25.7617, -80.1918], // Centro padrão (Miami)
  DEFAULT_ZOOM: 12,                     // Zoom padrão
  SELECTED_ZOOM: 15,                    // Zoom quando propriedade selecionada
  MAX_ZOOM: 18,                         // Zoom máximo
  // ... outras configurações
};
```

### Dependências Instaladas

- **leaflet**: Biblioteca principal de mapas
- **react-leaflet**: Componentes React para Leaflet

### Troubleshooting

**Problema**: Marcadores não aparecem corretamente
- ✅ Verifique se as dependências foram instaladas: `npm install leaflet react-leaflet`
- ✅ Confirme que o CSS do Leaflet está sendo importado

**Problema**: Propriedades não aparecem no mapa
- ✅ Confirme que as propriedades têm `latitude` e `longitude`
- ✅ Verifique se os valores são números válidos
- ✅ Teste com coordenadas conhecidas (ex: 25.7617, -80.1918 para Miami)

**Problema**: Mapa aparece em branco
- ✅ Verifique a conexão com internet (OpenStreetMap precisa carregar tiles)
- ✅ Confirme que não há erros de JavaScript no console

### Personalização

Para personalizar a aparência dos marcadores, edite a função `createCustomIcon` no arquivo `PropertyMap.jsx`.

Para trocar o provedor de tiles (estilo do mapa), modifique `TILE_LAYER_URL` em `maps.js`. Exemplos:

```javascript
// OpenStreetMap padrão (atual)
TILE_LAYER_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

// CartoDB Positron (estilo minimalista)
TILE_LAYER_URL: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'

// CartoDB Dark Matter (estilo escuro)
TILE_LAYER_URL: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
```

### Migração do Google Maps

Esta implementação substitui completamente a funcionalidade anterior do Google Maps:

- ❌ Removido: @googlemaps/js-api-loader
- ❌ Removido: Necessidade de API key
- ❌ Removido: Custos de uso
- ✅ Adicionado: leaflet + react-leaflet
- ✅ Mantido: Todas as funcionalidades anteriores
- ✅ Melhorado: Performance e simplicidade
