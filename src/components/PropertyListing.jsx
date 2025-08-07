import React, { useState, useEffect } from "react";
import styles from "./PropertyListing.module.css";

const PropertyListing = ({
  apiEndpoint = "/api/properties",
  title = "Properties",
  breadcrumbPath = "Properties",
  filters: customFilters = {},
  placeholderImage = "https://via.placeholder.com/400x300?text=Property",
}) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    priceRange: [0, 50000000],
    bedrooms: "",
    bathrooms: "",
    sortBy: "price-desc",
    ...customFilters,
  });

  useEffect(() => {
    fetchProperties();
  }, [filters, apiEndpoint, currentPage]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      let url = `http://0.0.0.0:5000${apiEndpoint}?page=${currentPage}&limit=${itemsPerPage}`;

      // Add filters to URL
      Object.entries(filters).forEach(([key, value]) => {
        if (
          value &&
          value !== "" &&
          key !== "yearBuilt" &&
          key !== "priceRange"
        ) {
          if (Array.isArray(value)) {
            url += `&${key}=${encodeURIComponent(value.join(","))}`;
          } else {
            url += `&${key}=${encodeURIComponent(value)}`;
          }
        }
      });

      // Add price range filters
      if (filters.priceRange && filters.priceRange[0] > 0) {
        url += `&minPrice=${filters.priceRange[0]}`;
      }
      if (filters.priceRange && filters.priceRange[1] < 50000000) {
        url += `&maxPrice=${filters.priceRange[1]}`;
      }

      console.log("Fetching from URL:", url);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Handle different response structures
      let propertiesData = [];
      if (Array.isArray(data)) {
        propertiesData = data;
      } else if (data.properties && Array.isArray(data.properties)) {
        propertiesData = data.properties;
      } else if (data.data && Array.isArray(data.data)) {
        propertiesData = data.data;
      }

      setProperties(propertiesData);
      setTotalPages(
        data.pagination?.totalPages ||
          Math.ceil(
            (data.pagination?.totalItems || propertiesData.length || 0) /
              itemsPerPage,
          ),
      );
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    const newPriceRange = [...filters.priceRange];
    if (name === "priceMin") {
      newPriceRange[0] = parseInt(value);
    } else if (name === "priceMax") {
      newPriceRange[1] = parseInt(value);
    }
    setFilters((prev) => ({
      ...prev,
      priceRange: newPriceRange,
    }));
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const formatPrice = (price) => {
    // Ensure price is a number before formatting
    const numericPrice =
      typeof price === "string" ? parseInt(price.replace(/[$,]/g, "")) : price;
    if (isNaN(numericPrice)) {
      return "$N/A";
    }
    return "$" + numericPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Pagination calculations
  const totalPagesCalculated = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    const effectiveTotalPages =
      totalPages > 0 ? totalPages : totalPagesCalculated; // Use fetched totalPages if available
    if (effectiveTotalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(
      effectiveTotalPages,
      startPage + maxVisiblePages - 1,
    );

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className={styles.paginationBtn}
        >
          ‹
        </button>,
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${styles.paginationBtn} ${i === currentPage ? styles.active : ""}`}
        >
          {i}
        </button>,
      );
    }

    if (currentPage < effectiveTotalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className={styles.paginationBtn}
        >
          ›
        </button>,
      );
    }

    return (
      <div className={styles.pagination}>
        <div className={styles.paginationInfo}>
          Showing {startIndex + 1}-{Math.min(endIndex, properties.length)} of{" "}
          {properties.length} properties
        </div>
        <div className={styles.paginationButtons}>{pages}</div>
      </div>
    );
  };

  return (
    <div className={styles.propertyListing}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumbSection}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <span>Home</span> / <span>{breadcrumbPath}</span>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={styles.filtersSection}>
        <div className={styles.container}>
          <div className={styles.filtersRow}>
            <div className={styles.priceRangeGroup}>
              <label className={styles.priceRangeLabel}>
                Price Range: {formatPrice(filters.priceRange[0])} -{" "}
                {formatPrice(filters.priceRange[1])}
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

            {/* Custom filters can be passed as children */}
            {customFilters.cidade !== undefined && (
              <div className={styles.filterGroup}>
                <select
                  name="cidade"
                  value={filters.cidade || ""}
                  onChange={handleFilterChange}
                  className={styles.filterSelect}
                >
                  <option value="">Any City</option>
                  <option value="miami">Miami</option>
                  <option value="aventura">Aventura</option>
                  <option value="bal harbour">Bal Harbour</option>
                  <option value="brickell">Brickell</option>
                  <option value="coconut grove">Coconut Grove</option>
                  <option value="coral gables">Coral Gables</option>
                  <option value="downtown">Downtown</option>
                  <option value="sunny isles">Sunny Isles</option>
                </select>
              </div>
            )}

            <div className={styles.filterGroup}>
              <select
                name="category"
                value={filters.category || filters.categoryName || ""}
                onChange={handleFilterChange}
                className={styles.filterSelect}
              >
                <option value="">All Categories</option>
                <option value="New Developments">New Developments</option>
                <option value="Luxury Condos">Luxury Condos</option>
                <option value="Single Family Homes">Single Family Homes</option>
                <option value="Waterfront Properties">
                  Waterfront Properties
                </option>
                <option value="Golf Course Properties">
                  Golf Course Properties
                </option>
                <option value="Private & Exclusive">Private & Exclusive</option>
              </select>
            </div>

            <button className={styles.saveSearchBtn}>SAVE SEARCH</button>
          </div>

          <div className={styles.resultsBar}>
            <div className={styles.resultsCount}>
              Showing {currentProperties.length} of {properties.length}{" "}
              Properties (Page {currentPage} of {totalPages})
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
                  className={`${styles.viewBtn} ${viewMode === "grid" ? styles.active : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </button>
                <button
                  className={`${styles.viewBtn} ${viewMode === "list" ? styles.active : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  List
                </button>
                <button
                  className={`${styles.viewBtn} ${viewMode === "map" ? styles.active : ""}`}
                  onClick={() => setViewMode("map")}
                >
                  Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className={styles.propertiesSection}>
        <div className={styles.container}>
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading {title ? title.toLowerCase() : "properties"}...</p>
            </div>
          ) : (
            <>
              {viewMode === "grid" && (
                <div className={styles.propertiesGrid}>
                  {currentProperties.length > 0 ? (
                    currentProperties.map((property, index) => (
                      <div
                        key={property.id || index}
                        className={styles.propertyCard}
                      >
                        <div className={styles.propertyImageContainer}>
                          <img
                            src={property.image || placeholderImage}
                            alt={`Property at ${property.address}`}
                            className={styles.propertyImage}
                          />
                        </div>
                        <div className={styles.propertyContent}>
                          <div className={styles.propertyPrice}>
                            {formatPrice(property.price)}
                          </div>

                          <div className={styles.propertyDetails}>
                            <div className={styles.propertySpecs}>
                              <span className={styles.spec}>
                                <strong>
                                  {property.bedrooms || property.beds || "N/A"}
                                </strong>{" "}
                                Bed(s)
                              </span>
                              <span className={styles.spec}>
                                <strong>
                                  {property.bathrooms ||
                                    property.baths ||
                                    "N/A"}
                                </strong>{" "}
                                Bath(s)
                              </span>
                              <span className={styles.spec}>
                                <strong>{property.sqft || "N/A"}</strong> Sq.Ft.
                              </span>
                            </div>
                            {property.yearBuilt && (
                              <div className={styles.yearBuilt}>
                                Built: {property.yearBuilt}
                              </div>
                            )}
                          </div>

                          <div className={styles.propertyLocation}>
                            <p>{property.address}</p>
                            <p className={styles.propertyCity}>
                              {property.city}
                            </p>
                          </div>

                          <div className={styles.propertyActions}>
                            <button className={styles.viewDetailsBtn}>
                              View Details
                            </button>
                            <button className={styles.favoriteBtn}>♡</button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noResults}>
                      <h3>No Properties Found</h3>
                      <p>
                        Try adjusting your search criteria to see more results.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {viewMode === "list" && (
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
                          {customFilters.yearBuilt !== undefined && (
                            <th>Year Built</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {currentProperties.map((property, index) => (
                          <tr
                            key={property.id || index}
                            className={styles.propertyRow}
                          >
                            <td>{property.address}</td>
                            <td>{formatPrice(property.price)}</td>
                            <td>0</td>
                            <td>
                              {property.bedrooms || property.beds || "N/A"}
                            </td>
                            <td>
                              {property.bathrooms || property.baths || "N/A"}
                            </td>
                            <td>{property.sqft || "N/A"}</td>
                            <td>
                              {property.pricePerSqft
                                ? formatPrice(property.pricePerSqft)
                                : "N/A"}
                            </td>
                            <td>
                              {property.subdivision ||
                                property.development ||
                                "N/A"}
                            </td>
                            {customFilters.yearBuilt !== undefined && (
                              <td>{property.yearBuilt || "N/A"}</td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className={styles.noResults}>
                      <h3>No Properties Found</h3>
                      <p>
                        Try adjusting your search criteria to see more results.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {viewMode === "map" && (
                <div className={styles.mapView}>
                  <div className={styles.mapPropertiesList}>
                    <div className={styles.propertiesListHeader}>
                      <h3>Properties ({properties.length})</h3>
                    </div>
                    <div className={styles.mapPropertiesScroll}>
                      {currentProperties.length > 0 ? (
                        currentProperties.map((property, index) => (
                          <div
                            key={property.id || index}
                            className={styles.mapPropertyCard}
                          >
                            <div className={styles.mapPropertyImage}>
                              <img
                                src={property.image || placeholderImage}
                                alt={property.address}
                              />
                            </div>
                            <div className={styles.mapPropertyContent}>
                              <div className={styles.mapPropertyPrice}>
                                {formatPrice(property.price)}
                              </div>
                              <div className={styles.mapPropertySpecs}>
                                {property.bedrooms || property.beds} beds •{" "}
                                {property.bathrooms || property.baths} baths •{" "}
                                {property.sqft} Sq.Ft.
                              </div>
                              <div className={styles.mapPropertyAddress}>
                                {property.address}
                              </div>
                              <div className={styles.mapPropertyCity}>
                                {property.city}
                              </div>
                              {property.yearBuilt && (
                                <div className={styles.mapPropertyYear}>
                                  Built: {property.yearBuilt}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className={styles.noResults}>
                          <h3>No Properties Found</h3>
                          <p>
                            Try adjusting your search criteria to see more
                            results.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.mapContainer}>
                    <div className={styles.mapPlaceholder}>
                      <div className={styles.mapError}>
                        <div className={styles.errorIcon}>🗺️</div>
                        <h3>Map View</h3>
                        <p>
                          Interactive map with property locations and markers
                          will be displayed here.
                        </p>
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
  );
};

export default PropertyListing;
