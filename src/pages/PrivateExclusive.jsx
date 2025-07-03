
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './PrivateExclusive.module.css';

const PrivateExclusive = () => {
  return (
    <div>
      <Header />
      
      <main className={styles.privatePage}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <Container>
            <Row className="align-items-center min-vh-75">
              <Col lg={6}>
                <div className={styles.heroContent}>
                  <h1 className={styles.heroTitle}>
                    Private Exclusives
                  </h1>
                  <h2 className={styles.heroSubtitle}>
                    A discreet approach to luxury home sales
                  </h2>
                  <p className={styles.heroDescription}>
                    Some of the most exceptional properties deserve a marketing approach that's as unique as they are. Our Private Exclusives program gives sellers access to the most discerning purchasers through Compass's network of agents.
                  </p>
                </div>
              </Col>
              <Col lg={6}>
                <div className={styles.heroImageWrapper}>
                  <div className={styles.heroImage}></div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Benefits Section */}
        <section className={styles.benefitsSection}>
          <Container>
            <Row>
              <Col lg={12}>
                <h2 className={styles.sectionTitle}>Why Choose Private Exclusives</h2>
              </Col>
            </Row>
            <Row>
              <Col lg={4} className="mb-4">
                <div className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>
                    <h3>PRIVACY</h3>
                  </div>
                  <div className={styles.benefitContent}>
                    <p>
                      Maintain complete discretion throughout the sales process without public exposure or disruption to your daily life.
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={4} className="mb-4">
                <div className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>
                    <h3>EXCLUSIVITY</h3>
                  </div>
                  <div className={styles.benefitContent}>
                    <p>
                      Access to an exclusive network of pre-qualified buyers who are actively seeking luxury properties.
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={4} className="mb-4">
                <div className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>
                    <h3>VALUE</h3>
                  </div>
                  <div className={styles.benefitContent}>
                    <p>
                      Get the best offer by testing the market privately to gather key insights without your listing getting stale.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Process Section */}
        <section className={styles.processSection}>
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <div className={styles.processContent}>
                  <h2 className={styles.sectionTitle}>How It Works</h2>
                  <div className={styles.processSteps}>
                    <div className={styles.processStep}>
                      <div className={styles.stepNumber}>1</div>
                      <div className={styles.stepContent}>
                        <h4>Consultation</h4>
                        <p>We'll discuss your goals, timeline, and develop a customized marketing strategy for your property.</p>
                      </div>
                    </div>
                    <div className={styles.processStep}>
                      <div className={styles.stepNumber}>2</div>
                      <div className={styles.stepContent}>
                        <h4>Preparation</h4>
                        <p>Professional photography, staging consultation, and preparation of marketing materials.</p>
                      </div>
                    </div>
                    <div className={styles.processStep}>
                      <div className={styles.stepNumber}>3</div>
                      <div className={styles.stepContent}>
                        <h4>Private Marketing</h4>
                        <p>Discreet outreach to our network of qualified buyers and agents representing serious purchasers.</p>
                      </div>
                    </div>
                    <div className={styles.processStep}>
                      <div className={styles.stepNumber}>4</div>
                      <div className={styles.stepContent}>
                        <h4>Negotiation</h4>
                        <p>We handle all negotiations and coordinate the sale process from offer to closing.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className={styles.processImageWrapper}>
                  <div className={styles.processImage}></div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Reason Why Section */}
        <section className={styles.reasonSection}>
          <Container>
            <Row>
              <Col lg={8} className="mx-auto text-center">
                <h2 className={styles.sectionTitle}>The Compass Advantage</h2>
                <p className={styles.reasonDescription}>
                  With our extensive network of luxury market specialists and proven track record in high-end real estate, 
                  Compass is uniquely positioned to deliver exceptional results for discerning sellers. Our Private Exclusives 
                  program combines cutting-edge technology with personalized service to ensure your property reaches the right 
                  buyers at the right time.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivateExclusive;
