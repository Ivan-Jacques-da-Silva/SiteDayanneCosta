
import React from 'react';
import styles from './Footer.module.css';
import logoHabitacao from '../assets/img/logoHabitacao.png';
import compassImg from '../assets/img/compas.png';
import logoFooter from "../assets/img/logo-dcBlack.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.logoSection}>
            <div className={styles.compassLogo}>
              <img 
                src={logoFooter}
                alt="Dayanne Costa Logo" 
                className={styles.logoImage}
              />
              <img 
                src={compassImg} 
                alt="Compass" 
                className={styles.compassImage}
              />
            </div>
            
            <div className={styles.contactInfo}>
              <p>+1 (646) 598-3588</p>
              <p>dayannecosta@compass.com</p>
              <p>2550 South Bayshore Drive, Suite 106, Miami, FL 33133</p>
            </div>
          </div>
        </div>
        
        <div className={styles.middleSection}>
          <div className={styles.logoAndSocial}>
            <img 
              src={logoHabitacao} 
              alt="Equal Housing Opportunity" 
              className={styles.ehoLogo}
            />
            <div className={styles.socialLinks}>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/dayanne_vc?igsh=MXVuOG5heDdrbno1bw==" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.disclaimerSection}>
          <div className={styles.disclaimer}>
            <p>
              Dayanne Costa is a real estate agent affiliated with Compass. Compass is a licensed real estate broker and abides by Equal Housing Opportunity laws. All material presented herein is intended for informational purposes only. Information is compiled from sources deemed reliable but is subject to errors, omissions, changes in price, condition, sale or withdrawal without notice. All measurements and square footages are approximate. This is not intended to solicit properties already listed. Nothing herein shall be construed as legal, accounting or other professional advice outside the realm of real estate brokerage.
            </p>
          </div>
        </div>
        
        <div className={styles.bottomSection}>
          <div className={styles.footerBottom}>
            <div className={styles.footerLinks}>
              <a href="/terms">Terms & Conditions</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/accessibility">Accessibility</a>
            </div>
            <div className={styles.copyright}>
              <span>© 2025 All Rights Reserved</span>
              <span className={styles.tremGroup}>Powered by TREMGroup</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
