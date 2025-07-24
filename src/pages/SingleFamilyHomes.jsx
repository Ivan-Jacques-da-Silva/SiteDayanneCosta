
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
import React from 'react';
import PropertyListing from '../components/PropertyListing';

const SingleFamilyHomes = () => {
  const pageData = {
    title: "Single Family Homes in Miami",
    subtitle: "Find your dream home in Miami's finest neighborhoods",
    description: "Explore Miami's most desirable single family homes, from waterfront estates to historic properties. Discover spacious living, private pools, and the ultimate in luxury residential living.",
    searchFilters: {
      propertyType: "Single Family Home"
    },
    heroImage: "/src/assets/img/waterfront-homes.jpeg"
  };

  return <PropertyListing {...pageData} />;
};

export default SingleFamilyHomes;
