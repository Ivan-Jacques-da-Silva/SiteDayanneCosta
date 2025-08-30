
import { useEffect, useRef, useState } from 'react';

const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef();

  useEffect(() => {
    // Verificar se o elemento já está visível ao carregar
    const currentElement = elementRef.current;
    if (currentElement) {
      const rect = currentElement.getBoundingClientRect();
      const isInitiallyVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInitiallyVisible) {
        setIsVisible(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Uma vez visível, para de observar para evitar re-animações
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return [elementRef, isVisible];
};

export default useScrollAnimation;
