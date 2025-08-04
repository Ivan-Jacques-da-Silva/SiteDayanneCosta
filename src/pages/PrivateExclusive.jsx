import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './PrivateExclusive.module.css';

const PrivateExclusive = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        {/* Private Exclusives Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.contentGrid}>
              <div className={styles.textContent}>
                <h1 className={styles.title}>Private Exclusives</h1>
                <p className={styles.subtitle}>
                  <strong>Sell your home, keep your privacy.</strong>
                </p>
                <p className={styles.description}>
                  Listing your home as a private exclusive allows you to control what information is shared about you and your home while still getting exposure to top agents at Compass.
                </p>
              </div>
              <div className={styles.imageContent}>
                <img 
                  src="https://api-cms.idxboost.com/assets/images/compass/private-exclusive-services.jpeg" 
                  alt="Private Exclusive Services"
                  className={styles.sectionImage}
                />
              </div>
            </div>
          </div>
        </section>

        {/* What To Expect Section */}
        <section className={`${styles.section} ${styles.grayBg}`}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>What To Expect</h2>
            <div className={styles.featuresGrid}>
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>DISCRETION</h3>
                <p className={styles.featureText}>
                  Privacy is the ultimate commodity and the decision to sell your home is a personal experience.
                </p>
              </div>
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>FLEXIBILITY</h3>
                <p className={styles.featureText}>
                  Decide when to share details about your home, including price, more broadly on your own timing.
                </p>
              </div>
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>QUALITY</h3>
                <p className={styles.featureText}>
                  Retain exposure to Compass agents, including premium placement on our agent facing platform.
                </p>
              </div>
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>VALUE</h3>
                <p className={styles.featureText}>
                  Get the best offer by testing the market privately to gather key insights without your listing getting stale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reasons Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.contentGrid}>
              <div className={styles.textContent}>
                <h2 className={styles.title}>
                  Reasons why you might choose to sell your home as a private exclusive:
                </h2>
                <ul className={styles.reasonsList}>
                  <li>New job or relocation</li>
                  <li>Family changes like marriage or divorce</li>
                  <li>Evolving financial circumstances</li>
                  <li>Health issues</li>
                  <li>Valuable belongings like art or furniture</li>
                  <li>Opposition to holding open houses</li>
                </ul>
              </div>
              <div className={styles.imageContent}>
                <img 
                  src="https://api-cms.idxboost.com/assets/images/compass/private-exclusive-reasons.jpeg" 
                  alt="Private Exclusive Reasons"
                  className={styles.sectionImage}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivateExclusive;