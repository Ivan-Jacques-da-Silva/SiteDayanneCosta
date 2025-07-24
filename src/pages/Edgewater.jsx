import React from 'react';
import PropertyListing from '../components/PropertyListing';

const Edgewater = () => {
  const pageData = {
    title: "Edgewater Properties",
    subtitle: "Waterfront living with urban convenience",
    description: "Discover Edgewater's unique blend of bayfront luxury and city accessibility. This emerging neighborhood offers stunning water views, modern developments, and easy access to Miami's best attractions.",
    apiEndpoint: "http://localhost:5000/api/edgewater",
    searchFilters: {
      neighborhood: "Edgewater"
    },
    heroImage: "/src/assets/img/slide2.jpeg"
  };

  return <PropertyListing {...pageData} />;
};

export default Edgewater;