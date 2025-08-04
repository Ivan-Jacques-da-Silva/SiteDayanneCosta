
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyListing from '../components/PropertyListing';

const Neighborhoods = () => {
  const pageData = {
    title: "Miami Neighborhoods",
    subtitle: "Explore Miami's Premier Areas",
    description: "Discover Miami's most desirable neighborhoods, each offering unique character, amenities, and lifestyle opportunities.",
    searchParams: {
      city: "Miami",
      state: "FL"
    },
    heroImage: "/src/assets/img/testesImagens.jpeg",
    sections: [
      {
        title: "Premium Miami Neighborhoods", 
        subtitle: "Find Your Perfect Location",
        content: "From the financial district of Brickell to the artistic charm of Coconut Grove, Miami offers diverse neighborhoods to match every lifestyle and preference."
      },
      {
        title: "Neighborhood Highlights",
        subtitle: "Popular Areas to Consider",
        features: [
          "Brickell - Financial district with high-rise living",
          "Edgewater - Bayfront properties and water access",
          "Coconut Grove - Historic charm and cultural scene",
          "The Roads - Mediterranean architecture and elegance",
          "South Beach - Iconic beach lifestyle",
          "Coral Gables - Mediterranean Revival beauty",
          "Design District - Art and luxury shopping",
          "Wynwood - Vibrant arts and culture hub"
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
        breadcrumbPath="Neighborhoods"
        filters={pageData.searchParams}
        placeholderImage="/src/assets/img/testesImagens.jpeg"
      />
      <Footer />
    </div>
  );
};

export default Neighborhoods;
