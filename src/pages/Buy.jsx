
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './BuySell.module.css';
import { buildApiUrl } from '../config/api';

const Buy = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    action: 'buy', // Sempre será 'buy'
    propertyType: '',
    priceRange: '',
    bedrooms: '',
    bathrooms: '',
    timeline: '',
    email: '',
    name: '',
    phone: '',
    comments: ''
  });

  // State for contact form submission (for email part)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    comments: ''
  });
  const [quizAnswers, setQuizAnswers] = useState({});
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  // Iniciar diretamente no step 0 (tipo de propriedade) já que sempre será 'buy'
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      action: 'buy'
    }));
  }, []);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    // Prepare quiz answers to be sent with contact info
    const currentQuizAnswers = {
      action: formData.action,
      propertyType: formData.propertyType,
      priceRange: formData.priceRange,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      timeline: formData.timeline
    };

    console.log('Quiz answers prepared:', currentQuizAnswers);
    setQuizAnswers(currentQuizAnswers);
    setContactForm({
      name: '', // Resetting contact form fields to be filled in step 5
      email: '',
      phone: '',
      comments: ''
    });
    handleNext(); // Move to the contact information step
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactMessage('');

    try {
      const nome = `${contactForm.name}`.trim();
      const email = `${contactForm.email}`.trim().toLowerCase();
      const telefone = `${contactForm.phone}`.trim();
      const msg = `${contactForm.comments}`.trim();

      if (!nome || !email || !telefone) {
        setContactMessage('Please fill in all required fields.');
        setContactSubmitting(false);
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        setContactMessage('Please enter a valid email address.');
        setContactSubmitting(false);
        return;
      }

      const response = await fetch(buildApiUrl('/api/emails/buy-sell-form'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: nome.split(' ')[0] || nome,
          lastName: nome.split(' ').slice(1).join(' ') || '',
          email: email,
          phone: telefone,
          message: msg,
          formData: quizAnswers
        }),
      });

      if (response.ok) {
        setContactMessage('Thank you! Your information has been submitted successfully.');
        setContactForm({ name: '', email: '', phone: '', comments: '' });
        setQuizAnswers({});
        // Reset form after successful submission
        setTimeout(() => {
          setCurrentStep(0);
          setFormData({
            action: 'buy',
            propertyType: '',
            priceRange: '',
            bedrooms: '',
            bathrooms: '',
            timeline: '',
            email: '',
            name: '',
            phone: '',
            comments: ''
          });
          setContactMessage('');
        }, 3000);
      } else {
        const errorData = await response.json();
        setContactMessage(errorData.message || 'There was an error submitting your information. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setContactMessage('There was an error submitting your information. Please try again.');
    } finally {
      setContactSubmitting(false);
    }
  };

  const handleContactInputChange = (field, value) => {
    setContactForm({ ...contactForm, [field]: value });
  };

  return (
    <div className="ip ip-theme-compass">
      <Header />
      <div className={styles.mainWrap}>
        <div className={styles.container}>
          <form className={styles.form}>
            {/* Step 1: Property Type */}
            {currentStep === 0 && (
              <div className={styles.step}>
                <h1 className={styles.title}>What Are You Looking To Buy?</h1>
                <div className={styles.options}>
                  {['Condo', 'Single Family Home', 'Townhouse'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`${styles.optionButton} ${formData.propertyType === option ? styles.selected : ''}`}
                      onClick={() => handleInputChange('propertyType', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className={styles.buttons}>
                  <button 
                    type="button" 
                    className={styles.nextButton} 
                    onClick={handleNext}
                    disabled={!formData.propertyType}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Price Range */}
            {currentStep === 1 && (
              <div className={styles.step}>
                <h1 className={styles.title}>Price Range</h1>
                <div className={styles.options}>
                  {['Under $500K', '$500K - $1M', '$1M - $2M', '$2M - $5M', 'Over $5M'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`${styles.optionButton} ${formData.priceRange === option ? styles.selected : ''}`}
                      onClick={() => handleInputChange('priceRange', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className={styles.buttons}>
                  <button type="button" className={styles.backButton} onClick={handleBack}>
                    Back
                  </button>
                  <button 
                    type="button" 
                    className={styles.nextButton} 
                    onClick={handleNext}
                    disabled={!formData.priceRange}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Bedrooms */}
            {currentStep === 2 && (
              <div className={styles.step}>
                <h1 className={styles.title}>Bedrooms</h1>
                <div className={styles.options}>
                  {['1', '2', '3', '4', '5+'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`${styles.optionButton} ${formData.bedrooms === option ? styles.selected : ''}`}
                      onClick={() => handleInputChange('bedrooms', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className={styles.buttons}>
                  <button type="button" className={styles.backButton} onClick={handleBack}>
                    Back
                  </button>
                  <button 
                    type="button" 
                    className={styles.nextButton} 
                    onClick={handleNext}
                    disabled={!formData.bedrooms}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Bathrooms */}
            {currentStep === 3 && (
              <div className={styles.step}>
                <h1 className={styles.title}>Bathrooms</h1>
                <div className={styles.options}>
                  {['1', '2', '3', '4', '5+'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`${styles.optionButton} ${formData.bathrooms === option ? styles.selected : ''}`}
                      onClick={() => handleInputChange('bathrooms', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className={styles.buttons}>
                  <button type="button" className={styles.backButton} onClick={handleBack}>
                    Back
                  </button>
                  <button 
                    type="button" 
                    className={styles.nextButton} 
                    onClick={handleNext}
                    disabled={!formData.bathrooms}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Timeline To Purchase */}
            {currentStep === 4 && (
              <div className={styles.step}>
                <h1 className={styles.title}>Timeline To Purchase</h1>
                <div className={styles.options}>
                  {['Now', 'Soon', 'Later'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`${styles.optionButton} ${formData.timeline === option ? styles.selected : ''}`}
                      onClick={() => handleInputChange('timeline', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className={styles.buttons}>
                  <button type="button" className={styles.backButton} onClick={handleBack}>
                    Back
                  </button>
                  <button 
                    type="button" 
                    className={styles.nextButton} 
                    onClick={handleSubmit}
                    disabled={!formData.timeline}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Contact Information */}
            {currentStep === 5 && (
              <div className={styles.step}>
                <h1 className={styles.title}>Contact Information</h1>
                <div className={styles.contactForm}>
                  <div className={styles.inputGroup}>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={contactForm.name}
                      onChange={(e) => handleContactInputChange('name', e.target.value)}
                      className={styles.input}
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <input
                      type="email"
                      placeholder="Email"
                      value={contactForm.email}
                      onChange={(e) => handleContactInputChange('email', e.target.value)}
                      className={styles.input}
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={contactForm.phone}
                      onChange={(e) => handleContactInputChange('phone', e.target.value)}
                      className={styles.input}
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <textarea
                      placeholder="Comments (Optional)"
                      value={contactForm.comments}
                      onChange={(e) => handleContactInputChange('comments', e.target.value)}
                      className={styles.textarea}
                      rows="4"
                    />
                  </div>
                  {contactMessage && (
                    <div className={`${styles.message} ${contactMessage.includes('Thank you') ? styles.success : styles.error}`}>
                      {contactMessage}
                    </div>
                  )}
                  <div className={styles.buttons}>
                    <button type="button" className={styles.backButton} onClick={handleBack}>
                      Back
                    </button>
                    <button 
                      type="submit" 
                      className={styles.submitButton} 
                      onClick={handleContactSubmit}
                      disabled={contactSubmitting}
                    >
                      {contactSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Buy;
