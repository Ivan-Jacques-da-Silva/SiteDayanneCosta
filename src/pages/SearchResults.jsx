
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyListing from '../components/PropertyListing';
import styles from './SearchResults.module.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    // Extrair parâmetros de busca
    const filters = {};
    const search = searchParams.get('search');
    
    if (search) {
      setSearchTerm(search);
    }
    
    // Converter parâmetros para formato do PropertyListing
    if (searchParams.get('propertyType')) {
      filters.propertyType = searchParams.get('propertyType');
    }
    
    if (searchParams.get('minPrice')) {
      filters.minPrice = parseInt(searchParams.get('minPrice'));
    }
    
    if (searchParams.get('maxPrice')) {
      filters.maxPrice = parseInt(searchParams.get('maxPrice'));
    }
    
    if (searchParams.get('bedrooms')) {
      filters.bedrooms = searchParams.get('bedrooms');
    }

    // Definir filtros de pesquisa customizados
    setSearchFilters({
      ...filters,
      search: search || '',
    });
  }, [location.search]);

  const handleBackToHome = () => {
    navigate('/');
  };

  const getSearchSummary = () => {
    const parts = [];
    
    if (searchTerm) {
      parts.push(`"${searchTerm}"`);
    }
    
    if (searchFilters.propertyType) {
      parts.push(searchFilters.propertyType.replace('_', ' '));
    }
    
    if (searchFilters.minPrice || searchFilters.maxPrice) {
      if (searchFilters.minPrice && searchFilters.maxPrice) {
        parts.push(`$${(searchFilters.minPrice / 1000000).toFixed(1)}M - $${(searchFilters.maxPrice / 1000000).toFixed(1)}M`);
      } else if (searchFilters.minPrice) {
        parts.push(`Over $${(searchFilters.minPrice / 1000000).toFixed(1)}M`);
      } else if (searchFilters.maxPrice) {
        parts.push(`Under $${(searchFilters.maxPrice / 1000000).toFixed(1)}M`);
      }
    }
    
    if (searchFilters.bedrooms) {
      parts.push(`${searchFilters.bedrooms}+ Bedrooms`);
    }
    
    return parts.length > 0 ? parts.join(' • ') : 'All Properties';
  };

  return (
    <div className="ip ip-theme-compass">
      <Header />
      
      <main className={styles.searchResults}>
        {/* Header da pesquisa */}
        <section className={styles.searchHeader}>
          <div className={styles.container}>
            <div className={styles.searchInfo}>
              <button 
                onClick={handleBackToHome}
                className={styles.backButton}
              >
                <i className="fas fa-arrow-left"></i>
                Back to Home
              </button>
              
              <h1 className={styles.searchTitle}>
                Search Results
              </h1>
              
              <p className={styles.searchSummary}>
                Showing properties for: {getSearchSummary()}
              </p>
            </div>
          </div>
        </section>

        {/* Resultados usando PropertyListing */}
        <PropertyListing
          apiEndpoint="/api/properties"
          title="Search Results"
          breadcrumbPath={`Search • ${getSearchSummary()}`}
          filters={searchFilters}
          showCategoryFilter={true}
          showNeighborhoodFilter={true}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
