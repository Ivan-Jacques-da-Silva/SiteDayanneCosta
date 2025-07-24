import React from 'react';
import PropertyListing from '../components/PropertyListing';

const CoconutGrove = () => {
  const pageData = {
    title: "Coconut Grove Properties",
    subtitle: "Historic charm meets modern luxury",
    description: "Experience the bohemian spirit of Coconut Grove, Miami's oldest neighborhood. From historic estates to contemporary condos, discover properties surrounded by lush landscapes and cultural attractions.",
    apiEndpoint: "http://localhost:5000/api/coconut-grove",
    searchFilters: {
      neighborhood: "Coconut Grove"
    },
    heroImage: "/src/assets/img/slide3.jpeg"
  };

  return <PropertyListing {...pageData} />;
};

export default CoconutGrove;