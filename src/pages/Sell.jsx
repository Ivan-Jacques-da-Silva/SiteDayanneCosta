
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './Search.module.css';

const Sell = () => {
  return (
    <div className="ip ip-theme-compass">
      <Header />

      <main className={styles.mainContainer}>
        <section className={styles.maintenanceSection}>
          <div className={styles.contentWrapper}>
            <div className={styles.maintenanceContent}>
              <div className={styles.iconContainer}>
                <div className={styles.maintenanceIcon}>🔧</div>
              </div>

              <h1 className={styles.maintenanceTitle}>
                Under Maintenance
              </h1>

              <p className={styles.maintenanceText}>
                Our sell functionality is temporarily under maintenance. 
                We are working to improve your experience.
              </p>

              <p className={styles.maintenanceSubtext}>
                Please try again shortly or contact us 
                for immediate assistance.
              </p>

              <div className={styles.contactInfo}>
                <p>
                  <strong>Phone:</strong> 
                  <a href="tel:+16465983588" className={styles.contactLink}>
                    +1 (646) 598-3588
                  </a>
                </p>
                <p>
                  <strong>Email:</strong> 
                  <a href="mailto:dayannecosta@compass.com" className={styles.contactLink}>
                    dayannecosta@compass.com
                  </a>
                </p>
              </div>

              <div className={styles.buttonContainer}>
                <a href="/" className={styles.backButton}>
                  Back to Home
                </a>
                <a href="/contact" className={styles.contactButton}>
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sell;
