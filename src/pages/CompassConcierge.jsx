import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './CompassConcierge.module.css';

const CompassConcierge = () => {
  return (
    <div>
      <Header />

      <main className={styles.compassPage}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <Container>
            <Row className="align-items-center min-vh-75">
              <Col lg={6}>
                <div className={styles.heroContent}>
                  <h1 className={styles.heroTitle}>
                    Compass Concierge
                  </h1>
                  <h2 className={styles.heroSubtitle}>
                    Get fronted for the cost of home improvement services with no interest — ever.
                  </h2>
                  <p className={styles.heroDescription}>
                    Compass Concierge is the hassle-free way to sell your home faster and for a higher price with services like staging, flooring, painting, and more.
                  </p>
                </div>
              </Col>
              <Col lg={6}>
                <div className={styles.videoWrapper}>
                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/4hd018raScA"
                    title="Compass Concierge Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.video}
                  ></iframe>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* How It Works Section */}
        <section className={styles.howItWorksSection}>
          <Container>
            <Row>
              <Col lg={12} className="mb-5">
                <h2 className={styles.sectionTitle}>How It Works</h2>
                <div className={styles.stepsContent}>
                  <p>You and your agent work together to decide which services can increase your home's value the most and set an estimated budget for the work.</p>
                  <p>When you're ready to start, your Compass agent will be by your side as you engage vendors and commission work.</p>
                  <p>Once the transformation is complete, your home will go on the market.</p>
                  <p>You'll pay for the services when one of the following happens -- your home sells, you terminate your listing agreement with Compass, or 12 months pass from your Concierge start date.</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Covered Services Section */}
        <section className={styles.servicesSection}>
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <div className={styles.servicesContent}>
                  <h2 className={styles.sectionTitle}>Covered Services</h2>
                  <div className={styles.servicesList}>
                    <div className={styles.serviceItem}>
                      <h3>STAGING</h3>
                      <p>Furniture and décor to beautifully present your home</p>
                    </div>
                    <div className={styles.serviceItem}>
                      <h3>FLOORING</h3>
                      <p>From deep cleaning to resurfacing and brand new installations</p>
                    </div>
                    <div className={styles.serviceItem}>
                      <h3>PAINTING</h3>
                      <p>Interior and exterior painting to modernize and brighten</p>
                    </div>
                    <div className={styles.serviceItem}>
                      <h3>COSMETIC IMPROVEMENTS</h3>
                      <p>From lighting and fixture updates to backsplash installation</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className={styles.servicesImageWrapper}>
                  <div className={styles.servicesImage}></div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Disclaimer Section */}
        <section className={styles.disclaimerSection}>
          <Container>
            <Row>
              <Col lg={12}>
                <div className={styles.disclaimerContent}>
                  <p>
                    <strong>Disclaimer:</strong> The Compass Concierge program is available exclusively for Compass clients. Concierge services are provided by third parties and cannot be guaranteed. Fees apply for vendors whose services are not engaged. Compass retains the right to refuse funding for any vendor or improvement. Loans are made or arranged pursuant to a California Finance Lenders Law license. Concierge Capital loans are provided by Notable Finance, LLC, NMLS# 1824748 and are made or arranged pursuant to a California Finance Lenders Law license. Loan eligibility is not guaranteed and all loans are subject to credit approval and underwriting by Notable. Compass is not a lender and is not providing loans as part of the Compass Concierge program.
                  </p>
                  <p>
                    Concierge Capital loans are provided by Notable Finance, LLC, NMLS# 1824748 and are made or arranged pursuant to a California Finance Lenders Law license. Loan eligibility is not guaranteed and all loans are subject to credit approval and underwriting by Notable. Compass is not a lender and is not providing loans as part of the Compass Concierge program.
                  </p>
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

export default CompassConcierge;