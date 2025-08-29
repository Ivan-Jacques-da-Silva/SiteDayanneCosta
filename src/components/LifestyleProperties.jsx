
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './LifestyleProperties.module.css';
import useScrollAnimation from '../hooks/useScrollAnimation';
import img1 from '../assets/img/waterfront-homes.jpeg';
import img2 from '../assets/img/boat-docks.jpeg';
import img3 from '../assets/img/golf-course.jpeg';
import img4 from '../assets/img/luxury-condos.jpeg';

const LifestyleProperties = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [cardsRef, cardsVisible] = useScrollAnimation();
  const [propertyCounts, setPropertyCounts] = useState({
    waterfront: 0,
    boatDocks: 0,
    golfCourse: 0,
    luxuryCondos: 0
  });

  const categories = [
    { 
      key: 'waterfront',
      title: 'Waterfront Homes', 
      image: img1,
      filter: 'waterfront',
      description: 'Luxury waterfront properties'
    },
    { 
      key: 'boatDocks',
      title: 'Boat Docks', 
      image: img2,
      filter: 'boat_docks',
      description: 'Properties with boat access'
    },
    { 
      key: 'golfCourse',
      title: 'Golf Course', 
      image: img3,
      filter: 'golf_course',
      description: 'Golf course communities'
    },
    { 
      key: 'luxuryCondos',
      title: 'Luxury Condos', 
      image: img4,
      filter: 'luxury_condos',
      description: 'Premium condominium living'
    },
  ];

  useEffect(() => {
    fetchPropertyCounts();
  }, []);

  const fetchPropertyCounts = async () => {
    try {
      const response = await fetch('http://0.0.0.0:5000/api/properties-by-category?category=LIFESTYLE_PROPERTIES');
      if (response.ok) {
        const data = await response.json();
        const properties = data.properties || [];
        
        // Count properties by filter type
        const counts = {
          waterfront: properties.filter(p => p.waterfront === true).length,
          boatDocks: properties.filter(p => p.waterfront === true && p.waterfrontDescription?.toLowerCase().includes('dock')).length,
          golfCourse: properties.filter(p => 
            p.amenities?.toLowerCase().includes('golf') || 
            p.description?.toLowerCase().includes('golf')
          ).length,
          luxuryCondos: properties.filter(p => 
            p.propertyType === 'LUXURY_CONDO' || 
            p.propertyType === 'CONDO'
          ).length
        };
        
        setPropertyCounts(counts);
      }
    } catch (error) {
      console.error('Error fetching property counts:', error);
    }
  };

  return (
    <section className="py-5">
      <Container>
        <Row 
          ref={titleRef}
          className={`mb-4 text-center animate-on-scroll ${titleVisible ? 'fade-in-up' : ''}`}
        >
          <Col>
            <small className="text-muted text-uppercase">Browse</small>
            <h2 className="fw-bold text-uppercase">Lifestyle Properties</h2>
          </Col>
        </Row>

        <Row 
          ref={cardsRef}
          className={`g-4 animate-on-scroll ${cardsVisible ? 'fade-in-up delay-200' : ''}`}
        >
          {categories.map((item, index) => (
            <Col 
              key={index} 
              xs={12} 
              sm={6} 
              lg={6}
              className={`animate-on-scroll ${cardsVisible ? `fade-in-up delay-${300 + (index * 100)}` : ''}`}
            >
              <Link 
                to={`/lifestyle-properties?filter=${item.filter}`} 
                className="text-decoration-none"
                style={{ display: 'block' }}
              >
                <div className="overflow-hidden position-relative group" style={{ cursor: 'pointer' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-100"
                    style={{ 
                      height: '300px', 
                      objectFit: 'cover', 
                      transition: 'transform 0.4s ease',
                      borderRadius: '8px'
                    }}
                  />
                  
                  {/* Overlay with property count */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(59, 130, 246, 0.9)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {propertyCounts[item.key] || 0} properties
                  </div>

                  {/* Hover overlay */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                    opacity: '0',
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '20px',
                    borderRadius: '8px'
                  }}
                  className="hover-overlay"
                  >
                    <div style={{ color: 'white' }}>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px', opacity: '0.9' }}>
                        {item.description}
                      </p>
                      <span style={{ 
                        fontSize: '12px', 
                        background: 'rgba(255,255,255,0.2)',
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}>
                        View Properties →
                      </span>
                    </div>
                  </div>

                  <div className="text-center mt-3">
                    <p className="fw-semibold mb-0 fs-5 text-dark">{item.title}</p>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx>{`
        .group:hover .hover-overlay {
          opacity: 1 !important;
        }
        .group:hover img {
          transform: scale(1.05) !important;
        }
      `}</style>
    </section>
  );
};

export default LifestyleProperties;
