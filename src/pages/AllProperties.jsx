
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyListing from '../components/PropertyListing';

const AllProperties = () => {
  const pageData = {
    title: "All Properties",
    subtitle: "Explore Our Complete Collection",
    description: "Browse our entire portfolio of premium properties in Miami's most desirable locations.",
    searchParams: {
      city: "Miami",
      state: "FL"
    },
    heroImage: "/src/assets/img/testesImagens.jpeg",
    sections: [
      {
        title: "Complete Property Portfolio", 
        subtitle: "Find Your Perfect Match",
        content: "Discover our comprehensive collection of luxury condos, single-family homes, new developments, and neighborhood properties across Miami."
      },
      {
        title: "Property Types Available",
        subtitle: "Diverse Options for Every Lifestyle",
        features: [
          "Luxury Condominiums with premium amenities",
          "Single Family Homes in prestigious neighborhoods",
          "New Development projects with modern features",
          "Waterfront properties with stunning views",
          "Historic homes with unique character",
          "Investment opportunities in prime locations",
          "Penthouses with exclusive access",
          "Townhomes perfect for families"
        ]
      }
    ]
  };

  return (
    <div>
      <Header />
      <PropertyListing 
        apiEndpoint="/api/properties"
        title={pageData.title}
        breadcrumbPath="All Properties"
        filters={{}}
        placeholderImage="/src/assets/img/testesImagens.jpeg"
        pageData={pageData}
      />
      <Footer />
    </div>
  );
};

export default AllProperties;
