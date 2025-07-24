
import React from 'react';
import PropertyListing from '../components/PropertyListing';

const Edgewater = () => {
  const pageData = {
    title: "Edgewater Properties",
    subtitle: "Waterfront living with stunning bay views",
    description: "Edgewater offers a perfect blend of urban convenience and waterfront tranquility. This up-and-coming neighborhood features modern high-rises, bayfront parks, and easy access to downtown Miami and Miami Beach.",
    searchFilters: {
      neighborhood: "Edgewater",
      propertyType: "All"
    },
    heroImage: "/src/assets/img/slide2.jpeg"
  };

  return <PropertyListing {...pageData} />;
};

export default Edgewater;
