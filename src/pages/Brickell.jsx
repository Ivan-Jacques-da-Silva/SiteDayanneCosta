
import React from 'react';
import PropertyListing from '../components/PropertyListing';

const Brickell = () => {
  const pageData = {
    title: "Brickell Condos & Apartments",
    subtitle: "Discover luxury living in Miami's financial district",
    description: "Brickell is Miami's vibrant financial and residential district, known for its stunning high-rise condominiums, world-class dining, and urban sophistication. Experience the best of city living with waterfront views and premium amenities.",
    searchFilters: {
      neighborhood: "Brickell",
      propertyType: "Condo"
    },
    heroImage: "/src/assets/img/slide1.jpeg"
  };

  return <PropertyListing {...pageData} />;
};

export default Brickell;
