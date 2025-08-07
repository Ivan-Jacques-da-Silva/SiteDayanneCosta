import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyListing from '../components/PropertyListing';

const NewDevelopments = () => {
  const pageData = {
    title: "New Developments in Miami",
    subtitle: "Modern Living Redefined",
    description: "Discover Miami's newest luxury developments featuring state-of-the-art amenities and contemporary design.",
    searchParams: {
      city: "Miami",
      state: "FL",
      min_price: 500000,
      year_built: 2015
    },
    heroImage: "/src/assets/img/slide1.jpeg",
    sections: [
      {
        title: "Latest Developments",
        subtitle: "Modern Luxury Living",
        content: "Explore Miami's newest residential developments featuring cutting-edge design, premium amenities, and prime locations throughout the city."
      },
      {
        title: "New Development Features",
        subtitle: "Contemporary Amenities",
        features: [
          "State-of-the-art fitness centers",
          "Rooftop pools and sky lounges",
          "Smart home technology",
          "Concierge and valet services",
          "Modern architectural design",
          "Energy-efficient systems",
          "Premium finishes and appliances",
          "Resort-style amenities"
        ]
      }
    ]
  };

  // Custom filters for New Developments
  const customFilters = {
    cidade: '',
    bairro: '',
    ano: '',
    min: '',
    yearBuilt: true, // Flag to show year built in table
    categoryName: 'New Developments' // Filter by category
  };

  return (
    <div>
      <Header />
      <PropertyListing
        apiEndpoint="http://0.0.0.0:5000/api/properties-by-category"
        title="New Developments"
        breadcrumbPath="New Developments"
        filters={customFilters}
        placeholderImage="https://via.placeholder.com/400x300?text=New+Development"
        pageData={pageData}
      />
      <Footer />
    </div>
  );
};

export default NewDevelopments;