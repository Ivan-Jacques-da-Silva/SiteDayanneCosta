
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './BuySell.module.css';

const BuySell = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    address: '',
    bedrooms: '',
    bathrooms: '',
    planning: '',
    email: '',
    name: '',
    phone: '',
    comments: ''
  });

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setCurrentStep(1);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep === 1 && !formData.address.trim()) {
      alert('Please enter your address');
      return;
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setSelectedOption(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.name || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }
    console.log('Form submitted:', { option: selectedOption, ...formData });
    alert('Thank you! We will be in touch soon.');
  };

  if (!selectedOption) {
    return (
      <div className="ip ip-theme-compass">
        <Header />
        
        <main className={styles.mainContainer}>
          <section className={styles.choiceSection}>
            <div className={styles.contentWrapper}>
              <div className={styles.choiceContent}>
                <h1 className={styles.choiceTitle}>
                  How Can We Help You Today?
                </h1>
                <p className={styles.choiceSubtitle}>
                  Choose the service you're looking for and we'll guide you through the process
                </p>
                
                <div className={styles.optionsContainer}>
                  <button 
                    className={styles.optionButton}
                    onClick={() => handleOptionSelect('sell')}
                  >
                    <div className={styles.optionIcon}>🏠</div>
                    <h2>I Want To Sell</h2>
                    <p>Get a free market analysis and find out what your home is worth</p>
                  </button>
                  
                  <button 
                    className={styles.optionButton}
                    onClick={() => handleOptionSelect('buy')}
                  >
                    <div className={styles.optionIcon}>🔍</div>
                    <h2>I Want To Buy</h2>
                    <p>Find your dream property with our expert guidance</p>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="ip ip-theme-compass">
      <Header />
      
      <main className={styles.formContainer}>
        <section className={styles.formSection}>
          <article className={styles.formArticle}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <fieldset>
                <legend>
                  {selectedOption === 'sell' ? "What's Your Home Worth?" : "Find Your Dream Home"}
                </legend>
                
                <div className={styles.formWrapper}>
                  <ul className={styles.steps}>
                    {/* Step 1: Address */}
                    <li className={`${styles.step} ${currentStep === 1 ? styles.stepActive : ''}`}>
                      <h1 className={styles.stepTitle}>
                        {selectedOption === 'sell' ? "What's Your Home Worth?" : "Where Are You Looking?"}
                      </h1>
                      <span className={styles.stepText}>
                        {selectedOption === 'sell' 
                          ? "Please fill out your address below to receive a complimentary market analysis from one of our experts!"
                          : "Tell us the area where you'd like to find your next home"
                        }
                      </span>
                      <div className={styles.addressInput}>
                        <label className={styles.hiddenLabel} htmlFor="address_input">
                          Enter your address here
                        </label>
                        <input
                          className={styles.input}
                          id="address_input"
                          name="address"
                          placeholder={selectedOption === 'sell' ? "Enter your property address" : "Enter desired area or address"}
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                        />
                        <button
                          type="button"
                          className={styles.findButton}
                          onClick={handleNext}
                        >
                          {selectedOption === 'sell' ? 'Find out now' : 'Start searching'}
                        </button>
                      </div>
                    </li>

                    {/* Step 2: Bedrooms */}
                    <li className={`${styles.step} ${currentStep === 2 ? styles.stepActive : ''}`}>
                      <h4 className={styles.stepTitle}>
                        How many bedrooms?
                      </h4>
                      <ul className={styles.radioOptions}>
                        {['1', '2', '3', '4+'].map(num => (
                          <li key={num} className={styles.radioItem}>
                            <input
                              className={styles.radio}
                              id={`bedrooms-${num}`}
                              name="bedrooms"
                              type="radio"
                              value={num}
                              checked={formData.bedrooms === num}
                              onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                            />
                            <label className={styles.radioLabel} htmlFor={`bedrooms-${num}`}>
                              {num}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </li>

                    {/* Step 3: Bathrooms */}
                    <li className={`${styles.step} ${currentStep === 3 ? styles.stepActive : ''}`}>
                      <h4 className={styles.stepTitle}>
                        How many bathrooms?
                      </h4>
                      <ul className={styles.radioOptions}>
                        {['1', '2', '3', '4+'].map(num => (
                          <li key={num} className={styles.radioItem}>
                            <input
                              className={styles.radio}
                              id={`bathrooms-${num}`}
                              name="bathrooms"
                              type="radio"
                              value={num}
                              checked={formData.bathrooms === num}
                              onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                            />
                            <label className={styles.radioLabel} htmlFor={`bathrooms-${num}`}>
                              {num}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </li>

                    {/* Step 4: Planning Stages */}
                    <li className={`${styles.step} ${currentStep === 4 ? styles.stepActive : ''}`}>
                      <h4 className={styles.stepTitle}>
                        Planning Stages
                      </h4>
                      <ul className={styles.radioOptions}>
                        {["I'm Ready", "Almost There", "Flexible", "Planning Stages"].map(option => (
                          <li key={option} className={styles.radioItem}>
                            <input
                              className={styles.radio}
                              id={`planning-${option.replace(/['\s]/g, '')}`}
                              name="planning"
                              type="radio"
                              value={option}
                              checked={formData.planning === option}
                              onChange={(e) => handleInputChange('planning', e.target.value)}
                            />
                            <label className={styles.radioLabel} htmlFor={`planning-${option.replace(/['\s]/g, '')}`}>
                              {option}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </li>

                    {/* Step 5: Contact Information */}
                    <li className={`${styles.step} ${currentStep === 5 ? styles.stepActive : ''}`}>
                      <h4 className={styles.stepTitle}>
                        Contact Information
                      </h4>
                      <span className={styles.stepText}>
                        Please provide your contact information below and we will be in touch very soon!
                      </span>
                      <ul className={styles.contactFields}>
                        <li className={styles.fieldItem}>
                          <label className={styles.hiddenLabel} htmlFor="email_field">Email*</label>
                          <input
                            className={styles.input}
                            id="email_field"
                            name="email"
                            placeholder="Email*"
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                          />
                        </li>
                        <li className={styles.fieldItem}>
                          <label className={styles.hiddenLabel} htmlFor="name_field">Name*</label>
                          <input
                            className={styles.input}
                            id="name_field"
                            name="name"
                            placeholder="Name*"
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                          />
                        </li>
                        <li className={styles.fieldItem}>
                          <label className={styles.hiddenLabel} htmlFor="phone_field">Phone*</label>
                          <input
                            className={styles.input}
                            id="phone_field"
                            name="phone"
                            placeholder="Phone*"
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                        </li>
                        <li className={`${styles.fieldItem} ${styles.textareaItem}`}>
                          <label className={styles.hiddenLabel} htmlFor="comments_field">Comments</label>
                          <textarea
                            className={styles.textarea}
                            id="comments_field"
                            name="comments"
                            placeholder="Comments"
                            value={formData.comments}
                            onChange={(e) => handleInputChange('comments', e.target.value)}
                          />
                        </li>
                      </ul>
                    </li>
                  </ul>
                  
                  <div className={styles.buttons}>
                    <button
                      type="button"
                      className={styles.backButton}
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    {currentStep < 5 ? (
                      <button
                        type="button"
                        className={styles.nextButton}
                        onClick={handleNext}
                      >
                        Next
                      </button>
                    ) : (
                      <input
                        className={styles.submitButton}
                        type="submit"
                        value="Submit"
                      />
                    )}
                  </div>
                </div>
              </fieldset>
            </form>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BuySell;
