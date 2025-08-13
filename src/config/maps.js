// Leaflet + OpenStreetMap configuration
export const MAPS_CONFIG = {
  // Default center for Miami area
  DEFAULT_CENTER: [25.7617, -80.1918], // [lat, lng] format for Leaflet
  DEFAULT_ZOOM: 12,
  SELECTED_ZOOM: 15,
  MAX_ZOOM: 18,

  // OpenStreetMap tile layer URL
  TILE_LAYER_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  TILE_LAYER_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

  // Marker configurations
  MARKERS: {
    DEFAULT: {
      color: '#0066cc',
      size: 24
    },
    SELECTED: {
      color: '#ff0000',
      size: 32
    }
  }
};

// No API key needed for OpenStreetMap
export const isMapConfigured = () => true;

// No API key needed for Leaflet + OpenStreetMap
export const getMapApiKey = () => null;