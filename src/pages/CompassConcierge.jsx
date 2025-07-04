import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './CompassConcierge.module.css';

const CompassConcierge = () => {
  return (
    <div>
      <Header />

      <main className={styles.ipPageCustom} id="ip-page-custom">
        {/* Hero Section - Compass Concierge */}
        <section className={`${styles.ipPageSection} ${styles.ipSectionAbout} ${styles.ipFormatA}`} id="ip-section-about-compass-concierge">
          <div className={styles.ipSectionBackground}>
            <div className={styles.ipSectionBackgroundOverlay}></div>
          </div>
          <div className={styles.ipSectionWrapper}>
            <div className={styles.ipSectionContent}>
              <article>
                <div className={`${styles.ipDescription} ${styles.ipMy5} ${styles.ipBlockContent}`}>
                  <h4 className={`${styles.ibcUHeading} ${styles.headingSm}`}>
                    Compass Concierge
                  </h4>
                  <p className={`${styles.ibcUText} ${styles.bodyMd}`}>
                    <strong>Get fronted for the cost of home improvement services with no interest — ever.</strong>
                  </p>
                  <p className={`${styles.ibcUText} ${styles.bodyMd}`}>
                    Compass Concierge is the hassle-free way to sell your home faster and for a higher price with services like staging, flooring, painting, and more.
                  </p>
                </div>
                <div className={styles.ipWrapBtn}></div>
              </article>
              <div className={styles.ipWrapImage}>
                <img 
                  src="https://api-cms.idxboost.com/assets/images/compass/concierge-services.jpeg" 
                  alt="Compass Concierge Services" 
                  className={`${styles.ipImage} ${styles.msLazy}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - SMART, FAST, TRANSPARENT, EASY */}
        <section className={`${styles.ipPageSection} ${styles.ipSectionOverview} ${styles.ipColumns4}`} id="ip-section-contentSectionTwo-smart-fast">
          <div className={styles.ipSectionBackground}>
            <div className={styles.ipSectionBackgroundOverlay}></div>
          </div>
          <div className={styles.ipSectionWrapper}>
            <div className={styles.ipSectionContent}>
              <div className={`${styles.ipSlider} ${styles.jsSliderOverview}`} data-columns="4">
                <div className={styles.ipItem}>
                  <div className={styles.ipItemContent}>
                    <h3 className={styles.ipItemTitle}>SMART</h3>
                    <p className={`${styles.ipItemText} ${styles.ibcUText} ${styles.bodyMd}`}>
                      Your Compass agent will help you determine which services can deliver the greatest return on your investment.
                    </p>
                  </div>
                </div>
                <div className={styles.ipItem}>
                  <div className={styles.ipItemContent}>
                    <h3 className={styles.ipItemTitle}>FAST</h3>
                    <p className={`${styles.ipItemText} ${styles.ibcUText} ${styles.bodyMd}`}>
                      The entire process is designed for speed, so that work can begin — and your home can sell — as quickly as possible.
                    </p>
                  </div>
                </div>
                <div className={styles.ipItem}>
                  <div className={styles.ipItemContent}>
                    <h3 className={styles.ipItemTitle}>TRANSPARENT</h3>
                    <p className={`${styles.ipItemText} ${styles.ibcUText} ${styles.bodyMd}`}>
                      With Compass Concierge services you'll never have to worry about any upfront costs or interest.
                    </p>
                  </div>
                </div>
                <div className={styles.ipItem}>
                  <div className={styles.ipItemContent}>
                    <h3 className={styles.ipItemTitle}>EASY</h3>
                    <p className={`${styles.ipItemText} ${styles.ibcUText} ${styles.bodyMd}`}>
                      Your Compass agent will be by your side throughout the process, advising you along the way.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className={`${styles.ipPageSection} ${styles.ipSectionVideo} ${styles.ipFormatTextVideo}`} id="ip-section-video-success-stories">
          <div className={styles.ipSectionBackground}>
            <div className={styles.ipSectionBackgroundOverlay}></div>
          </div>
          <div className={styles.ipSectionWrapper}>
            <div className={styles.ipSectionContent}>
              <div className={styles.ipTextColumn}>
                <h4 className={`${styles.ibcUHeading} ${styles.headingSm}`}>
                  Success Stories
                </h4>
                <p className={`${styles.ibcUText} ${styles.bodyMd}`}>
                  <em>"The thing that was the most daunting for me about selling the home was how would I get it to market, based on being retired and have limited income. And that's where the Compass Concierge service was absolutely remarkable."</em>
                </p>
                <p className={`${styles.ibcUText} ${styles.bodyMd}`}>
                  Julia, Seller | Oakland
                </p>
                <p className={`${styles.ibcUText} ${styles.bodyMd}`}>
                  <strong>12 Days on Market | 47% Over Ask</strong>
                </p>
                <p className={`${styles.ibcUText} ${styles.bodyMd}`}>
                  Individual results may vary. Testimonials are not intended to guarantee the same or similar results
                </p>
              </div>
              <div className={styles.ipVideoColumn}>
                <div className={styles.ipVideo} style={{ border: '3px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/4hd018raScA?autoplay=0"
                    title="Success Stories Video"
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.video}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Covered Services Section */}
        <section className={`${styles.ipPageSection} ${styles.ipSectionAbout} ${styles.ipFormatA}`} id="ip-section-about-covered-services">
          <div className={styles.ipSectionBackground}>
            <div className={styles.ipSectionBackgroundOverlay}></div>
          </div>
          <div className={styles.ipSectionWrapper}>
            <div className={styles.ipSectionContent}>
              <article>
                <div className={`${styles.ipDescription} ${styles.ipMy5} ${styles.ipBlockContent}`}>
                  <h4 className={`${styles.ibcUHeading} ${styles.headingSm}`}>
                    Covered Services
                  </h4>
                  <div className={styles.servicesList}>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Floor repair</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Carpet cleaning and replacement</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Staging</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Deep-cleaning</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Decluttering</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Cosmetic renovations</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Landscaping</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Interior and exterior painting</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• HVAC</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Roofing repair</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Moving and storage</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Pest control</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Custom closet work</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Fencing</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Electrical work</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Seller-side inspections and evaluations</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Kitchen improvements</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Bathroom improvements</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Pool and tennis court services</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Water heating and plumbing repair</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• Sewer lateral inspections and remediation</p>
                    <p className={`${styles.ibcUText} ${styles.bodyMd}`}>• More than 100 other home improvement services</p>
                  </div>
                </div>
                <div className={styles.ipWrapBtn}></div>
              </article>
              <div className={styles.ipWrapImage}>
                <img 
                  src="https://api-cms.idxboost.com/assets/images/compass/concierge-covered-services.jpeg" 
                  alt="Covered Services" 
                  className={`${styles.ipImage} ${styles.msLazy}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className={`${styles.ipPageSection} ${styles.ipSectionOverview} ${styles.ipColumns3}`} id="ip-section-contentSectionTwo-percentages">
          <div className={styles.ipSectionBackground}>
            <div className={styles.ipSectionBackgroundOverlay}></div>
          </div>
          <div className={styles.ipSectionWrapper}>
            <div className={styles.ipSectionContent}>
              <div className={`${styles.ipSlider} ${styles.jsSliderOverview}`} data-columns="3">
                <div className={styles.ipItem}>
                  <div className={styles.ipWrapImage}>
                    <img 
                      src="https://api-cms.idxboost.com/assets/images/compass/concierge-percentage-1.png" 
                      alt="54%" 
                      className={`${styles.ipImage} ${styles.msLazy}`}
                    />
                  </div>
                  <div className={styles.ipItemContent}>
                    <p className={`${styles.ipItemText} ${styles.ibcUText} ${styles.bodyMd}`}>
                      The percentage of homebuyers willing to pay more for hardwood floors
                    </p>
                  </div>
                </div>
                <div className={styles.ipItem}>
                  <div className={styles.ipWrapImage}>
                    <img 
                      src="https://api-cms.idxboost.com/assets/images/compass/concierge-percentage-2.png" 
                      alt="$400" 
                      className={`${styles.ipImage} ${styles.msLazy}`}
                    />
                  </div>
                  <div className={styles.ipItemContent}>
                    <p className={`${styles.ipItemText} ${styles.ibcUText} ${styles.bodyMd}`}>
                      The potential return of every $100 you invest in staging your home
                    </p>
                  </div>
                </div>
                <div className={styles.ipItem}>
                  <div className={styles.ipWrapImage}>
                    <img 
                      src="https://api-cms.idxboost.com/assets/images/compass/concierge-percentage-3.png" 
                      alt="85%" 
                      className={`${styles.ipImage} ${styles.msLazy}`}
                    />
                  </div>
                  <div className={styles.ipItemContent}>
                    <p className={`${styles.ipItemText} ${styles.ibcUText} ${styles.bodyMd}`}>
                      The percentage of sellers' agents who say staging decreases a property's time on market.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className={`${styles.ipPageSection} ${styles.ipSectionVideo} ${styles.ipFormatTextVideo}`} id="ip-section-video-how-it-works">
          <div className={styles.ipSectionBackground}>
            <div className={styles.ipSectionBackgroundOverlay}></div>
          </div>
          <div className={styles.ipSectionWrapper}>
            <div className={styles.ipSectionContent}>
              <div className={styles.ipTextColumn}>
                <h4 className={`${styles.ibcUHeading} ${styles.headingSm}`}>
                  How It Works
                </h4>
                <p className={`${styles.ibcUText} ${styles.bodyMd}`}>
                  You and your agent work together to decide which services can increase your home's value the most and set an estimated budget for the work.
                </p>
                <p className={`${styles.ibcUText} ${styles.bodyMd}`}>
                  When you're ready to start, your Compass agent will be by your side as you engage vendors and commission work.
                </p>
                <p className={`${styles.ibcUText} ${styles.bodyMd}`}>
                  Once the transformation is complete, your home will go on the market.
                </p>
                <p className={`${styles.ibcUText} ${styles.bodyMd}`}>
                  You'll pay for the services when one of the following happens -- your home sells, you terminate your listing agreement with Compass, or 12 months pass from your Concierge start date.
                </p>
              </div>
              <div className={styles.ipVideoColumn}>
                <div className={styles.ipVideo} style={{ border: '3px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
                  <video
                    width="100%"
                    height="315"
                    controls
                    className={styles.video}
                    style={{ display: 'block' }}
                  >
                    <source src="/src/assets/img/3 - Concierge Treatment Video.mp4" type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={`${styles.ipPageSection} ${styles.ipSectionOverview} ${styles.ipColumns3}`} id="ip-section-contentSectionTwo-your-questions">
          <div className={styles.ipSectionBackground}>
            <div className={styles.ipSectionBackgroundOverlay}></div>
          </div>
          <div className={styles.ipSectionWrapper}>
            <div className={styles.ipSectionContent}>
              <div className={`${styles.ipBlock} ${styles.ipBlockHtml}`}>
                <div className={styles.ipBlockContent}>
                  <h4 className={`${styles.ibcUHeading} ${styles.headingSm} ${styles.textCenter}`}>
                    Your Questions Answered
                  </h4>
                </div>
              </div>
              <div className={`${styles.ipSlider} ${styles.jsSliderOverview}`} data-columns="3">
                <div className={styles.ipItem}>
                  <div className={styles.ipItemContent}>
                    <h3 className={styles.ipItemTitle}>
                      Are there any services not covered by the program?
                    </h3>
                    <p className={`${styles.ipItemText} ${styles.ibcUText} ${styles.bodyMd}`}>
                      Our goal is for Concierge to help as many clients as possible. The program is intentionally flexible; we've developed Concierge to be used with most vendors for your convenience.
                    </p>
                  </div>
                </div>
                <div className={styles.ipItem}>
                  <div className={styles.ipItemContent}>
                    <h3 className={styles.ipItemTitle}>
                      When do I have to pay for the services?
                    </h3>
                    <p className={`${styles.ipItemText} ${styles.ibcUText} ${styles.bodyMd}`}>
                      You'll pay once one of the following happens (whichever occurs first): - Your home sells - You terminate your listing agreement with Compass - 12 months pass from your Concierge start date.
                    </p>
                  </div>
                </div>
                <div className={styles.ipItem}>
                  <div className={styles.ipItemContent}>
                    <h3 className={styles.ipItemTitle}>
                      How can I participate in the program?
                    </h3>
                    <p className={`${styles.ipItemText} ${styles.ibcUText} ${styles.bodyMd}`}>
                      Easy! Call your Compass agent today to find out how to participate. Not yet working with one? Use the form to get started.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className={`${styles.ipPageSection} ${styles.ipSectionText}`} id="ip-section-text-disclaimer">
          <div className={styles.ipSectionBackground}>
            <div className={styles.ipSectionBackgroundOverlay}></div>
          </div>
          <div className={styles.ipSectionWrapper}>
            <div className={styles.ipSectionContent}>
              <div className={`${styles.ipBlock} ${styles.ipBlockHtml}`}>
                <div className={styles.ipBlockContent}>
                  <p className={`${styles.ibcUText} ${styles.bodyMd} ${styles.textCenter}`}>
                    This information is provided for informational purposes only and is not a solicitation, recommendation, offer or promise to provide services. Rules & Exclusions apply. Compass offers no guarantee or warranty of results. Home must qualify under Compass Concierge guidelines. Subject to additional terms and conditions. Compass reserves the right to refuse, reject, or cancel the program for any reason at any time without liability.
                  </p>
                  <p className={`${styles.ibcUText} ${styles.bodyMd} ${styles.textCenter}`}>
                    Concierge Capital loans are provided by Notable Finance, LLC, NMLS# 1824748 and are made or arranged pursuant to a California Finance Lenders Law license. Loan eligibility is not guaranteed and all loans are subject to credit approval and underwriting by Notable. Compass is not a lender and is not providing loans as part of the Compass Concierge program.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CompassConcierge;