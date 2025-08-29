
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyListing from '../components/PropertyListing';

const Edgewater = () => {
  const pageData = {
    title: "Edgewater Real Estate",
    subtitle: "Bayfront Living",
    description: "Explore Edgewater's waterfront properties with stunning bay views and a perfect blend of urban convenience and natural beauty.",
    searchParams: {
      neighborhood: "Edgewater",
      city: "Miami",
      state: "FL"
    },
    heroImage: "/src/assets/img/slide2.jpeg",
    sections: [
      {
        title: "Edgewater Living",
        subtitle: "Where Bay Meets City",
        content: "Edgewater offers magnificent bayfront living with easy access to downtown Miami, Design District, and Wynwood. Perfect for those seeking waterfront luxury."
      },
      {
        title: "Edgewater Amenities",
        subtitle: "Waterfront Lifestyle Benefits",
        features: [
          "Direct access to Biscayne Bay",
          "Margaret Pace Park waterfront recreation",
          "Close to Design District shopping",
          "Easy access to Miami Beach",
          "Bayside Marketplace nearby",
          "Marina and yacht club access",
          "Waterfront dining options",
          "Scenic jogging and biking paths"
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
        breadcrumbPath="Edgewater"
        filters={{ category: 'NEIGHBORHOODS', bairro: 'EDGEWATER' }}
        placeholderImage={pageData.heroImage}
        pageData={pageData}
      />
      <Footer />
    </div>
  );
};

export default Edgewater;
