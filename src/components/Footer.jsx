import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={`${styles.footer} py-5`}>
      <Container>
        <Row className="mb-4">
          <Col>
            <div className={styles.compassLogo}>COMPASS</div>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={4}>
            <div className={styles.contactInfo}>
              <div className={styles.name}>DAYANNE COSTA</div>
              <div className={styles.phone}>+1 (646) 598-3688</div>
              <div className={styles.email}>dayannecosta@compass.com</div>
              <div className={styles.address}>2550 South Bayshore Drive, Suite 106, Miami, FL 33133</div>
            </div>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <div className={styles.disclaimer}>
              <p>
                Dayanne Costa is a real estate agent affiliated with Compass. Compass is a licensed real estate broker. 
                All information presented herein is intended for informational purposes only. Information is compiled from 
                sources deemed reliable but is subject to errors, omissions, changes in price, condition, sale, or withdrawal 
                without notice. All measurements and square footages are approximate. This is not intended to solicit properties 
                already listed. Nothing herein shall be construed as legal, accounting or other professional advice outside the 
                realm of real estate brokerage. Equal Housing Opportunity.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="align-items-center">
          <Col md={6}>
            <div className={styles.footerLinks}>
              <a href="/terms">Terms & Conditions</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/accessibility">Accessibility</a>
              <span>© 2025 All Rights Reserved</span>
            </div>
          </Col>
          <Col md={6} className="text-md-end">
            <div className={styles.tremGroup}>TREMGroup</div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;