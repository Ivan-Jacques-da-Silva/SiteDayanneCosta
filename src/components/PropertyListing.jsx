import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { buildApiUrl, getImageUrl } from "../config/api";
import PropertyMap from "./PropertyMap";
import styles from "./PropertyListing.module.css";
import placeholderImage from "../assets/img/default.png";

const PropertyListing = ({
  apiEndpoint = "/api/properties",
  title = "Properties",
  breadcrumbPath = "Properties",
  filters: customFilters = {},
  placeholderImage: propPlaceholderImage = "https://via.placeholder.com/400x300?text=Property",
  showCategoryFilter = false,
  showNeighborhoodFilter = false,
}) => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [mapTrigger, setMapTrigger] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: [0, 50000000],
    bedrooms: "",
    bathrooms: "",
    sortBy: "newest-first",
    category: "",
    ...customFilters,
  });
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableNeighborhoods, setAvailableNeighborhoods] = useState([]);

  const handleViewDetails = (property) => {
    navigate(`/property/${property.id}`, { state: { property } });
  };

  const handleSimilarPropertyClick = (property) => {
    navigate(`/property/${property.id}`, { state: { property } });
  };

  useEffect(() => {
    fetchProperties();
    if (showCategoryFilter) {
      fetchAvailableCategories();
    }
    if (showNeighborhoodFilter) {
      fetchAvailableNeighborhoods();
    }
  }, [filters, apiEndpoint, currentPage, showCategoryFilter, showNeighborhoodFilter]);

  const fetchAvailableCategories = async () => {
    try {
      const response = await fetch(buildApiUrl('/api/properties'));
      if (response.ok) {
        const data = await response.json();
        let propertiesData = [];
        if (Array.isArray(data)) {
          propertiesData = data;
        } else if (data.properties && Array.isArray(data.properties)) {
          propertiesData = data.properties;
        } else if (data.data && Array.isArray(data.data)) {
          propertiesData = data.data;
        }

        // Extract unique categories from properties
        const categories = [...new Set(
          propertiesData
            .map(property => property.categoria || property.category)
            .filter(Boolean)
        )];

        setAvailableCategories(categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchAvailableNeighborhoods = async () => {
    try {
      const response = await fetch(buildApiUrl('/api/properties-by-category?category=NEIGHBORHOODS'));
      if (response.ok) {
        const data = await response.json();
        let propertiesData = [];
        if (Array.isArray(data)) {
          propertiesData = data;
        } else if (data.properties && Array.isArray(data.properties)) {
          propertiesData = data.properties;
        } else if (data.data && Array.isArray(data.data)) {
          propertiesData = data.data;
        }

        // Extract unique neighborhoods from properties
        const neighborhoods = [...new Set(
          propertiesData
            .map(property => property.bairro)
            .filter(Boolean)
        )];

        console.log('Available neighborhoods:', neighborhoods); // Debug log
        setAvailableNeighborhoods(neighborhoods);
      }
    } catch (error) {
      console.error('Error fetching neighborhoods:', error);
    }
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      let url = `${buildApiUrl(apiEndpoint)}?page=${currentPage}&limit=${itemsPerPage}`;

      // Add filters to URL
      Object.entries(filters).forEach(([key, value]) => {
        if (
          value &&
          value !== "" &&
          key !== "yearBuilt" &&
          key !== "priceRange" &&
          key !== "bedrooms" &&
          key !== "bathrooms"
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
      if (filters.priceRange && filters.priceRange[1] < maxPrice) {
        url += `&maxPrice=${filters.priceRange[1]}`;
      }

      // Add bedroom filter
      if (filters.bedrooms) {
        if (filters.bedrooms === "4+") {
          url += `&minBedrooms=4`;
        } else {
          url += `&bedrooms=${filters.bedrooms}`;
        }
      }

      // Add bathroom filter
      if (filters.bathrooms) {
        if (filters.bathrooms === "4+") {
          url += `&minBathrooms=4`;
        } else {
          const b = parseInt(filters.bathrooms, 10);
          url += `&minBathrooms=${b}&maxBathrooms=${b + 0.99}`;
        }
      }

      // Add category filter
      if (filters.category) {
        url += `&categoryName=${encodeURIComponent(filters.category)}`;
      }

      // Add neighborhood filter
      if (filters.bairro) {
        url += `&bairro=${encodeURIComponent(filters.bairro)}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("HTTP Error Response:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorText}`,
        );
      }

      const data = await response.json();
      let propertiesData = [];
      if (Array.isArray(data)) {
        propertiesData = data;
      } else if (data.properties && Array.isArray(data.properties)) {
        propertiesData = data.properties;
      } else if (data.data && Array.isArray(data.data)) {
        propertiesData = data.data;
      }

      // Transform property data to include image URL from images array
      propertiesData = propertiesData.map((p) => {
        const primeira = p.images?.[0]?.url;
        let imageUrl;
        
        if (primeira) {
          imageUrl = getImageUrl(primeira);
        } else if (p.image && p.image !== propPlaceholderImage) {
          imageUrl = p.image;
        } else {
          imageUrl = '/default.png';
        }
        
        return { ...p, imageUrl };
      });

      // Calculate dynamic max price based on highest property price + 500,000 margin
      if (propertiesData.length > 0) {
        const prices = propertiesData.map((property) => {
          const price =
            typeof property.price === "string"
              ? parseInt(property.price.replace(/[$,]/g, ""))
              : property.price;
          return isNaN(price) ? 0 : price;
        });
        const highestPrice = Math.max(...prices);
        const dynamicMaxPrice = highestPrice + 500000;

        // Update max price if it's different
        if (dynamicMaxPrice !== maxPrice) {
          setMaxPrice(dynamicMaxPrice);
          // Update filters to use new max price if current max is at the old limit
          setFilters((prev) => ({
            ...prev,
            priceRange: [
              prev.priceRange[0],
              Math.min(prev.priceRange[1], dynamicMaxPrice),
            ],
          }));
        }
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

  // Apply client-side filtering for better responsiveness
  const filteredProperties = properties.filter((property) => {
    // Price range filter
    const price =
      typeof property.price === "string"
        ? parseInt(property.price.replace(/[$,]/g, ""))
        : property.price;
    if (filters.priceRange) {
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false;
      }
    }

    // Bedroom filter
    if (filters.bedrooms) {
      const bedrooms = property.bedrooms || property.beds || 0;
      if (filters.bedrooms === "4+") {
        if (bedrooms < 4) return false;
      } else {
        if (bedrooms !== parseInt(filters.bedrooms)) return false;
      }
    }

    // Bathroom filter
    if (filters.bathrooms) {
      const bathrooms = property.bathrooms || property.baths || 0;
      if (filters.bathrooms === "4+") {
        if (bathrooms < 4) return false;
      } else {
        // Include properties with exact match or decimal values (e.g., filter 3 includes 3 and 3.5)
        const selectedBathrooms = parseInt(filters.bathrooms);
        if (bathrooms < selectedBathrooms || bathrooms >= selectedBathrooms + 1)
          return false;
      }
    }

    return true;
  });

  // Apply sorting
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-desc":
        const priceA =
          typeof a.price === "string"
            ? parseInt(a.price.replace(/[$,]/g, ""))
            : a.price;
        const priceB =
          typeof b.price === "string"
            ? parseInt(b.price.replace(/[$,]/g, ""))
            : b.price;
        return priceB - priceA;
      case "price-asc":
        const priceAsc =
          typeof a.price === "string"
            ? parseInt(a.price.replace(/[$,]/g, ""))
            : a.price;
        const priceBsc =
          typeof b.price === "string"
            ? parseInt(b.price.replace(/[$,]/g, ""))
            : b.price;
        return priceAsc - priceBsc;
      case "sqft-desc":
        return (b.sqft || 0) - (a.sqft || 0);
      case "bedrooms-desc":
        return (b.bedrooms || b.beds || 0) - (a.bedrooms || a.beds || 0);
      case "newest-first":
      default:
        // Sort by listing date or creation date (newest first)
        const dateA = new Date(a.listingDate || a.createdAt || a.id);
        const dateB = new Date(b.listingDate || b.createdAt || b.id);
        return dateB - dateA;
    }
  });

  // Pagination calculations
  const totalPagesCalculated = Math.ceil(
    sortedProperties.length / itemsPerPage,
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = sortedProperties.slice(startIndex, endIndex);

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
          Showing {startIndex + 1}-{Math.min(endIndex, sortedProperties.length)}{" "}
          of {sortedProperties.length} properties
        </div>
        <div className={styles.paginationButtons}>{pages}</div>
      </div>
    );
  };

  const handlePropertyClick = (property) => {
    navigate(`/property/${property.id}`, {
      state: { property },
    });
  };

  const handlePropertySelect = (propertyId) => {
    setSelectedPropertyId(propertyId);
  };

  const handleMapPropertyClick = (propertyId) => {
    const property = sortedProperties.find((p) => p.id === propertyId);
    if (property) {
      handlePropertyClick(property);
    }
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
                Faixa de Preço: {formatPrice(filters.priceRange[0])} -{" "}
                {formatPrice(filters.priceRange[1])}
              </label>
              <div className={styles.rangeSliders}>
                <input
                  type="range"
                  name="priceMin"
                  min="0"
                  max={maxPrice}
                  step="100000"
                  value={filters.priceRange[0]}
                  onChange={handlePriceRangeChange}
                  className={styles.rangeSlider}
                />
                <input
                  type="range"
                  name="priceMax"
                  min="0"
                  max={maxPrice}
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
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
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
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
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

            {showCategoryFilter && (
              <div className={styles.filterGroup}>
                <select
                  name="category"
                  value={filters.category || ""}
                  onChange={handleCategoryChange}
                  className={styles.filterSelect}
                >
                  <option value="">All Categories</option>
                  {availableCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {showNeighborhoodFilter && (
              <div className={styles.filterGroup}>
                <select
                  name="bairro"
                  value={filters.bairro || ""}
                  onChange={handleFilterChange}
                  className={styles.filterSelect}
                >
                  <option value="">All Neighborhoods</option>
                  {availableNeighborhoods.map((neighborhood, index) => (
                    <option key={index} value={neighborhood}>
                      {neighborhood.charAt(0) + neighborhood.slice(1).toLowerCase().replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button className={styles.saveSearchBtn}>SAVE SEARCH</button>
          </div>

          <div className={styles.resultsBar}>
            <div className={styles.resultsCount}>
              Showing {currentProperties.length} of {sortedProperties.length}{" "}
              Properties (Page {currentPage} of {totalPagesCalculated || 1})
            </div>
            <div className={styles.sortControls}>
              <div className={styles.sortGroup}>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className={styles.sortSelect}
                >
                  <option value="newest-first">Recently Listed</option>
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
                            src={
                              property.imageUrl && property.imageUrl !== propPlaceholderImage 
                                ? property.imageUrl 
                                : '/default.png'
                            }
                            alt={`Property at ${property.address}`}
                            className={styles.propertyImage}
                            onError={(e) => {
                              e.target.src = '/default.png';
                            }}
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
                            <button
                              className={styles.viewDetailsBtn}
                              onClick={() => handleViewDetails(property)}
                            >
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
                      <h3>Properties ({sortedProperties.length})</h3>
                    </div>
                    <div className={styles.mapPropertiesScroll}>
                      {currentProperties.length > 0 ? (
                        currentProperties.map((property, index) => (
                          <div
                            key={property.id || index}
                            className={`${styles.mapPropertyCard} ${
                              selectedPropertyId === property.id
                                ? styles.selectedProperty
                                : ""
                            }`}
                            onClick={() => {
                              handlePropertySelect(property.id);
                              setMapTrigger({ property, timestamp: Date.now() });
                            }}
                          >
                            <div className={styles.mapPropertyImage}>
                              <img
                                src={
                                  property.imageUrl && property.imageUrl !== propPlaceholderImage
                                    ? property.imageUrl
                                    : '/default.png'
                                }
                                alt={property.address}
                                onError={(e) => {
                                  e.target.src = '/default.png';
                                }}
                              />
                            </div>
                            <div className={styles.mapPropertyContent}>
                              <div className={styles.mapPropertyPrice}>
                                {formatPrice(property.price)}
                              </div>
                              <div className={styles.mapPropertySpecs}>
                                {property.bedrooms || property.beds || "N/A"}{" "}
                                beds •{" "}
                                {property.bathrooms || property.baths || "N/A"}{" "}
                                baths •{" "}
                                {property.sqft
                                  ? `${property.sqft.toLocaleString()} sq ft`
                                  : "N/A"}
                              </div>
                              <div className={styles.mapPropertyAddress}>
                                {property.address}
                              </div>
                              <div className={styles.mapPropertyCity}>
                                {property.city}, {property.state}{" "}
                                {property.zipCode}
                              </div>
                              {property.yearBuilt && (
                                <div className={styles.mapPropertyYear}>
                                  Built: {property.yearBuilt}
                                </div>
                              )}
                              {(!property.latitude || !property.longitude) && (
                                <div className={styles.noCoordinates}>
                                  📍 Location coordinates not available
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
                    <PropertyMap
                      properties={sortedProperties.filter(
                        (p) => p.latitude && p.longitude,
                      )}
                      selectedPropertyId={selectedPropertyId}
                      onPropertySelect={handleMapPropertyClick}
                      listClickTrigger={mapTrigger}
                    />
                    {sortedProperties.filter((p) => p.latitude && p.longitude)
                      .length === 0 && (
                      <div className={styles.noMapData}>
                        <div className={styles.noMapMessage}>
                          <div className={styles.errorIcon}>📍</div>
                          <h3>No Map Data Available</h3>
                          <p>
                            Properties need latitude and longitude coordinates
                            to display on the map.
                          </p>
                          <p>Available properties: {sortedProperties.length}</p>
                          <p>
                            With coordinates:{" "}
                            {
                              sortedProperties.filter(
                                (p) => p.latitude && p.longitude,
                              ).length
                            }
                          </p>
                        </div>
                      </div>
                    )}
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