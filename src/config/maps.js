
// Maps configuration
export const MAPS_CONFIG = {
  // Default center for Miami area
  DEFAULT_CENTER: { lat: 25.7617, lng: -80.1918 },
  DEFAULT_ZOOM: 12,
  SELECTED_ZOOM: 15,
  
  // Map styles
  MAP_STYLES: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'transit',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ],
  
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

// Check if Google Maps API key is configured
export const isGoogleMapsConfigured = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  return apiKey && !apiKey.includes('YOUR_API_KEY');
};

// Get Google Maps API key
export const getGoogleMapsApiKey = () => {
  return import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
};
