
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./HeroSection.module.css";
import BackgroundCarousel from "./BackgroundCarousel";
import bgImage1 from "../assets/img/fundoImg.jpeg";
import bgImage2 from "../assets/img/testesImagens.jpeg";
import bgImage3 from "../assets/img/imagensteste2";

const HeroSection = () => {
  const carouselImages = [bgImage1, bgImage2, bgImage3];

  return (
    <section className={`${styles.hero} position-relative`}>
      <BackgroundCarousel images={carouselImages} interval={4000} />
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

            <Row className="justify-content-center">
              <Col md={8}>
                <div className={`${styles.searchBox} bg-white p-4 rounded`}>
                  <Row className="g-2">
                    <Col xs={12} sm={6} md={3}>
                      <select className="form-select">
                        <option>Property Type</option>
                        <option>House</option>
                        <option>Apartment</option>
                        <option>Condo</option>
                      </select>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                      <input type="text" className="form-control" placeholder="Location" />
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                      <select className="form-select">
                        <option>Price Range</option>
                        <option>$0 - $500k</option>
                        <option>$500k - $1M</option>
                        <option>$1M+</option>
                      </select>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                      <Button variant="dark" className="w-100 fw-bold">
                        Search
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
