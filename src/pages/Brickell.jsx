
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyListing from '../components/PropertyListing';

const Brickell = () => {
  const pageData = {
    title: "Brickell Real Estate",
    subtitle: "Miami's Financial District",
    description: "Discover luxury living in Brickell, Miami's prestigious financial district known for its stunning skyline and upscale lifestyle.",
    searchParams: {
      neighborhood: "Brickell",
      city: "Miami",
      state: "FL"
    },
    heroImage: "/src/assets/img/slide1.jpeg",
    sections: [
      {
        title: "Live in Brickell",
        subtitle: "Miami's Manhattan",
        content: "Brickell offers an urban lifestyle with luxury high-rise condos, fine dining, and proximity to downtown Miami. Experience city living at its finest."
      },
      {
        title: "Brickell Neighborhood Highlights",
        subtitle: "What Makes Brickell Special",
        features: [
          "Walking distance to financial district",
          "Brickell City Centre shopping and dining",
          "Mary Brickell Village entertainment",
          "Metromover and Metrorail access",
          "Biscayne Bay waterfront",
          "High-end restaurants and nightlife",
          "Luxury spa and wellness centers",
          "Cultural attractions nearby"
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

export default Brickell;
