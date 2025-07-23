import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyListing from '../components/PropertyListing';

const BrickellCondos = () => {
  // Filtros específicos para Brickell Condos
  const customFilters = {
    bedrooms: '',
    bathrooms: '',
    condominiums: ''
  };

  return (
    <div>
      <Header />
      <PropertyListing
        apiEndpoint="http://localhost:5000/api/brickell-condos-1m"
        title="Brickell Condos +1M"
        breadcrumbPath="Brickell Condos +1M"
        filters={customFilters}
        placeholderImage="https://via.placeholder.com/400x300?text=Luxury+Condo"
      />
      <Footer />
    </div>
  );
};

export default BrickellCondos;