// Dados extraídos do HTML da propriedade 2101 Brickell Ave #1803
export const propertyExampleData = {
  // Informações básicas
  mlsId: "A11772065",
  title: "2101 Brickell Ave #1803",
  description: "Spacious unit, climate-controlled storage. Prime location with stunning views of Biscayne Bay & the Brickell Skyline. Features: Walk-in closet, stainless steel appliances, granite countertops, brand-new HVAC, Nest system, and fresh paint. Seller willing to install new flooring in the living room & bedroom. Resort-style amenities: 2 pools, jacuzzi, state-of-the-art fitness center with sauna, outdoor grills, social lounge, playground, dog park, café, laundry services, 24/7 security & valet.",

  // Endereço
  address: "2101 Brickell Ave #1803",
  city: "Miami",
  state: "FL",
  zipCode: "33129",
  country: "USA",

  // Detalhes da propriedade
  propertyType: "CONDO", // Baseado na localização Brickell
  propertySubType: "High-rise Condominium",
  status: "ACTIVE",
  price: 540000,
  pricePerSqft: 683,

  // Detalhes físicos
  bedrooms: 1,
  bathrooms: 1,
  halfBaths: 0,
  sqft: 791,
  yearBuilt: null, // Não especificado no HTML

  // Características
  garage: 0,
  parking: 0,
  pool: true, // Mencionado nas amenidades
  waterfront: true, // Vista da Biscayne Bay
  furnished: true,
  petFriendly: false,
  isFeatured: false,

  // Localização
  latitude: 25.752407,
  longitude: -80.198875,
  neighborhood: "Brickell",
  subdivision: null,

  // Tour virtual
  virtualTour: "https://www.propertypanorama.com/instaview/mia/A11772065",

  // Imagens (URLs extraídas do HTML)
  images: [
    {
      url: "https://fl-photos-static.idxboost.us/65/A11772065_1.jpeg",
      caption: "Main view",
      isPrimary: true,
      order: 0
    },
    {
      url: "https://fl-photos-static.idxboost.us/65/A11772065_2.jpeg",
      caption: "Interior view 1",
      isPrimary: false,
      order: 1
    },
    {
      url: "https://fl-photos-static.idxboost.us/65/A11772065_3.jpeg",
      caption: "Interior view 2",
      isPrimary: false,
      order: 2
    },
    {
      url: "https://fl-photos-static.idxboost.us/65/A11772065_4.jpeg",
      caption: "Kitchen",
      isPrimary: false,
      order: 3
    },
    {
      url: "https://fl-photos-static.idxboost.us/65/A11772065_5.jpeg",
      caption: "Bathroom",
      isPrimary: false,
      order: 4
    },
    {
      url: "https://fl-photos-static.idxboost.us/65/A11772065_6.jpeg",
      caption: "Bedroom",
      isPrimary: false,
      order: 5
    },
    {
      url: "https://fl-photos-static.idxboost.us/65/A11772065_7.jpeg",
      caption: "Living area",
      isPrimary: false,
      order: 6
    },
    {
      url: "https://fl-photos-static.idxboost.us/65/A11772065_8.jpeg",
      caption: "Balcony view",
      isPrimary: false,
      order: 7
    },
    {
      url: "https://fl-photos-static.idxboost.us/65/A11772065_9.jpeg",
      caption: "City view",
      isPrimary: false,
      order: 8
    },
    {
      url: "https://fl-photos-static.idxboost.us/65/A11772065_10.jpeg",
      caption: "Bay view",
      isPrimary: false,
      order: 9
    },
    {
      url: "https://fl-photos-static.idxboost.us/65/A11772065_11.jpeg",
      caption: "Building exterior",
      isPrimary: false,
      order: 10
    },
    {
      url: "https://fl-photos-static.idxboost.us/65/A11772065_12.jpeg",
      caption: "Building amenities",
      isPrimary: false,
      order: 11
    }
  ],

  // Amenidades extraídas da descrição
  amenities: [
    { name: "2 Pools", category: "Recreation" },
    { name: "Jacuzzi", category: "Recreation" },
    { name: "State-of-the-art Fitness Center", category: "Fitness" },
    { name: "Sauna", category: "Wellness" },
    { name: "Outdoor Grills", category: "Recreation" },
    { name: "Social Lounge", category: "Entertainment" },
    { name: "Playground", category: "Recreation" },
    { name: "Dog Park", category: "Pet Friendly" },
    { name: "Café", category: "Dining" },
    { name: "Laundry Services", category: "Services" },
    { name: "24/7 Security", category: "Security" },
    { name: "Valet", category: "Services" },
    { name: "Climate-controlled Storage", category: "Storage" }
  ],

  // Características internas extraídas
  features: [
    { name: "Walk-in Closet", category: "Storage" },
    { name: "Stainless Steel Appliances", category: "Kitchen" },
    { name: "Granite Countertops", category: "Kitchen" },
    { name: "Brand-new HVAC", category: "Climate Control" },
    { name: "Nest System", category: "Smart Home" },
    { name: "Fresh Paint", category: "Interior" },
    { name: "Biscayne Bay Views", category: "Views" },
    { name: "Brickell Skyline Views", category: "Views" }
  ],

  // Informações do agente (extraídas do HTML)
  agent: {
    name: "Dayanne Costa",
    phone: "+1 (646) 598-3588",
    email: "dayanne.costa@compass.com"
  },

  // URLs de compartilhamento (caso precise)
  shareUrls: {
    facebook: "https://dayannecosta.com/property/2101-brickell-ave-1803-miami-fl-33129-a11772065",
    twitter: "https://dayannecosta.com/property/2101-brickell-ave-1803-miami-fl-33129-a11772065",
    pinterest: "https://dayannecosta.com/property/2101-brickell-ave-1803-miami-fl-33129-a11772065"
  },

  // Metadados extraídos
  metadata: {
    keywords: "2101 Brickell Ave #1803 Miami, FL 33129, Miami Real Estate, Miami properties For Sale",
    canonicalUrl: "https://dayannecosta.com/property/2101-brickell-ave-1803-miami-fl-33129-a11772065",
    ogImage: "https://fl-photos-static.idxboost.us/65/A11772065_1.jpeg"
  }
};

// Função para converter os dados para o formato da API
export const convertToApiFormat = (data, userId) => {
  return {
    mlsId: data.mlsId,
    title: data.title,
    description: data.description,
    address: data.address,
    city: data.city,
    state: data.state,
    zipCode: data.zipCode,
    country: data.country,
    propertyType: data.propertyType,
    propertySubType: data.propertySubType,
    status: data.status,
    price: data.price,
    pricePerSqft: data.pricePerSqft,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    halfBaths: data.halfBaths,
    sqft: data.sqft,
    yearBuilt: data.yearBuilt,
    garage: data.garage,
    parking: data.parking,
    pool: data.pool,
    waterfront: data.waterfront,
    furnished: data.furnished || false,
    petFriendly: data.petFriendly || false,
    isFeatured: data.isFeatured || false,
    latitude: data.latitude,
    longitude: data.longitude,
    neighborhood: data.neighborhood,
    subdivision: data.subdivision,
    virtualTour: data.virtualTour,
    userId: userId,
    images: data.images,
    amenities: data.amenities.map(amenity => amenity.name),
    features: data.features.map(feature => ({
      id: feature.name.toLowerCase().replace(/\s+/g, '_'),
      value: feature.name
    }))
  };
};