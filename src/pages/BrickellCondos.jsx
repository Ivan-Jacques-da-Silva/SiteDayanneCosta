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
    sortBy: 'price-desc'
  });

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      if (filters.priceMin) queryParams.append('priceMin', filters.priceMin);
      if (filters.priceMax) queryParams.append('priceMax', filters.priceMax);
      if (filters.bedrooms) queryParams.append('bedrooms', filters.bedrooms);
      if (filters.bathrooms) queryParams.append('bathrooms', filters.bathrooms);
      queryParams.append('sortBy', filters.sortBy);

      const response = await fetch(`http://localhost:3001/api/properties?${queryParams.toString()}`);
      const data = await response.json();

      if (data.success) {
        setProperties(data.properties || []);
      } else {
        console.error('API Error:', data.error);
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

  const formatPrice = (price) => {
    if (!price) return 'Price Upon Request';
    const numPrice = parseInt(price.replace(/[^0-9]/g, ''));
    if (numPrice >= 1000000) {
      return `$${(numPrice / 1000000).toFixed(1)}M`;
    } else if (numPrice >= 1000) {
      return `$${(numPrice / 1000).toFixed(0)}K`;
    }
    return `$${numPrice.toLocaleString()}`;
  };

  const formatSqFt = (sqft) => {
    if (!sqft) return '';
    return sqft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <Header />
      <div className={styles.brickellCondos}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <span>Home</span> / <span>Brickell Condos +1M</span>
          </div>
          <h1 className={styles.pageTitle}>Brickell Condos Over $1 Million</h1>
          <p className={styles.pageDescription}>
            Discover luxury condominium living in the heart of Brickell. These exclusive properties 
            offer world-class amenities, stunning city and water views, and prime location access.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className={styles.filtersSection}>
        <div className={styles.container}>
          <div className={styles.filtersWrapper}>
            <div className={styles.filterGroup}>
              <label>Price Range</label>
              <div className={styles.priceInputs}>
                <select 
                  name="priceMin" 
                  value={filters.priceMin} 
                  onChange={handleFilterChange}
                  className={styles.filterSelect}
                >
                  <option value="">Min Price</option>
                  <option value="1000000">$1M+</option>
                  <option value="2000000">$2M+</option>
                  <option value="3000000">$3M+</option>
                  <option value="5000000">$5M+</option>
                </select>
                <select 
                  name="priceMax" 
                  value={filters.priceMax} 
                  onChange={handleFilterChange}
                  className={styles.filterSelect}
                >
                  <option value="">Max Price</option>
                  <option value="2000000">$2M</option>
                  <option value="3000000">$3M</option>
                  <option value="5000000">$5M</option>
                  <option value="10000000">$10M+</option>
                </select>
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label>Bedrooms</label>
              <select 
                name="bedrooms" 
                value={filters.bedrooms} 
                onChange={handleFilterChange}
                className={styles.filterSelect}
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Bathrooms</label>
              <select 
                name="bathrooms" 
                value={filters.bathrooms} 
                onChange={handleFilterChange}
                className={styles.filterSelect}
              >
                <option value="">Any</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Sort By</label>
              <select 
                name="sortBy" 
                value={filters.sortBy} 
                onChange={handleFilterChange}
                className={styles.filterSelect}
              >
                <option value="price-desc">Price High to Low</option>
                <option value="price-asc">Price Low to High</option>
                <option value="sqft-desc">Largest First</option>
                <option value="bedrooms-desc">Most Bedrooms</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className={styles.resultsSection}>
        <div className={styles.container}>
          <div className={styles.resultsHeader}>
            <h2>
              {loading ? 'Loading...' : `${properties.length} Properties Found`}
            </h2>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading luxury properties...</p>
            </div>
          ) : (
            <div className={styles.propertiesGrid}>
              {properties.length > 0 ? (
                properties.map((property, index) => (
                  <div key={property.listingID || index} className={styles.propertyCard}>
                    <div className={styles.propertyImageContainer}>
                      <img 
                        src={`https://via.placeholder.com/400x300?text=Luxury+Condo`} 
                        alt={`Property in ${property.cityName}`}
                        className={styles.propertyImage}
                      />
                      <div className={styles.propertyBadge}>
                        {property.propStatus || 'Active'}
                      </div>
                    </div>

                    <div className={styles.propertyContent}>
                      <div className={styles.propertyPrice}>
                        {formatPrice(property.listPrice)}
                      </div>

                      <div className={styles.propertyDetails}>
                        <div className={styles.propertySpecs}>
                          <span className={styles.spec}>
                            <strong>{property.bedrooms || 'N/A'}</strong> Beds
                          </span>
                          <span className={styles.spec}>
                            <strong>{property.fullBaths || 'N/A'}</strong> Baths
                          </span>
                          <span className={styles.spec}>
                            <strong>{formatSqFt(property.sqFt) || 'N/A'}</strong> SqFt
                          </span>
                        </div>
                      </div>

                      <div className={styles.propertyLocation}>
                        <p>{property.cityName || 'Brickell'}, {property.state || 'FL'}</p>
                        <p className={styles.propertyCounty}>{property.countyName || 'Miami-Dade'}</p>
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

      {/* Call to Action Section */}
      <div className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to Find Your Dream Home?</h2>
            <p>Contact our luxury real estate specialists for personalized assistance</p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryBtn}>Schedule Viewing</button>
              <button className={styles.secondaryBtn}>Get Market Report</button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrickellCondos;