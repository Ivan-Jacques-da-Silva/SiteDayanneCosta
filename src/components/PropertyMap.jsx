import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MAPS_CONFIG } from '../config/maps';
import styles from './PropertyMap.module.css';
import 'leaflet/dist/leaflet.css';

// Force CSS load check
if (typeof window !== 'undefined') {
  // Ensure leaflet CSS is properly loaded
  const leafletCSS = document.querySelector('link[href*="leaflet"]');
  if (!leafletCSS) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
  }
}

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

const PropertyMap = ({ properties = [], selectedPropertyId, onPropertySelect, useSimpleMarker = false, hidePopup = false, onListPropertyClick }) => {
  const [mapCenter, setMapCenter] = useState(MAPS_CONFIG.DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(MAPS_CONFIG.DEFAULT_ZOOM);
  const [showPropertyPopup, setShowPropertyPopup] = useState(false);
  const [popupProperty, setPopupProperty] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState(selectedPropertyId);

  // Detectar automaticamente se estamos em uma página de detalhes
  const isDetailPage = useMemo(() => {
    if (hidePopup) return true;

    // Detectar pela URL se estamos na página de detalhes
    const currentPath = window.location.pathname;
    const isOnDetailPage = currentPath.includes('/property/');

    // Ou detectar se temos apenas uma propriedade (página de detalhes)
    const isSingleProperty = properties.length === 1;

    return isOnDetailPage || isSingleProperty;
  }, [hidePopup, properties.length]);

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
    if (property && property.id && !isDetailPage) {
      // Se já há um popup aberto e é de uma propriedade diferente, feche primeiro
      if (showPropertyPopup && popupProperty && popupProperty.id !== property.id) {
        setShowPropertyPopup(false);
        setPopupProperty(null);
        // Pequeno delay para a animação de fechamento
        setTimeout(() => {
          setPopupProperty(property);
          setSelectedId(property.id);
          setShowPropertyPopup(true);
        }, 100);
      } else {
        setPopupProperty(property);
        setSelectedId(property.id);
        setShowPropertyPopup(true);
      }

      // Get marker position for popup placement with boundary checking
      if (event && event.containerPoint) {
        const containerPoint = event.containerPoint;
        const mapContainer = event.target._map.getContainer();
        const containerWidth = mapContainer.clientWidth;
        const containerHeight = mapContainer.clientHeight;

        // Popup dimensions (approximate)
        const popupWidth = window.innerWidth <= 768 ? 320 : 400;
        const popupHeight = window.innerWidth <= 768 ? 120 : 140;

        // Calculate position with boundaries - mais próximo do marcador (10px acima)
        let x = containerPoint.x;
        let y = containerPoint.y - popupHeight - 10; // 10px acima do marcador (mais próximo)

        // Adjust horizontal position if popup would go off screen
        if (x - popupWidth / 2 < 10) {
          x = popupWidth / 2 + 10;
        } else if (x + popupWidth / 2 > containerWidth - 10) {
          x = containerWidth - popupWidth / 2 - 10;
        }

        // Adjust vertical position if popup would go off top
        if (y < 10) {
          y = containerPoint.y + 40; // Show below marker instead (mais próximo)
        }

        setPopupPosition({ x, y });
      }
    }
  }, [isDetailPage, showPropertyPopup, popupProperty]);

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

  const handlePropertySelect = (propertyId) => {
    setSelectedPropertyId(propertyId);
  };

  // Nova função para lidar com clique nas propriedades da lista
  const handleListPropertyClick = useCallback((property) => {
    if (property && property.id && !isDetailPage) {
      // Feche o popup atual se estiver aberto
      if (showPropertyPopup) {
        setShowPropertyPopup(false);
        setPopupProperty(null);
      }

      // Atualize a propriedade selecionada
      setSelectedId(property.id);

      // Centralize o mapa na nova propriedade
      const newCenter = [parseFloat(property.latitude), parseFloat(property.longitude)];
      setMapCenter(newCenter);
      setMapZoom(MAPS_CONFIG.SELECTED_ZOOM);

      // Pequeno delay para permitir que o mapa atualize e depois abra o novo popup
      setTimeout(() => {
        setPopupProperty(property);
        setShowPropertyPopup(true);

        // Calcule uma posição aproximada para o popup baseada no centro do mapa
        const mapContainer = document.querySelector('.leaflet-container');
        if (mapContainer) {
          const containerWidth = mapContainer.clientWidth;
          const containerHeight = mapContainer.clientHeight;
          const centerX = containerWidth / 2;
          const centerY = containerHeight / 2;

          // Popup dimensions
          const popupWidth = window.innerWidth <= 768 ? 320 : 400;
          const popupHeight = window.innerWidth <= 768 ? 120 : 140;

          // Position popup above center (where marker should be)
          let x = centerX;
          let y = centerY - popupHeight - 10;

          // Boundary checks
          if (x - popupWidth / 2 < 10) {
            x = popupWidth / 2 + 10;
          } else if (x + popupWidth / 2 > containerWidth - 10) {
            x = containerWidth - popupWidth / 2 - 10;
          }

          if (y < 10) {
            y = centerY + 40;
          }

          setPopupPosition({ x, y });
        }
      }, 300);
    }
  }, [isDetailPage, showPropertyPopup]);


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
        style={{ height: '100%', width: '100%', minHeight: '400px' }}
        whenReady={() => {
          console.log('Map is ready');
        }}
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
      {showPropertyPopup && popupProperty && !isDetailPage && (
        <div
          className={styles.floatingPopup}
          style={{
            left: `${popupPosition.x}px`,
            top: `${popupPosition.y}px`,
            transform: 'translateX(-50%)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className={styles.closePopupBtn}
            onClick={handleClosePopup}
            title="Fechar"
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
            </div>

            <div className={styles.floatingPopupInfo}>
              <div className={styles.floatingPopupPrice}>
                {formatPrice(popupProperty.price)}
              </div>

              <div className={styles.floatingPopupDescription}>
                {popupProperty.bedrooms || popupProperty.beds || 'N/A'} beds • {popupProperty.bathrooms || popupProperty.baths || 'N/A'} baths • {popupProperty.sqft ? `${popupProperty.sqft.toLocaleString()} sq ft` : 'N/A'}
              </div>

              <button
                className={styles.viewDetailsButton}
                onClick={() => handleViewDetails(popupProperty)}
              >
                View Details
              </button>
            </div>
          </div>

          <div className={styles.popupArrow}></div>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;