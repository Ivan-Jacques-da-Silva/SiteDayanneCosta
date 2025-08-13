
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MAPS_CONFIG } from '../config/maps';
import styles from './PropertyMap.module.css';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom icons
const createCustomIcon = (isSelected = false) => {
  const config = isSelected ? MAPS_CONFIG.MARKERS.SELECTED : MAPS_CONFIG.MARKERS.DEFAULT;
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${config.size}px;
        height: ${config.size}px;
        background-color: ${config.color};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: ${config.size > 30 ? '14px' : '12px'};
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      ">$</div>
    `,
    iconSize: [config.size, config.size],
    iconAnchor: [config.size / 2, config.size / 2],
  });
};

// Component to handle map center changes
const MapController = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  
  return null;
};

const PropertyMap = ({ properties, selectedPropertyId, onPropertySelect }) => {
  const [mapCenter, setMapCenter] = useState(MAPS_CONFIG.DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(MAPS_CONFIG.DEFAULT_ZOOM);

  // Filter properties with valid coordinates
  const validProperties = properties.filter(p => p.latitude && p.longitude);

  useEffect(() => {
    if (selectedPropertyId) {
      const selectedProperty = validProperties.find(p => p.id === selectedPropertyId);
      if (selectedProperty) {
        setMapCenter([parseFloat(selectedProperty.latitude), parseFloat(selectedProperty.longitude)]);
        setMapZoom(MAPS_CONFIG.SELECTED_ZOOM);
      }
    } else if (validProperties.length > 0) {
      // Calculate bounds to fit all properties
      if (validProperties.length === 1) {
        const property = validProperties[0];
        setMapCenter([parseFloat(property.latitude), parseFloat(property.longitude)]);
        setMapZoom(MAPS_CONFIG.SELECTED_ZOOM);
      } else {
        // Set center to Miami default and let the map auto-fit
        setMapCenter(MAPS_CONFIG.DEFAULT_CENTER);
        setMapZoom(MAPS_CONFIG.DEFAULT_ZOOM);
      }
    }
  }, [selectedPropertyId, validProperties]);

  const handleMarkerClick = (property) => {
    if (onPropertySelect) {
      onPropertySelect(property.id);
    }
  };

  const formatPrice = (price) => {
    if (!price) return 'Price on request';
    const numericPrice = typeof price === 'string' ? parseInt(price.replace(/[$,]/g, '')) : price;
    if (isNaN(numericPrice)) return 'Price on request';
    return '$' + numericPrice.toLocaleString();
  };

  if (validProperties.length === 0) {
    return (
      <div className={styles.mapContainer}>
        <div className={styles.noMapData}>
          <div className={styles.noMapMessage}>
            <div className={styles.errorIcon}>📍</div>
            <h3>No Map Data Available</h3>
            <p>Properties need latitude and longitude coordinates to display on the map.</p>
            <p>Available properties: {properties.length}</p>
            <p>With coordinates: {validProperties.length}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className={styles.map}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          url={MAPS_CONFIG.TILE_LAYER_URL}
          attribution={MAPS_CONFIG.TILE_LAYER_ATTRIBUTION}
          maxZoom={MAPS_CONFIG.MAX_ZOOM}
        />
        
        <MapController center={mapCenter} zoom={mapZoom} />
        
        {validProperties.map((property) => {
          const isSelected = property.id === selectedPropertyId;
          const position = [parseFloat(property.latitude), parseFloat(property.longitude)];
          
          return (
            <Marker
              key={property.id}
              position={position}
              icon={createCustomIcon(isSelected)}
              eventHandlers={{
                click: () => handleMarkerClick(property)
              }}
              zIndexOffset={isSelected ? 1000 : 0}
            >
              <Popup>
                <div className={styles.popupContent}>
                  <img
                    src={property.image || '/src/assets/img/testesImagens.jpeg'}
                    alt={property.address}
                    className={styles.popupImage}
                    onError={(e) => {
                      e.target.src = '/src/assets/img/testesImagens.jpeg';
                    }}
                  />
                  <div className={styles.popupInfo}>
                    <div className={styles.popupPrice}>
                      {formatPrice(property.price)}
                    </div>
                    <div className={styles.popupAddress}>
                      {property.address}
                    </div>
                    <div className={styles.popupCity}>
                      {property.city}, {property.state}
                    </div>
                    <div className={styles.popupSpecs}>
                      {property.bedrooms || property.beds || 'N/A'} beds •{' '}
                      {property.bathrooms || property.baths || 'N/A'} baths •{' '}
                      {property.sqft ? `${property.sqft.toLocaleString()} sq ft` : 'N/A'}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
