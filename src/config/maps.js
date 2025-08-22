//--- CARTO Light (Positron)
// // Leaflet + CARTO Light configuration
export const MAPS_CONFIG = {
  DEFAULT_CENTER: [25.7617, -80.1918],
  DEFAULT_ZOOM: 12,
  SELECTED_ZOOM: 15,
  MAX_ZOOM: 18,
  TILE_LAYER_URL: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  TILE_LAYER_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  MARKERS: {
    DEFAULT: { color: '#0066cc', size: 24 },
    SELECTED: { color: '#ff0000', size: 32 }
  }
};
export const isMapConfigured = () => true;
export const getMapApiKey = () => null;

//--- CARTO Dark (Dark Matter)
// // Leaflet + CARTO Dark configuration
// export const MAPS_CONFIG = {
//   DEFAULT_CENTER: [25.7617, -80.1918],
//   DEFAULT_ZOOM: 12,
//   SELECTED_ZOOM: 15,
//   MAX_ZOOM: 18,
//   TILE_LAYER_URL: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
//   TILE_LAYER_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
//   MARKERS: {
//     DEFAULT: { color: '#00d2ff', size: 24 },
//     SELECTED: { color: '#ff6b6b', size: 32 }
//   }
// };
// export const isMapConfigured = () => true;
// export const getMapApiKey = () => null;

//--- OpenTopoMap (topográfico)
// // Leaflet + OpenTopoMap configuration
// export const MAPS_CONFIG = {
//   DEFAULT_CENTER: [25.7617, -80.1918],
//   DEFAULT_ZOOM: 12,
//   SELECTED_ZOOM: 15,
//   MAX_ZOOM: 17,
//   TILE_LAYER_URL: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
//   TILE_LAYER_ATTRIBUTION: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
//   MARKERS: {
//     DEFAULT: { color: '#0066cc', size: 24 },
//     SELECTED: { color: '#ff0000', size: 32 }
//   }
// };
// export const isMapConfigured = () => true;
// export const getMapApiKey = () => null;

//--- OSM HOT (Humanitarian)
// // Leaflet + OSM HOT configuration
// export const MAPS_CONFIG = {
//   DEFAULT_CENTER: [25.7617, -80.1918],
//   DEFAULT_ZOOM: 12,
//   SELECTED_ZOOM: 15,
//   MAX_ZOOM: 19,
//   TILE_LAYER_URL: 'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
//   TILE_LAYER_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/">HOT</a>, hosted by <a href="https://openstreetmap.fr/">OSM France</a>',
//   MARKERS: {
//     DEFAULT: { color: '#0066cc', size: 24 },
//     SELECTED: { color: '#ff0000', size: 32 }
//   }
// };
// export const isMapConfigured = () => true;
// export const getMapApiKey = () => null;

//--- OSM DE (variação alemã do estilo padrão)
// // Leaflet + OSM DE configuration
// export const MAPS_CONFIG = {
//   DEFAULT_CENTER: [25.7617, -80.1918],
//   DEFAULT_ZOOM: 12,
//   SELECTED_ZOOM: 15,
//   MAX_ZOOM: 19,
//   TILE_LAYER_URL: 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
//   TILE_LAYER_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, tiles by openstreetmap.de',
//   MARKERS: {
//     DEFAULT: { color: '#0066cc', size: 24 },
//     SELECTED: { color: '#ff0000', size: 32 }
//   }
// };
// export const isMapConfigured = () => true;
// export const getMapApiKey = () => null;

//--- CyclOSM (foco em ciclovias; paleta mais fria)
// // Leaflet + CyclOSM configuration
// export const MAPS_CONFIG = {
//   DEFAULT_CENTER: [25.7617, -80.1918],
//   DEFAULT_ZOOM: 12,
//   SELECTED_ZOOM: 15,
//   MAX_ZOOM: 19,
//   TILE_LAYER_URL: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
//   TILE_LAYER_ATTRIBUTION: '&copy; OpenStreetMap contributors &copy; <a href="https://www.cyclosm.org/">CyclOSM</a>',
//   MARKERS: {
//     DEFAULT: { color: '#0066cc', size: 24 },
//     SELECTED: { color: '#ff0000', size: 32 }
//   }
// };
// export const isMapConfigured = () => true;
// export const getMapApiKey = () => null;
