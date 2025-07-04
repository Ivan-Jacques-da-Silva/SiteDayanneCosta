import React, { useState, useEffect } from 'react';

const DevelopmentCarousel = ({ developments = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;

  useEffect(() => {
    if (developments.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.ceil(developments.length / itemsPerSlide) - 1;
        return prevIndex === maxIndex ? 0 : prevIndex + 1;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [developments.length]);

  if (developments.length === 0) return null;

  const startIndex = currentIndex * itemsPerSlide;
  const visibleDevelopments = developments.slice(startIndex, startIndex + itemsPerSlide);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: window.innerWidth <= 768 ? (window.innerWidth <= 480 ? '1fr' : 'repeat(2, 1fr)') : 'repeat(3, 1fr)', 
        gap: window.innerWidth <= 480 ? '20px' : '30px', 
        marginBottom: '40px' 
      }}>
        {visibleDevelopments.map((item, index) => (
          <div key={startIndex + index} style={{ position: 'relative', overflow: 'hidden' }}>
            <a href={item.link} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ 
                position: 'relative', 
                overflow: 'hidden', 
                height: window.innerWidth <= 768 ? (window.innerWidth <= 480 ? '200px' : '220px') : '250px' 
              }}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  padding: '20px',
                  color: '#fff'
                }}>
                  <p style={{ margin: 0, fontSize: '14px', marginBottom: '5px' }}>View more</p>
                </div>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'normal', marginTop: '15px', color: '#fff' }}>
                {item.name}
              </h3>
            </a>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        {Array.from({ length: Math.ceil(developments.length / itemsPerSlide) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '8px',
              height: '8px',
              minWidth: '8px',
              minHeight: '8px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: currentIndex === index ? '#fff' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: '0',
              outline: 'none'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DevelopmentCarousel;