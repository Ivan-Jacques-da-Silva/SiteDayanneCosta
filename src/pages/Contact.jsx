
import React from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.contactPage}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Contact Dayanne Costa</h1>
          <p>Get in touch for all your real estate needs</p>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2>Get in Touch</h2>
              <div className={styles.contactItem}>
                <h3>Phone</h3>
                <p>+1 (646) 598-3588</p>
              </div>
              <div className={styles.contactItem}>
                <h3>Email</h3>
                <p>dayanne.costa@compass.com</p>
              </div>
              <div className={styles.contactItem}>
                <h3>Office</h3>
                <p>Compass Real Estate<br/>Miami, FL</p>
              </div>
            </div>
            
            <div className={styles.contactForm}>
              <h2>Send a Message</h2>
              <form>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" name="phone" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" className={styles.submitBtn}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
