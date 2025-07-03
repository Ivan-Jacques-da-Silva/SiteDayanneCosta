
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
              <span className={styles.separator}>></span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.contactSection}>
            <div className={styles.leftSection}>
              <h2>Let's Talk Real Estate!</h2>
              <p>Feel free to reach out to me with any real estate questions or to schedule a consultation. I'm here to help with all your buying, selling, and investing needs.</p>
              
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className={styles.contactText}>
                    <span className={styles.label}>Phone Number</span>
                    <span className={styles.value}>+1 (646) 598-3588</span>
                  </div>
                </div>
                
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className={styles.contactText}>
                    <span className={styles.label}>Email Address</span>
                    <span className={styles.value}>dayanne.costa@compass.com</span>
                  </div>
                </div>
                
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className={styles.contactText}>
                    <span className={styles.label}>Office Address</span>
                    <span className={styles.value}>2550 South Bayshore Drive, Suite 106<br/>Miami, FL 33133</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.socialMedia}>
                <h3>Follow Me</h3>
                <div className={styles.socialLinks}>
                  <a href="https://www.instagram.com/dayanne_vc?igsh=MXVuOG5heDdrbno1bw==" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://www.youtube.com/@dayannecosta1958" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a href="http://www.linkedin.com/in/dayanne-costa-66451162" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className={styles.rightSection}>
              <div className={styles.contactForm}>
                <h3>Send Message</h3>
                <form>
                  <div className={styles.formGroup}>
                    <input type="text" placeholder="Full Name" required />
                  </div>
                  <div className={styles.formGroup}>
                    <input type="email" placeholder="Email Address" required />
                  </div>
                  <div className={styles.formGroup}>
                    <input type="tel" placeholder="Phone Number" />
                  </div>
                  <div className={styles.formGroup}>
                    <select>
                      <option value="">Select Subject</option>
                      <option value="buying">Buying Property</option>
                      <option value="selling">Selling Property</option>
                      <option value="consultation">Free Consultation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <textarea placeholder="Message" rows="5" required></textarea>
                  </div>
                  <button type="submit" className={styles.submitBtn}>Send Message</button>
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
