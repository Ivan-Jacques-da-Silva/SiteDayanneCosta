
import React from 'react';
import PropertyListing from '../components/PropertyListing';

const LuxuryCondos = () => {
  const pageData = {
    title: "Luxury Condos in Miami",
    subtitle: "Experience elevated living with premium amenities",
    description: "Discover Miami's most exclusive luxury condominiums featuring world-class amenities, stunning views, and sophisticated design. From Brickell to Miami Beach, find your perfect high-rise home.",
    searchFilters: {
      propertyType: "Luxury Condo"
    },
    heroImage: "/src/assets/img/luxury-condos.jpeg"
  };

  return <PropertyListing {...pageData} />;
};

export default LuxuryCondos;
