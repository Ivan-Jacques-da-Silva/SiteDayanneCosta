
import React, { useEffect, useState, useMemo, useCallback } from 'react';
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

// Create custom icons - memoized to prevent recreation
const createCustomIcon = (isSelected = false, propertyImage = null, useSimpleMarker = false) => {
  const size = isSelected ? 32 : 26;
  const borderColor = isSelected ? '#dc2626' : '#ef4444'; // Vermelho forte quando selecionado, vermelho normal quando não
  const borderWidth = isSelected ? 3 : 2;

  // Simple red marker with white dot
  if (useSimpleMarker) {
    return L.divIcon({
      className: 'simple-marker',
      html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          background-color: #dc2626;
          border: 2px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          position: relative;
        ">
          <div style="
            width: 8px;
            height: 8px;
            background-color: white;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
          "></div>
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size],
    });
  }

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        border: ${borderWidth}px solid ${borderColor};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        position: relative;
        background-color: white;
      ">
        <img 
          src="${propertyImage || '/src/assets/img/testesImagens.jpeg'}" 
          alt="Property" 
          style="
            width: 100%;
            height: 100%;
            object-fit: cover;
            transform: rotate(45deg) scale(1.4);
            transform-origin: center;
          "
          onerror="this.src='/src/assets/img/testesImagens.jpeg';"
        />
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
};

// Component to handle map center changes
const MapController = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (center && center.length === 2 && !isNaN(center[0]) && !isNaN(center[1])) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
};

const PropertyMap = ({ properties = [], selectedPropertyId, onPropertySelect, useSimpleMarker = false }) => {
  const [mapCenter, setMapCenter] = useState(MAPS_CONFIG.DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(MAPS_CONFIG.DEFAULT_ZOOM);

  // Memoize valid properties to prevent recalculation on every render
  const validProperties = useMemo(() => {
    if (!Array.isArray(properties)) return [];
    return properties.filter(p => 
      p && 
      p.latitude && 
      p.longitude && 
      !isNaN(parseFloat(p.latitude)) && 
      !isNaN(parseFloat(p.longitude))
    );
  }, [properties]);

  // Update map center and zoom when selectedPropertyId changes
  useEffect(() => {
    if (selectedPropertyId && validProperties.length > 0) {
      const selectedProperty = validProperties.find(p => p.id === selectedPropertyId);
      if (selectedProperty) {
        const newCenter = [parseFloat(selectedProperty.latitude), parseFloat(selectedProperty.longitude)];
        setMapCenter(newCenter);
        setMapZoom(MAPS_CONFIG.SELECTED_ZOOM);
      }
    } else if (validProperties.length === 1) {
      const property = validProperties[0];
      const newCenter = [parseFloat(property.latitude), parseFloat(property.longitude)];
      setMapCenter(newCenter);
      setMapZoom(MAPS_CONFIG.SELECTED_ZOOM);
    } else if (validProperties.length === 0) {
      setMapCenter(MAPS_CONFIG.DEFAULT_CENTER);
      setMapZoom(MAPS_CONFIG.DEFAULT_ZOOM);
    }
  }, [selectedPropertyId, validProperties.length]);

  const handleMarkerClick = useCallback((property) => {
    if (onPropertySelect && property && property.id) {
      onPropertySelect(property.id);
    }
  }, [onPropertySelect]);

  const formatPrice = useCallback((price) => {
    if (!price) return 'Price on request';
    const numericPrice = typeof price === 'string' ? parseInt(price.replace(/[$,]/g, '')) : price;
    if (isNaN(numericPrice)) return 'Price on request';
    return '$' + numericPrice.toLocaleString();
  }, []);

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
              key={`marker-${property.id}`}
              position={position}
              icon={createCustomIcon(isSelected, property.imageUrl, useSimpleMarker)}
              eventHandlers={{
                click: () => handleMarkerClick(property)
              }}
              zIndexOffset={isSelected ? 1000 : 0}
            >
              <Popup>
                <div className={styles.popupContent}>
                  <img
                    src={property.imageUrl || '/src/assets/img/testesImagens.jpeg'}
                    alt={property.address || 'Property'}
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
                      {property.address || 'Address not available'}
                    </div>
                    <div className={styles.popupCity}>
                      {property.city || 'City'}, {property.state || 'State'}
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
