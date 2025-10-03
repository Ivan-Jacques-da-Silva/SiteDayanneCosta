
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './Legal.module.css';

const Privacy = () => {
  return (
    <div className={styles.legalPage}>
      <Header />
      
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.legalContent}>
            <h1 className={styles.title}>Privacy Policy</h1>
            <div className={styles.lastUpdated}>Last updated: September 25, 2024</div>

            <section className={styles.section}>
              <h2>1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, 
                contact us, or use our services:
              </p>
              <ul>
                <li><strong>Personal Information:</strong> Name, email address, phone number, and password</li>
                <li><strong>Property Preferences:</strong> Search criteria, saved properties, and favorites</li>
                <li><strong>Communication Data:</strong> Messages sent through contact forms and inquiries</li>
                <li><strong>Usage Information:</strong> How you interact with our website and services</li>
                <li><strong>Device Information:</strong> IP address, browser type, and device identifiers</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and maintain our real estate services</li>
                <li>Process your property inquiries and requests</li>
                <li>Send you property listings and market updates</li>
                <li>Respond to your comments and questions</li>
                <li>Improve our website and user experience</li>
                <li>Comply with legal obligations</li>
                <li>Protect against fraud and abuse</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>3. Information Sharing</h2>
              <p>We may share your information in the following circumstances:</p>
              <ul>
                <li><strong>With Your Consent:</strong> When you explicitly agree to share information</li>
                <li><strong>Service Providers:</strong> Third-party vendors who assist in operating our website</li>
                <li><strong>Business Partners:</strong> Other real estate professionals for property transactions</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
              </ul>
              <p>We do not sell your personal information to third parties for marketing purposes.</p>
            </section>

            <section className={styles.section}>
              <h2>4. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services and fulfill 
                the purposes outlined in this policy. We may retain certain information for longer periods when 
                required by law or for legitimate business purposes.
              </p>
              <p>
                Account information is retained until you request deletion or your account is terminated.
              </p>
            </section>

            <section className={styles.section}>
              <h2>5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section className={styles.section}>
              <h2>6. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                over the internet is 100% secure.
              </p>
            </section>

            <section className={styles.section}>
              <h2>7. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our website. 
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className={styles.section}>
              <h2>8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy 
                practices of these external sites and encourage you to review their privacy policies.
              </p>
            </section>

            <section className={styles.section}>
              <h2>9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes 
                by posting the new policy on this page and updating the "last updated" date.
              </p>
            </section>

            <section className={styles.section}>
              <h2>10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
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

export default Privacy;
