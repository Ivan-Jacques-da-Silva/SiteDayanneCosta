
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
                    Sell your home, keep your privacy.
                  </h2>
                  <p className={styles.heroDescription}>
                    Listing your home as a private exclusive allows you to control what information is shared about you and your home while still getting exposure to top agents at Compass.
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

        {/* What To Expect Section */}
        <section className={styles.expectSection}>
          <Container>
            <Row>
              <Col lg={12}>
                <h2 className={styles.sectionTitle}>What To Expect</h2>
              </Col>
            </Row>
            <Row>
              <Col lg={3} md={6} className="mb-4">
                <div className={styles.expectCard}>
                  <div className={styles.expectIcon}>
                    <h3>DISCRETION</h3>
                  </div>
                  <div className={styles.expectContent}>
                    <p>
                      Privacy is the ultimate commodity and the decision to sell your home is a personal experience.
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <div className={styles.expectCard}>
                  <div className={styles.expectIcon}>
                    <h3>FLEXIBILITY</h3>
                  </div>
                  <div className={styles.expectContent}>
                    <p>
                      Decide when to share details about your home, including price, more broadly on your own timing.
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <div className={styles.expectCard}>
                  <div className={styles.expectIcon}>
                    <h3>QUALITY</h3>
                  </div>
                  <div className={styles.expectContent}>
                    <p>
                      Retain exposure to Compass agents, including premium placement on our agent facing platform.
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <div className={styles.expectCard}>
                  <div className={styles.expectIcon}>
                    <h3>VALUE</h3>
                  </div>
                  <div className={styles.expectContent}>
                    <p>
                      Get the best offer by testing the market privately to gather key insights without your listing getting stale.
                    </p>
                  </div>
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

        {/* Reasons Section */}
        <section className={styles.reasonsSection}>
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <div className={styles.reasonsContent}>
                  <h2 className={styles.sectionTitle}>Reasons why you might choose to sell your home as a private exclusive:</h2>
                  <div className={styles.reasonsList}>
                    <ul>
                      <li>New job or relocation</li>
                      <li>Family changes like marriage or divorce</li>
                      <li>Evolving financial circumstances</li>
                      <li>Health issues</li>
                      <li>Valuable belongings like art or furniture</li>
                      <li>Opposition to holding open houses</li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className={styles.reasonsImageWrapper}>
                  <div className={styles.reasonsImage}></div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Compass Advantage Section */}
        <section className={styles.advantageSection}>
          <Container>
            <Row>
              <Col lg={8} className="mx-auto text-center">
                <h2 className={styles.sectionTitle}>The Compass Advantage</h2>
                <p className={styles.advantageDescription}>
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
