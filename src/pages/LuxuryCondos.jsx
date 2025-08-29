
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyListing from '../components/PropertyListing';

const LuxuryCondos = () => {
  const pageData = {
    title: "Luxury Condos in Miami",
    subtitle: "Sophisticated Urban Living",
    description: "Discover Miami's most prestigious luxury condominiums featuring world-class amenities and breathtaking views.",
    searchParams: {
      property_type: "Luxury Condo",
      city: "Miami",
      state: "FL"
    },
    heroImage: "/src/assets/img/luxury-condos.jpeg",
    sections: [
      {
        title: "Luxury Condominium Living",
        subtitle: "Premium High-Rise Properties",
        content: "Experience the epitome of luxury living in Miami's most exclusive condominium towers, featuring stunning ocean and city views."
      },
      {
        title: "Luxury Condo Features",
        subtitle: "World-Class Amenities",
        features: [
          "Floor-to-ceiling windows with panoramic views",
          "Premium finishes and appliances",
          "Concierge and doorman services",
          "Rooftop pools and sky lounges",
          "State-of-the-art fitness centers",
          "Spa and wellness facilities",
          "Private elevators and foyers",
          "Valet parking services"
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
        breadcrumbPath="Luxury Condos"
        filters={{ category: 'LUXURY_CONDOS' }}
        placeholderImage="/src/assets/img/luxury-condos.jpeg"
        pageData={pageData}
      />
      <Footer />
    </div>
  );
};

export default LuxuryCondos;
