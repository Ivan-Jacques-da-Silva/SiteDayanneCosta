import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './BrickellCondos.module.css';

const BrickellCondos = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    sortBy: 'price-desc',
    propertyType: '',
    sqft: ''
  });

  // Fetch data from API
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/brickell-condos-1m');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProperties(data);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredProperties = properties.filter(property => {
    const price = parseInt(property.price.replace(/[$,]/g, ''));
    const minPrice = filters.minPrice ? parseInt(filters.minPrice) : 0;
    const maxPrice = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;

    if (price < minPrice || price > maxPrice) return false;
    if (filters.bedrooms && parseInt(property.beds) < parseInt(filters.bedrooms)) return false;
    if (filters.bathrooms && parseInt(property.baths) < parseInt(filters.bathrooms)) return false;

    return true;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const priceA = parseInt(a.price.replace(/[$,]/g, ''));
    const priceB = parseInt(b.price.replace(/[$,]/g, ''));

    switch (filters.sortBy) {
      case 'price-asc':
        return priceA - priceB;
      case 'price-desc':
        return priceB - priceA;
      case 'newest':
        return a.daysOnMarket - b.daysOnMarket;
      case 'oldest':
        return b.daysOnMarket - a.daysOnMarket;
      default:
        return priceB - priceA;
    }
  });

  return (
    <div className="ip ip-theme-compass">
      <Header />

      <main id="flex-filters-theme">
        {/* Breadcrumb */}
        <div className="gwr gwr-breadcrumb">
          <div className="flex-breadcrumb">
            <ol>
              <li><a href="/" title="Home">Home</a></li>
              <li>Brickell condos +1M</li>
            </ol>
          </div>
        </div>

        {/* Filters Section */}
        <div id="wrap-filters">
          <div className="gwr">
            <div id="all-filters">
              <div id="mini-filters">
                <li className="filter-box">
                  <div className="wrap-item">
                    <div className="wrap-select">
                      <select 
                        value={filters.propertyType}
                        onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                      >
                        <option value="">Property Type</option>
                        <option value="condo">Condo</option>
                        <option value="house">House</option>
                        <option value="townhouse">Townhouse</option>
                      </select>
                    </div>
                  </div>
                </li>

                <li className="filter-box">
                  <div className="wrap-item">
                    <div className="wrap-select">
                      <select 
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      >
                        <option value="">Min Price</option>
                        <option value="1000000">$1,000,000</option>
                        <option value="2000000">$2,000,000</option>
                        <option value="5000000">$5,000,000</option>
                        <option value="10000000">$10,000,000</option>
                        <option value="20000000">$20,000,000</option>
                      </select>
                    </div>
                  </div>
                </li>

                <li className="filter-box">
                  <div className="wrap-item">
                    <div className="wrap-select">
                      <select 
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      >
                        <option value="">Max Price</option>
                        <option value="2000000">$2,000,000</option>
                        <option value="5000000">$5,000,000</option>
                        <option value="10000000">$10,000,000</option>
                        <option value="20000000">$20,000,000</option>
                        <option value="50000000">$50,000,000</option>
                      </select>
                    </div>
                  </div>
                </li>

                <li className="filter-box">
                  <div className="wrap-item">
                    <div className="wrap-select">
                      <select 
                        value={filters.bedrooms}
                        onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                      >
                        <option value="">Beds</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                      </select>
                    </div>
                  </div>
                </li>

                <li className="filter-box">
                  <div className="wrap-item">
                    <div className="wrap-select">
                      <select 
                        value={filters.bathrooms}
                        onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                      >
                        <option value="">Baths</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                      </select>
                    </div>
                  </div>
                </li>

                <li className="filter-box">
                  <div className="wrap-item">
                    <div className="wrap-select">
                      <select 
                        value={filters.sqft}
                        onChange={(e) => handleFilterChange('sqft', e.target.value)}
                      >
                        <option value="">Square Feet</option>
                        <option value="1000">1,000+ sqft</option>
                        <option value="2000">2,000+ sqft</option>
                        <option value="3000">3,000+ sqft</option>
                        <option value="5000">5,000+ sqft</option>
                      </select>
                    </div>
                  </div>
                </li>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Filters */}
        <div id="wrap-subfilters">
          <div className="gwr">
            <div id="sub-filters">
              <li id="filter-views">
                <ul>
                  <li className="grid active">Grid</li>
                  <li className="list">List</li>
                  <li className="map">Map</li>
                </ul>
              </li>
              <li className="order-by">
                <select 
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  <option value="price-desc">Price (High to Low)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </li>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="wrap-result view-grid">
          <div className="gwr">
            <div className="nav-results">
              <span className="total-results">
                {sortedProperties.length} Properties Found
              </span>
              <button 
                className="refresh-btn"
                onClick={fetchProperties}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading properties...</p>
              </div>
            )}

            {/* Properties Grid */}
            <div id="result-search">
              {sortedProperties.map((property) => (
                <div key={property.id} className="propertie">
                  <div className="wrap-slider">
                    <div className="slider-container">
                      <img 
                        src={property.image} 
                        alt={property.address}
                        className="property-image"
                      />
                    </div>
                    <div className="status-badge">{property.status}</div>
                    <div className="days-market">{property.daysOnMarket} days</div>
                  </div>

                  <div className="property-details">
                    <div className="price">{property.price}</div>
                    <div className="address">{property.address}</div>
                    <div className="city">{property.city}</div>

                    <div className="property-info">
                      <span className="beds">{property.beds} Beds</span>
                      <span className="baths">{property.baths} Baths</span>
                      <span className="sqft">{property.sqft} Sqft</span>
                    </div>

                    {property.development !== 'N/A' && (
                      <div className="development">{property.development}</div>
                    )}

                    {property.pricePerSqft !== 'N/A' && (
                      <div className="price-per-sqft">{property.pricePerSqft} per sqft</div>
                    )}
                  </div>

                  <div className="property-actions">
                    <button className="btn-details">View Details</button>
                    <button className="btn-contact">Contact Agent</button>
                    <button className="btn-favorite">♡</button>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {!loading && sortedProperties.length === 0 && (
              <div className="no-results">
                <h3>No properties found</h3>
                <p>Try adjusting your search criteria</p>
              </div>
            )}

            {/* Load More */}
            {sortedProperties.length > 0 && (
              <div className="load-more-container">
                <button className="btn-load-more">Load More Properties</button>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="gwr">
            <h3>Looking for something specific?</h3>
            <p>Contact Dayanne Costa for personalized assistance</p>
            <div className="cta-buttons">
              <button className="btn-contact-agent">Contact Agent</button>
              <button className="btn-advanced-search">Advanced Search</button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BrickellCondos;