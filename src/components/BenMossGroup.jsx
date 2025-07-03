import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './BenMossGroup.module.css';
import equipe from '../assets/img/equipe.jpg';

const BenMossGroup = () => {
  return (
    <section className={`${styles.benMossSection}`} style={{ backgroundColor: '#f5f5f5' }}>
      <Container fluid className="p-0">
        <Row className="align-items-center g-0">
          {/* Imagem à esquerda */}
          <Col lg={6} className="p-0">
            <div className={styles.imageWrapper}>
              <img 
                src={equipe} 
                alt="Ben Moss Group" 
                className={styles.teamImage}
              />
            </div>
          </Col>

          {/* Texto à direita */}
          <Col lg={6} className={styles.textContent}>
            <h2 className="fw-bold mb-4">Ben Moss Group</h2>
            <p>
              The Ben Moss Group combines individual strengths including negotiation, sales, marketing, and sports to create a strong
              team approach when servicing the needs of our clients. Through our expertise in sports and entertainment, we also
              specialize in representing athletes and celebrities with their unique real estate needs around the country. Based in South
              Florida, and Tampa, we are one of the top teams in the state of Florida. Focusing on building relationships, we have
              strength within the luxury market but are also able to assist first-time homebuyers and luxury renters.
            </p>
            <div className="mt-4">
              <Button 
                variant="outline-dark" 
                href="/ben-moss-group" 
                className="rounded-0 px-4 py-2 fw-bold"
              >
                Read More
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BenMossGroup;
