
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyListing from '../components/PropertyListing';

const SingleFamilyHomes = () => {
  // Filtros específicos para Single Family Homes
  const customFilters = {
    cidade: '', // Adiciona filtro de cidade
    propertyType: 'single-family' // Tipo específico da propriedade
  };

  return (
    <div>
      <Header />
      <PropertyListing
        apiEndpoint="http://localhost:5000/api/single-family-homes"
        title="Single Family Homes"
        breadcrumbPath="Single Family Homes"
        filters={customFilters}
        placeholderImage="https://via.placeholder.com/400x300?text=Single+Family+Home"
      />
      <Footer />
    </div>
  );
};

export default SingleFamilyHomes;
