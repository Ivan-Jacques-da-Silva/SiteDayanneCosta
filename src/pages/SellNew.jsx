import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './SellNew.module.css';
import { buildApiUrl } from '../config/api';

const SellNew = () => {
  const [formData, setFormData] = useState({
    address: '',
    name: '',
    email: '',
    phone: '',
    comments: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    if (formData.address.trim()) {
      // Send sell registration email
      try {
        const response = await fetch(buildApiUrl('/api/emails/sell-registration'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            address: formData.address.trim()
          }),
        });

        if (response.ok) {
          console.log('Sell registration email sent successfully');
        } else {
          console.error('Failed to send sell registration email');
        }
      } catch (error) {
        console.error('Error sending sell registration email:', error);
      }

      setShowContactForm(true);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const nome = formData.name.trim();
      const email = formData.email.trim().toLowerCase();
      const telefone = formData.phone.trim();
      const endereco = formData.address.trim();
      const comentarios = formData.comments.trim();

      if (!nome || !email || !telefone || !endereco) {
        setMessage('Please fill in all required fields.');
        setSubmitting(false);
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        setMessage('Invalid email address.');
        setSubmitting(false);
        return;
      }

      // Parse name into first and last name
      const nameParts = nome.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const response = await fetch(buildApiUrl('/api/emails/property-inquiry'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: telefone,
          message: `Property evaluation request for: ${endereco}. ${comentarios || 'No additional comments.'}`,
          propertyId: null,
          propertyAddress: endereco,
          inquiryType: 'HOME_VALUATION'
        }),
      });

      if (!response.ok) {
        const texto = await response.text().catch(() => '');
        throw new Error(texto || `HTTP ${response.status}`);
      }

      const data = await response.json().catch(() => ({}));

      if (data?.success) {
        setMessage('**Success** - Your home valuation request has been sent successfully! We\'ll contact you soon with a complimentary market analysis.');
        // Reset form
        setFormData({
          address: '',
          name: '',
          email: '',
          phone: '',
          comments: ''
        });
        setShowContactForm(false);
      } else {
        setMessage(
          '**Failed** to send request.' + (data?.message ? ` ${data.message}` : ''),
        );
      }
    } catch (error) {
      setMessage('**Failed** - Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="ip ip-theme-compass">
      <Header />

      <section className={styles.mainWrap}>
        <div className={styles.container}>
          {!showContactForm ? (
            <div className={styles.homeWorthSection}>
              <h1 className={styles.title}>What's Your Home Worth?</h1>
              <p className={styles.subtitle}>
                Please fill out your address below to receive a<br />
                complimentary market analysis from one of our experts!
              </p>
              
              <form onSubmit={handleAddressSubmit} className={styles.addressForm}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Enter your address here"
                    className={styles.addressInput}
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                  <button type="submit" className={styles.findOutButton}>
                    FIND OUT NOW
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className={styles.contactSection}>
              <h1 className={styles.title}>Contact Information</h1>
              <p className={styles.subtitle}>
                We'll send your complimentary market analysis for:<br />
                <strong>{formData.address}</strong>
              </p>

              <form onSubmit={handleContactSubmit} className={styles.contactForm}>
                <div className={styles.formGrid}>
                  <input
                    type="text"
                    placeholder="Name*"
                    className={styles.input}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email*"
                    className={styles.input}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone*"
                    className={styles.input}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                  <textarea
                    placeholder="Additional Comments"
                    className={styles.textarea}
                    value={formData.comments}
                    onChange={(e) => handleInputChange('comments', e.target.value)}
                  />
                </div>

                {message && (
                  <div
                    className={styles.message}
                    data-type={
                      message.includes('**Success**') || message.includes('successfully')
                        ? 'success'
                        : message.includes('**Failed**') || message.includes('Failed') || message.includes('Error')
                          ? 'error'
                          : ''
                    }
                  >
                    {message}
                  </div>
                )}

                <div className={styles.buttons}>
                  <button 
                    type="button" 
                    className={styles.backButton} 
                    onClick={() => setShowContactForm(false)}
                  >
                    Back
                  </button>
                  <button type="submit" className={styles.submitButton} disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Get My Home Value'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SellNew;