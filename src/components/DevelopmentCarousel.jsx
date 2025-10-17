import React, { useState, useEffect } from 'react';

const DevelopmentCarousel = ({ developments = [], onPropertyClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play do carrossel - mostra 3 imagens por vez, passando uma por uma
  useEffect(() => {
    if (developments.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Loop contínuo - quando chega ao final, volta ao início
        return prevIndex === developments.length - 1 ? 0 : prevIndex + 1;
      });
    }, 3000); // Mudança a cada 3 segundos

    return () => clearInterval(timer);
  }, [developments.length]);

  if (developments.length === 0) return null;

  // Função para obter as imagens visíveis (com loop infinito)
  const getVisibleDevelopments = () => {
    if (isMobile) {
      // No mobile, mostra apenas 1 imagem
      return [developments[currentIndex]];
    } else {
      // No desktop, mostra 3 imagens
      const visible = [];
      for (let i = 0; i < 3; i++) {
        const index = (currentIndex + i) % developments.length;
        visible.push(developments[index]);
      }
      return visible;
    }
  };

  const visibleDevelopments = getVisibleDevelopments();

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
      prevIndex === 0 ? developments.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === developments.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '0 60px' }}>
      {/* Navigation Arrows */}
      {developments.length > 1 && (
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

      {/* Carrossel Content - Responsivo: 1 coluna no mobile, 3 no desktop */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        gap: isMobile ? '0' : '20px',
        marginBottom: '40px',
        flexWrap: 'nowrap',
        width: '100%'
      }}>
        {visibleDevelopments.map((development, index) => (
          <div 
            key={`${development.id}-${currentIndex}-${index}`} 
            style={{ 
              position: 'relative', 
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              minWidth: isMobile ? '100%' : '250px',
              width: isMobile ? '100%' : '100%',
              flex: isMobile ? '0 0 100%' : '1 1 0'
            }}
            onClick={(e) => handlePropertyClick(development.id, e)}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div>
              <div style={{ 
                position: 'relative', 
                overflow: 'hidden', 
                height: '250px',
                borderRadius: '0px'
              }}>
                <img 
                  src={development.image} 
                  alt={development.name}
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
              </div>
              <div style={{
                padding: '15px 0',
                color: '#fff',
                textAlign: 'center'
              }}>
                <h6 style={{ 
                  margin: 0, 
                  fontSize: '16px', 
                  fontWeight: 'normal',
                  lineHeight: '1.3'
                }}>
                  {development.name}
                </h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      {developments.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          {developments.map((_, index) => (
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