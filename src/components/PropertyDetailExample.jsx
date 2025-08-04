
import React from 'react';
import PropertyDetail from './PropertyDetail';

// Exemplo de como usar o componente PropertyDetail
const PropertyDetailExample = () => {
  // Dados de exemplo baseados no padrão do HTML fornecido
  const exampleProperty = {
    // Informações básicas
    address: "1915 Brickell Ave #C1412",
    city: "Miami",
    state: "FL",
    zipCode: "33129",
    price: 750000,
    beds: 2,
    baths: 2,
    halfBaths: 0,
    sqft: 1424,
    pricePerSqft: 527,
    estimatedPayment: "$3,200",
    
    // Informações MLS
    mlsNumber: "A11743798",
    propertyType: "Condominiums",
    subdivision: "Brickell Place Phase Ii C",
    yearBuilt: 1980,
    dateListed: "02/13/2025",
    daysOnMarket: 82,
    
    // Descrição
    description: "Discover Unit 1412 at Brickell Place, a stunningly renovated and spacious residence in the heart of Miami's vibrant Brickell neighborhood. This elegant unit features exquisite marble floors throughout, an open and airy layout, and high-end finishes that create a sophisticated living space. The modern kitchen boasts sleek cabinetry and ample storage. Enjoy breathtaking city and bay views from your private balcony, perfect for relaxing or entertaining. Brickell Place offers top-tier amenities, including a pool, fitness center, marina, tennis courts, and 24-hour security. With its prime location just minutes from world-class dining, shopping, and entertainment, this move-in-ready gem is an exceptional opportunity for urban living.",
    
    // Comodidades
    amenities: [
      "Marina",
      "Fitness Center", 
      "Pool",
      "Tennis Courts",
      "24-hour Security"
    ],
    
    // Características externas
    exteriorFeatures: {
      waterfront: true,
      parkingSpaces: 1,
      pool: true,
      waterfrontDescription: "Bayfront",
      parkingDescription: "Attached, Garage, Guest, One Space"
    },
    
    // Características internas
    interiorFeatures: {
      features: "Closet Cabinetry, Dual Sinks, Family Dining Room"
    },
    
    // Informações da propriedade
    lotSize: "1,424",
    furnished: false,
    saleType: "Regular Sale",
    hoaFees: 1482,
    taxAmount: 7149,
    taxYear: 2024,
    
    // Coordenadas para o mapa
    coordinates: {
      lat: 25.753344,
      lng: -80.197548
    },
    
    // Imagens
    images: [
      "https://fl-photos-static.idxboost.us/98/A11743798_1.jpeg",
      "https://fl-photos-static.idxboost.us/98/A11743798_2.jpeg",
      "https://fl-photos-static.idxboost.us/98/A11743798_3.jpeg",
      "https://fl-photos-static.idxboost.us/98/A11743798_4.jpeg",
      "https://fl-photos-static.idxboost.us/98/A11743798_5.jpeg"
    ],
    image: "https://fl-photos-static.idxboost.us/98/A11743798_1.jpeg",
    
    // Tour virtual
    virtualTour: "https://www.propertypanorama.com/instaview/mia/A11743798",
    
    // Informações do agente
    agent: {
      name: "Dayanne Costa",
      photo: "https://idxboost.s3.amazonaws.com/agent_profiles/eb6d6e1f442e.8445101a8128.jpg"
    },
    agentPhone: "+1 (646) 598-3588",
    
    // Propriedades similares
    similarProperties: [
      {
        address: "1541 Brickell Ave #A2102",
        city: "Miami",
        state: "FL",
        zipCode: "33129",
        price: 893000,
        beds: 2,
        baths: 2,
        sqft: 1640,
        image: "https://fl-photos-static.idxboost.us/98/A11618502_1.jpeg"
      },
      {
        address: "1541 Brickell Ave #C2705",
        city: "Miami", 
        state: "FL",
        zipCode: "33129",
        price: 890000,
        beds: 2,
        baths: 2,
        sqft: 1697,
        image: "https://fl-photos-static.idxboost.us/98/A11713147_1.jpeg"
      },
      {
        address: "1541 Brickell Ave #A1701",
        city: "Miami",
        state: "FL", 
        zipCode: "33129",
        price: 889000,
        beds: 2,
        baths: 2,
        sqft: 1697,
        image: "https://fl-photos-static.idxboost.us/98/A11681876_1.jpeg"
      }
    ]
  };

  return (
    <div>
      <h1>Exemplo de Uso do PropertyDetail</h1>
      <PropertyDetail propertyData={exampleProperty} />
    </div>
  );
};

export default PropertyDetailExample;
