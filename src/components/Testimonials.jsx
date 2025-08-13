
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "Dayanne has great energy and loves what she does. Which we found important when searching for a home in NYC. She was able to find us exclusive apartments that were fresh to the market and met our requirements. Dayanne kept asking the human about the process, never too anxious about closing a deal and was very transparent.",
      author: "Robert"
    },
    {
      quote: "Dayanne was spectacular from the first time we got in contact. Professional, courteous, loyal, fair and knows a lot about the downtown area and the market. I can't say enough good things. This is the agent you want to help you find your dream home!",
      author: "Alex"
    },
    {
      quote: "Dayanne was far better than any other broker I have ever worked with. She was quick, responsive and extremely honest. Treated me like a friend and helped me through the whole process much quicker than I thought it was possible. She also got me a great price on my apartment which was a really big win as NYC is very rare to find brokers that actually care. Couldn't be happier, I love my home!",
      author: "Christina"
    }
  ];

  // Auto-play do carrossel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className={`${styles.testimonials} py-5`}>
      <Container>
        <Row className="mb-4">
          <Col className="text-center">
            <small className={styles.sectionSubtitle}>Clients</small>
            <h2 className={styles.sectionTitle}>Testimonials</h2>
          </Col>
        </Row>

        <div className={styles.carouselContainer}>
          <button 
            className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
            onClick={goToPrevious}
          >
            ‹
          </button>

          <div className={styles.testimonialSlide}>
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText}>
                "{testimonials[currentIndex].quote}"
              </p>
              <div className={styles.testimonialAuthor}>
                — {testimonials[currentIndex].author} —
              </div>
            </div>
          </div>

          <button 
            className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
            onClick={goToNext}
          >
            ›
          </button>
        </div>

        <div className={styles.indicators}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
