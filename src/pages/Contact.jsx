
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.contactPage}>
      <Header />
      
      <div className={styles.hero}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1>Contact</h1>
            <div className={styles.breadcrumb}>
              <span>Home</span>
              <span className={styles.separator}>&gt;</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.contactSection}>
            <div className={styles.leftSection}>
              <h2>Contact</h2>
              
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <span className={styles.contactValue}>+1 (646) 598-3588</span>
                </div>
                
                <div className={styles.contactItem}>
                  <span className={styles.contactValue}>dayannecosta@compass.com</span>
                </div>
                
                <div className={styles.contactItem}>
                  <span className={styles.contactValue}>2550 South Bayshore Drive, Suite 106, Miami, FL 33133</span>
                </div>
              </div>
              
              <div className={styles.mapSection}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3594.5937842847!2d-80.22634092462877!3d25.724440377368477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b7b2b2b2b2b3%3A0x3f3f3f3f3f3f3f3f!2s2550%20S%20Bayshore%20Dr%20%23106%2C%20Miami%2C%20FL%2033133%2C%20USA!5e0!3m2!1sen!2sus!4v1652000000000!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={styles.mapIframe}
                ></iframe>
              </div>
            </div>
            
            <div className={styles.rightSection}>
              <div className={styles.contactForm}>
                <form>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <input type="text" placeholder="First Name *" required />
                    </div>
                    <div className={styles.formGroup}>
                      <input type="text" placeholder="Last Name *" required />
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <input type="email" placeholder="Email *" required />
                    </div>
                    <div className={styles.formGroup}>
                      <input type="tel" placeholder="+55" />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <textarea placeholder="Message" rows="6" required></textarea>
                  </div>
                  
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      Best Time to Reach You
                    </label>
                    <div className={styles.checkboxOptions}>
                      <label className={styles.checkboxOption}>
                        <input type="checkbox" /> am
                      </label>
                      <label className={styles.checkboxOption}>
                        <input type="checkbox" /> pm
                      </label>
                    </div>
                  </div>
                  
                  <button type="submit" className={styles.submitBtn}>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
