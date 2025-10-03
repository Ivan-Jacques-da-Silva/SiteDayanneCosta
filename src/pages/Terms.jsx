
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './Legal.module.css';

const Terms = () => {
  return (
    <div className={styles.legalPage}>
      <Header />
      
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.legalContent}>
            <h1 className={styles.title}>Terms of Service</h1>
            <div className={styles.lastUpdated}>Last updated: September 25, 2024</div>

            <section className={styles.section}>
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website operated by Dayanne Costa Real Estate ("we," "our," or "us"), 
                you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className={styles.section}>
              <h2>2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on our website for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul>
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on our website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>3. User Accounts</h2>
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
                You are responsible for safeguarding the password and for maintaining the security of your account.
              </p>
              <p>
                You agree not to disclose your password to any third party and to take sole responsibility for activities 
                that occur under your account.
              </p>
            </section>

            <section className={styles.section}>
              <h2>4. Prohibited Uses</h2>
              <p>You may not use our service:</p>
              <ul>
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>5. Real Estate Information</h2>
              <p>
                All property information is deemed reliable but not guaranteed. Properties may be sold, withdrawn, 
                or have price changes without notice. We make no representation as to the accuracy of the information provided.
              </p>
            </section>

            <section className={styles.section}>
              <h2>6. Limitation of Liability</h2>
              <p>
                In no event shall Dayanne Costa Real Estate or its suppliers be liable for any damages 
                (including, without limitation, damages for loss of data or profit, or due to business interruption) 
                arising out of the use or inability to use the materials on our website.
              </p>
            </section>

            <section className={styles.section}>
              <h2>7. Privacy Policy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, 
                to understand our practices.
              </p>
            </section>

            <section className={styles.section}>
              <h2>8. Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, 
                under our sole discretion, for any reason whatsoever including without limitation if you breach the Terms.
              </p>
            </section>

            <section className={styles.section}>
              <h2>9. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section className={styles.section}>
              <h2>10. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className={styles.contactInfo}>
                <p>Email: dayannecosta@compass.com</p>
                <p>Phone: +1 (646) 598-3588</p>
                <p>Address: 2550 South Bayshore Drive, Suite 106, Miami, FL 33133</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
