
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyListing from '../components/PropertyListing';

const CoconutGrove = () => {
  const pageData = {
    title: "Coconut Grove Real Estate",
    subtitle: "Miami's Bohemian Paradise",
    description: "Experience the charm of Coconut Grove, Miami's oldest neighborhood, known for its lush landscapes, artistic culture, and waterfront beauty.",
    searchParams: {
      neighborhood: "Coconut Grove",
      city: "Miami",
      state: "FL"
    },
    heroImage: "/src/assets/img/slide3.jpeg",
    sections: [
      {
        title: "Coconut Grove Lifestyle",
        subtitle: "Art, Nature, and Culture",
        content: "Coconut Grove combines historic charm with modern luxury. From tree-lined streets to waterfront estates, experience Miami's most artistic neighborhood."
      },
      {
        title: "Grove Attractions",
        subtitle: "What Makes The Grove Special",
        features: [
          "CocoWalk outdoor shopping and dining",
          "Vizcaya Museum and Gardens",
          "Peacock Park and waterfront access",
          "Grove Isle private island living",
          "Art galleries and cultural events",
          "Sailing club and marina access",
          "Historic architecture and charm",
          "Farmer's market and local events"
        ]
      }
    ]
  };

  return (
    <div>
      <Header />
      <PropertyListing 
        apiEndpoint="/api/properties-by-category"
        title={pageData.title}
        breadcrumbPath="Coconut Grove"
        filters={{ category: 'NEIGHBORHOODS', bairro: 'COCONUT_GROVE' }}
        placeholderImage={pageData.heroImage}
        pageData={pageData}
      />
      <Footer />
    </div>
  );
};

export default CoconutGrove;
