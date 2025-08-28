import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PropertyDetail.module.css";
import { getImageUrl, buildApiUrl } from "../config/api";
import { useAuth } from "../contexts/AuthContext";
import PropertyMap from "./PropertyMap";
import FavoriteModal from "./FavoriteModal";
import LoginModal from "./LoginModal";
import perfil from '../assets/img/perfil.jpg';

const PropertyDetail = ({ propertyId, propertyData = null }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [property, setProperty] = useState(propertyData);
  const [loading, setLoading] = useState(!propertyData);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [viewMode, setViewMode] = useState("photos");
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!propertyData && propertyId) {
      fetchPropertyData();
    } else if (propertyData) {
      fetchSimilarProperties(propertyData.categoria);
    }
  }, [propertyId, propertyData]);

  useEffect(() => {
    if (property) {
      setFormData(prev => ({
        ...prev,
        message: `I am interested in ${property.address} ${property.city}, ${property.state} ${property.zipCode}`
      }));
      
      // Check if property is favorite
      if (isAuthenticated && user) {
        checkIfFavorite();
      }
    }
  }, [property, isAuthenticated, user]);

  const checkIfFavorite = async () => {
    if (!isAuthenticated || !user || !property?.id) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl(`/api/favorites/${user.id}`), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const favorites = await response.json();
        const isFav = favorites.some(fav => fav.propertyId === property.id);
        setIsFavorite(isFav);
      }
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      setShowFavoriteModal(true);
      return;
    }

    setFavoriteLoading(true);

    try {
      const token = localStorage.getItem('token');

      if (isFavorite) {
        // Remove from favorites
        await fetch(buildApiUrl(`/api/favorites/${user.id}/${property.id}`), {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        setIsFavorite(false);
      } else {
        // Add to favorites
        await fetch(buildApiUrl('/api/favorites'), {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: user.id,
            propertyId: property.id
          })
        });

        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  // Debug images when property loads
  useEffect(() => {
    if (property && property.images) {
      console.log("Property images:", property.images);
      const galleryImages = property.images.filter((img) => {
        return (
          img.url &&
          (img.url.includes("gallery-") ||
            img.url.includes("galleryimages-") ||
            !img.isPrimary)
        );
      });
      console.log("Filtered gallery images:", galleryImages);
    }
  }, [property]);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      const response = await fetch(buildApiUrl(`/api/properties/${propertyId}`));
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setProperty(data);
      fetchSimilarProperties(data.categoria);
    } catch (error) {
      console.error("Error fetching property:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProperties = async (category = null) => {
    try {
      const categoryToSearch = category || property?.categoria;
      if (!categoryToSearch) return;

      // Use the properties-by-category endpoint to get properties from same category
      const response = await fetch(buildApiUrl(`/api/properties-by-category?category=${encodeURIComponent(categoryToSearch)}&limit=10`));
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = [];
      }
      // Filter out current property
      const filtered = (Array.isArray(data) ? data : data.properties || [])
        .filter((p) => p.id !== property?.id)
        .slice(0, 10);

      setSimilarProperties(filtered);
    } catch (error) {
      console.error("Error fetching similar properties:", error);
    }
  };

  const formatPrice = (price) => {
    if (typeof price === "string") return price;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setShowImageModal(true);
  };

  const nextImage = () => {
    const images = property.images || [property.image];
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    const images = property.images || [property.image];
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleSimilarPropertyClick = (similarProperty) => {
    navigate(`/property/${similarProperty.id}`, {
      state: { property: similarProperty },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    if (!property?.id) {
      setSubmitMessage('Property not loaded.');
      return;
    }
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Get current page URL
      const currentUrl = window.location.href;

      // Enhanced message with property URL
      const enhancedMessage = `${formData.message}\n\nProperty URL: ${currentUrl}`;

      const response = await fetch(buildApiUrl('/api/emails/property-inquiry'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          message: enhancedMessage,
          propertyId: property.id,
          propertyUrl: currentUrl
        }),
      });

      const text = await response.text();
      if (!response.ok) throw new Error(text || `HTTP ${response.status}`);
      let data;
      try { data = JSON.parse(text); } catch { data = { success: false, message: text }; }

      if (data.success) {
        setSubmitMessage('Interest sent successfully! We will contact you soon.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: `I am interested in ${property.address} ${property.city}, ${property.state} ${property.zipCode}`
        });
      } else {
        setSubmitMessage('Error sending interest: ' + data.message);
      }
    } catch (error) {
      setSubmitMessage('Error sending interest. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return <div className={styles.error}>Property not found</div>;
  }

  // Filter images to show only gallery images for carousel (from multer uploads)
  const galleryImages = property.images
    ? property.images.filter((img) => {
      // Check if it's a gallery image based on the filename pattern from multer
      return (
        img.url &&
        (img.url.includes("gallery-") ||
          img.url.includes("galleryimages-") ||
          !img.isPrimary)
      );
    })
    : [];

  // Use getImageUrl like in admin preview to load images correctly from backend
  const images =
    galleryImages.length > 0
      ? galleryImages.map((img) => getImageUrl(img.url))
      : property.images
        ? property.images.map((img) => getImageUrl(img.url))
        : ["/default.png"];

  return (
    <div className={styles.propertyDetail}>
      {/* Property Header Section */}
      <section className={styles.propertyHeader}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <h1 className={styles.propertyTitle}>
              {property.address}
              <span>
                {property.city}, {property.state} {property.zipCode}
              </span>
            </h1>
            <div className={styles.headerActions}>
              <button className={styles.shareBtn}>Share</button>
              <button className={styles.backBtn} onClick={handleBackClick}>
                Back to results
              </button>
              <button className={styles.newSearchBtn}>New Search</button>
              <button className={`${styles.favoriteBtn} ${styles.desktopOnly}`}>♡</button>
              <a
                href={`tel:${property.agentPhone || "+1 (646) 598-3588"}`}
                className={styles.phoneBtn}
              >
                {property.agentPhone || "+1 (646) 598-3588"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Full Screen Slider Section */}
      <section className={styles.fullSlider} id="full-slider">
        <div className={styles.sliderContainer}>
          <img
            src={images[currentImageIndex] || "/default.png"}
            alt={`${property.address} - Image ${currentImageIndex + 1}`}
            className={styles.sliderImage}
            onClick={() => handleImageClick(currentImageIndex)}
            onError={(e) => {
              console.log("Image load error:", e.target.src);
              e.target.src = "/default.png";
            }}
          />

          

          {/* Slider Options */}
          <div className={styles.sliderOptions}>
            <div className={styles.sliderOptionsList}>
              <button
                className={styles.optionBtn}
                onClick={() => setShowMapModal(true)}
              >
                MAP VIEW
              </button>
              <button
                className={styles.fullScreenBtn}
                onClick={() => setShowImageModal(true)}
              >
                FULL SCREEN
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && viewMode === "photos" && (
            <>
              <button className={styles.sliderPrev} onClick={prevImage}>
                ‹
              </button>
              <button className={styles.sliderNext} onClick={nextImage}>
                ›
              </button>
            </>
          )}

          {/* Auto navigation timer for carousel */}
          {images.length > 1 && viewMode === "photos" && (
            <div className={styles.autoNavigation}>
              <button
                className={styles.autoNavBtn}
                onClick={prevImage}
                onMouseEnter={() => { }}
              >
                ‹
              </button>
              <button
                className={styles.autoNavBtn}
                onClick={nextImage}
                onMouseEnter={() => { }}
              >
                ›
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Section */}
      <section className={styles.mainSection}>
        <div className={styles.container}>
          {/* Property Information Bar */}
          <div className={styles.propertyInfoBar}>
            <div className={styles.priceSection}>
              <div className={styles.priceContainer}>
                <div className={styles.propertyPrice}>
                  {formatPrice(property.price)}
                </div>
                <div className={styles.estimatedPayment}>
                  Est. Payment
                  <button className={styles.calculatorBtn}>Calculate</button>
                </div>
              </div>
              
              {/* Botão de favorito mobile - só aparece no mobile */}
              <button 
                className={`${styles.mobileFavoriteBtn} ${isFavorite ? styles.favorited : ''}`}
                onClick={handleFavoriteClick}
                disabled={favoriteLoading}
                title={isAuthenticated ? (isFavorite ? 'Remove from favorites' : 'Add to favorites') : 'Login to save favorites'}
              >
                <span className={styles.heartIcon}>
                  {favoriteLoading ? '⏳' : (isFavorite ? '♥' : '♡')}
                </span>
              </button>
            </div>

            <div className={styles.propertySpecs}>
              <div className={styles.infoItem}>
                <span className={styles.infoNumber}>
                  {property.beds || property.bedrooms || "N/A"}
                </span>
                <span className={styles.infoLabel}>Bed</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoNumber}>
                  {property.baths || property.bathrooms || "N/A"}
                </span>
                <span className={styles.infoLabel}>Bath</span>
              </div>
              {property.halfBaths > 0 && (
                <div className={styles.infoItem}>
                  <span className={styles.infoNumber}>{property.halfBaths}</span>
                  <span className={styles.infoLabel}>Half Bath</span>
                </div>
              )}
              <div className={styles.infoItem}>
                <span className={styles.infoNumber}>
                  {formatNumber(property.sqft) || "N/A"}
                </span>
                <span className={styles.infoLabel}>Size sq.ft.</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoNumber}>
                  ${Math.round((property.price || 0) / (property.sqft || 1))}
                </span>
                <span className={styles.infoLabel}>$/Sqft</span>
              </div>
            </div>
            
            <div className={styles.saveBtn}>
              <button 
                className={`${styles.saveButton} ${isFavorite ? styles.favorited : ''}`}
                onClick={handleFavoriteClick}
                disabled={favoriteLoading}
                title={isAuthenticated ? (isFavorite ? 'Remove from favorites' : 'Add to favorites') : 'Login to save favorites'}
              >
                <span className={styles.heartIcon}>
                  {favoriteLoading ? '⏳' : (isFavorite ? '♥' : '♡')}
                </span>
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className={styles.mainContent}>
            {/* Left Column - Property Details */}
            <div className={styles.leftColumn}>
              {/* Basic Information */}
              <div className={`${styles.basicInfoCard} ${!isAuthenticated ? styles.restrictedCard : ''}`}>
                <h2>Basic Information</h2>
                <ul className={styles.basicInfoList}>
                  <li>
                    <span className={styles.infoLabel}>MLS #</span>
                    <span className={styles.infoValue}>
                      {isAuthenticated ? (property.mlsNumber || "N/A") : "***"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.infoLabel}>Type</span>
                    <span className={styles.infoValue}>
                      {isAuthenticated ? (property.propertyType || "N/A") : "***"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.infoLabel}>
                      Subdivision/Complex
                    </span>
                    <span className={styles.infoValue}>
                      {isAuthenticated ? (property.subdivision || "N/A") : "***"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.infoLabel}>Year Built</span>
                    <span className={styles.infoValue}>
                      {isAuthenticated ? (property.yearBuilt || "N/A") : "***"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.infoLabel}>Total Sqft</span>
                    <span className={styles.infoValue}>
                      {isAuthenticated ? formatNumber(property.sqft) : "***"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.infoLabel}>Date Listed</span>
                    <span className={styles.infoValue}>
                      {isAuthenticated ? (property.dateListed || "N/A") : "***"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.infoLabel}>Days on Market</span>
                    <span className={styles.infoValue}>
                      {isAuthenticated ? (property.daysOnMarket || "N/A") : "***"}
                    </span>
                  </li>
                </ul>
                
                {!isAuthenticated && (
                  <div className={styles.cardLoginOverlay}>
                    <div className={styles.cardLoginOverlayContent}>
                      <i className="fas fa-lock" style={{ fontSize: '24px', marginBottom: '10px' }}></i>
                      <p>Login to view details</p>
                      <button 
                        className={styles.cardOverlayLoginBtn}
                        onClick={() => setShowLoginModal(true)}
                      >
                        Login
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {property.description && (
                <div className={`${styles.descriptionCard} ${!isAuthenticated ? styles.restrictedCard : ''}`}>
                  <h2>Description</h2>
                  <p>{isAuthenticated ? property.description : "*** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** ***"}</p>
                  
                  {!isAuthenticated && (
                    <div className={styles.cardLoginOverlay}>
                      <div className={styles.cardLoginOverlayContent}>
                        <i className="fas fa-lock" style={{ fontSize: '24px', marginBottom: '10px' }}></i>
                        <p>Login to view details</p>
                        <button 
                          className={styles.cardOverlayLoginBtn}
                          onClick={() => setShowLoginModal(true)}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Amenities */}
              {property.amenities && (
                <div className={`${styles.amenitiesCard} ${!isAuthenticated ? styles.restrictedCard : ''}`}>
                  <h2>Amenities</h2>
                  <ul className={styles.amenitiesList}>
                    {(() => {
                      if (!isAuthenticated) {
                        return Array(6).fill(0).map((_, index) => (
                          <li key={index}>*** *** ***</li>
                        ));
                      }
                      
                      // Handle both string and array formats
                      let amenitiesArray = [];
                      if (typeof property.amenities === 'string') {
                        // If it's a string, try to split by comma or use as single item
                        amenitiesArray = property.amenities.includes(',')
                          ? property.amenities.split(',').map(item => item.trim())
                          : [property.amenities];
                      } else if (Array.isArray(property.amenities)) {
                        amenitiesArray = property.amenities;
                      }

                      return amenitiesArray.length > 0 ? amenitiesArray.map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                      )) : null;
                    })()}
                  </ul>
                  
                  {!isAuthenticated && (
                    <div className={styles.cardLoginOverlay}>
                      <div className={styles.cardLoginOverlayContent}>
                        <i className="fas fa-lock" style={{ fontSize: '24px', marginBottom: '10px' }}></i>
                        <p>Login to view details</p>
                        <button 
                          className={styles.cardOverlayLoginBtn}
                          onClick={() => setShowLoginModal(true)}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Property Features */}
              <div className={`${styles.featuresCard} ${!isAuthenticated ? styles.restrictedCard : ''}`}>
                <h2>Property Features</h2>
                <ul className={styles.featuresList}>
                  {property.lotSize && (
                    <li>
                      <span className={styles.featureLabel}>
                        Aprox. Lot Size
                      </span>
                      <span className={styles.featureValue}>
                        {isAuthenticated ? property.lotSize : "***"}
                      </span>
                    </li>
                  )}
                  <li>
                    <span className={styles.featureLabel}>Furnished Info</span>
                    <span className={styles.featureValue}>
                      {isAuthenticated ? (property.furnished ? "Yes" : "No") : "***"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.featureLabel}>Sale Type</span>
                    <span className={styles.featureValue}>
                      {isAuthenticated ? (property.saleType || "Regular Sale") : "***"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.featureLabel}>HOA Fees</span>
                    <span className={styles.featureValue}>
                      {isAuthenticated ? (property.hoaFees ? formatPrice(property.hoaFees) : "N/A") : "$***"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.featureLabel}>Tax Amount</span>
                    <span className={styles.featureValue}>
                      {isAuthenticated ? (property.taxAmount ? formatPrice(property.taxAmount) : "N/A") : "$***"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.featureLabel}>Tax Year</span>
                    <span className={styles.featureValue}>
                      {isAuthenticated ? (property.taxYear || "N/A") : "***"}
                    </span>
                  </li>
                </ul>
                
                {!isAuthenticated && (
                  <div className={styles.cardLoginOverlay}>
                    <div className={styles.cardLoginOverlayContent}>
                      <i className="fas fa-lock" style={{ fontSize: '24px', marginBottom: '10px' }}></i>
                      <p>Login to view details</p>
                      <button 
                        className={styles.cardOverlayLoginBtn}
                        onClick={() => setShowLoginModal(true)}
                      >
                        Login
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {property.interiorFeatures && (
                <div className={styles.featuresSection}>
                  <h4>Interior Features</h4>
                  <ul className={styles.featuresList}>
                    {(() => {
                      let featuresArray = [];
                      if (typeof property.interiorFeatures === 'string') {
                        featuresArray = property.interiorFeatures.includes(',')
                          ? property.interiorFeatures.split(',').map(item => item.trim())
                          : [property.interiorFeatures];
                      } else if (Array.isArray(property.interiorFeatures)) {
                        featuresArray = property.interiorFeatures;
                      }

                      return featuresArray.length > 0 ? featuresArray.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      )) : null;
                    })()}
                  </ul>
                </div>
              )}

              {property.exteriorFeatures && (
                <div className={styles.featuresSection}>
                  <h4>Exterior Features</h4>
                  <ul className={styles.featuresList}>
                    {(() => {
                      let featuresArray = [];
                      if (typeof property.exteriorFeatures === 'string') {
                        featuresArray = property.exteriorFeatures.includes(',')
                          ? property.exteriorFeatures.split(',').map(item => item.trim())
                          : [property.exteriorFeatures];
                      } else if (Array.isArray(property.exteriorFeatures)) {
                        featuresArray = property.exteriorFeatures;
                      }

                      return featuresArray.length > 0 ? featuresArray.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      )) : null;
                    })()}
                  </ul>
                </div>
              )}

              {/* Download Buttons Section */}
              {(property.pricingUrl || property.factSheetUrl || property.brochureUrl) && (
                <div className={styles.downloadButtonsSection}>
                  {property.pricingUrl && (
                    <a 
                      href={property.pricingUrl} 
                      className={styles.downloadBtn}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className={styles.downloadBtnIcon}>$</div>
                      <span>Pricing</span>
                    </a>
                  )}
                  {property.factSheetUrl && (
                    <a 
                      href={property.factSheetUrl} 
                      className={styles.downloadBtn}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className={styles.downloadBtnIcon}>📋</div>
                      <span>Fact Sheet</span>
                    </a>
                  )}
                  {property.brochureUrl && (
                    <a 
                      href={property.brochureUrl} 
                      className={styles.downloadBtn}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className={styles.downloadBtnIcon}>📄</div>
                      <span>Brochure</span>
                    </a>
                  )}
                </div>
              )}

              {/* Map Section */}
              <div className={styles.locationMapCard}>
                <div className={styles.mapHeader}>
                  <h2>{property.address}</h2>
                  <span>
                    {property.city}, {property.state} {property.zipCode}
                  </span>
                </div>
                <div className={styles.mapWrapper}>
                  {property.latitude && property.longitude ? (
                    <PropertyMap
                      properties={[{
                        ...property,
                        imageUrl: images[0] || "/default.png"
                      }]}
                      selectedPropertyId={property.id}
                      useSimpleMarker={true}
                    />
                  ) : (
                    <div className={styles.mapPlaceholder}>
                      <div className={styles.mapContent}>
                        <div className={styles.errorIcon}>🗺️</div>
                        <h3>Map View</h3>
                        <p>
                          Location coordinates not available for this property.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Similar Properties */}
              {similarProperties.length > 0 && (
                <div className={styles.similarPropertiesCard}>
                  <h2>Similar Properties For Sale</h2>
                  <ul className={styles.similarPropertiesList}>
                    {similarProperties.map((similar, index) => (
                      <li key={index} className={styles.similarPropertyItem}>
                        <div
                          className={styles.similarPropertyCard}
                          onClick={() => handleSimilarPropertyClick(similar)}
                        >
                          <div className={styles.similarPropertyBody}>
                            <div className={styles.similarPropertySlider}>
                              <img
                                src={
                                  similar.image ||
                                  (similar.images && similar.images.length > 0
                                    ? getImageUrl(similar.images[0].url)
                                    : "/default.png") ||
                                  "/default.png"
                                }
                                alt={similar.address}
                                className={styles.similarPropertyImage}
                                onError={(e) => {
                                  e.target.src = "/default.png";
                                }}
                              />
                            </div>
                            <div className={styles.similarPropertyInfo}>
                              <div className={styles.similarPropertyPrice}>
                                {formatPrice(similar.price)}
                              </div>
                              <div className={styles.similarPropertyDetail}>
                                <div className={styles.similarPropertySpecs}>
                                  <strong>
                                    {similar.beds || similar.bedrooms}
                                  </strong>{" "}
                                  Beds
                                </div>
                                <div className={styles.similarPropertySpecs}>
                                  <strong>
                                    {similar.baths || similar.bathrooms}
                                  </strong>{" "}
                                  Baths
                                </div>
                                <div className={styles.similarPropertySpecs}>
                                  <strong>{formatNumber(similar.sqft)}</strong>{" "}
                                  Sq.Ft
                                </div>
                              </div>
                              <div className={styles.similarPropertyAddress}>
                                {similar.address}, {similar.city},{" "}
                                {similar.state} {similar.zipCode}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column - Contact Sidebar (Fixed) */}
            <div className={styles.rightColumn}>
              <div className={styles.contactSidebar}>
                <div className={styles.contactHeader}>
                  <span>Contact Agent</span>
                </div>

                <div className={styles.agentInfo}>
                  <div className={styles.agentAvatar}>
                    <img
                      // src="/src/assets/img/perfil.jpg"
                      src={perfil} 
                      alt={property.agent?.name || "Agent"}
                      className={styles.agentPhoto}
                    />
                  </div>
                  <div className={styles.agentDetails}>
                    <h3>{property.agent?.name || "Dayanne Costa"}</h3>
                    <div className={styles.agentPhone}>
                      Ph.{" "}
                      <a
                        href={`tel:${property.agentPhone || "+1 (646) 598-3588"}`}
                      >
                        {property.agentPhone || "+1 (646) 598-3588"}
                      </a>
                    </div>
                  </div>
                </div>

                <form className={styles.contactForm} onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name*"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name*"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email*"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Phone*"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="message">Comments</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Comments"
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>

                  {submitMessage && (
                    <div className={styles.submitMessage}>
                      {submitMessage}
                    </div>
                  )}

                  <div className={styles.requiredFields}>* Required Fields</div>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Request Information'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {showImageModal && images && (
        <div
          className={styles.imageModal}
          onClick={() => setShowImageModal(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeModal}
              onClick={() => setShowImageModal(false)}
            >
              ×
            </button>
            <img
              src={images[currentImageIndex]}
              alt={`${property.address} - Image ${currentImageIndex + 1}`}
              className={styles.modalImage}
              onError={(e) => {
                console.log("Modal image load error:", e.target.src);
                e.target.src = "/default.png";
              }}
            />
            <button className={styles.prevBtn} onClick={prevImage}>
              ‹
            </button>
            <button className={styles.nextBtn} onClick={nextImage}>
              ›
            </button>
            <div className={styles.imageCounter}>
              {currentImageIndex + 1} of {images.length}
            </div>
          </div>
        </div>
      )}

      <FavoriteModal 
        isOpen={showFavoriteModal} 
        onClose={() => setShowFavoriteModal(false)} 
      />
      
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />

      {/* Map Modal */}
      {showMapModal && (
        <div
          className={styles.mapModal}
          onClick={() => setShowMapModal(false)}
        >
          <div
            className={styles.mapModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeMapModal}
              onClick={() => setShowMapModal(false)}
            >
              ×
            </button>
            <div className={styles.mapModalHeader}>
              <h3>Property Location</h3>
              <p>{property.address}, {property.city}, {property.state} {property.zipCode}</p>
            </div>
            <div className={styles.mapModalContainer}>
              {property.latitude && property.longitude ? (
                <PropertyMap
                  properties={[{
                    ...property,
                    imageUrl: images[0] || "/default.png"
                  }]}
                  selectedPropertyId={property.id}
                  useSimpleMarker={true}
                  hidePopup={true}
                />
              ) : (
                <div className={styles.mapPlaceholder}>
                  <div className={styles.mapContent}>
                    <div className={styles.errorIcon}>🗺️</div>
                    <h3>Map View</h3>
                    <p>Location coordinates not available for this property.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;