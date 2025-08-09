
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Setting up complete database...\n');

  try {
    // Clean existing data
    await cleanDatabase();
    
    // Create users
    const users = await createUsers();
    
    // Create amenities and features
    await createAmenitiesAndFeatures();
    
    // Create sample properties with new structure
    await createSampleProperties(users);
    
    console.log('\n✅ Database setup completed successfully!');
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  }
}

async function cleanDatabase() {
  console.log('🧹 Cleaning existing database...');
  
  await prisma.propertyFeature.deleteMany();
  await prisma.propertyAmenity.deleteMany();
  await prisma.propertyDocument.deleteMany();
  await prisma.propertyVideo.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.property.deleteMany();
  await prisma.feature.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.user.deleteMany();
  
  console.log('✅ Database cleaned!');
}

async function createUsers() {
  console.log('👥 Creating users...');

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@benmossgroup.com',
      name: 'Admin User',
      password: 'admin123', // In production, this should be hashed
      phone: '+1-305-555-0001',
      role: 'ADMIN'
    }
  });

  const agentUser = await prisma.user.create({
    data: {
      email: 'agent@benmossgroup.com',
      name: 'Real Estate Agent',
      password: 'agent123', // In production, this should be hashed
      phone: '+1-305-555-0002',
      role: 'AGENT'
    }
  });

  console.log('✅ Users created!');
  
  return { adminUser, agentUser };
}

async function createAmenitiesAndFeatures() {
  console.log('🏢 Creating amenities and features...');

  // Amenities
  const amenities = [
    { name: 'Swimming Pool', category: 'Recreation', icon: 'fas fa-swimming-pool' },
    { name: 'Fitness Center', category: 'Recreation', icon: 'fas fa-dumbbell' },
    { name: 'Concierge Service', category: 'Service', icon: 'fas fa-concierge-bell' },
    { name: 'Valet Parking', category: 'Service', icon: 'fas fa-car' },
    { name: 'Spa', category: 'Recreation', icon: 'fas fa-spa' },
    { name: 'Rooftop Terrace', category: 'Outdoor', icon: 'fas fa-building' },
    { name: 'Private Beach Access', category: 'Outdoor', icon: 'fas fa-umbrella-beach' },
    { name: 'Marina Access', category: 'Outdoor', icon: 'fas fa-anchor' },
    { name: 'Tennis Court', category: 'Recreation', icon: 'fas fa-tennis-ball' },
    { name: 'Golf Course Access', category: 'Recreation', icon: 'fas fa-golf-ball' }
  ];

  for (const amenity of amenities) {
    await prisma.amenity.create({ data: amenity });
  }

  // Features
  const features = [
    { name: 'Marble Floors', category: 'Flooring' },
    { name: 'Hardwood Floors', category: 'Flooring' },
    { name: 'Granite Countertops', category: 'Kitchen' },
    { name: 'Stainless Steel Appliances', category: 'Kitchen' },
    { name: 'Walk-in Closet', category: 'Bedroom' },
    { name: 'Master Suite', category: 'Bedroom' },
    { name: 'En-suite Bathroom', category: 'Bathroom' },
    { name: 'Jacuzzi Tub', category: 'Bathroom' },
    { name: 'Floor-to-Ceiling Windows', category: 'Windows' },
    { name: 'Private Balcony', category: 'Outdoor' },
    { name: 'Central Air Conditioning', category: 'HVAC' },
    { name: 'Smart Home Technology', category: 'Technology' }
  ];

  for (const feature of features) {
    await prisma.feature.create({ data: feature });
  }

  console.log('✅ Amenities and features created!');
}

