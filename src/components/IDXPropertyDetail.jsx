import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PropertyDetail.module.css";
import { buildApiUrl } from "../config/api";
import { useAuth } from "../contexts/AuthContext";
import PropertyMap from "./PropertyMap";
import FavoriteModal from "./FavoriteModal";
import LoginModal from "./LoginModal";
import perfil from '../assets/img/perfil.jpg';

const IDXPropertyDetail = ({ idxID, propertyData = null }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [property, setProperty] = useState(propertyData);
  const [loading, setLoading] = useState(!propertyData);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [viewMode, setViewMode] = useState("photos");
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

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
    if (!propertyData && idxID) {
      fetchPropertyData();
    }
  }, [idxID, propertyData]);

  useEffect(() => {
    if (property) {
      setFormData(prev => ({
        ...prev,
        message: `I am interested in ${property.address || property.streetAddress} ${property.cityName || property.city}, ${property.state} ${property.zipcode || property.zipCode}`
      }));
    }
  }, [property]);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      const response = await fetch(buildApiUrl(`/api/idx/properties/${idxID}`));
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setProperty(data);
    } catch (error) {
      console.error("Error fetching IDX property:", error);
    } finally {
      setLoading(false);
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
    const images = getPropertyImages();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    const images = getPropertyImages();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    if (!property) {
      setSubmitMessage('Property not loaded.');
      return;
    }
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const currentUrl = window.location.href;
      const enhancedMessage = `${formData.message}\n\nIDX Property URL: ${currentUrl}\nIDX Property ID: ${idxID}`;

      const response = await fetch(buildApiUrl('/api/emails/idx-inquiry'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          message: enhancedMessage,
          idxPropertyId: idxID,
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
          message: `I am interested in ${property.address || property.streetAddress} ${property.cityName || property.city}, ${property.state} ${property.zipcode || property.zipCode}`
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

  const getPropertyImages = () => {
    if (!property) return ["/default.png"];
    
    if (property.image && Array.isArray(property.image)) {
      return property.image.map(img => img.url || img).filter(url => url);
    }
    
    if (property.image && typeof property.image === 'object') {
      return [property.image.url || "/default.png"];
    }
    
    return ["/default.png"];
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

  const images = getPropertyImages();
  const address = property.address || property.streetAddress || "N/A";
  const city = property.cityName || property.city || "N/A";
  const state = property.state || "N/A";
  const zipCode = property.zipcode || property.zipCode || "";
  const beds = property.bedrooms || property.beds || "N/A";
  const baths = property.bathrooms || property.baths || property.totalBaths || "N/A";
  const sqft = property.sqFt || property.sqft || property.sqFeet || 0;
  const price = property.listPrice || property.price || 0;

  return (
    <div className={styles.propertyDetail}>
      <section className={styles.propertyHeader}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <h1 className={styles.propertyTitle}>
              {address}
              <span>
                {city}, {state} {zipCode}
              </span>
            </h1>
            <div className={styles.headerActions}>
              <button className={styles.shareBtn}>Share</button>
              <button className={styles.backBtn} onClick={handleBackClick}>
                Back to results
              </button>
              <button className={styles.newSearchBtn}>New Search</button>
              <a
                href={`tel:+1 (646) 598-3588`}
                className={styles.phoneBtn}
              >
                +1 (646) 598-3588
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.fullSlider} id="full-slider">
        <div className={styles.sliderContainer}>
          <img
            src={images[currentImageIndex] || "/default.png"}
            alt={`${address} - Image ${currentImageIndex + 1}`}
            className={styles.sliderImage}
            onClick={() => handleImageClick(currentImageIndex)}
            onError={(e) => {
              e.target.src = "/default.png";
            }}
          />

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
        </div>
      </section>

      <section className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.propertyInfoBar}>
            <div className={styles.priceSection}>
              <div className={styles.priceContainer}>
                <div className={styles.propertyPrice}>
                  {formatPrice(price)}
                </div>
                <div className={styles.estimatedPayment}>
                  Est. Payment
                  <button className={styles.calculatorBtn}>Calculate</button>
                </div>
              </div>
            </div>

            <div className={styles.propertySpecs}>
              <div className={styles.infoItem}>
                <span className={styles.infoNumber}>{beds}</span>
                <span className={styles.infoLabel}>Bed</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoNumber}>{baths}</span>
                <span className={styles.infoLabel}>Bath</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoNumber}>
                  {formatNumber(sqft) || "N/A"}
                </span>
                <span className={styles.infoLabel}>Size sq.ft.</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoNumber}>
                  ${sqft > 0 ? Math.round(price / sqft) : "N/A"}
                </span>
                <span className={styles.infoLabel}>$/Sqft</span>
              </div>
            </div>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.leftColumn}>
              <div className={styles.basicInfoCard}>
                <h2>Basic Information</h2>
                <ul className={styles.basicInfoList}>
                  <li>
                    <span className={styles.infoLabel}>MLS #</span>
                    <span className={styles.infoValue}>
                      {property.listingID || "N/A"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.infoLabel}>Type</span>
                    <span className={styles.infoValue}>
                      {property.propType || property.propertyType || "N/A"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.infoLabel}>Year Built</span>
                    <span className={styles.infoValue}>
                      {property.yearBuilt || "N/A"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.infoLabel}>Total Sqft</span>
                    <span className={styles.infoValue}>
                      {formatNumber(sqft)}
                    </span>
                  </li>
                </ul>
              </div>

              {property.remarks && (
                <div className={styles.descriptionCard}>
                  <h2>Description</h2>
                  <p>{property.remarks}</p>
                </div>
              )}
            </div>

            <div className={styles.rightColumn}>
              <div className={styles.contactSidebar}>
                <div className={styles.contactHeader}>
                  <span>Contact Agent for IDX Property</span>
                </div>

                <div className={styles.agentInfo}>
                  <div className={styles.agentAvatar}>
                    <img
                      src={perfil} 
                      alt="Dayanne Costa"
                      className={styles.agentPhoto}
                    />
                  </div>
                  <div className={styles.agentDetails}>
                    <h3>Dayanne Costa</h3>
                    <div className={styles.agentPhone}>
                      <a href="tel:+16465983588">+1 (646) 598-3588</a>
                    </div>
                  </div>
                </div>

                <form className={styles.contactForm} onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  {submitMessage && (
                    <div className={styles.submitMessage}>
                      {submitMessage}
                    </div>
                  )}

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

      {showImageModal && (
        <div className={styles.imageModal} onClick={() => setShowImageModal(false)}>
          <button className={styles.modalClose} onClick={() => setShowImageModal(false)}>×</button>
          <img
            src={images[currentImageIndex]}
            alt={`${address}`}
            className={styles.modalImage}
            onClick={(e) => e.stopPropagation()}
          />
          {images.length > 1 && (
            <>
              <button className={styles.modalPrev} onClick={(e) => { e.stopPropagation(); prevImage(); }}>‹</button>
              <button className={styles.modalNext} onClick={(e) => { e.stopPropagation(); nextImage(); }}>›</button>
            </>
          )}
        </div>
      )}

      {showMapModal && property.latitude && property.longitude && (
        <div className={styles.mapModal} onClick={() => setShowMapModal(false)}>
          <div className={styles.mapModalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowMapModal(false)}>×</button>
            <PropertyMap 
              latitude={parseFloat(property.latitude)} 
              longitude={parseFloat(property.longitude)}
              address={`${address}, ${city}, ${state} ${zipCode}`}
            />
          </div>
        </div>
      )}

      <FavoriteModal 
        show={showFavoriteModal}
        onClose={() => setShowFavoriteModal(false)}
      />

      <LoginModal 
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default IDXPropertyDetail;
