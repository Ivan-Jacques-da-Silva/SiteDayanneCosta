
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { buildApiUrl } from '../config/api';
import styles from './FeaturedListings.module.css';

const FeaturedListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth <= 480) {
        setItemsPerSlide(1);
      } else if (window.innerWidth <= 768) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);

    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  useEffect(() => {
    fetchFeaturedListings();
  }, []);

  const fetchFeaturedListings = async () => {
    try {
      const response = await fetch(buildApiUrl('/api/idx/clients/featured?count=6'));
      const data = await response.json();
      
      if (response.ok && data.data) {
        const formattedProperties = Object.values(data.data).map(prop => ({
          id: prop.listingID,
          title: prop.address,
          price: prop.price,
          listingPrice: prop.listingPrice,
          bedrooms: prop.bedrooms,
          bathrooms: prop.totalBaths,
          sqft: prop.sqFt ? parseInt(prop.sqFt.replace(/,/g, '')) : null,
          address: prop.address,
          city: prop.cityName,
          state: prop.state,
          zipcode: prop.zipcode,
          images: prop.image && prop.image[0] ? [prop.image[0].url] : [],
          detailsURL: prop.fullDetailsURL
        }));
        setProperties(formattedProperties);
      } else {
        console.error('Error fetching featured listings:', data.erro);
      }
    } catch (error) {
      console.error('Error fetching featured listings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Código antigo comentado para uso futuro
  // const fetchFeaturedListings = async () => {
  //   try {
  //     const response = await fetch(buildApiUrl('/api/featured-listings?limit=6'));
  //     const data = await response.json();
  //     
  //     if (response.ok && data.properties) {
  //       setProperties(data.properties);
  //     } else {
  //       console.error('Error fetching featured listings:', data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching featured listings:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const formatPrice = (price) => {
    if (!price) return 'Contact for Price';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyImage = (property) => {
    if (property.images && property.images.length > 0) {
      return property.images[0];
    }
    return '/default.png';
  };

  // Código antigo comentado para uso futuro
  // const getPropertyImage = (property) => {
  //   if (property.images && property.images.length > 0) {
  //     const primaryImage = property.images.find(img => img.isPrimary);
  //     if (primaryImage) {
  //       return getImageUrl(primaryImage.url);
  //     }
  //     return getImageUrl(property.images[0].url);
  //   }
  //   return '/default.png';
  // };

  useEffect(() => {
    if (properties.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.ceil(properties.length / itemsPerSlide) - 1;
        return prevIndex === maxIndex ? 0 : prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [properties.length, itemsPerSlide]);

  const handlePropertyClick = (property) => {
    if (property.detailsURL) {
      window.open(property.detailsURL, '_blank');
    }
  };

  const handleViewAll = () => {
    navigate('/properties');
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const goToPrevious = () => {
    const totalSlides = Math.ceil(properties.length / itemsPerSlide);
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    const totalSlides = Math.ceil(properties.length / itemsPerSlide);
    setCurrentIndex(prevIndex => 
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return (
      <section className={`${styles.featuredSection} py-3`}>
        <Container>
          <Row className="text-center mb-3">
            <Col>
              <h5 className="text-uppercase text-muted">Featured</h5>
              <h2 className="fw-bold">Listings</h2>
              <p className="text-muted">Loading featured properties...</p>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <section className={`${styles.featuredSection} py-3`}>
        <Container>
          <Row className="text-center mb-3">
            <Col>
              <h5 className="text-uppercase text-muted">Featured</h5>
              <h2 className="fw-bold">Listings</h2>
              <p className="text-muted">No featured properties available at the moment.</p>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  const startIndex = currentIndex * itemsPerSlide;
  const visibleProperties = properties.slice(startIndex, startIndex + itemsPerSlide);
  const totalSlides = Math.ceil(properties.length / itemsPerSlide);

  return (
    <section className={`${styles.featuredSection} py-3`}>
      <Container>
        <Row className="text-center mb-3">
          <Col>
            <h5 className="text-uppercase text-muted">Featured</h5>
            <h2 className="fw-bold">Listings</h2>
          </Col>
        </Row>

        <div style={{ position: 'relative', overflow: 'hidden', padding: '0 60px' }}>
          {totalSlides > 1 && (
            <>
              <button
                onClick={goToPrevious}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  cursor: 'pointer',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: '#000',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 1)';
                  e.target.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                ‹
              </button>
              <button
                onClick={goToNext}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  cursor: 'pointer',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: '#000',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 1)';
                  e.target.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                ›
              </button>
            </>
          )}

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: window.innerWidth <= 480 ? '1fr' : 
                                window.innerWidth <= 768 ? 'repeat(2, 1fr)' : 
                                'repeat(3, 1fr)', 
            gap: window.innerWidth <= 480 ? '15px' : '20px', 
            marginBottom: '20px',
            margin: '0 auto'
          }}>
            {visibleProperties.map((property) => (
              <div 
                key={property.id}
                className={styles.propertyCard}
                onClick={() => handlePropertyClick(property)}
                style={{ 
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  overflow: 'hidden',
                  borderRadius: '0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={getPropertyImage(property)}
                    alt={property.title}
                    className={styles.propertyImage}
                    onError={(e) => {
                      e.target.src = '/default.png';
                    }}
                  />
                </div>
                <div style={{ padding: '15px' }}>
                  <div className={styles.propertyTitle}>
                    {property.title}
                  </div>
                  
                  <div className={styles.propertyPrice}>
                    {formatPrice(property.price)}
                  </div>

                  <div className={styles.propertyDetails}>
                    {property.bedrooms && (
                      <span className={styles.detailItem}>
                        <i className="fas fa-bed"></i> {property.bedrooms} Bed
                      </span>
                    )}
                    {property.bathrooms && (
                      <span className={styles.detailItem}>
                        <i className="fas fa-bath"></i> {property.bathrooms} Bath
                      </span>
                    )}
                    {property.sqft && (
                      <span className={styles.detailItem}>
                        <i className="fas fa-ruler"></i> {property.sqft.toLocaleString()} Sq.Ft.
                      </span>
                    )}
                  </div>

                  <div className={styles.propertyLocation}>
                    <i className="fas fa-map-marker-alt"></i>
                    {property.address}, {property.city}, {property.state}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalSlides > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  style={{
                    width: '8px',
                    height: '8px',
                    minWidth: '8px',
                    minHeight: '8px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: currentIndex === index ? '#000' : 'rgba(0, 0, 0, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: '0',
                    outline: 'none'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <Row className="mt-2">
          <Col className="text-center">
            <Button 
              variant="outline-dark" 
              className="rounded-0 px-5 py-2 fw-bold"
              onClick={handleViewAll}
            >
              View All Properties
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedListings;
