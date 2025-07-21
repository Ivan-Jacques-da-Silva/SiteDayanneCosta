
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './BuySell.module.css';

const BuySell = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    action: '',
    propertyType: '',
    priceRange: '',
    bedrooms: '',
    bathrooms: '',
    timeline: '',
    planning: '',
    address: '',
    name: '',
    email: '',
    phone: '',
    comments: ''
  });

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setFormData({ ...formData, action: option });
    setCurrentStep(1);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (currentStep < getTotalSteps() - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aqui você pode enviar os dados para o backend
  };

  const getTotalSteps = () => {
    return selectedOption === 'sell' ? 5 : 6; // sell tem 5 steps (incluindo step inicial), buy tem 6
  };

  // Buy form steps
  const renderBuySteps = () => {
    return (
      <>
        {/* Step 1: Property Type */}
        <li className={`${styles.ibFsitem} ${currentStep === 1 ? styles.ibFsitemActive : ''}`}>
          <h1 className={styles.ibFstitle}>What are you looking to buy?</h1>
          <ul className={styles.ibFsradios}>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-condo"
                name="propertyType"
                type="radio"
                value="Condo"
                checked={formData.propertyType === 'Condo'}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-condo">Condo</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-family"
                name="propertyType"
                type="radio"
                value="Single Family Home"
                checked={formData.propertyType === 'Single Family Home'}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-family">Single Family Home</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-townhouse"
                name="propertyType"
                type="radio"
                value="Townhouse"
                checked={formData.propertyType === 'Townhouse'}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-townhouse">Townhouse</label>
            </li>
          </ul>
        </li>

        {/* Step 2: Price Range */}
        <li className={`${styles.ibFsitem} ${currentStep === 2 ? styles.ibFsitemActive : ''}`}>
          <h4 className={styles.ibFstitle}>What's your price range?</h4>
          <ul className={styles.ibFsradios}>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-bellow"
                name="priceRange"
                type="radio"
                value="Below $1M"
                checked={formData.priceRange === 'Below $1M'}
                onChange={(e) => handleInputChange('priceRange', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-bellow">Below $1M</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-onetwo"
                name="priceRange"
                type="radio"
                value="$1M to $3M"
                checked={formData.priceRange === '$1M to $3M'}
                onChange={(e) => handleInputChange('priceRange', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-onetwo">$1M to $3M</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-threefive"
                name="priceRange"
                type="radio"
                value="$3M to $5M"
                checked={formData.priceRange === '$3M to $5M'}
                onChange={(e) => handleInputChange('priceRange', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-threefive">$3M to $5M</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-morefive"
                name="priceRange"
                type="radio"
                value="$5M+"
                checked={formData.priceRange === '$5M+'}
                onChange={(e) => handleInputChange('priceRange', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-morefive">$5M+</label>
            </li>
          </ul>
        </li>

        {/* Step 3: Bedrooms */}
        <li className={`${styles.ibFsitem} ${currentStep === 3 ? styles.ibFsitemActive : ''}`}>
          <h4 className={styles.ibFstitle}>How many bedrooms?</h4>
          <ul className={`${styles.ibFsradios} ${styles.ibFsrnumbers}`}>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-onebeds"
                name="bedrooms"
                type="radio"
                value="1"
                checked={formData.bedrooms === '1'}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-onebeds">1</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-twobeds"
                name="bedrooms"
                type="radio"
                value="2"
                checked={formData.bedrooms === '2'}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-twobeds">2</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-threebeds"
                name="bedrooms"
                type="radio"
                value="3"
                checked={formData.bedrooms === '3'}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-threebeds">3</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-morefourbeds"
                name="bedrooms"
                type="radio"
                value="4+"
                checked={formData.bedrooms === '4+'}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-morefourbeds">4+</label>
            </li>
          </ul>
        </li>

        {/* Step 4: Bathrooms */}
        <li className={`${styles.ibFsitem} ${currentStep === 4 ? styles.ibFsitemActive : ''}`}>
          <h4 className={styles.ibFstitle}>How many bathrooms?</h4>
          <ul className={`${styles.ibFsradios} ${styles.ibFsrnumbers}`}>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-onebaths"
                name="bathrooms"
                type="radio"
                value="1"
                checked={formData.bathrooms === '1'}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-onebaths">1</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-twobaths"
                name="bathrooms"
                type="radio"
                value="2"
                checked={formData.bathrooms === '2'}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-twobaths">2</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-threebaths"
                name="bathrooms"
                type="radio"
                value="3"
                checked={formData.bathrooms === '3'}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-threebaths">3</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-morefourbaths"
                name="bathrooms"
                type="radio"
                value="4+"
                checked={formData.bathrooms === '4+'}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-morefourbaths">4+</label>
            </li>
          </ul>
        </li>

        {/* Step 5: Timeline */}
        <li className={`${styles.ibFsitem} ${currentStep === 5 ? styles.ibFsitemActive : ''}`}>
          <h4 className={styles.ibFstitle}>Timeline to purchase</h4>
          <ul className={styles.ibFsradios}>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-now"
                name="timeline"
                type="radio"
                value="Now"
                checked={formData.timeline === 'Now'}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-now">Now</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-soon"
                name="timeline"
                type="radio"
                value="Soon"
                checked={formData.timeline === 'Soon'}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-soon">Soon</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-later"
                name="timeline"
                type="radio"
                value="Later"
                checked={formData.timeline === 'Later'}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-later">Later</label>
            </li>
          </ul>
        </li>
      </>
    );
  };

  // Sell form steps
  const renderSellSteps = () => {
    return (
      <>
        {/* Step 1: Address */}
        <li className={`${styles.ibFsitem} ${currentStep === 1 ? styles.ibFsitemActive : ''}`}>
          <h1 className={styles.ibFstitle}>What's Your Home Worth?</h1>
          <span className={styles.ibFtext}>
            Please fill out your address below to receive a<br/>
            complimentary market analysis from one of our experts!
          </span>
          <div className={styles.ibFsifind}>
            <label className={styles.msHidden} htmlFor="lead_address_acgoogle">
              Enter your address here
            </label>
            <input
              autoCapitalize="off"
              autoComplete="disabled"
              autoCorrect="off"
              className={styles.ibFsinput}
              id="lead_address_acgoogle"
              name="address"
              placeholder="Enter your address here"
              spellCheck="false"
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
            <div className={`${styles.ibFsifsubmit} ${styles.ibFbtnFnext}`} onClick={handleNext}>
              Find out now
            </div>
          </div>
        </li>

        {/* Step 2: Bedrooms */}
        <li className={`${styles.ibFsitem} ${currentStep === 2 ? styles.ibFsitemActive : ''}`}>
          <h4 className={styles.ibFstitle}>How many bedrooms?</h4>
          <ul className={`${styles.ibFsradios} ${styles.ibFsrnumbers}`}>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-onebeds-sell"
                name="bedrooms"
                type="radio"
                value="1"
                checked={formData.bedrooms === '1'}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-onebeds-sell">1</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-twobeds-sell"
                name="bedrooms"
                type="radio"
                value="2"
                checked={formData.bedrooms === '2'}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-twobeds-sell">2</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-threebeds-sell"
                name="bedrooms"
                type="radio"
                value="3"
                checked={formData.bedrooms === '3'}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-threebeds-sell">3</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-morefourbeds-sell"
                name="bedrooms"
                type="radio"
                value="4+"
                checked={formData.bedrooms === '4+'}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-morefourbeds-sell">4+</label>
            </li>
          </ul>
        </li>

        {/* Step 3: Bathrooms */}
        <li className={`${styles.ibFsitem} ${currentStep === 3 ? styles.ibFsitemActive : ''}`}>
          <h4 className={styles.ibFstitle}>How many bathrooms?</h4>
          <ul className={`${styles.ibFsradios} ${styles.ibFsrnumbers}`}>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-onebaths-sell"
                name="bathrooms"
                type="radio"
                value="1"
                checked={formData.bathrooms === '1'}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-onebaths-sell">1</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-twobaths-sell"
                name="bathrooms"
                type="radio"
                value="2"
                checked={formData.bathrooms === '2'}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-twobaths-sell">2</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-threebaths-sell"
                name="bathrooms"
                type="radio"
                value="3"
                checked={formData.bathrooms === '3'}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-threebaths-sell">3</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-morefourbaths-sell"
                name="bathrooms"
                type="radio"
                value="4+"
                checked={formData.bathrooms === '4+'}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-morefourbaths-sell">4+</label>
            </li>
          </ul>
        </li>

        {/* Step 4: Planning Stages */}
        <li className={`${styles.ibFsitem} ${currentStep === 4 ? styles.ibFsitemActive : ''}`}>
          <h4 className={styles.ibFstitle}>Planning Stages</h4>
          <ul className={styles.ibFsradios}>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-imready"
                name="planning"
                type="radio"
                value="I'm Ready"
                checked={formData.planning === "I'm Ready"}
                onChange={(e) => handleInputChange('planning', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-imready">I'm Ready</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-almost"
                name="planning"
                type="radio"
                value="Almost There"
                checked={formData.planning === 'Almost There'}
                onChange={(e) => handleInputChange('planning', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-almost">Almost There</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-flexible"
                name="planning"
                type="radio"
                value="Flexible"
                checked={formData.planning === 'Flexible'}
                onChange={(e) => handleInputChange('planning', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-flexible">Flexible</label>
            </li>
            <li className={styles.ibFsritem}>
              <input
                className={styles.ibFiradio}
                id="ib-form-planning"
                name="planning"
                type="radio"
                value="Planning Stages"
                checked={formData.planning === 'Planning Stages'}
                onChange={(e) => handleInputChange('planning', e.target.value)}
              />
              <label className={styles.ibFilabel} htmlFor="ib-form-planning">Planning Stages</label>
            </li>
          </ul>
        </li>
      </>
    );
  };

  // Contact Information step (common for both)
  const renderContactStep = () => {
    const stepNumber = selectedOption === 'sell' ? 4 : 5;
    return (
      <li className={`${styles.ibFsitem} ${currentStep === stepNumber + 1 ? styles.ibFsitemActive : ''}`}>
        <h4 className={styles.ibFstitle}>Contact Information</h4>
        <span className={styles.ibFtext}>
          Please provide your contact information below and we will be in touch very soon!
        </span>
        <ul className={styles.ibFsinformation}>
          <li className={styles.ibFsftem}>
            <label className={styles.msHidden} htmlFor="ms-email-fsftem">Email*</label>
            <input
              className={styles.ibFsinput}
              id="ms-email-fsftem"
              name="email"
              placeholder="Email*"
              required
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </li>
          <li className={styles.ibFsftem}>
            <label className={styles.msHidden} htmlFor="ms-name-fsftem">Name*</label>
            <input
              className={styles.ibFsinput}
              id="ms-name-fsftem"
              name="name"
              placeholder="Name*"
              required
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </li>
          <li className={styles.ibFsftem}>
            <label className={styles.msHidden} htmlFor="ms-phone-fsftem">Phone*</label>
            <input
              className={styles.ibFsinput}
              id="ms-phone-fsftem"
              name="phone"
              placeholder="Phone*"
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </li>
          <li className={`${styles.ibFsftem} ${styles.ibFsftemTextarea}`}>
            <label className={styles.msHidden} htmlFor="ms-comments-fsftem">Comments</label>
            <textarea
              className={styles.ibFstextarea}
              id="ms-comments-fsftem"
              name="comments"
              placeholder="Comments"
              value={formData.comments}
              onChange={(e) => handleInputChange('comments', e.target.value)}
            />
          </li>
        </ul>
      </li>
    );
  };

  return (
    <div className="ip ip-theme-compass">
      <Header />
      
      <section 
        data-url="https://dayannecosta.com/wp-content/uploads/2024/01/Edgewater-scaled.jpg" 
        id="main-wrap"
      >
        <article className={styles.ibFormBuyandsell}>
          <img 
            alt={selectedOption === 'sell' ? "What's Your Home Worth?" : "What are you looking to buy?"} 
            className={styles.ibFormBg} 
            decoding="async" 
            src="/index.html"
          />
          
          <form 
            className={`${styles.ibFbscontainer} gtm_i_want_to_${selectedOption || 'buy'} iboost-secured-recaptcha-form iboost-form-validation`} 
            id={`lead_submission_${selectedOption || 'buy'}_form`} 
            method="post"
            onSubmit={handleSubmit}
          >
            <input name="ib_tags" type="hidden" value="" />
            <input name="action" type="hidden" value={`lead_submission_${selectedOption || 'buy'}`} />
            <input id={`gclid_field_form_lead_submission_${selectedOption || 'buy'}`} name="gclid_field" type="hidden" />
            
            <div className={styles.ibFormWrapper}>
              <ul className={styles.ibFsteps}>
                {/* Step 0: Choose Buy or Sell */}
                {currentStep === 0 && (
                  <li className={`${styles.ibFsitem} ${styles.ibFsitemActive}`}>
                    <h1 className={styles.ibFstitle}>What would you like to do?</h1>
                    <ul className={styles.ibFsradios}>
                      <li className={styles.ibFsritem}>
                        <button
                          type="button"
                          className={`${styles.ibFilabel} ${styles.optionButton}`}
                          onClick={() => handleOptionSelect('buy')}
                        >
                          I Want To Buy
                        </button>
                      </li>
                      <li className={styles.ibFsritem}>
                        <button
                          type="button"
                          className={`${styles.ibFilabel} ${styles.optionButton}`}
                          onClick={() => handleOptionSelect('sell')}
                        >
                          I Want To Sell
                        </button>
                      </li>
                    </ul>
                  </li>
                )}

                {/* Render specific form steps based on selection */}
                {selectedOption === 'buy' && renderBuySteps()}
                {selectedOption === 'sell' && renderSellSteps()}
                
                {/* Contact Information Step */}
                {selectedOption && renderContactStep()}
              </ul>

              {/* Form Navigation Buttons */}
              <div className={`${styles.ibFbtns} ${selectedOption ? styles.ibFbtnsContinue : ''}`}>
                {currentStep > 0 && (
                  <div className={`${styles.ibFbtnBack} ${styles.ibFbtn}`} onClick={handleBack}>
                    Back
                  </div>
                )}
                
                {currentStep > 0 && currentStep < getTotalSteps() - 1 && (
                  <div className={`${styles.ibFbtnNext} ${styles.ibFbtn} ${styles.ibFbtnFnext}`} onClick={handleNext}>
                    Next
                  </div>
                )}
                
                {currentStep === getTotalSteps() - 1 && (
                  <input 
                    className={`${styles.ibFsubmit} ${styles.ibFbtn}`} 
                    id={`lead_submission_${selectedOption}_submit`} 
                    type="submit" 
                    value="Submit"
                  />
                )}
              </div>
            </div>
          </form>
        </article>
      </section>

      <Footer />
    </div>
  );
};

export default BuySell;
