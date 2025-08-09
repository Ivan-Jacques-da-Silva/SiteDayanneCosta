
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyListing from '../components/PropertyListing';

const SingleFamilyHomes = () => {
  const pageData = {
    title: "Single Family Homes in Miami",
    subtitle: "Discover Your Dream Home",
    description: "Explore our exclusive collection of single family homes in Miami's most prestigious neighborhoods.",
    searchParams: {
      property_type: "Single Family Home",
      city: "Miami",
      state: "FL"
    },
    heroImage: "/src/assets/img/waterfront-homes.jpeg",
    sections: [
      {
        title: "Luxury Single Family Homes",
        subtitle: "Premium Properties in Prime Locations",
        content: "From waterfront estates to gated community homes, find the perfect single family residence that matches your lifestyle and investment goals."
      },
      {
        title: "Why Choose Single Family Homes?",
        subtitle: "Benefits of Homeownership",
        features: [
          "Complete privacy and independence",
          "Your own yard and outdoor space",
          "No HOA restrictions in many areas",
          "Potential for customization and expansion",
          "Strong investment potential",
          "Family-friendly neighborhoods"
        ]
      }
    ]
  };

  return (
    <div>
      <Header />
      <PropertyListing 
        title={pageData.title}
        breadcrumbPath="Single Family Homes"
        filters={{ cidade: '', min: '' }}
        placeholderImage="/src/assets/img/waterfront-homes.jpeg"
        pageData={pageData}
      />
      <Footer />
    </div>
  );
};

export default SingleFamilyHomes;
