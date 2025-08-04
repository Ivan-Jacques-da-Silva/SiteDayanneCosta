import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import styles from './FeaturedNeighborhoods.module.css';

const FeaturedNeighborhoods = () => {
  const neighborhoods = ["Brickell", "Coconut Grove", "Miami Beach", "Downtown"];
  const featuredListing = {
    price: "$3,850,000",
    address: "2020 North Bayshore",
    description: "Welcome to PH1 - This exquisitely designed and fully furnished condo offers stunning water & city views from the terrace. Features include Italian marble floors, a master suite with laundry area, and 3 parking spots.",
    details: "4 Beds • 4 Baths • 2,932 Sqft"
  };

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
              <div className={styles.neighborhoodCard}>
                {neighborhood}
              </div>
            </Col>
          ))}
        </Row>

        <Row className="mb-4">
          <Col className="text-center">
            <Button variant="link" className={styles.viewAllButton}>
              View All <i className="bi bi-arrow-right ms-2"></i>
            </Button>
          </Col>
        </Row>

        <Card className={styles.featuredListing}>
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
        </Card>
      </Container>
    </section>
  );
};

export default FeaturedNeighborhoods;