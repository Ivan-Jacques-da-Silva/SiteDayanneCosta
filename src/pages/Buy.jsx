
import React from 'react';
import styles from './Buy.module.css';

const Buy = () => {
  return (
    <div className={styles.buyPage}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Buy Your Dream Home</h1>
          <p>Discover the perfect property with our expert guidance</p>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.container}>
          <section className={styles.section}>
            <h2>Why Buy with Dayanne Costa?</h2>
            <div className={styles.features}>
              <div className={styles.feature}>
                <h3>Market Expertise</h3>
                <p>Deep knowledge of Miami's real estate market and neighborhoods</p>
              </div>
              <div className={styles.feature}>
                <h3>Personalized Service</h3>
                <p>Tailored approach to find properties that match your lifestyle</p>
              </div>
              <div className={styles.feature}>
                <h3>Negotiation Skills</h3>
                <p>Expert negotiation to get you the best deal possible</p>
              </div>
            </div>
          </section>
          
          <section className={styles.section}>
            <h2>Our Buying Process</h2>
            <div className={styles.process}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <h4>Initial Consultation</h4>
                <p>Understanding your needs and budget</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <h4>Property Search</h4>
                <p>Finding properties that match your criteria</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <h4>Viewing & Selection</h4>
                <p>Touring properties and making informed decisions</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <h4>Offer & Negotiation</h4>
                <p>Making competitive offers and negotiating terms</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>5</div>
                <h4>Closing</h4>
                <p>Finalizing the purchase and getting your keys</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Buy;
