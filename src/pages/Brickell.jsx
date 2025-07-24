import React from 'react';
import PropertyListing from '../components/PropertyListing';

const Brickell = () => {
  const pageData = {
    title: "Brickell Properties",
    subtitle: "Discover luxury living in Miami's financial district",
    description: "Explore premium properties in Brickell, Miami's vibrant financial and cultural hub. From luxury condos with stunning bay views to modern penthouses, find your perfect home in this dynamic neighborhood.",
    apiEndpoint: "http://localhost:5000/api/brickell",
    searchFilters: {
      neighborhood: "Brickell"
    },
    heroImage: "/src/assets/img/slide1.jpeg"
  };

  return <PropertyListing {...pageData} />;
};

export default Brickell;