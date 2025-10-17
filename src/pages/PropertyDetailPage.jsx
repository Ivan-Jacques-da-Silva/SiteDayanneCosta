import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PropertyDetail from "../components/PropertyDetail";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  let propertyData = location.state?.property;

  // Adaptar dados da API IDX para o formato esperado
  if (propertyData && propertyData.isIDX) {
    propertyData = {
      ...propertyData,
      // Garantir que images é um array válido
      images:
        propertyData.images && Array.isArray(propertyData.images)
          ? propertyData.images.filter((img) => img && img.url)
          : [],
      // Converter valores booleanos para o formato esperado
      pool: propertyData.pool ? "yes" : "no",
      waterfront: propertyData.waterfront ? "yes" : "no",
      furnished: propertyData.furnished ? "yes" : "no",
      petFriendly: propertyData.petFriendly ? "yes" : "no",
      // Garantir que campos numéricos existem
      bedrooms: propertyData.bedrooms || 0,
      bathrooms: propertyData.bathrooms || 0,
      sqft: propertyData.sqft || 0,
      price: propertyData.price || 0,
    };
  }

  return (
    <div>
      <Header />
      <PropertyDetail propertyId={id} propertyData={propertyData} />
      <Footer />
    </div>
  );
};

export default PropertyDetailPage;
