import React from 'react';
import PropertyListing from '../components/PropertyListing';

const TheRoads = () => {
  const pageData = {
    title: "The Roads Properties",
    subtitle: "Exclusive residential enclave",
    description: "Discover The Roads, an exclusive gated community offering privacy and luxury in the heart of Miami. Known for its tree-lined streets and elegant homes, this prestigious neighborhood provides the perfect blend of tranquility and urban access.",
    apiEndpoint: "http://localhost:5000/api/the-roads",
    searchFilters: {
      neighborhood: "The Roads"
    },
    heroImage: "/src/assets/img/fundoImg.jpeg"
  };

  return <PropertyListing {...pageData} />;
};

export default TheRoads;