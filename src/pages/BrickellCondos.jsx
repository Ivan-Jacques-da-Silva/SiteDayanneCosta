
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './BrickellCondos.module.css';

const BrickellCondos = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: '',
    condominiums: '',
    sortBy: 'price-desc'
  });

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/brickell-condos-1m`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        // Apply filters to the data
        let filteredData = data;
        
        // Price filters
        if (filters.priceMin || filters.priceMax) {
          filteredData = filteredData.filter(property => {
            const price = parseInt(property.price.replace(/[$,]/g, ''));
            const minPrice = filters.priceMin ? parseInt(filters.priceMin) : 0;
            const maxPrice = filters.priceMax ? parseInt(filters.priceMax) : Infinity;
            return price >= minPrice && price <= maxPrice;
          });
        }
        
        // Bedrooms filter
        if (filters.bedrooms) {
          filteredData = filteredData.filter(property => {
            const beds = parseInt(property.beds) || 0;
            return beds >= parseInt(filters.bedrooms);
          });
        }
        
        // Bathrooms filter
        if (filters.bathrooms) {
          filteredData = filteredData.filter(property => {
            const baths = parseInt(property.baths) || 0;
            return baths >= parseInt(filters.bathrooms);
          });
        }
        
        // Sort data
        if (filters.sortBy === 'price-asc') {
          filteredData.sort((a, b) => {
            const priceA = parseInt(a.price.replace(/[$,]/g, ''));
            const priceB = parseInt(b.price.replace(/[$,]/g, ''));
            return priceA - priceB;
          });
        } else if (filters.sortBy === 'sqft-desc') {
          filteredData.sort((a, b) => {
            const sqftA = parseInt(a.sqft.replace(/,/g, '')) || 0;
            const sqftB = parseInt(b.sqft.replace(/,/g, '')) || 0;
            return sqftB - sqftA;
          });
        } else if (filters.sortBy === 'bedrooms-desc') {
          filteredData.sort((a, b) => {
            const bedsA = parseInt(a.beds) || 0;
            const bedsB = parseInt(b.beds) || 0;
            return bedsB - bedsA;
          });
        }
        
        setProperties(filteredData);
      } else {
        console.error('API Error: Invalid data format');
        setProperties([]);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <Header />
      <div className={styles.brickellCondos}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumbSection}>
          <div className={styles.container}>
            <div className={styles.breadcrumb}>
              <span>Home</span> / <span>Brickell Condos +1M</span>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className={styles.filtersSection}>
          <div className={styles.container}>
            <div className={styles.filtersRow}>
              <div className={styles.filterGroup}>
                <select 
                  name="priceMin" 
                  value={filters.priceMin} 
                  onChange={handleFilterChange}
                  className={styles.filterSelect}
                >
                  <option value="">$1M - Any Price</option>
                  <option value="1000000">$1M+</option>
                  <option value="2000000">$2M+</option>
                  <option value="3000000">$3M+</option>
                  <option value="5000000">$5M+</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <select 
                  name="bedrooms" 
                  value={filters.bedrooms} 
                  onChange={handleFilterChange}
                  className={styles.filterSelect}
                >
                  <option value="">Any Bed(s)</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <select 
                  name="bathrooms" 
                  value={filters.bathrooms} 
                  onChange={handleFilterChange}
                  className={styles.filterSelect}
                >
                  <option value="">Any Bath(s)</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <select 
                  name="condominiums" 
                  value={filters.condominiums} 
                  onChange={handleFilterChange}
                  className={styles.filterSelect}
                >
                  <option value="">Condominiums</option>
                  <option value="luxury">Luxury</option>
                  <option value="waterfront">Waterfront</option>
                  <option value="penthouse">Penthouse</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <select className={styles.filterSelect}>
                  <option value="">More Filters</option>
                  <option value="pool">Pool</option>
                  <option value="gym">Gym</option>
                  <option value="parking">Parking</option>
                </select>
              </div>

              <button className={styles.saveSearchBtn}>
                SAVE SEARCH
              </button>
            </div>

            <div className={styles.resultsBar}>
              <div className={styles.resultsCount}>
                Showing {properties.length} of 397 Properties
              </div>
              <div className={styles.sortControls}>
                <select 
                  name="sortBy" 
                  value={filters.sortBy} 
                  onChange={handleFilterChange}
                  className={styles.sortSelect}
                >
                  <option value="price-desc">Highest Price</option>
                  <option value="price-asc">Lowest Price</option>
                  <option value="sqft-desc">Largest First</option>
                  <option value="bedrooms-desc">Most Bedrooms</option>
                </select>
                <div className={styles.viewToggle}>
                  <button className={`${styles.viewBtn} ${styles.active}`}>Grid</button>
                  <button className={styles.viewBtn}>List</button>
                  <button className={styles.viewBtn}>Map</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className={styles.propertiesSection}>
          <div className={styles.container}>
            {loading ? (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading luxury properties...</p>
              </div>
            ) : (
              <div className={styles.propertiesGrid}>
                {properties.length > 0 ? (
                  properties.map((property, index) => (
                    <div key={property.id || index} className={styles.propertyCard}>
                      <div className={styles.propertyImageContainer}>
                        <img 
                          src={property.image || `https://via.placeholder.com/400x300?text=Luxury+Condo`} 
                          alt={`Property at ${property.address}`}
                          className={styles.propertyImage}
                        />
                      </div>

                      <div className={styles.propertyContent}>
                        <div className={styles.propertyPrice}>
                          {property.price}
                        </div>

                        <div className={styles.propertyDetails}>
                          <div className={styles.propertySpecs}>
                            <span className={styles.spec}>
                              <strong>{property.beds || 'N/A'}</strong> Bed(s)
                            </span>
                            <span className={styles.spec}>
                              <strong>{property.baths || 'N/A'}</strong> Bath(s)
                            </span>
                            <span className={styles.spec}>
                              <strong>{property.sqft || 'N/A'}</strong> Sq.Ft.
                            </span>
                          </div>
                        </div>

                        <div className={styles.propertyLocation}>
                          <p>{property.address}</p>
                          <p className={styles.propertyCity}>{property.city}</p>
                        </div>

                        <div className={styles.propertyActions}>
                          <button className={styles.viewDetailsBtn}>
                            View Details
                          </button>
                          <button className={styles.favoriteBtn}>
                            ♡
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.noResults}>
                    <h3>No Properties Found</h3>
                    <p>Try adjusting your search criteria to see more results.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrickellCondos;