async function createSampleProperties(users) {
  console.log('🏠 Creating sample properties...');

  const sampleProperties = [
    // New Developments
    {
      title: 'Echo Brickell - Brand New Luxury Tower',
      description: 'Experience the pinnacle of luxury living in this brand new development in the heart of Brickell.',
      address: '1451 Brickell Ave #3201',
      city: 'Miami',
      state: 'FL',
      zipCode: '33131',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'High-Rise Condo',
      status: 'ACTIVE',
      price: 1850000.00,
      pricePerSqft: 950.00,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1950,
      yearBuilt: 2024,
      parking: 2,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7617,
      longitude: -80.1918,
      subdivision: 'Echo Brickell',
      listingDate: new Date(),
      daysOnMarket: 5,
      userId: users.adminUser.id,
      categoria: 'NEW_DEVELOPMENTS'
    },
    // Single Family Homes
    {
      title: 'Waterfront Estate in Coconut Grove',
      description: 'Magnificent waterfront estate with private dock and panoramic bay views.',
      address: '3210 Bay Shore Dr',
      city: 'Miami',
      state: 'FL',
      zipCode: '33133',
      country: 'USA',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Waterfront Estate',
      status: 'ACTIVE',
      price: 4500000.00,
      pricePerSqft: 750.00,
      bedrooms: 5,
      bathrooms: 4.5,
      sqft: 6000,
      yearBuilt: 2020,
      parking: 3,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7282,
      longitude: -80.2384,
      subdivision: 'Bay Shore',
      listingDate: new Date(),
      daysOnMarket: 12,
      userId: users.adminUser.id,
      categoria: 'SINGLE_FAMILY_HOMES'
    },
    // Luxury Condos
    {
      title: 'Porsche Design Tower - Ultra Luxury',
      description: 'Ultra-luxury condo with car elevator and panoramic ocean views.',
      address: '15701 Collins Ave #4302',
      city: 'Miami',
      state: 'FL',
      zipCode: '33154',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Luxury High-Rise',
      status: 'ACTIVE',
      price: 3200000.00,
      pricePerSqft: 1200.00,
      bedrooms: 3,
      bathrooms: 3.5,
      sqft: 2667,
      yearBuilt: 2017,
      parking: 2,
      pool: true,
      waterfront: true,
      furnished: true,
      petFriendly: false,
      latitude: 25.9434,
      longitude: -80.1204,
      subdivision: 'Porsche Design Tower',
      listingDate: new Date(),
      daysOnMarket: 8,
      userId: users.adminUser.id,
      categoria: 'LUXURY_CONDOS'
    },
    // Brickell Neighborhood
    {
      title: 'Brickell City Centre Luxury Residence',
      description: 'Modern luxury living in the heart of Brickell financial district.',
      address: '68 SE 6th St #2910',
      city: 'Miami',
      state: 'FL',
      zipCode: '33131',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Urban High-Rise',
      status: 'ACTIVE',
      price: 1250000.00,
      pricePerSqft: 850.00,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1471,
      yearBuilt: 2016,
      parking: 1,
      pool: true,
      waterfront: false,
      furnished: false,
      petFriendly: true,
      latitude: 25.7663,
      longitude: -80.1916,
      subdivision: 'Brickell City Centre',
      listingDate: new Date(),
      daysOnMarket: 20,
      userId: users.adminUser.id,
      categoria: 'NEIGHBORHOODS',
      bairro: 'BRICKELL'
    },
    // Edgewater Neighborhood
    {
      title: 'Edgewater Bayfront Residence',
      description: 'Stunning bayfront residence in trendy Edgewater neighborhood.',
      address: '788 NE 23rd St #1205',
      city: 'Miami',
      state: 'FL',
      zipCode: '33137',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Bayfront Condo',
      status: 'ACTIVE',
      price: 875000.00,
      pricePerSqft: 750.00,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1167,
      yearBuilt: 2021,
      parking: 1,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7943,
      longitude: -80.1927,
      subdivision: 'Edgewater Square',
      listingDate: new Date(),
      daysOnMarket: 15,
      userId: users.adminUser.id,
      categoria: 'NEIGHBORHOODS',
      bairro: 'EDGEWATER'
    },
    // Coconut Grove Neighborhood
    {
      title: 'Grove at Grand Bay',
      description: 'Sophisticated living in Coconut Grove with bay views and luxury amenities.',
      address: '2669 S Bayshore Dr #1001N',
      city: 'Miami',
      state: 'FL',
      zipCode: '33133',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Luxury Condo',
      status: 'ACTIVE',
      price: 2100000.00,
      pricePerSqft: 900.00,
      bedrooms: 3,
      bathrooms: 3.5,
      sqft: 2333,
      yearBuilt: 2016,
      parking: 2,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7197,
      longitude: -80.2371,
      subdivision: 'Grove at Grand Bay',
      listingDate: new Date(),
      daysOnMarket: 18,
      userId: users.adminUser.id,
      categoria: 'NEIGHBORHOODS',
      bairro: 'COCONUT_GROVE'
    },
    // The Roads Neighborhood
    {
      title: 'Historic Mediterranean Estate',
      description: 'Beautiful Mediterranean Revival home in prestigious The Roads neighborhood.',
      address: '1234 SW 22nd Ave',
      city: 'Miami',
      state: 'FL',
      zipCode: '33145',
      country: 'USA',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Historic Home',
      status: 'ACTIVE',
      price: 1850000.00,
      pricePerSqft: 650.00,
      bedrooms: 4,
      bathrooms: 3.5,
      sqft: 2846,
      yearBuilt: 1925,
      parking: 2,
      pool: true,
      waterfront: false,
      furnished: false,
      petFriendly: true,
      latitude: 25.7543,
      longitude: -80.2207,
      subdivision: 'The Roads',
      listingDate: new Date(),
      daysOnMarket: 25,
      userId: users.adminUser.id,
      categoria: 'NEIGHBORHOODS',
      bairro: 'THE_ROADS'
    }
  ];

  for (const propertyData of sampleProperties) {
    const property = await prisma.property.create({
      data: propertyData
    });

    // Add sample images
    await prisma.propertyImage.create({
      data: {
        propertyId: property.id,
        url: '/src/assets/img/testesImagens.jpeg',
        caption: 'Property Image',
        isPrimary: true,
        order: 1
      }
    });
  }

  console.log('✅ Sample properties created!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
