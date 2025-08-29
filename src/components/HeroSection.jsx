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
    
    if (!searchData.location.trim()) {
      alert('Please enter a location to search');
      return;
    }

    // Construir parâmetros de busca
    const searchParams = new URLSearchParams();
    
    if (searchData.location) {
      searchParams.set('search', searchData.location);
    }
    
    if (searchData.propertyType !== 'All') {
      searchParams.set('propertyType', searchData.propertyType);
    }
    
    if (searchData.price !== 'Any') {
      // Converter price para filtros min/max
      const priceRanges = {
        'Under $500K': { max: 500000 },
        '$500K - $1M': { min: 500000, max: 1000000 },
        '$1M - $2M': { min: 1000000, max: 2000000 },
        '$2M - $5M': { min: 2000000, max: 5000000 },
        'Over $5M': { min: 5000000 }
      };
      
      if (priceRanges[searchData.price]) {
        if (priceRanges[searchData.price].min) {
          searchParams.set('minPrice', priceRanges[searchData.price].min);
        }
        if (priceRanges[searchData.price].max) {
          searchParams.set('maxPrice', priceRanges[searchData.price].max);
        }
      }
    }
    
    if (searchData.beds !== 'Any') {
      searchParams.set('bedrooms', searchData.beds);
    }

    // Navegar para página de resultados
    navigate(`/search-results?${searchParams.toString()}`);
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

                <Form className={styles.searchForm} onSubmit={handleSearch}>
                  <Form.Group controlId="searchProperty">
                    <div className="input-group mb-3">
                      <Form.Select 
                        className="w-auto"
                        value={searchData.propertyType}
                        onChange={(e) => handleInputChange('propertyType', e.target.value)}
                      >
                        <option value="All">All Types</option>
                        <option value="CONDO">Condo</option>
                        <option value="SINGLE_FAMILY">Single Family</option>
                        <option value="TOWNHOUSE">Townhouse</option>
                        <option value="LUXURY_CONDO">Luxury Condo</option>
                      </Form.Select>
                      <Form.Control
                        type="text"
                        placeholder="Enter an address, city, neighborhood, or zip code"
                        className="py-3"
                        value={searchData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="outline-dark"
                        className="px-4 bg-white"
                        style={{ border: '1px solid #ccc' }}
                      >
                        <i className="fas fa-search"></i>
                      </Button>
                    </div>
                    
                    <div className="row g-2">
                      <div className="col-md-6">
                        <Form.Select
                          value={searchData.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          className="form-select-sm"
                        >
                          <option value="Any">Any Price</option>
                          <option value="Under $500K">Under $500K</option>
                          <option value="$500K - $1M">$500K - $1M</option>
                          <option value="$1M - $2M">$1M - $2M</option>
                          <option value="$2M - $5M">$2M - $5M</option>
                          <option value="Over $5M">Over $5M</option>
                        </Form.Select>
                      </div>
                      <div className="col-md-6">
                        <Form.Select
                          value={searchData.beds}
                          onChange={(e) => handleInputChange('beds', e.target.value)}
                          className="form-select-sm"
                        >
                          <option value="Any">Any Beds</option>
                          <option value="1">1+ Bed</option>
                          <option value="2">2+ Beds</option>
                          <option value="3">3+ Beds</option>
                          <option value="4">4+ Beds</option>
                        </Form.Select>
                      </div>
                    </div>
                  </Form.Group>
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