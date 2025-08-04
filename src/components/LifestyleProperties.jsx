import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './LifestyleProperties.module.css';
import img1 from '../assets/img/waterfront-homes.jpeg';
import img2 from '../assets/img/boat-docks.jpeg';
import img3 from '../assets/img/golf-course.jpeg';
import img4 from '../assets/img/luxury-condos.jpeg';

const LifestyleProperties = () => {
  const properties = [
    { title: 'Waterfront Homes', image: img1 },
    { title: 'Boat Docks', image: img2 },
    { title: 'Golf Course', image: img3 },
    { title: 'Luxury Condos', image: img4 },
  ];

  return (
    <section className="py-5">
      <Container>
        <Row className="mb-4 text-center">
          <Col>
            <small className="text-muted text-uppercase">Browse</small>
            <h2 className="fw-bold text-uppercase">Lifestyle Properties</h2>
          </Col>
        </Row>

        <Row className="g-4">
          {properties.map((item, index) => (
            <Col key={index} xs={12} sm={6} lg={6}>
              <div className="overflow-hidden position-relative group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-100"
                  style={{ 
                    height: '300px', 
                    objectFit: 'cover', 
                    transition: 'transform 0.4s ease',
                    borderRadius: '8px'
                  }}
                />
                <div className="text-center mt-3">
                  <p className="fw-semibold mb-0 fs-5">{item.title}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default LifestyleProperties;
