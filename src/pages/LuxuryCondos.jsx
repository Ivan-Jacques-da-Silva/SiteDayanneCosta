import React from 'react';
import PropertyListing from '../components/PropertyListing';

const LuxuryCondos = () => {
  const pageData = {
    title: "Luxury Condos in Miami",
    subtitle: "Experience the pinnacle of urban living",
    description: "Discover Miami's most prestigious luxury condominiums. From penthouse suites with panoramic ocean views to sophisticated high-rise living with world-class amenities, find your perfect luxury home in the sky.",
    apiEndpoint: "http://localhost:5000/api/luxury-condos",
    searchFilters: {
      propertyType: "Luxury Condo"
    },
    heroImage: "/src/assets/img/luxury-condos.jpeg"
  };

  return <PropertyListing {...pageData} />;
};

export default LuxuryCondos;