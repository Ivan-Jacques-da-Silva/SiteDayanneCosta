
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
  const backgroundColor = '#1e3a8a'; // Azul escuro
  const borderColor = isSelected ? '#1e40af' : '#1e3a8a'; // Azul mais claro quando selecionado
  const borderWidth = isSelected ? 3 : 2;
  const dotSize = isSelected ? 10 : 8; // Bolinha menor

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${backgroundColor};
        border: ${borderWidth}px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        position: relative;
      ">
        <div style="
          width: ${dotSize}px;
          height: ${dotSize}px;
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
  const [showPropertyPopup, setShowPropertyPopup] = useState(false);
  const [popupProperty, setPopupProperty] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState(selectedPropertyId);

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

  // Update selectedId when prop changes
  useEffect(() => {
    setSelectedId(selectedPropertyId);
  }, [selectedPropertyId]);

  // Update map center and zoom when selectedId changes
  useEffect(() => {
    if (selectedId && validProperties.length > 0) {
      const selectedProperty = validProperties.find(p => p.id === selectedId);
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
  }, [selectedId, validProperties.length]);

  const handleMarkerClick = useCallback((property, event) => {
    if (property && property.id) {
      setPopupProperty(property);
      setSelectedId(property.id);
      
      // Get mouse/click position for popup placement
      if (event && event.containerPoint) {
        setPopupPosition({
          x: event.containerPoint.x,
          y: event.containerPoint.y
        });
      }
      
      setShowPropertyPopup(true);
    }
  }, []);

  const handleViewDetails = useCallback((property) => {
    if (onPropertySelect && property && property.id) {
      onPropertySelect(property.id);
      setShowPropertyPopup(false);
    }
  }, [onPropertySelect]);

  const handleClosePopup = useCallback(() => {
    setShowPropertyPopup(false);
    setPopupProperty(null);
  }, []);

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
          const isSelected = property.id === selectedId;
          const position = [parseFloat(property.latitude), parseFloat(property.longitude)];

          return (
            <Marker
              key={`marker-${property.id}`}
              position={position}
              icon={createCustomIcon(isSelected, null, useSimpleMarker)}
              eventHandlers={{
                click: (e) => handleMarkerClick(property, e)
              }}
              zIndexOffset={isSelected ? 1000 : 0}
            />
          );
        })}
      </MapContainer>

      {/* Floating Property Popup */}
      {showPropertyPopup && popupProperty && (
        <div 
          className={styles.floatingPopup}
          style={{
            left: `${popupPosition.x}px`,
            top: `${popupPosition.y - 20}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <button 
            className={styles.closePopupBtn}
            onClick={handleClosePopup}
          >
            ×
          </button>
          
          <div className={styles.floatingPopupContent}>
            <div className={styles.popupImageContainer}>
              <img
                src={popupProperty.imageUrl || popupProperty.image || '/default.png'}
                alt={popupProperty.title || popupProperty.address || 'Property'}
                className={styles.floatingPopupImage}
                onError={(e) => {
                  e.target.src = '/default.png';
                }}
              />
              {popupProperty.featured && (
                <div className={styles.featuredBadge}>⭐ Featured</div>
              )}
            </div>
            
            <div className={styles.floatingPopupInfo}>
              <div className={styles.floatingPopupPrice}>
                {formatPrice(popupProperty.price)}
              </div>
              
              {popupProperty.title && (
                <div className={styles.floatingPopupTitle}>
                  {popupProperty.title}
                </div>
              )}
              
              <div className={styles.floatingPopupAddress}>
                {popupProperty.address || 'Address not available'}
              </div>
              
              <div className={styles.floatingPopupCity}>
                {popupProperty.city || 'City'}, {popupProperty.state || 'State'} {popupProperty.zipCode || ''}
              </div>
              
              <div className={styles.floatingPopupSpecs}>
                {popupProperty.bedrooms || popupProperty.beds || 'N/A'} beds •{' '}
                {popupProperty.bathrooms || popupProperty.baths || 'N/A'} baths •{' '}
                {popupProperty.sqft ? `${popupProperty.sqft.toLocaleString()} sq ft` : 'N/A'}
                {popupProperty.yearBuilt && ` • Built ${popupProperty.yearBuilt}`}
              </div>
              
              {popupProperty.propertyType && (
                <div className={styles.floatingPopupType}>
                  Type: {popupProperty.propertyType}
                </div>
              )}
              
              {popupProperty.description && (
                <div className={styles.floatingPopupDescription}>
                  {popupProperty.description.substring(0, 120)}
                  {popupProperty.description.length > 120 && '...'}
                </div>
              )}
              
              <button 
                className={styles.viewDetailsButton}
                onClick={() => handleViewDetails(popupProperty)}
              >
                View Details
              </button>
            </div>
          </div>
          
          {/* Popup arrow */}
          <div className={styles.popupArrow}></div>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;
