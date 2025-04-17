import React from 'react';
import { Container, Row, Col, Form, Button, Tab, Tabs } from 'react-bootstrap';
import styles from './HeroSection.module.css';
import mulherFixa from '../assets/img/mulher.png';
// import Carousel from 'react-bootstrap/Carousel';
// import slide1 from '../img/bg1.jpg';
// import slide2 from '../img/bg2.jpg';
// import slide3 from '../img/bg3.jpg';

const HeroSection = () => {
  return (
    <section className={`${styles.hero} position-relative`} style={{ backgroundImage: "url('../img/bg1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>

      <Container className="position-relative z-1 py-5">
        <Row className="justify-content-center text-center mb-4">
          <Col>
            <h1 className="display-5 fw-bold text-white">
              Building Relationships, Building Real Estate Legacies<br />
              <span className="fs-2">Dayanne Costa</span>
            </h1>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={8}>
            <Row className="justify-content-center mb-3">
              <Col md="auto">
                <Button variant="light" className="px-4 py-2 fw-bold">I Want To Buy</Button>
              </Col>
              <Col md="auto">
                <Button variant="light" className="px-4 py-2 fw-bold">I Want To Sell</Button>
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
