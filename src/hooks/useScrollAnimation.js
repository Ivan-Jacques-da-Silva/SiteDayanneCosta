
import { useEffect, useRef, useState } from 'react';

const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef();

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    // Verificar se o elemento já está visível ao carregar
    const rect = currentElement.getBoundingClientRect();
    const isInitiallyVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
    
    if (isInitiallyVisible) {
      // Pequeno delay para garantir que a animação seja visível
      setTimeout(() => setIsVisible(true), 100);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Uma vez visível, para de observar para evitar re-animações
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold,
        rootMargin: '-50px 0px' // Trigger animation a bit before element is fully visible
      }
    );

    observer.observe(currentElement);

    return () => {
      observer.unobserve(currentElement);
    };
  }, [threshold]);

  return [elementRef, isVisible];
};

export default useScrollAnimation;
