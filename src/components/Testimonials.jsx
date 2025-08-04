import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Dayanne was far better than any other broker I have ever worked with...",
      author: "Alex",
      subquote: "I love my home!"
    },
    {
      quote: "Dayanne has great energy and loves what she does...",
      author: "Robert"
    },
    {
      quote: "Dayanne was spectacular from the first time we got in contact...",
      author: "Christina"
    }
  ];

  return (
    <section className={`${styles.testimonials} py-5`}>
      <Container>
        <Row className="mb-5">
          <Col>
            <h2 className={styles.sectionTitle}>Testimonials</h2>
          </Col>
        </Row>

        <Row className="g-4">
          {testimonials.map((testimonial, index) => (
            <Col key={index} md={4}>
              <div className={styles.testimonialCard}>
                <p className={styles.testimonialText}>"{testimonial.quote}"</p>
                <div className={styles.testimonialAuthor}>- {testimonial.author}</div>
                {testimonial.subquote && (
                  <div className={styles.testimonialSubquote}>"{testimonial.subquote}"</div>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;