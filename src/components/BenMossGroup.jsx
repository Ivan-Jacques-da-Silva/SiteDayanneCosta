
import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import styles from './BenMossGroup.module.css';
import equipe from '../assets/img/equipe.jpg';

const BenMossGroup = () => {
  return (
    <section className={`${styles.benMossSection}`} style={{ backgroundColor: '#f5f5f5' }}>
      <Container fluid>
        <Row className="align-items-center g-0">
          {/* Coluna da esquerda - imagem */}
          <Col lg={6} className="p-0">
            <Image 
              src={equipe} 
              alt="Ben Moss Group" 
              className="w-100 h-100" 
              style={{ objectFit: 'cover', border: 'none' }}
            />
          </Col>

          {/* Coluna da direita - texto */}
          <Col lg={6} className="px-5 py-4">
            <h2 className={styles.sectionTitle}>Ben Moss Group</h2>
            <p className={styles.paragraphText}>
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
