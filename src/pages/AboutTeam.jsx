
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import equipe from '../assets/img/equipe.jpg';
import styles from './AboutTeam.module.css';

const AboutTeam = () => {
  return (
    <div>
      <Header />
      
      <main className={styles.aboutTeamPage}>
        <section className={styles.aboutTeamSection}>
          <Container>
            <Row className="align-items-center min-vh-100">
              {/* Content column */}
              <Col lg={4} className="pe-lg-4">
                <div className={styles.aboutTeamContent}>
                  <h1 className={styles.title}>
                    <strong>Ben Moss Group</strong>
                  </h1>
                  
                  <div className={styles.description}>
                    <p>
                      The Ben Moss Group combines individual strengths including negotiation, sales, marketing, and sports to create a strong team approach when servicing the needs of our clients. Through our expertise in sports and entertainment, we also specialize in representing athletes and celebrities with their unique real estate needs around the country. Based in South Florida, and Tampa, we are one of the top teams in the state of Florida. Focusing on building relationships, we have strength within the luxury market but are also able to assist first-time homebuyers and luxury renters.
                    </p>
                  </div>
                </div>
              </Col>
              
              {/* Image column */}
              <Col lg={8} className="p-0">
                <div className={styles.imageWrapper}>
                  <img 
                    src={equipe} 
                    alt="Ben Moss Group Team" 
                    className={styles.teamImage}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutTeam;
