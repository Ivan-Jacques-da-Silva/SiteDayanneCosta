import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './BrickellCondos.module.css';

const BrickellCondos = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // Default view mode is grid
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [filters, setFilters] = useState({
    priceRange: [0, 50000000], // Initial price range
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
        filteredData = filteredData.filter(property => {
          const price = parseInt(property.price.replace(/[$,]/g, ''));
          return price >= filters.priceRange[0] && price <= filters.priceRange[1];
        });

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
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    const newPriceRange = [...filters.priceRange];
    if (name === 'priceMin') {
      newPriceRange[0] = parseInt(value);
    } else if (name === 'priceMax') {
      newPriceRange[1] = parseInt(value);
    }
    setFilters(prev => ({
      ...prev,
      priceRange: newPriceRange
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Function to format price with commas and $ sign
  const formatPrice = (price) => {
    return '$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Pagination calculations
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className={styles.paginationBtn}
        >
          ‹
        </button>
      );
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${styles.paginationBtn} ${i === currentPage ? styles.active : ''}`}
        >
          {i}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className={styles.paginationBtn}
        >
          ›
        </button>
      );
    }

    return (
      <div className={styles.pagination}>
        <div className={styles.paginationInfo}>
          Showing {startIndex + 1}-{Math.min(endIndex, properties.length)} of {properties.length} properties
        </div>
        <div className={styles.paginationButtons}>
          {pages}
        </div>
      </div>
    );
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
              
              <div className={styles.priceRangeGroup}>
                <label className={styles.priceRangeLabel}>
                  Price Range: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                </label>
                <div className={styles.rangeSliders}>
                  <input
                    type="range"
                    name="priceMin"
                    min="0"
                    max="50000000"
                    step="100000"
                    value={filters.priceRange[0]}
                    onChange={handlePriceRangeChange}
                    className={styles.rangeSlider}
                  />
                  <input
                    type="range"
                    name="priceMax"
                    min="0"
                    max="50000000"
                    step="100000"
                    value={filters.priceRange[1]}
                    onChange={handlePriceRangeChange}
                    className={styles.rangeSlider}
                  />
                </div>
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
                Showing {currentProperties.length} of {properties.length} Properties (Page {currentPage} of {totalPages})
              </div>
              <div className={styles.sortControls}>
                <div className={styles.sortGroup}>
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
              </div>

              <div className={styles.viewToggle}>
                <button 
                  className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </button>
                <button 
                  className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  List
                </button>
                <button 
                  className={`${styles.viewBtn} ${viewMode === 'map' ? styles.active : ''}`}
                  onClick={() => setViewMode('map')}
                >
                  Map
                </button>
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
              <>
                {viewMode === 'grid' && (
                  <div className={styles.propertiesGrid}>
                    {currentProperties.length > 0 ? (
                      currentProperties.map((property, index) => (
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

                {viewMode === 'list' && (
                  <div className={styles.propertiesList}>
                    {currentProperties.length > 0 ? (
                      <table className={styles.propertiesTable}>
                        <thead>
                          <tr>
                            <th>Address</th>
                            <th>Price</th>
                            <th>% / $</th>
                            <th>Beds</th>
                            <th>Baths</th>
                            <th>Living Size</th>
                            <th>Price / Sq Ft.</th>
                            <th>Development / Subdivision</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentProperties.map((property, index) => (
                            <tr key={property.id || index} className={styles.propertyRow}>
                              <td>{property.address}</td>
                              <td>{property.price}</td>
                              <td>0</td>
                              <td>{property.beds || 'N/A'}</td>
                              <td>{property.baths || 'N/A'}</td>
                              <td>{property.sqft || 'N/A'}</td>
                              <td>{property.pricePerSqft || 'N/A'}</td>
                              <td>{property.development || 'N/A'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className={styles.noResults}>
                        <h3>No Properties Found</h3>
                        <p>Try adjusting your search criteria to see more results.</p>
                      </div>
                    )}
                  </div>
                )}

                {viewMode === 'map' && (
                  <div className={styles.mapView}>
                    <div className={styles.mapPropertiesList}>
                      <div className={styles.propertiesListHeader}>
                        <h3>Properties ({properties.length})</h3>
                      </div>
                      <div className={styles.mapPropertiesScroll}>
                        {currentProperties.length > 0 ? (
                          currentProperties.map((property, index) => (
                            <div key={property.id || index} className={styles.mapPropertyCard}>
                              <div className={styles.mapPropertyImage}>
                                <img 
                                  src={property.image || `https://via.placeholder.com/400x300?text=Luxury+Condo`}
                                  alt={property.address}
                                />
                              </div>
                              <div className={styles.mapPropertyContent}>
                                <div className={styles.mapPropertyPrice}>
                                  {property.price}
                                </div>
                                <div className={styles.mapPropertySpecs}>
                                  {property.beds} beds • {property.baths} baths • {property.sqft} Sq.Ft.
                                </div>
                                <div className={styles.mapPropertyAddress}>
                                  {property.address}
                                </div>
                                <div className={styles.mapPropertyCity}>
                                  {property.city}
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
                    </div>
                    <div className={styles.mapContainer}>
                      <div className={styles.mapPlaceholder}>
                        <div className={styles.mapError}>
                          <div className={styles.errorIcon}>🗺️</div>
                          <h3>Map View</h3>
                          <p>Interactive map with property locations and markers will be displayed here.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {renderPagination()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrickellCondos;