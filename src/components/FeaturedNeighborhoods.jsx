import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './FeaturedNeighborhoods.module.css';

const FeaturedNeighborhoods = () => {
  const navigate = useNavigate();
  const [neighborhoodImages, setNeighborhoodImages] = useState({});
  const [loading, setLoading] = useState(true);

  const neighborhoods = [
    { name: "Brickell", link: "/brickell/", categoryParam: "brickell" },
    { name: "Edgewater", link: "/edgewater/", categoryParam: "edgewater" },
    { name: "Coconut Grove", link: "/coconut-grove/", categoryParam: "coconut grove" },
    { name: "The Roads", link: "/the-roads/", categoryParam: "the roads" }
  ];

  const featuredListing = {
    price: "$3,850,000",
    address: "2020 North Bayshore",
    description: "Welcome to PH1 - This exquisitely designed and fully furnished condo offers stunning water & city views from the terrace. Features include Italian marble floors, a master suite with laundry area, and 3 parking spots.",
    details: "4 Beds • 4 Baths • 2,932 Sqft"
  };

  useEffect(() => {
    const fetchNeighborhoodImages = async () => {
      try {
        const imagePromises = neighborhoods.map(async (neighborhood) => {
          const response = await fetch(`http://localhost:5000/api/properties-by-category?neighborhood=${encodeURIComponent(neighborhood.categoryParam)}&limit=1&page=1`);
          const data = await response.json();

          if (data.properties && data.properties.length > 0) {
            const property = data.properties[0];
            const primaryImage = property.images?.find(img => img.isPrimary) || property.images?.[0];
            return {
              name: neighborhood.name,
              image: primaryImage ? `http://localhost:5000${primaryImage.url}` : null
            };
          }
          return {
            name: neighborhood.name,
            image: null
          };
        });

        const results = await Promise.all(imagePromises);
        const imageMap = {};
        results.forEach(result => {
          imageMap[result.name] = result.image;
        });

        setNeighborhoodImages(imageMap);
      } catch (error) {
        console.error('Error fetching neighborhood images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNeighborhoodImages();
  }, []);

  return (
    <section className={`${styles.featuredNeighborhoods} py-5`}>
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className={`${styles.sectionTitle} text-uppercase`}>FEATURED NEIGHBORHOODS</h2>
          </Col>
        </Row>

        <Row className="g-3 mb-5">
          {neighborhoods.map((neighborhood, index) => (
            <Col key={index} xs={6} md={3}>
              <div
                className={styles.neighborhoodCard}
                onClick={() => navigate(neighborhood.link)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.neighborhoodImageContainer}>
                  {loading ? (
                    <div className={styles.imagePlaceholder}>
                      <div className={styles.loadingSpinner}></div>
                    </div>
                  ) : neighborhoodImages[neighborhood.name] ? (
                    <img
                      src={neighborhoodImages[neighborhood.name]}
                      alt={neighborhood.name}
                      className={styles.neighborhoodImage}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <span style={{color: '#666', fontSize: '14px'}}>No image available</span>
                    </div>
                  )}
                  <div className={styles.neighborhoodOverlay}>
                    <span className={styles.neighborhoodName}>{neighborhood.name}</span>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Row className="mb-4">
          <Col className="text-center">
            <Button
              variant="link"
              className={styles.viewAllButton}
              onClick={() => navigate('/properties/')}
            >
              View All
            </Button>
          </Col>
        </Row>

        {/* <Card className={styles.featuredListing}>
          <Card.Body>
            <div className={styles.listingPrice}>{featuredListing.price}</div>
            <div className={styles.listingAddress}>{featuredListing.address}</div>
            <Card.Text className={styles.listingDescription}>
              {featuredListing.description}
            </Card.Text>
            <div className={styles.listingDetails}>{featuredListing.details}</div>
          </Card.Body>
          <Card.Footer className="bg-transparent border-0 text-center">
            <Button variant="link" className={styles.viewAllButton}>
              View All Sold <i className="bi bi-arrow-right ms-2"></i>
            </Button>
          </Card.Footer>
        </Card> */}
      </Container>
    </section>
  );
};

export default FeaturedNeighborhoods;