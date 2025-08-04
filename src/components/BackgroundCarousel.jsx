
import React, { useState, useEffect } from 'react';
import styles from './BackgroundCarousel.module.css';

const BackgroundCarousel = ({ images = [], interval = 5000, children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (!images || images.length === 0) return <div className={styles.carousel}>{children}</div>;

  return (
    <div className={styles.carousel}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`${styles.carouselSlide} ${
            index === currentIndex ? styles.active : ''
          }`}
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      ))}
      <div className={styles.overlay} />
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.indicators}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles.indicator} ${
              index === currentIndex ? styles.active : ''
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundCarousel;
