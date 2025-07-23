import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyListing from '../components/PropertyListing';

const NewDevelopments = () => {
  // Filtros específicos para New Developments
  const customFilters = {
    cidade: '',
    bairro: '',
    ano: '',
    yearBuilt: true // Flag para mostrar ano de construção
  };

  return (
    <div>
      <Header />
      <PropertyListing
        apiEndpoint="http://localhost:5000/api/new-developments-dinamico"
        title="New Developments"
        breadcrumbPath="New Developments"
        filters={customFilters}
        placeholderImage="https://via.placeholder.com/400x300?text=New+Development"
      />
      <Footer />
    </div>
  );
};

export default NewDevelopments;