
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MAPS_CONFIG, getGoogleMapsApiKey, isGoogleMapsConfigured } from '../config/maps';
import styles from './PropertyMap.module.css';

const PropertyMap = ({ properties, selectedPropertyId, onPropertySelect }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const GOOGLE_MAPS_API_KEY = getGoogleMapsApiKey();

  useEffect(() => {
    initializeMap();
  }, []);

  useEffect(() => {
    if (map && properties.length > 0) {
      updateMarkers();
    }
  }, [map, properties]);

  useEffect(() => {
    if (map && selectedPropertyId) {
      centerOnSelectedProperty();
    }
  }, [selectedPropertyId, map]);

  const initializeMap = async () => {
    if (!mapRef.current) return;

    try {
      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places']
      });

      await loader.load();

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: MAPS_CONFIG.DEFAULT_ZOOM,
        center: MAPS_CONFIG.DEFAULT_CENTER,
        mapTypeId: 'roadmap',
        styles: MAPS_CONFIG.MAP_STYLES
      });

      setMap(mapInstance);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading Google Maps:', error);
      setIsLoading(false);
    }
  };

  const updateMarkers = () => {
    if (!map || !window.google) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers = [];

    // Create bounds to fit all markers
    const bounds = new window.google.maps.LatLngBounds();

    properties.forEach(property => {
      if (property.latitude && property.longitude) {
        const position = {
          lat: parseFloat(property.latitude),
          lng: parseFloat(property.longitude)
        };

        const isSelected = property.id === selectedPropertyId;

        const marker = new window.google.maps.Marker({
          position,
          map,
          title: property.address,
          icon: {
            url: isSelected 
              ? 'data:image/svg+xml;base64,' + btoa(`
                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="12" fill="#ff0000" stroke="#ffffff" stroke-width="3"/>
                  <text x="16" y="20" font-family="Arial" font-size="12" font-weight="bold" fill="white" text-anchor="middle">$</text>
                </svg>
              `)
              : 'data:image/svg+xml;base64,' + btoa(`
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="#0066cc" stroke="#ffffff" stroke-width="2"/>
                  <text x="12" y="16" font-family="Arial" font-size="10" font-weight="bold" fill="white" text-anchor="middle">$</text>
                </svg>
              `),
            scaledSize: new window.google.maps.Size(isSelected ? 32 : 24, isSelected ? 32 : 24)
          },
          zIndex: isSelected ? 1000 : 100
        });

        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="${styles.infoWindow}">
              <img src="${property.image || '/src/assets/img/testesImagens.jpeg'}" 
                   alt="${property.address}" 
                   class="${styles.infoImage}" />
              <div class="${styles.infoContent}">
                <div class="${styles.infoPrice}">
                  ${property.price ? `$${property.price.toLocaleString()}` : 'Price on request'}
                </div>
                <div class="${styles.infoAddress}">${property.address}</div>
                <div class="${styles.infoCity}">${property.city}, ${property.state}</div>
                <div class="${styles.infoSpecs}">
                  ${property.bedrooms || property.beds || 'N/A'} beds • 
                  ${property.bathrooms || property.baths || 'N/A'} baths • 
                  ${property.sqft ? `${property.sqft.toLocaleString()} sq ft` : 'N/A'}
                </div>
              </div>
            </div>
          `
        });

        marker.addListener('click', () => {
          // Close all other info windows
          markers.forEach(m => {
            if (m.infoWindow) {
              m.infoWindow.close();
            }
          });
          
          // Open this info window
          infoWindow.open(map, marker);
          
          // Notify parent component
          if (onPropertySelect) {
            onPropertySelect(property.id);
          }
        });

        marker.infoWindow = infoWindow;
        newMarkers.push(marker);
        bounds.extend(position);
      }
    });

    setMarkers(newMarkers);

    // Fit map to show all markers
    if (newMarkers.length > 0) {
      if (newMarkers.length === 1) {
        map.setCenter(newMarkers[0].getPosition());
        map.setZoom(MAPS_CONFIG.SELECTED_ZOOM);
      } else {
        map.fitBounds(bounds);
        const listener = window.google.maps.event.addListener(map, 'idle', () => {
          if (map.getZoom() > 16) map.setZoom(16);
          window.google.maps.event.removeListener(listener);
        });
      }
    }
  };

  const centerOnSelectedProperty = () => {
    if (!map || !selectedPropertyId) return;

    const selectedProperty = properties.find(p => p.id === selectedPropertyId);
    if (selectedProperty && selectedProperty.latitude && selectedProperty.longitude) {
      const position = {
        lat: parseFloat(selectedProperty.latitude),
        lng: parseFloat(selectedProperty.longitude)
      };
      
      map.panTo(position);
      map.setZoom(MAPS_CONFIG.SELECTED_ZOOM);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.mapContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mapContainer}>
      <div ref={mapRef} className={styles.map} />
      {!isGoogleMapsConfigured() && (
        <div className={styles.apiKeyWarning}>
          <p>⚠️ Google Maps API key not configured</p>
          <p>Add VITE_GOOGLE_MAPS_API_KEY to your environment variables</p>
          <p>Get your API key at: console.cloud.google.com</p>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;
