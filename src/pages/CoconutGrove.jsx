
import React from 'react';
import PropertyListing from '../components/PropertyListing';

const CoconutGrove = () => {
  const pageData = {
    title: "Coconut Grove Real Estate",
    subtitle: "Historic charm meets modern luxury",
    description: "Coconut Grove is Miami's oldest continuously inhabited neighborhood, offering a unique blend of historic charm, lush greenery, and waterfront living. Known for its bohemian atmosphere, boutique shopping, and sailing culture.",
    searchFilters: {
      neighborhood: "Coconut Grove",
      propertyType: "All"
    },
    heroImage: "/src/assets/img/slide3.jpeg"
  };

  return <PropertyListing {...pageData} />;
};

export default CoconutGrove;
