
import { useEffect, useRef, useState } from 'react';

const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef();

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) {
      // Se não há elemento, assume como visível para evitar travamento
      setIsVisible(true);
      return;
    }

    // Verificar se o elemento já está visível ao carregar
    const rect = currentElement.getBoundingClientRect();
    const isInitiallyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInitiallyVisible) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold,
        rootMargin: '50px 0px'
      }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return [elementRef, isVisible];
};

export default useScrollAnimation;
