
import React from 'react';
import PropertyListing from '../components/PropertyListing';

const Neighborhoods = () => {
  const pageData = {
    title: "Miami Neighborhoods",
    subtitle: "Explore Miami's diverse communities",
    description: "Discover the unique character of Miami's neighborhoods, from the urban sophistication of Brickell to the historic charm of Coconut Grove. Find the perfect community that matches your lifestyle.",
    searchFilters: {},
    heroImage: "/src/assets/img/slide1.jpeg"
  };

  return <PropertyListing {...pageData} />;
};

export default Neighborhoods;
