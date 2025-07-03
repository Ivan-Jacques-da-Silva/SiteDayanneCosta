
import React from 'react';
import styles from './Footer.module.css';
import logoHabitacao from '../assets/img/logoHabitacao.png';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.logoSection}>
            <div className={styles.compassLogo}>
              <img 
                src="/src/assets/img/logo-dc.png" 
                alt="Dayanne Costa Logo" 
                className={styles.logoImage}
              />
              <span className={styles.compassText}>COMPASS</span>
            </div>
          </div>
          
          <div className={styles.contactSection}>
            <div className={styles.agentInfo}>
              <h3>DAYANNE COSTA</h3>
              <p>Licensed Real Estate Salesperson</p>
              <div className={styles.contactDetails}>
                <p><strong>Phone:</strong> +1 (646) 598-3588</p>
                <p><strong>Email:</strong> dayanne.costa@compass.com</p>
                <p><strong>Address:</strong> 2550 South Bayshore Drive, Suite 106, Miami, FL 33133</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.middleSection}>
          <div className={styles.logoGrid}>
            <img 
              src={logoHabitacao} 
              alt="Equal Housing Opportunity" 
              className={styles.ehoLogo}
            />
          </div>
        </div>
        
        <div className={styles.bottomSection}>
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
          
          <div className={styles.footerBottom}>
            <div className={styles.footerLinks}>
              <a href="/terms">Terms & Conditions</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/accessibility">Accessibility</a>
            </div>
            <div className={styles.copyright}>
              <span>© 2025 All Rights Reserved</span>
              <span className={styles.tremGroup}>TREMGroup</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
