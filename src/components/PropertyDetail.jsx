
import React, { useState, useEffect } from 'react';
import styles from './PropertyDetail.module.css';

const PropertyDetail = ({ propertyId, propertyData = null }) => {
  const [property, setProperty] = useState(propertyData);
  const [loading, setLoading] = useState(!propertyData);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    if (!propertyData && propertyId) {
      fetchPropertyData();
    }
  }, [propertyId, propertyData]);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      // Substitua pela sua URL de API
      const response = await fetch(`/api/property/${propertyId}`);
      const data = await response.json();
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (typeof price === 'string') return price;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setShowImageModal(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
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

  return (
    <div className={styles.propertyDetail}>
      {/* Header Section */}
      <section className={styles.headerSection}>
        <div className={styles.titleContainer}>
          <h1 className={styles.propertyTitle}>
            {property.address}
            <span>{property.city}, {property.state} {property.zipCode}</span>
          </h1>
          <div className={styles.breadcrumbOptions}>
            <button className={styles.backBtn}>Back to results</button>
            <button className={styles.shareBtn}>Share</button>
            <button className={styles.saveBtn}>Save</button>
            <a href={`tel:${property.agentPhone}`} className={styles.phoneBtn}>
              {property.agentPhone}
            </a>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className={styles.imageGallery}>
        <div className={styles.mainImageContainer}>
          <img 
            src={property.images?.[0] || property.image || '/placeholder-image.jpg'}
            alt={property.address}
            className={styles.mainImage}
            onClick={() => handleImageClick(0)}
          />
          <div className={styles.imageControls}>
            <button 
              className={styles.galleryBtn}
              onClick={() => setShowImageModal(true)}
            >
              View All Photos ({property.images?.length || 1})
            </button>
            <button className={styles.mapBtn}>Map View</button>
            {property.virtualTour && (
              <a 
                href={property.virtualTour} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.tourBtn}
              >
                Virtual Tour
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Property Information */}
      <section className={styles.propertyInfo}>
        <div className={styles.priceSection}>
          <div className={styles.price}>{formatPrice(property.price)}</div>
          <div className={styles.priceDetails}>
            <span className={styles.pricePerSqft}>
              ${property.pricePerSqft || Math.round(property.price / property.sqft)}/sq.ft
            </span>
            {property.estimatedPayment && (
              <button className={styles.calculatorBtn}>
                Est. Payment: {property.estimatedPayment}/mo
              </button>
            )}
          </div>
        </div>

        <div className={styles.propertySpecs}>
          <div className={styles.spec}>
            <span className={styles.specNumber}>{property.beds || 'N/A'}</span>
            <span className={styles.specLabel}>Bed{property.beds !== 1 ? 's' : ''}</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specNumber}>{property.baths || 'N/A'}</span>
            <span className={styles.specLabel}>Bath{property.baths !== 1 ? 's' : ''}</span>
          </div>
          {property.halfBaths > 0 && (
            <div className={styles.spec}>
              <span className={styles.specNumber}>{property.halfBaths}</span>
              <span className={styles.specLabel}>Half Bath</span>
            </div>
          )}
          <div className={styles.spec}>
            <span className={styles.specNumber}>{formatNumber(property.sqft) || 'N/A'}</span>
            <span className={styles.specLabel}>Sq.Ft.</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Basic Information */}
        <div className={styles.basicInfo}>
          <h2>Basic Information</h2>
          <ul className={styles.infoList}>
            <li>
              <span className={styles.infoLabel}>MLS #</span>
              <span className={styles.infoValue}>{property.mlsNumber}</span>
            </li>
            <li>
              <span className={styles.infoLabel}>Type</span>
              <span className={styles.infoValue}>{property.propertyType}</span>
            </li>
            <li>
              <span className={styles.infoLabel}>Subdivision/Complex</span>
              <span className={styles.infoValue}>{property.subdivision || 'N/A'}</span>
            </li>
            <li>
              <span className={styles.infoLabel}>Year Built</span>
              <span className={styles.infoValue}>{property.yearBuilt || 'N/A'}</span>
            </li>
            <li>
              <span className={styles.infoLabel}>Total Sqft</span>
              <span className={styles.infoValue}>{formatNumber(property.sqft)}</span>
            </li>
            <li>
              <span className={styles.infoLabel}>Date Listed</span>
              <span className={styles.infoValue}>{property.dateListed}</span>
            </li>
            <li>
              <span className={styles.infoLabel}>Days on Market</span>
              <span className={styles.infoValue}>{property.daysOnMarket}</span>
            </li>
          </ul>
        </div>

        {/* Description */}
        {property.description && (
          <div className={styles.description}>
            <h2>Description</h2>
            <p>{property.description}</p>
          </div>
        )}

        {/* Amenities */}
        {property.amenities && property.amenities.length > 0 && (
          <div className={styles.amenities}>
            <h2>Amenities</h2>
            <ul className={styles.amenitiesList}>
              {property.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Exterior Features */}
        {property.exteriorFeatures && (
          <div className={styles.features}>
            <h2>Exterior Features</h2>
            <ul className={styles.featuresList}>
              {property.exteriorFeatures.waterfront && (
                <li>
                  <span className={styles.featureLabel}>Waterfront</span>
                  <span className={styles.featureValue}>Yes</span>
                </li>
              )}
              {property.exteriorFeatures.parkingSpaces && (
                <li>
                  <span className={styles.featureLabel}>Parking Spaces</span>
                  <span className={styles.featureValue}>{property.exteriorFeatures.parkingSpaces}</span>
                </li>
              )}
              {property.exteriorFeatures.pool && (
                <li>
                  <span className={styles.featureLabel}>Pool</span>
                  <span className={styles.featureValue}>Yes</span>
                </li>
              )}
              {property.exteriorFeatures.waterfrontDescription && (
                <li>
                  <span className={styles.featureLabel}>WF Description</span>
                  <span className={styles.featureValue}>{property.exteriorFeatures.waterfrontDescription}</span>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Interior Features */}
        {property.interiorFeatures && (
          <div className={styles.features}>
            <h2>Interior Features</h2>
            <ul className={styles.featuresList}>
              <li>
                <span className={styles.featureLabel}>Adjusted Sqft</span>
                <span className={styles.featureValue}>{formatNumber(property.sqft)} Sq.Ft</span>
              </li>
              {property.interiorFeatures.features && (
                <li>
                  <span className={styles.featureLabel}>Interior Features</span>
                  <span className={styles.featureValue}>{property.interiorFeatures.features}</span>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Property Features */}
        <div className={styles.features}>
          <h2>Property Features</h2>
          <ul className={styles.featuresList}>
            {property.lotSize && (
              <li>
                <span className={styles.featureLabel}>Aprox. Lot Size</span>
                <span className={styles.featureValue}>{property.lotSize}</span>
              </li>
            )}
            {property.furnished !== undefined && (
              <li>
                <span className={styles.featureLabel}>Furnished Info</span>
                <span className={styles.featureValue}>{property.furnished ? 'Yes' : 'No'}</span>
              </li>
            )}
            {property.saleType && (
              <li>
                <span className={styles.featureLabel}>Sale Type</span>
                <span className={styles.featureValue}>{property.saleType}</span>
              </li>
            )}
            {property.hoaFees && (
              <li>
                <span className={styles.featureLabel}>HOA Fees</span>
                <span className={styles.featureValue}>{formatPrice(property.hoaFees)}</span>
              </li>
            )}
            {property.subdivision && (
              <li>
                <span className={styles.featureLabel}>Subdivision Complex</span>
                <span className={styles.featureValue}>{property.subdivision}</span>
              </li>
            )}
            {property.taxAmount && (
              <li>
                <span className={styles.featureLabel}>Tax Amount</span>
                <span className={styles.featureValue}>{formatPrice(property.taxAmount)}</span>
              </li>
            )}
            {property.taxYear && (
              <li>
                <span className={styles.featureLabel}>Tax Year</span>
                <span className={styles.featureValue}>{property.taxYear}</span>
              </li>
            )}
          </ul>
        </div>

        {/* Map */}
        {property.coordinates && (
          <div className={styles.mapSection}>
            <h2>{property.address}</h2>
            <p>{property.city}, {property.state} {property.zipCode}</p>
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapError}>
                <div className={styles.errorIcon}>🗺️</div>
                <h3>Map View</h3>
                <p>Interactive map with property location will be displayed here.</p>
              </div>
            </div>
          </div>
        )}

        {/* Similar Properties */}
        {property.similarProperties && property.similarProperties.length > 0 && (
          <div className={styles.similarProperties}>
            <h2>Similar Properties For Sale</h2>
            <div className={styles.similarGrid}>
              {property.similarProperties.map((similar, index) => (
                <div key={index} className={styles.similarCard}>
                  <img 
                    src={similar.image || '/placeholder-image.jpg'} 
                    alt={similar.address}
                    className={styles.similarImage}
                  />
                  <div className={styles.similarInfo}>
                    <div className={styles.similarPrice}>{formatPrice(similar.price)}</div>
                    <div className={styles.similarSpecs}>
                      <span><strong>{similar.beds}</strong> Beds</span>
                      <span><strong>{similar.baths}</strong> Baths</span>
                      <span><strong>{formatNumber(similar.sqft)}</strong> Sq.Ft</span>
                    </div>
                    <div className={styles.similarAddress}>
                      {similar.address}, {similar.city}, {similar.state} {similar.zipCode}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact Form Sidebar */}
      <aside className={styles.contactSidebar}>
        <div className={styles.agentInfo}>
          {property.agent?.photo && (
            <img 
              src={property.agent.photo} 
              alt={property.agent.name}
              className={styles.agentPhoto}
            />
          )}
          <div className={styles.agentDetails}>
            <h3>{property.agent?.name || 'Real Estate Agent'}</h3>
            <p>Ph. <a href={`tel:${property.agentPhone}`}>{property.agentPhone}</a></p>
          </div>
        </div>

        <form className={styles.contactForm}>
          <h3>Contact Agent</h3>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Comments</label>
            <textarea 
              id="message" 
              name="message" 
              rows="4"
              defaultValue={`I am interested in ${property.address} ${property.city}, ${property.state} ${property.zipCode}`}
            ></textarea>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Request Information
          </button>
        </form>
      </aside>

      {/* Image Modal */}
      {showImageModal && property.images && (
        <div className={styles.imageModal} onClick={() => setShowImageModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeModal}
              onClick={() => setShowImageModal(false)}
            >
              ×
            </button>
            <img 
              src={property.images[currentImageIndex]} 
              alt={`${property.address} - Image ${currentImageIndex + 1}`}
              className={styles.modalImage}
            />
            <button className={styles.prevBtn} onClick={prevImage}>‹</button>
            <button className={styles.nextBtn} onClick={nextImage}>›</button>
            <div className={styles.imageCounter}>
              {currentImageIndex + 1} of {property.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
