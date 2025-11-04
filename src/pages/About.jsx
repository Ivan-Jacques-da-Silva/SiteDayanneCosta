
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import perfil from '../assets/img/perfil.jpg';
import styles from './About.module.css';

const About = () => {
  return (
    <div>
      <Header />
      
      <main className={styles.aboutPage}>
        <section className={styles.aboutSection}>
          <Container fluid className="p-0">
            <Row className="align-items-stretch h-100 g-0">
              {/* Image column - agora à esquerda */}
              <Col lg={6} className="p-0 d-flex">
                <div className={styles.imageWrapper}>
                  <img 
                    src={perfil} 
                    alt="Dayanne Costa" 
                    className={styles.profileImage}
                  />
                </div>
              </Col>
              
              {/* Text column - agora à direita */}
              <Col lg={6} className="ps-lg-4 d-flex">
                <div className={styles.aboutContent}>
                  <h6 className={styles.subtitle}>
                    Luxury Real Estate Specialist
                  </h6>
                  <h1 className={styles.title}>
                    <strong>Dayanne Costa</strong>
                  </h1>
                  
                  <div className={styles.description}>
                    <p>
                      Dayanne believes that when an opportunity comes along, one has to go after it with everything they have; she puts that same dedication into pursuing great opportunities and breaking records on sales for her clients. Whether it is a dream home, a lucrative investment, multifamily, or a new development opportunity, she believes that helping clients realize their real estate dreams is a big part of achieving her own. From first-time homebuyers to sophisticated sellers or international real estate developers and everything in between, every client is a VIP, and she treasures each relationship.
                    </p>
                    
                    <p>
                      Dayanne started her real estate career in Miami, Florida, and moved to Manhattan, NYC shortly after, with the goal to sharpen her craft and learn how to serve clients to her best ability. During the 7 years in which she lived in the big apple, she became a seasoned respected agent with top producer awards, was the guest speaker at seminars in the US and in her home country Brazil, including Connecta Imobi which is the largest real estate convention in Latin America.
                    </p>
                    
                    <p>
                      After cultivating a reputation for successfully selling several properties that had been listed for more than a year with other brokerages, and distinguishing herself as a trusted partner for residential and multifamily properties in downtown Manhattan and Brooklyn, she led coverage of a diverse range of properties. Now back in Miami, FL, she has come full circle, and is eager to use her versatile market knowledge to offer cutting-edge advice and service to clients in both Florida and New York. Dayanne is now a proud and key member of the Ben Moss Group, which sells on average $180M per year, and also a member of the Sports & Entertainment Division of Compass.
                    </p>
                    
                    <p>
                      Dayanne also conducts high-end real estate transactions, including office leases and sales, in London, Switzerland, and São Paulo, providing her clients with an international perspective and unparalleled service. She is known for her expertise in handling high-end real estate and international business.
                    </p>
                    
                    <p>
                      Dayanne is a Licensed Real Estate Salesperson in New York and Florida, a Certified Negotiation Expert by the Real Estate Board of New York, and holds a BBA from Universidade Veiga de Almeida in Brazil. She is fluent in English, Portuguese, and Spanish. When not exploring the city's wonderful neighborhoods and properties, Dayanne can usually be found spending quality time with her family and dog, working out, kitesurfing, or enjoying just about any activity under the sun.
                    </p>
                  </div>
                  
                  <div className={styles.buttonWrapper}>
                    <Button 
                      variant="outline-dark" 
                      size="lg" 
                      className={styles.contactButton}
                      href="/contact"
                    >
                      Contact Dayanne
                    </Button>
                  </div>
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

export default About;
