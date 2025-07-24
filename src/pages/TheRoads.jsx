
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyListing from '../components/PropertyListing';

const TheRoads = () => {
  const pageData = {
    title: "The Roads Real Estate",
    subtitle: "Historic Elegance",
    description: "Discover The Roads, one of Miami's most prestigious historic neighborhoods featuring Mediterranean Revival architecture and tree-lined streets.",
    searchParams: {
      neighborhood: "The Roads",
      city: "Miami",  
      state: "FL"
    },
    heroImage: "/src/assets/img/fundoImg.jpeg",
    sections: [
      {
        title: "The Roads Heritage",
        subtitle: "Historic Miami Living",
        content: "The Roads neighborhood offers historic homes with Mediterranean Revival architecture, mature landscaping, and a central location near downtown Miami and Coral Gables."
      },
      {
        title: "The Roads Features",
        subtitle: "Historic Neighborhood Benefits",
        features: [
          "Mediterranean Revival architecture",
          "Historic designation and character",
          "Mature oak trees and landscaping",
          "Close to downtown Miami",
          "Near Coral Gables and Coconut Grove",
          "Quiet residential streets",
          "Architectural diversity and charm",
          "Strong property values"
        ]
      }
    ]
  };

  return (
    <div>
      <Header />
      <PropertyListing pageData={pageData} />
      <Footer />
    </div>
  );
};

export default TheRoads;
