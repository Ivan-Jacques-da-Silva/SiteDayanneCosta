
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { buildApiUrl, getImageUrl } from '../config/api';
import styles from './FeaturedListings.module.css';

const FeaturedListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedListings();
  }, []);

  const fetchFeaturedListings = async () => {
    try {
      const response = await fetch(buildApiUrl('/api/featured-listings?limit=6'));
      const data = await response.json();
      
      if (response.ok && data.properties) {
        setProperties(data.properties);
      } else {
        console.error('Error fetching featured listings:', data.error);
      }
    } catch (error) {
      console.error('Error fetching featured listings:', error);
    } finally {
      setLoading(false);
    }
  };

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
      const primaryImage = property.images.find(img => img.isPrimary);
      if (primaryImage) {
        return getImageUrl(primaryImage.url);
      }
      return getImageUrl(property.images[0].url);
    }
    return '/default.png';
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const handleViewAll = () => {
    navigate('/properties');
  };

  if (loading) {
    return (
      <section className={`${styles.featuredSection} py-5`}>
        <Container>
          <Row className="text-center mb-5">
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
      <section className={`${styles.featuredSection} py-5`}>
        <Container>
          <Row className="text-center mb-5">
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

  return (
    <section className={`${styles.featuredSection} py-5`}>
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h5 className="text-uppercase text-muted">Featured</h5>
            <h2 className="fw-bold">Listings</h2>
          </Col>
        </Row>

        <Row>
          {properties.map((property) => (
            <Col lg={4} md={6} className="mb-4" key={property.id}>
              <Card 
                className={`${styles.propertyCard} h-100 border-0 shadow-sm`}
                onClick={() => handlePropertyClick(property.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.imageContainer}>
                  <Card.Img
                    variant="top"
                    src={getPropertyImage(property)}
                    alt={property.title}
                    className={styles.propertyImage}
                    onError={(e) => {
                      e.target.src = '/default.png';
                    }}
                  />
                  <div className={styles.featuredBadge}>
                    Featured
                  </div>
                </div>
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className={`${styles.propertyTitle} h5 mb-0`}>
                      {property.title}
                    </Card.Title>
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
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="mt-4">
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
