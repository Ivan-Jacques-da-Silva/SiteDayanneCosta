import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../config/api';
import styles from './HeroSection.module.css';
import BackgroundCarousel from './BackgroundCarousel.jsx';
import mulherFixa from '../assets/img/mulher.png';

import slide1 from '../assets/img/slide1.jpeg';
import slide2 from '../assets/img/slide2.jpeg';
import slide3 from '../assets/img/slide3.jpeg';

const HeroSection = () => {
  const [searchData, setSearchData] = useState({
    propertyType: 'All',
    price: 'Any',
    beds: 'Any',
    location: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search data:', searchData);
    // Implementar lógica de busca
  };

  const handleBuyClick = () => {
    navigate('/buy-sell?action=buy');
  };

  const handleSellClick = () => {
    navigate('/buy-sell?action=sell');
  };

  const carouselImages = [slide1, slide2, slide3];

  return (
    <section className={`${styles.hero} position-relative`}>
      {/* BackgroundCarousel agora ocupa toda a área da seção */}
      <div className="position-absolute w-100 h-100" style={{ zIndex: 0 }}>
        <BackgroundCarousel images={carouselImages} interval={4000} />
      </div>

      {/* Conteúdo principal com z-index maior para ficar acima do carrossel */}
      <Container className="position-relative z-2 py-5 h-100">
        <Row className="justify-content-center text-center mb-4 h-100">
          <Col className="d-flex flex-column justify-content-center">
            <h1 className={`${styles.heroTitle} fw-bold text-white mb-4`}>
              Building Relationships, Building Real Estate Legacies
              <br />
              <span className={`${styles.heroSubtitle} d-block mt-3`}>Dayanne Costa</span>
            </h1>

            <Row className="justify-content-center">
              <Col lg={8}>
                <Row className="justify-content-center mb-4 g-2">
                  <Col xs={12} sm={6} md="auto">
                    <Button variant="light" className={`${styles.heroButton} w-100 px-4 py-3 fw-bold`} onClick={handleBuyClick}>
                      I Want To Buy
                    </Button>
                  </Col>
                  <Col xs={12} sm={6} md="auto">
                    <Button variant="light" className={`${styles.heroButton} w-100 px-4 py-3 fw-bold`} onClick={handleSellClick}>
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
                      <Button
                        variant="outline-dark"
                        className="px-4 bg-white"
                        style={{ border: '1px solid #ccc' }}
                      >
                        <i className="fas fa-search"></i>
                      </Button>
                    </div>
                  </Form.Group>
                  <div className="text-end mt-1">
                    <a href="#" className="text-white-50 small">Advanced search options</a>
                  </div>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <img
        src={mulherFixa}
        alt="Dayanne Costa"
        className="position-absolute end-0 bottom-0"
        style={{
          maxHeight: '90%',
          zIndex: 1,
          width: 'auto'
        }}
      />
    </section>
  );
};

export default HeroSection;