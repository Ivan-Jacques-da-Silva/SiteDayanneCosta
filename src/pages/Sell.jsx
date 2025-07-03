
import React from 'react';
import styles from './Sell.module.css';

const Sell = () => {
  return (
    <div className={styles.sellPage}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Sell Your Property</h1>
          <p>Get the best value for your home with our expert marketing</p>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.container}>
          <section className={styles.section}>
            <h2>Why Sell with Dayanne Costa?</h2>
            <div className={styles.features}>
              <div className={styles.feature}>
                <h3>Market Analysis</h3>
                <p>Comprehensive market analysis to price your property competitively</p>
              </div>
              <div className={styles.feature}>
                <h3>Professional Marketing</h3>
                <p>High-quality photography and targeted marketing campaigns</p>
              </div>
              <div className={styles.feature}>
                <h3>Proven Results</h3>
                <p>Track record of successful sales and satisfied clients</p>
              </div>
            </div>
          </section>
          
          <section className={styles.section}>
            <h2>Our Selling Process</h2>
            <div className={styles.process}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <h4>Property Evaluation</h4>
                <p>Comprehensive assessment of your property's value</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <h4>Marketing Strategy</h4>
                <p>Develop a tailored marketing plan</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <h4>Professional Photos</h4>
                <p>High-quality photography and virtual tours</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <h4>Active Marketing</h4>
                <p>Multi-channel marketing to reach qualified buyers</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>5</div>
                <h4>Negotiation & Closing</h4>
                <p>Expert negotiation and smooth closing process</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Sell;
