import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './BuySell.module.css';

const BuySell = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    type: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    planning: '',
    priceRange: '',
    timeline: '',
    email: '',
    name: '',
    phone: '',
    comments: ''
  });

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setFormData({ ...formData, type: option });
    setCurrentStep(1);
  };

  const handleNext = () => {
    if (selectedOption === 'sell' && currentStep === 1) {
      // For sell, skip directly to contact info after address
      setCurrentStep(5);
    } else if (selectedOption === 'buy' && currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else if (selectedOption === 'sell' && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
    if (currentStep === 1) {
      setSelectedOption(null);
      setCurrentStep(0);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const getBackgroundImage = () => {
    if (selectedOption === 'sell') {
      return 'https://dayannecosta.com/wp-content/uploads/2024/01/Brickell-min-scaled.jpg';
    } else if (selectedOption === 'buy') {
      return 'https://dayannecosta.com/wp-content/uploads/2024/01/Edgewater-scaled.jpg';
    }
    return 'https://dayannecosta.com/wp-content/uploads/2024/01/Brickell-min-scaled.jpg';
  };

  const getFormTitle = () => {
    if (selectedOption === 'sell') {
      if (currentStep === 1) return "What's Your Home Worth?";
      if (currentStep === 2) return "How many bedrooms?";
      if (currentStep === 3) return "How many bathrooms?";
      if (currentStep === 4) return "Planning Stages";
      if (currentStep === 5) return "Contact Information";
    } else if (selectedOption === 'buy') {
      if (currentStep === 1) return "What are you looking to buy?";
      if (currentStep === 2) return "What's your price range?";
      if (currentStep === 3) return "How many bedrooms?";
      if (currentStep === 4) return "How many bathrooms?";
      if (currentStep === 5) return "Timeline to purchase";
      if (currentStep === 6) return "Contact Information";
    }
    return "What would you like to do?";
  };

  return (
    <div className="ip ip-theme-compass">
      <Header />

      <section 
        data-url={getBackgroundImage()}
        id="main-wrap"
        style={{
          backgroundImage: `url(${getBackgroundImage()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          position: 'relative'
        }}
      >
        <article className={styles.ibFormBuyandsell}>
          <form 
            className={`${styles.ibFbscontainer} gtm_i_want_to_${selectedOption || 'buy'} iboost-secured-recaptcha-form iboost-form-validation`} 
            id={`lead_submission_${selectedOption || 'buy'}_form`} 
            method="post"
            onSubmit={handleSubmit}
          >
            <fieldset>
              <legend>{getFormTitle()}</legend>
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
                            className={styles.optionButton}
                            onClick={() => handleOptionSelect('buy')}
                          >
                            I Want To Buy
                          </button>
                        </li>
                        <li className={styles.ibFsritem}>
                          <button 
                            type="button" 
                            className={styles.optionButton}
                            onClick={() => handleOptionSelect('sell')}
                          >
                            I Want To Sell
                          </button>
                        </li>
                      </ul>
                    </li>
                  )}

                  {/* Sell Flow */}
                  {selectedOption === 'sell' && (
                    <>
                      {/* Step 1: Address for Sell */}
                      {currentStep === 1 && (
                        <li className={`${styles.ibFsitem} ${styles.ibFsitemActive}`}>
                          <h1 className={styles.ibFstitle}>What's Your Home Worth?</h1>
                          <span className={styles.ibFtext}>
                            Please fill out your address below to receive a<br/>
                            complimentary market analysis from one of our experts!
                          </span>
                          <div className={styles.ibFsifind}>
                            <label className="ms-hidden" htmlFor="lead_address_acgoogle">
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
                      )}

                      {/* Step 2: Bedrooms for Sell */}
                      {currentStep === 2 && (
                        <li className={`${styles.ibFsitem} ${styles.ibFsitemActive}`}>
                          <h4 className={styles.ibFstitle}>How many bedrooms?</h4>
                          <ul className={`${styles.ibFsradios} ${styles.ibFsrnumbers}`}>
                            {[1, 2, 3, '4+'].map((num) => (
                              <li key={num} className={styles.ibFsritem}>
                                <input 
                                  className={styles.ibFiradio} 
                                  id={`ib-form-${num}beds-sell`} 
                                  name="ib-fbedrooms" 
                                  type="radio" 
                                  value={num}
                                  checked={formData.bedrooms === num.toString()}
                                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                                />
                                <label className={styles.ibFilabel} htmlFor={`ib-form-${num}beds-sell`}>{num}</label>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}

                      {/* Step 3: Bathrooms for Sell */}
                      {currentStep === 3 && (
                        <li className={`${styles.ibFsitem} ${styles.ibFsitemActive}`}>
                          <h4 className={styles.ibFstitle}>How many bathrooms?</h4>
                          <ul className={`${styles.ibFsradios} ${styles.ibFsrnumbers}`}>
                            {[1, 2, 3, '4+'].map((num) => (
                              <li key={num} className={styles.ibFsritem}>
                                <input 
                                  className={styles.ibFiradio} 
                                  id={`ib-form-${num}baths-sell`} 
                                  name="ib-fbathsrooms" 
                                  type="radio" 
                                  value={num}
                                  checked={formData.bathrooms === num.toString()}
                                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                                />
                                <label className={styles.ibFilabel} htmlFor={`ib-form-${num}baths-sell`}>{num}</label>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}

                      {/* Step 4: Planning Stages for Sell */}
                      {currentStep === 4 && (
                        <li className={`${styles.ibFsitem} ${styles.ibFsitemActive}`}>
                          <h4 className={styles.ibFstitle}>Planning Stages</h4>
                          <ul className={styles.ibFsradios}>
                            {[
                              { value: "I'm Ready", label: "I'm Ready" },
                              { value: "Almost There", label: "Almost There" },
                              { value: "Flexible", label: "Flexible" },
                              { value: "Planning Stages", label: "Planning Stages" }
                            ].map((option) => (
                              <li key={option.value} className={styles.ibFsritem}>
                                <input 
                                  className={styles.ibFiradio} 
                                  id={`ib-form-${option.value.replace(/[^a-zA-Z]/g, '').toLowerCase()}`} 
                                  name="ib-fplanning" 
                                  type="radio" 
                                  value={option.value}
                                  checked={formData.planning === option.value}
                                  onChange={(e) => handleInputChange('planning', e.target.value)}
                                />
                                <label className={styles.ibFilabel} htmlFor={`ib-form-${option.value.replace(/[^a-zA-Z]/g, '').toLowerCase()}`}>
                                  {option.label}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}
                    </>
                  )}

                  {/* Buy Flow */}
                  {selectedOption === 'buy' && (
                    <>
                      {/* Step 1: Property Type for Buy */}
                      {currentStep === 1 && (
                        <li className={`${styles.ibFsitem} ${styles.ibFsitemActive}`}>
                          <h1 className={styles.ibFstitle}>What are you looking to buy?</h1>
                          <ul className={styles.ibFsradios}>
                            {[
                              { value: "Condo", label: "Condo" },
                              { value: "Single Family Home", label: "Single Family Home" },
                              { value: "Townhouse", label: "Townhouse" }
                            ].map((option) => (
                              <li key={option.value} className={styles.ibFsritem}>
                                <input 
                                  className={styles.ibFiradio} 
                                  id={`ib-form-${option.value.replace(/\s/g, '').toLowerCase()}`} 
                                  name="ib-ftobuy" 
                                  type="radio" 
                                  value={option.value}
                                  checked={formData.type === option.value}
                                  onChange={(e) => handleInputChange('type', e.target.value)}
                                />
                                <label className={styles.ibFilabel} htmlFor={`ib-form-${option.value.replace(/\s/g, '').toLowerCase()}`}>
                                  {option.label}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}

                      {/* Step 2: Price Range for Buy */}
                      {currentStep === 2 && (
                        <li className={`${styles.ibFsitem} ${styles.ibFsitemActive}`}>
                          <h4 className={styles.ibFstitle}>What's your price range?</h4>
                          <ul className={styles.ibFsradios}>
                            {[
                              { value: "Below $1M", label: "Below $1M" },
                              { value: "$1M to $3M", label: "$1M to $3M" },
                              { value: "$3M to $5M", label: "$3M to $5M" },
                              { value: "$5M+", label: "$5M+" }
                            ].map((option) => (
                              <li key={option.value} className={styles.ibFsritem}>
                                <input 
                                  className={styles.ibFiradio} 
                                  id={`ib-form-${option.value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}`} 
                                  name="ib-fprice" 
                                  type="radio" 
                                  value={option.value}
                                  checked={formData.priceRange === option.value}
                                  onChange={(e) => handleInputChange('priceRange', e.target.value)}
                                />
                                <label className={styles.ibFilabel} htmlFor={`ib-form-${option.value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}`}>
                                  {option.label}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}

                      {/* Step 3: Bedrooms for Buy */}
                      {currentStep === 3 && (
                        <li className={`${styles.ibFsitem} ${styles.ibFsitemActive}`}>
                          <h4 className={styles.ibFstitle}>How many bedrooms?</h4>
                          <ul className={`${styles.ibFsradios} ${styles.ibFsrnumbers}`}>
                            {[1, 2, 3, '4+'].map((num) => (
                              <li key={num} className={styles.ibFsritem}>
                                <input 
                                  className={styles.ibFiradio} 
                                  id={`ib-form-${num}beds-buy`} 
                                  name="ib-fbedrooms" 
                                  type="radio" 
                                  value={num}
                                  checked={formData.bedrooms === num.toString()}
                                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                                />
                                <label className={styles.ibFilabel} htmlFor={`ib-form-${num}beds-buy`}>{num}</label>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}

                      {/* Step 4: Bathrooms for Buy */}
                      {currentStep === 4 && (
                        <li className={`${styles.ibFsitem} ${styles.ibFsitemActive}`}>
                          <h4 className={styles.ibFstitle}>How many bathrooms?</h4>
                          <ul className={`${styles.ibFsradios} ${styles.ibFsrnumbers}`}>
                            {[1, 2, 3, '4+'].map((num) => (
                              <li key={num} className={styles.ibFsritem}>
                                <input 
                                  className={styles.ibFiradio} 
                                  id={`ib-form-${num}baths-buy`} 
                                  name="ib-fbathsrooms" 
                                  type="radio" 
                                  value={num}
                                  checked={formData.bathrooms === num.toString()}
                                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                                />
                                <label className={styles.ibFilabel} htmlFor={`ib-form-${num}baths-buy`}>{num}</label>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}

                      {/* Step 5: Timeline for Buy */}
                      {currentStep === 5 && (
                        <li className={`${styles.ibFsitem} ${styles.ibFsitemActive}`}>
                          <h4 className={styles.ibFstitle}>Timeline to purchase</h4>
                          <ul className={styles.ibFsradios}>
                            {[
                              { value: "Now", label: "Now" },
                              { value: "Soon", label: "Soon" },
                              { value: "Later", label: "Later" }
                            ].map((option) => (
                              <li key={option.value} className={styles.ibFsritem}>
                                <input 
                                  className={styles.ibFiradio} 
                                  id={`ib-form-${option.value.toLowerCase()}`} 
                                  name="ib-ftimepurchase" 
                                  type="radio" 
                                  value={option.value}
                                  checked={formData.timeline === option.value}
                                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                                />
                                <label className={styles.ibFilabel} htmlFor={`ib-form-${option.value.toLowerCase()}`}>
                                  {option.label}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}
                    </>
                  )}

                  {/* Contact Information Step */}
                  {((selectedOption === 'sell' && currentStep === 5) || (selectedOption === 'buy' && currentStep === 6)) && (
                    <li className={`${styles.ibFsitem} ${styles.ibFsitemActive}`}>
                      <h4 className={styles.ibFstitle}>Contact Information</h4>
                      <span className={styles.ibFtext}>
                        Please provide your contact information below and we will be in touch very soon!
                      </span>
                      <ul className={styles.ibFsinformation}>
                        <li className={styles.ibFsftem}>
                          <label className="ms-hidden" htmlFor="ms-email-fsftem">Email*</label>
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
                          <label className="ms-hidden" htmlFor="ms-name-fsftem">Name*</label>
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
                          <label className="ms-hidden" htmlFor="ms-phone-fsftem">Phone*</label>
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
                          <label className="ms-hidden" htmlFor="ms-comments-fsftem">Comments</label>
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
                  )}
                </ul>

                {/* Navigation Buttons */}
                <div className={styles.ibFbtns}>
                  {currentStep > 0 && (
                    <div className={`${styles.ibFbtnBack} ${styles.ibFbtn}`} onClick={handleBack}>
                      Back
                    </div>
                  )}

                  {currentStep > 0 && currentStep < (selectedOption === 'sell' ? 5 : 6) && (
                    <div className={`${styles.ibFbtnNext} ${styles.ibFbtn} ${styles.ibFbtnFnext}`} onClick={handleNext}>
                      Next
                    </div>
                  )}

                  {((selectedOption === 'sell' && currentStep === 5) || (selectedOption === 'buy' && currentStep === 6)) && (
                    <input 
                      className={`${styles.ibFsubmit} ${styles.ibFbtn}`} 
                      id={`lead_submission_${selectedOption}_submit`} 
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

      <Footer />
    </div>
  );
};

export default BuySell;