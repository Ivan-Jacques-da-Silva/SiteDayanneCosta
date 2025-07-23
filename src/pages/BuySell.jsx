import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './BuySell.module.css';

const BuySell = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    action: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="ip ip-theme-compass">
      <Header />

      <section className={styles.mainWrap}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>

            {/* Step 0: I Want To Buy / I Want To Sell */}
            {currentStep === 0 && (
              <div className={styles.step}>
                <h1 className={styles.title}>What would you like to do?</h1>
                <div className={styles.options}>
                  <button 
                    type="button" 
                    className={`${styles.optionButton} ${formData.action === 'buy' ? styles.selected : ''}`}
                    onClick={() => {
                      handleInputChange('action', 'buy');
                      handleNext();
                    }}
                  >
                    I Want To Buy
                  </button>
                  <button 
                    type="button" 
                    className={`${styles.optionButton} ${formData.action === 'sell' ? styles.selected : ''}`}
                    onClick={() => {
                      handleInputChange('action', 'sell');
                      handleNext();
                    }}
                  >
                    I Want To Sell
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: What Are You Looking To Buy? */}
            {currentStep === 1 && (
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
                  <button type="button" className={styles.backButton} onClick={handleBack}>
                    Back
                  </button>
                  <button type="button" className={styles.nextButton} onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: What's Your Price Range? */}
            {currentStep === 2 && (
              <div className={styles.step}>
                <h1 className={styles.title}>What's Your Price Range?</h1>
                <div className={styles.options}>
                  {['Below $1M', '$1M to $3M', '$3M to $5M', '$5M+'].map((option) => (
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
                  <button type="button" className={styles.nextButton} onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: How Many Bedrooms? */}
            {currentStep === 3 && (
              <div className={styles.step}>
                <h1 className={styles.title}>How Many Bedrooms?</h1>
                <div className={styles.options}>
                  {['1', '2', '3', '4+'].map((option) => (
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
                  <button type="button" className={styles.nextButton} onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: How Many Bathrooms? */}
            {currentStep === 4 && (
              <div className={styles.step}>
                <h1 className={styles.title}>How Many Bathrooms?</h1>
                <div className={styles.options}>
                  {['1', '2', '3', '4+'].map((option) => (
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
                  <button type="button" className={styles.nextButton} onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Timeline To Purchase */}
            {currentStep === 5 && (
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
                  <button type="button" className={styles.nextButton} onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Contact Information */}
            {currentStep === 6 && (
              <div className={styles.step}>
                <h1 className={styles.title}>Contact Information</h1>
                <div className={styles.contactForm}>
                  <input
                    type="email"
                    placeholder="Email*"
                    className={styles.input}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Name*"
                    className={styles.input}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
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
                    placeholder="Comments"
                    className={styles.textarea}
                    value={formData.comments}
                    onChange={(e) => handleInputChange('comments', e.target.value)}
                  />
                </div>
                <div className={styles.buttons}>
                  <button type="button" className={styles.backButton} onClick={handleBack}>
                    Back
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    Submit
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BuySell;