import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styles from './Listings.module.css';

const Listings = () => {
  const navigate = useNavigate();

  const properties = [
    {
      id: 1,
      price: "$19,500,000",
      details: "2 Bed(s) • 2 Bath(s) • 5,798 Sq.Ft.",
      status: "NEW - 07 HOURS AGO",
      address: "1425 Brickell Ave #PH4BCD",
      city: "Miami, FL 33131",
      image: '/default.png',
      beds: 2,
      baths: 2,
      sqft: 5798
    },
    {
      id: 2,
      price: "$1,645,000",
      details: "2 Bed(s) • 2 Bath(s) • 1,286 Sq.Ft.",
      status: "NEW - 09 HOURS AGO",
      address: "1000 Brickell Plz #3501",
      city: "Miami, FL 33131",
      image: '/default.png',
      beds: 2,
      baths: 2,
      sqft: 1286
    },
    {
      id: 3,
      price: "$2,190,000",
      details: "2 Bed(s) • 2 Bath(s) • 2,070 Sq.Ft.",
      status: "NEW - 11 HOURS AGO",
      address: "2127 Brickell Ave #2104",
      city: "Miami, FL 33129",
      image: '/default.png',
      beds: 2,
      baths: 2,
      sqft: 2070
    },
  ];

  const handleViewProperty = (property) => {
    navigate(`/property/${property.id}`, { state: { property } });
  };

  return (
    <section className="py-5">
      <Container>
        <Row className="mb-4">
          <Col className="text-center">
            <h2 className="text-uppercase fw-bold">Featured Listings</h2>
          </Col>
        </Row>

        <Row xs={1} sm={2} lg={3} className="g-4">
          {properties.map((property, index) => (
            <Col key={index}>
              <Card className="border-0 h-100 shadow-sm" style={{ cursor: 'pointer' }} onClick={() => handleViewProperty(property)}>
                <div className="position-relative">
                  <div className="position-absolute top-0 start-0 bg-dark text-white px-3 py-1 small fw-bold" style={{ zIndex: 1 }}>
                    {property.status}
                  </div>
                  <Card.Img 
                    variant="top" 
                    src={property.image} 
                    className="rounded-0" 
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                </div>
                <Card.Body className="px-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="fs-5 fw-bold mb-0">{property.price}</Card.Title>
                    <i className="bi bi-star fs-4"></i>
                  </div>
                  <Card.Text className="text-muted small mb-1">{property.details}</Card.Text>
                  <Card.Text className="text-muted small mb-0">{property.address}</Card.Text>
                  <Card.Text className="text-muted small">{property.city}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="mt-5">
          <Col className="text-center">
            <Button variant="outline-dark" className="rounded-0 px-5 py-2 fw-bold">
              View All Listings
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Listings;
