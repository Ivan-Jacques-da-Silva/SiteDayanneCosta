
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './LifestyleProperties.module.css';
import PropertyListing from '../components/PropertyListing';

const LifestyleProperties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchParams, setSearchParams] = useSearchParams();

  const lifestyleCategories = [
    { 
      key: 'all', 
      label: 'All Lifestyle Properties',
      description: 'Browse all luxury lifestyle properties',
      icon: '🏖️'
    },
    { 
      key: 'waterfront', 
      label: 'Waterfront Homes',
      description: 'Luxury homes with water access',
      icon: '🌊',
      filter: (property) => property.waterfront === true
    },
    { 
      key: 'boat_docks', 
      label: 'Boat Docks',
      description: 'Properties with private boat docks',
      icon: '⛵',
      filter: (property) => property.waterfront === true && property.waterfrontDescription?.toLowerCase().includes('dock')
    },
    { 
      key: 'golf_course', 
      label: 'Golf Course',
      description: 'Properties near golf courses',
      icon: '⛳',
      filter: (property) => property.amenities?.toLowerCase().includes('golf') || 
                            property.description?.toLowerCase().includes('golf')
    },
    { 
      key: 'luxury_condos', 
      label: 'Luxury Condos',
      description: 'High-end condominium properties',
      icon: '🏢',
      filter: (property) => property.propertyType === 'LUXURY_CONDO' || property.propertyType === 'CONDO'
    }
  ];

  useEffect(() => {
    fetchProperties();
    
    // Check URL params for initial filter
    const urlFilter = searchParams.get('filter');
    if (urlFilter && lifestyleCategories.some(cat => cat.key === urlFilter)) {
      setSelectedFilter(urlFilter);
    }
  }, []);

  useEffect(() => {
    applyFilter();
  }, [properties, selectedFilter]);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://0.0.0.0:5000/api/properties-by-category?category=LIFESTYLE_PROPERTIES');
      if (response.ok) {
        const data = await response.json();
        setProperties(data.properties || []);
      }
    } catch (error) {
      console.error('Error fetching lifestyle properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = () => {
    if (selectedFilter === 'all') {
      setFilteredProperties(properties);
      return;
    }

    const category = lifestyleCategories.find(cat => cat.key === selectedFilter);
    if (category && category.filter) {
      const filtered = properties.filter(category.filter);
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(properties);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Loading lifestyle properties...</div>
      </div>
    );
  }

  return (
    <div className={styles.lifestylePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Lifestyle Properties</h1>
          <p>Discover luxury properties that match your lifestyle</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.categoryGrid}>
            {lifestyleCategories.map((category) => (
              <div
                key={category.key}
                className={`${styles.categoryCard} ${
                  selectedFilter === category.key ? styles.active : ''
                }`}
                onClick={() => {
                  setSelectedFilter(category.key);
                  // Update URL params
                  if (category.key === 'all') {
                    setSearchParams({});
                  } else {
                    setSearchParams({ filter: category.key });
                  }
                }}
              >
                <div className={styles.categoryIcon}>{category.icon}</div>
                <h3>{category.label}</h3>
                <p>{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className={styles.propertiesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>
                {lifestyleCategories.find(cat => cat.key === selectedFilter)?.label || 'Lifestyle Properties'}
              </h2>
              <p className={styles.resultCount}>
                {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
              </p>
            </div>
            
            <div className={styles.viewControls}>
              <button
                className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <i className="fas fa-th-large"></i>
              </button>
              <button
                className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
                onClick={() => setViewMode('list')}
              >
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>

          {filteredProperties.length > 0 ? (
            <PropertyListing 
              properties={filteredProperties} 
              viewMode={viewMode}
              showMap={false}
            />
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🏖️</div>
              <h3>No properties found</h3>
              <p>Try selecting a different lifestyle category or check back later for new listings.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LifestyleProperties;
