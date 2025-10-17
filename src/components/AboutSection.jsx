import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import styles from './AboutSection.module.css';
import perfil from '../assets/img/perfil.jpg';

const AboutSection = () => {
  return (
    <section className={`${styles.aboutSection}`} style={{ backgroundColor: '#f8f8f8' }}>
      <Container fluid>
        <Row className="align-items-center g-0">
          {/* Coluna da esquerda - texto */}
          <Col lg={6} className="px-5 py-4">
            <h5 className="text-muted mb-2">Luxury Real Estate Specialist</h5>
            <h2 className="fw-bold mb-4">Dayanne Costa</h2>
            <p>
              Dayanne is a dedicated real estate professional with a relentless pursuit of opportunities for her clients,
              dedicating herself to breaking sales records and turning real estate dreams into reality.
            </p>
            <p>
              Starting her real estate journey in Miami and honing her skills in Manhattan over seven years, Dayanne
              garnered top producer awards, spoke at prestigious seminars in the US and her home country Brazil, and built
              a reputation for successfully selling properties that had lingered on the market for over a year with other
              brokerages.
            </p>
            <p className="mb-4">
              Whether it is a dream home, a lucrative investment, multifamily, or a new development opportunity, she
              believes that helping clients realize their real estate dreams is a big part of achieving her own. From first-time
              homebuyers to sophisticated sellers or international real estate developers and everything in between, every
              client is a VIP, and she treasures each relationship.
            </p>
            <Button
              variant="outline-dark"
              href="/about"
              className="rounded-0 px-4 py-2 fw-bold"
            >
              Read More
            </Button>
          </Col>

          {/* Coluna da direita - imagem */}
          <Col lg={6} className="p-0">
            <Image
              src={perfil}
              alt="Dayanne Costa"
              className="w-100 h-100"
              style={{ objectFit: 'cover', border: 'none' }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;