
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './CompassConcierge.module.css';

const CompassConcierge = () => {
  return (
    <div>
      <Header />

      <main className={styles.compassPage}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <Container>
            <Row className="align-items-center min-vh-75">
              <Col lg={6}>
                <div className={styles.heroContent}>
                  <h1 className={styles.heroTitle}>
                    Compass Concierge
                  </h1>
                  <h2 className={styles.heroSubtitle}>
                    Get fronted for the cost of home improvement services with no interest — ever.
                  </h2>
                  <p className={styles.heroDescription}>
                    Compass Concierge is the hassle-free way to sell your home faster and for a higher price with services like staging, flooring, painting, and more.
                  </p>
                </div>
              </Col>
              <Col lg={6}>
                <div className={styles.videoWrapper}>
                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/4hd018raScA"
                    title="Compass Concierge Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.video}
                  ></iframe>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Features Section */}
        <section className={styles.featuresSection}>
          <Container>
            <Row>
              <Col lg={12} className="text-center mb-5">
                <h2 className={styles.sectionTitle}>Why Choose Compass Concierge</h2>
              </Col>
            </Row>
            <Row>
              <Col lg={3} md={6} className="mb-4">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <h3>SMART</h3>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      Your Compass agent will help you determine which services can deliver the greatest return on your investment.
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <h3>FAST</h3>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      The entire process is designed for speed, so that work can begin — and your home can sell — as quickly as possible.
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <h3>TRANSPARENT</h3>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      With Compass Concierge services you'll never have to worry about any upfront costs or interest.
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <h3>EASY</h3>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      Your Compass agent will be by your side throughout the process, advising you along the way.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Success Stories Section */}
        <section className={styles.successSection}>
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <div className={styles.successContent}>
                  <h2 className={styles.sectionTitle}>Success Stories</h2>
                  <blockquote className={styles.testimonial}>
                    "The thing that was the most daunting for me about selling the home was how would I get it to market, based on being retired and have limited income. And that's where the Compass Concierge service was absolutely remarkable."
                  </blockquote>
                  <p className={styles.testimonialAuthor}>Julia, Seller | Oakland</p>
                  <p className={styles.testimonialStats}>
                    <strong>12 Days on Market | 47% Over Ask</strong>
                  </p>
                  <p className={styles.disclaimer}>
                    Individual results may vary. Testimonials are not intended to guarantee the same or similar results.
                  </p>
                </div>
              </Col>
              <Col lg={6}>
                <div className={styles.videoWrapper}>
                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/4hd018raScA"
                    title="Success Stories Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.video}
                  ></iframe>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Covered Services Section */}
        <section className={styles.servicesSection}>
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <div className={styles.servicesContent}>
                  <h2 className={styles.sectionTitle}>Covered Services</h2>
                  <div className={styles.servicesList}>
                    <ul>
                      <li>Floor repair</li>
                      <li>Carpet cleaning and replacement</li>
                      <li>Staging</li>
                      <li>Deep-cleaning</li>
                      <li>Decluttering</li>
                      <li>Cosmetic renovations</li>
                      <li>Landscaping</li>
                      <li>Interior and exterior painting</li>
                      <li>HVAC</li>
                      <li>Roofing repair</li>
                      <li>Moving and storage</li>
                      <li>Pest control</li>
                      <li>Custom closet work</li>
                      <li>Fencing</li>
                      <li>Electrical work</li>
                      <li>Seller-side inspections and evaluations</li>
                      <li>Kitchen improvements</li>
                      <li>Bathroom improvements</li>
                      <li>Pool and tennis court services</li>
                      <li>Water heating and plumbing repair</li>
                      <li>Sewer lateral inspections and remediation</li>
                      <li>More than 100 other home improvement services</li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className={styles.servicesImageWrapper}>
                  <div className={styles.servicesImage}></div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Statistics Section */}
        <section className={styles.statsSection}>
          <Container>
            <Row>
              <Col lg={4} md={6} className="mb-4">
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>54%</div>
                  <p className={styles.statText}>
                    The percentage of homebuyers willing to pay more for hardwood floors
                  </p>
                </div>
              </Col>
              <Col lg={4} md={6} className="mb-4">
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>$400</div>
                  <p className={styles.statText}>
                    The potential return of every $100 you invest in staging your home
                  </p>
                </div>
              </Col>
              <Col lg={4} md={6} className="mb-4">
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>85%</div>
                  <p className={styles.statText}>
                    The percentage of sellers' agents who say staging decreases a property's time on market
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* How It Works Section */}
        <section className={styles.howItWorksSection}>
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <div className={styles.howItWorksContent}>
                  <h2 className={styles.sectionTitle}>How It Works</h2>
                  <div className={styles.stepsContent}>
                    <p>You and your agent work together to decide which services can increase your home's value the most and set an estimated budget for the work.</p>
                    <p>When you're ready to start, your Compass agent will be by your side as you engage vendors and commission work.</p>
                    <p>Once the transformation is complete, your home will go on the market.</p>
                    <p>You'll pay for the services when one of the following happens -- your home sells, you terminate your listing agreement with Compass, or 12 months pass from your Concierge start date.</p>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className={styles.videoWrapper}>
                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/4hd018raScA"
                    title="How It Works Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.video}
                  ></iframe>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <Container>
            <Row>
              <Col lg={12} className="text-center mb-5">
                <h2 className={styles.sectionTitle}>Your Questions Answered</h2>
              </Col>
            </Row>
            <Row>
              <Col lg={4} className="mb-4">
                <div className={styles.faqCard}>
                  <h3 className={styles.faqQuestion}>
                    Are there any services not covered by the program?
                  </h3>
                  <p className={styles.faqAnswer}>
                    Our goal is for Concierge to help as many clients as possible. The program is intentionally flexible; we've developed Concierge to be used with most vendors for your convenience.
                  </p>
                </div>
              </Col>
              <Col lg={4} className="mb-4">
                <div className={styles.faqCard}>
                  <h3 className={styles.faqQuestion}>
                    When do I have to pay for the services?
                  </h3>
                  <p className={styles.faqAnswer}>
                    You'll pay once one of the following happens (whichever occurs first): - Your home sells - You terminate your listing agreement with Compass - 12 months pass from your Concierge start date.
                  </p>
                </div>
              </Col>
              <Col lg={4} className="mb-4">
                <div className={styles.faqCard}>
                  <h3 className={styles.faqQuestion}>
                    How can I participate in the program?
                  </h3>
                  <p className={styles.faqAnswer}>
                    Easy! Call your Compass agent today to find out how to participate. Not yet working with one? Use the form to get started.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Disclaimer Section */}
        <section className={styles.disclaimerSection}>
          <Container>
            <Row>
              <Col lg={12}>
                <div className={styles.disclaimerContent}>
                  <p>
                    <strong>Disclaimer:</strong> This information is provided for informational purposes only and is not a solicitation, recommendation, offer or promise to provide services. Rules & Exclusions apply. Compass offers no guarantee or warranty of results. Home must qualify under Compass Concierge guidelines. Subject to additional terms and conditions. Compass reserves the right to refuse, reject, or cancel the program for any reason at any time without liability.
                  </p>
                  <p>
                    Concierge Capital loans are provided by Notable Finance, LLC, NMLS# 1824748 and are made or arranged pursuant to a California Finance Lenders Law license. Loan eligibility is not guaranteed and all loans are subject to credit approval and underwriting by Notable. Compass is not a lender and is not providing loans as part of the Compass Concierge program.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CompassConcierge;
