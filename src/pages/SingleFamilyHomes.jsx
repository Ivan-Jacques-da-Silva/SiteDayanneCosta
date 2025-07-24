import React from 'react';
import PropertyListing from '../components/PropertyListing';

const SingleFamilyHomes = () => {
  const pageData = {
    title: "Single Family Homes in Miami",
    subtitle: "Find your dream home in Miami's finest neighborhoods",
    description: "Explore Miami's most desirable single family homes, from waterfront estates to historic properties. Discover spacious living, private pools, and the ultimate in luxury residential living.",
    apiEndpoint: "http://localhost:5000/api/single-family-homes",
    searchFilters: {
      propertyType: "Single Family Home"
    },
    heroImage: "/src/assets/img/waterfront-homes.jpeg"
  };

  return <PropertyListing {...pageData} />;
};

export default SingleFamilyHomes;