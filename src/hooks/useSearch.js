
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const performSearch = useCallback(async (searchParams) => {
    setIsLoading(true);
    setError(null);

    try {
      // Construir URL de busca
      const params = new URLSearchParams();
      
      if (searchParams.search) params.append('search', searchParams.search);
      if (searchParams.propertyType && searchParams.propertyType !== 'All') {
        params.append('propertyType', searchParams.propertyType);
      }
      if (searchParams.saleType && searchParams.saleType !== 'All') {
        params.append('saleType', searchParams.saleType);
      }
      if (searchParams.price && searchParams.price !== 'Any') {
        const priceRange = parsePriceRange(searchParams.price);
        if (priceRange.min) params.append('minPrice', priceRange.min);
        if (priceRange.max) params.append('maxPrice', priceRange.max);
      }
      if (searchParams.beds && searchParams.beds !== 'Any') {
        params.append('bedrooms', searchParams.beds);
      }
      if (searchParams.location) params.append('location', searchParams.location);

      // Navegar para página de resultados
      navigate(`/search-results?${params.toString()}`);
      
    } catch (err) {
      setError('Erro ao realizar busca. Tente novamente.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const parsePriceRange = (priceString) => {
    const ranges = {
      'Under $500K': { max: 500000 },
      '$500K - $1M': { min: 500000, max: 1000000 },
      '$1M - $2M': { min: 1000000, max: 2000000 },
      '$2M - $5M': { min: 2000000, max: 5000000 },
      'Over $5M': { min: 5000000 }
    };
    
    return ranges[priceString] || {};
  };

  return {
    performSearch,
    isLoading,
    error
  };
};

export default useSearch;
