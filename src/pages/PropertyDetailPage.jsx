
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyDetail from '../components/PropertyDetail';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const propertyData = location.state?.property;

  return (
    <div>
      <Header />
      <PropertyDetail 
        propertyId={id}
        propertyData={propertyData}
      />
      <Footer />
    </div>
  );
};

export default PropertyDetailPage;
