import React from 'react';
import { Container, Row, Col, Form, Button, Tab, Tabs } from 'react-bootstrap';
import styles from './HeroSection.module.css';
import BackgroundCarousel from './BackgroundCarousel';
import mulherFixa from '../assets/img/mulher.png';
import bgImage1 from '../assets/img/fundoImg.jpeg';
import bgImage2 from '../assets/img/bg-buy.jpeg';
import bgImage3 from '../assets/img/bg-sell.jpeg';

const HeroSection = () => {
  const carouselImages = [bgImage1, bgImage2, bgImage3];

  return (
    <section className={`${styles.hero} position-relative`}>
      <BackgroundCarousel images={carouselImages} interval={4000}>
        <Container className="position-relative z-1 py-5">
          <Row className="justify-content-center text-center mb-4">
            <Col lg={10} xl={8}>
              <h1 className={`${styles.heroTitle} fw-bold text-white mb-4`}>
                Building Relationships, Building Real Estate Legacies
                <br />
                <span className={`${styles.heroSubtitle} d-block mt-3`}>Dayanne Costa</span>
              </h1>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <Row className="justify-content-center mb-4 g-2">
                <Col xs={12} sm={6} md="auto">
                  <Button variant="light" className={`${styles.heroButton} w-100 px-4 py-3 fw-bold`}>
                    I Want To Buy
                  </Button>
                </Col>
                <Col xs={12} sm={6} md="auto">
                  <Button variant="light" className={`${styles.heroButton} w-100 px-4 py-3 fw-bold`}>
                    I Want To Sell
                  </Button>
                </Col>
              </Row>

            <Form className={styles.searchForm}>
              <Form.Group controlId="searchProperty">
                <div className="input-group">
                  <Form.Select className="w-auto">
                    <option>For Sale</option>
                    <option>For Rent</option>
                  </Form.Select>
                  <Form.Control
                    type="text"
                    placeholder="Enter an address, city, zip code or MLS number"
                    className="py-3"
                  />
                  <Button variant="primary" className="px-4">
                    <i className="bi bi-search"></i>
                  </Button>
                </div>
              </Form.Group>
              <div className="text-end mt-1">
                <a href="#" className="text-white-50 small">Advanced search options</a>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      <img src={mulherFixa} alt="Dayanne Costa" className="position-absolute end-0 bottom-0" style={{ maxHeight: '90%', zIndex: 2 }} />
    </section>
  );
};

export default HeroSection;
