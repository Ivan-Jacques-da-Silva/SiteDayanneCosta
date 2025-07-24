
import React from 'react';
import PropertyListing from '../components/PropertyListing';

const TheRoads = () => {
  const pageData = {
    title: "The Roads Properties",
    subtitle: "Exclusive residential enclave in the heart of Miami",
    description: "The Roads is an exclusive gated community featuring tree-lined streets, historic Mediterranean Revival architecture, and some of Miami's most prestigious homes. This quiet residential neighborhood offers privacy and elegance.",
    searchFilters: {
      neighborhood: "The Roads",
      propertyType: "Single Family Home"
    },
    heroImage: "/src/assets/img/luxury-condos.jpeg"
  };

  return <PropertyListing {...pageData} />;
};

export default TheRoads;
