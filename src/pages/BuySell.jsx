import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './BuySell.module.css';
import { buildApiUrl } from '../config/api';

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

  const location = useLocation();

  // Detectar parâmetros da URL e avançar automaticamente
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const actionParam = urlParams.get('action');

    if (actionParam === 'buy' || actionParam === 'sell') {
      setFormData(prevData => ({
        ...prevData,
        action: actionParam
      }));
      setCurrentStep(1); // Pula para a próxima etapa
    }
  }, [location.search]);

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
      name: '', // Resetting contact form fields to be filled in step 6
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
        setContactMessage('Invalid email address.');
        setContactSubmitting(false);
        return;
      }

      // Parse name into first and last name
      const nameParts = nome.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const respostas = Object.keys(quizAnswers || {}).length
        ? quizAnswers
        : {
          action: formData.action,
          propertyType: formData.propertyType,
          priceRange: formData.priceRange,
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          timeline: formData.timeline
        };

      console.log('Sending quiz data:', respostas);


      let data;
      try {
        const resp = await fetch(buildApiUrl('/api/emails/buy-sell-form'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone: telefone,
            message: msg || 'No additional comments provided',
            formData: respostas
          }),
        });

        if (!resp.ok) {
          const texto = await resp.text().catch(() => '');
          throw new Error(texto || `HTTP ${resp.status}`);
        }
        data = await resp.json().catch(() => ({}));
      } catch (err) {
        setContactMessage('Failed to send the message. Please try again.');
        console.error('Erro no envio:', err);
        return;
      }

      if (data?.success) {
        setContactMessage('**Success** - Your Buy/Sell quiz submission has been sent successfully! We\'ll contact you soon.');
        // Reset form
        setContactForm({
          name: '',
          email: '',
          phone: '',
          comments: ''
        });
        // Reset formData and currentStep for a new quiz
        setFormData({
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
        setCurrentStep(0);
      } else {
        setContactMessage(
          '**Failed** to send message.' + (data?.message ? ` ${data.message}` : ''),
        );
      }
    } catch (error) {
      setContactMessage('**Failed** - Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <div className="ip ip-theme-compass">
      <Header />

      <section className={styles.mainWrap}>
        <div className={styles.container}>
          {currentStep < 6 ? (
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

              {/* Step 1: What Are You Looking To Buy/Sell? */}
              {currentStep === 1 && (
                <div className={styles.step}>
                  <h1 className={styles.title}>
                    {formData.action === 'sell' ? 'What Are You Looking To Sell?' : 'What Are You Looking To Buy?'}
                  </h1>
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
                    <button type="button" className={styles.nextButton} onClick={handleSubmit}>
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
                    <button type="button" className={styles.nextButton} onClick={handleSubmit}>
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
                    <button type="button" className={styles.nextButton} onClick={handleSubmit}>
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
                    <button type="button" className={styles.nextButton} onClick={handleSubmit}>
                      Next
                    </button>

                  </div>
                </div>
              )}

              {/* Step 5: Timeline To Purchase/Sell */}
              {currentStep === 5 && (
                <div className={styles.step}>
                  <h1 className={styles.title}>
                    {formData.action === 'buy' ? 'Timeline To Purchase' : 'Timeline To Sell'}
                  </h1>
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
                    <button type="button" className={styles.nextButton} onClick={handleSubmit}>
                      Next
                    </button>

                  </div>
                </div>
              )}
            </form>
          ) : (
            // Step 6: Contact Information (separate form for submission)
            <div className={styles.step}>
              <h1 className={styles.title}>Contact Information</h1>
              <form onSubmit={handleContactSubmit} className={styles.form}>
                <div className={styles.contactForm}>
                  <input
                    type="email"
                    placeholder="Email*"
                    className={styles.input}
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Name*"
                    className={styles.input}
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone*"
                    className={styles.input}
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    required
                  />
                  <textarea
                    placeholder="Comments"
                    className={styles.textarea}
                    value={contactForm.comments}
                    onChange={(e) => setContactForm({ ...contactForm, comments: e.target.value })}
                  />
                </div>
                {contactMessage && (
                  <div
                    className={styles.message}
                    data-type={
                      contactMessage.includes('**Success**') || contactMessage.includes('successfully')
                        ? 'success'
                        : contactMessage.includes('**Failed**') || contactMessage.includes('Failed') || contactMessage.includes('Error')
                          ? 'error'
                          : ''
                    }
                  >
                    {contactMessage}
                  </div>
                )}
                <div className={styles.buttons}>
                  <button type="button" className={styles.backButton} onClick={handleBack}>
                    Back
                  </button>
                  <button type="submit" className={styles.submitButton} disabled={contactSubmitting}>
                    {contactSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section >

      <Footer />
    </div >
  );
};

export default BuySell;