import React, { useState, useEffect } from 'react';

const DevelopmentCarousel = ({ developments = [], onPropertyClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  // Responsividade
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth <= 480) {
        setItemsPerSlide(1);
      } else if (window.innerWidth <= 768) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);

    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  // Auto-play do carrossel
  useEffect(() => {
    if (developments.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.ceil(developments.length / itemsPerSlide) - 1;
        return prevIndex === maxIndex ? 0 : prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [developments.length, itemsPerSlide]);

  if (developments.length === 0) return null;

  const startIndex = currentIndex * itemsPerSlide;
  const visibleDevelopments = developments.slice(startIndex, startIndex + itemsPerSlide);
  const totalSlides = Math.ceil(developments.length / itemsPerSlide);

  const formatPrice = (price) => {
    if (!price) return 'Contact for Price';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePropertyClick = (propertyId, e) => {
    e.preventDefault();
    if (onPropertyClick) {
      onPropertyClick(propertyId);
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '0 60px' }}>
      {/* Navigation Arrows */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={goToPrevious}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '45px',
              height: '45px',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: '#000',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 1)';
              e.target.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
              e.target.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            ‹
          </button>
          <button
            onClick={goToNext}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '45px',
              height: '45px',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: '#000',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 1)';
              e.target.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
              e.target.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            ›
          </button>
        </>
      )}

      {/* Carrossel Content */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: window.innerWidth <= 480 ? '1fr' : 
                            window.innerWidth <= 768 ? 'repeat(2, 1fr)' : 
                            'repeat(3, 1fr)', 
        gap: window.innerWidth <= 480 ? '20px' : '30px', 
        marginBottom: '40px',
        margin: '0 auto'
      }}>
        {visibleDevelopments.map((item, index) => (
          <div 
            key={item.id || startIndex + index} 
            style={{ 
              position: 'relative', 
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onClick={(e) => handlePropertyClick(item.id, e)}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ 
              position: 'relative', 
              overflow: 'hidden', 
              height: window.innerWidth <= 768 ? (window.innerWidth <= 480 ? '200px' : '220px') : '250px',
              borderRadius: '8px'
            }}>
              <img 
                src={item.image} 
                alt={item.name}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                onError={(e) => {
                  e.target.src = '/default.png';
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                padding: '20px',
                color: '#fff'
              }}>
                <h6 style={{ 
                  margin: 0, 
                  fontSize: '16px', 
                  fontWeight: '600',
                  marginBottom: '8px',
                  lineHeight: '1.3'
                }}>
                  {item.name}
                </h6>
                <p style={{ 
                  margin: 0, 
                  fontSize: '18px', 
                  fontWeight: 'bold',
                  marginBottom: '4px'
                }}>
                  {formatPrice(item.price)}
                </p>
                {item.bedrooms && item.bathrooms && (
                  <p style={{ 
                    margin: 0, 
                    fontSize: '12px', 
                    opacity: 0.9,
                    marginBottom: '4px'
                  }}>
                    {item.bedrooms} Bed • {item.bathrooms} Bath
                    {item.sqft && ` • ${item.sqft.toLocaleString()} Sq.Ft.`}
                  </p>
                )}
                <p style={{ 
                  margin: 0, 
                  fontSize: '12px', 
                  opacity: 0.8 
                }}>
                  {item.address}, {item.city}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      {totalSlides > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
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
      )}
    </div>
  );
};

export default DevelopmentCarousel;