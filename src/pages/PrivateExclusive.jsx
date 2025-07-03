import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './PrivateExclusive.module.css';

const PrivateExclusive = () => {
  return (
    <div>
      <Header />

      <main className="ip-page ip-page-custom" id="ip-page-custom">
        {/* First Section - Private Exclusives */}
        <section className="ip-page-section ip-section-about ip-format-a content-width-narrow horizontal-alignment-left vertical-alignment-stretch background-width-full-bleed" id="ip-section-about-private-exclusives">
          <div className="ip-section-background">
            <div className="ip-section-background-overlay"></div>
          </div>
          <div className="ip-section-wrapper">
            <div className="ip-section-content">
              <article>
                <div className="ip-description ip-my-5 ip-block-content">
                  <h4 className="ibc-u-heading heading-sm">Private Exclusives</h4>
                  <p className="ibc-u-text body-md">
                    <strong>Sell your home, keep your privacy.</strong>
                  </p>
                  <p className="ibc-u-text body-md">
                    Listing your home as a private exclusive allows you to control what information is shared about you and your home while still getting exposure to top agents at Compass.
                  </p>
                </div>
                <div className="ip-wrap-btn"></div>
              </article>
              <div className="ip-wrap-image">
                <img 
                  className="ip-image ms-lazy" 
                  src="https://api-cms.idxboost.com/assets/images/compass/private-exclusive-services.jpeg" 
                  alt=""
                />
              </div>
              <div className="ip-wrap-image ip-image-two"></div>
            </div>
          </div>
        </section>

        {/* What To Expect Section */}
        <section className="ip-page-section ip-section-overview ip-columns-4 ip-section-height-small content-width-wide vertical-alignment-middle horizontal-alignment-center space-between-items-medium" id="ip-section-contentSectionTwo-what-to-expect">
          <div className="ip-section-background">
            <div className="ip-section-background-overlay"></div>
          </div>
          <div className="ip-section-wrapper">
            <div className="ip-section-content">
              <div className="ip-block ip-block-html">
                <div className="ip-block-content">
                  <h4 className="ibc-u-heading heading-sm">What To Expect</h4>
                </div>
              </div>
              <div className="ip-block ip-block-spacer"></div>
              <div className="ip-slider js-slider-overview" data-columns="4" id="slider-contentSectionTwo-what-to-expect">
                <div className="ip-item">
                  <div className="ip-item-content">
                    <h3 className="ip-item-title">DISCRETION</h3>
                    <p className="ip-item-text ibc-u-text body-md">
                      Privacy is the ultimate commodity and the decision to sell your home is a personal experience.
                    </p>
                  </div>
                </div>
                <div className="ip-item">
                  <div className="ip-item-content">
                    <h3 className="ip-item-title">FLEXIBILITY</h3>
                    <p className="ip-item-text ibc-u-text body-md">
                      Decide when to share details about your home, including price, more broadly on your own timing.
                    </p>
                  </div>
                </div>
                <div className="ip-item">
                  <div className="ip-item-content">
                    <h3 className="ip-item-title">QUALITY</h3>
                    <p className="ip-item-text ibc-u-text body-md">
                      Retain exposure to Compass agents, including premium placement on our agent facing platform.
                    </p>
                  </div>
                </div>
                <div className="ip-item">
                  <div className="ip-item-content">
                    <h3 className="ip-item-title">VALUE</h3>
                    <p className="ip-item-text ibc-u-text body-md">
                      Get the best offer by testing the market privately to gather key insights without your listing getting stale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reasons Section */}
        <section className="ip-page-section ip-section-about content-width-narrow horizontal-alignment-left vertical-alignment-stretch background-width-full-bleed" id="ip-section-about-reason-why">
          <div className="ip-section-background">
            <div className="ip-section-background-overlay"></div>
          </div>
          <div className="ip-section-wrapper">
            <div className="ip-section-content">
              <article>
                <div className="ip-description ip-my-5 ip-block-content">
                  <h4 className="ibc-u-heading heading-sm">
                    Reasons why you might choose to sell your home as a private exclusive:
                  </h4>
                  <p className="ibc-u-text body-md">New job or relocation</p>
                  <p className="ibc-u-text body-md">Family changes like marriage or divorce</p>
                  <p className="ibc-u-text body-md">Evolving financial circumstances</p>
                  <p className="ibc-u-text body-md">Health issues</p>
                  <p className="ibc-u-text body-md">Valuable belongings like art or furniture</p>
                  <p className="ibc-u-text body-md">Opposition to holding open houses</p>
                </div>
                <div className="ip-wrap-btn"></div>
              </article>
              <div className="ip-wrap-image">
                <img 
                  className="ip-image ms-lazy" 
                  src="https://api-cms.idxboost.com/assets/images/compass/private-exclusive-reasons.jpeg" 
                  alt=""
                />
              </div>
              <div className="ip-wrap-image ip-image-two"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivateExclusive;