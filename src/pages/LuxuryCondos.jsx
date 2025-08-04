
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyListing from '../components/PropertyListing';

const LuxuryCondos = () => {
  const pageData = {
    title: "Luxury Condos in Miami",
    subtitle: "High-End Condominium Living",
    description: "Experience the finest in luxury condominium living with breathtaking views, premium amenities, and prime locations.",
    searchParams: {
      property_type: "Condo",
      city: "Miami",
      state: "FL",
      min_price: 1000000
    },
    heroImage: "/src/assets/img/luxury-condos.jpeg",
    sections: [
      {
        title: "Premium Luxury Condominiums",
        subtitle: "Elevated Living Standards",
        content: "Our luxury condos feature floor-to-ceiling windows, premium finishes, and world-class amenities including spas, fitness centers, and concierge services."
      },
      {
        title: "Luxury Condo Amenities",
        subtitle: "World-Class Features",
        features: [
          "24/7 concierge and security",
          "Resort-style pools and spas",
          "State-of-the-art fitness centers",
          "Private beach access",
          "Valet parking services",
          "Rooftop terraces with city views",
          "Wine cellars and tasting rooms",
          "Private dining rooms"
        ]
      }
    ]
  };

  return (
    <div>
      <Header />
      <PropertyListing 
        apiEndpoint="http://localhost:5000/api/luxury-condos"
        title={pageData.title}
        breadcrumbPath="Luxury Condos"
        filters={{ min: '' }}
        placeholderImage="/src/assets/img/luxury-condos.jpeg"
        pageData={pageData}
      />
      <Footer />
    </div>
  );
};

export default LuxuryCondos;
