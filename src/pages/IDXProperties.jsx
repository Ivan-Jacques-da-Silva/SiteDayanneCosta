import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyListing from '../components/PropertyListing';

const IDXProperties = () => {
  return (
    <div>
      <Header />
      <PropertyListing 
        apiEndpoint="/api/idx/properties"
        title="MLS Listings"
        breadcrumbPath="MLS Listings"
        showCategoryFilter={false}
        showNeighborhoodFilter={false}
      />
      <Footer />
    </div>
  );
};

export default IDXProperties;
