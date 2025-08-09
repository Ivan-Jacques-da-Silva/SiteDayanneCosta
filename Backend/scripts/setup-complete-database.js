
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function clearDatabase() {
  console.log('🗑️ Clearing existing data...');
  
  // Delete in correct order to respect foreign key constraints
  await prisma.propertyCategory.deleteMany();
  await prisma.propertyAmenity.deleteMany();
  await prisma.propertyFeature.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.propertyVideo.deleteMany();
  await prisma.propertyDocument.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.property.deleteMany();
  await prisma.category.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.feature.deleteMany();
  await prisma.user.deleteMany();
  
  console.log('✅ Database cleared!');
}

async function createUsers() {
  console.log('👤 Creating users...');
  
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@dayannecosta.com',
      password: await bcrypt.hash('admin123', 12),
      role: 'ADMIN'
    }
  });

  const agentUser = await prisma.user.create({
    data: {
      name: 'Dayanne Costa',
      email: 'dayanne@dayannecosta.com',
      password: await bcrypt.hash('agent123', 12),
      role: 'AGENT'
    }
  });

  console.log('✅ Users created!');
  return { adminUser, agentUser };
}

async function createCategories() {
  console.log('📂 Creating categories...');

  // Main categories
  const newDevelopments = await prisma.category.create({
    data: {
      name: 'New Developments',
      description: 'Newly built or under construction properties',
      icon: 'fas fa-building',
      color: '#059669'
    }
  });

  const singleFamilyHomes = await prisma.category.create({
    data: {
      name: 'Single Family Homes',
      description: 'Detached single family residential properties',
      icon: 'fas fa-home',
      color: '#dc2626'
    }
  });

  const luxuryCondos = await prisma.category.create({
    data: {
      name: 'Luxury Condos',
      description: 'High-end condominium properties with premium amenities',
      icon: 'fas fa-crown',
      color: '#7c3aed'
    }
  });

  const neighborhoods = await prisma.category.create({
    data: {
      name: 'Neighborhoods',
      description: 'Properties grouped by neighborhood location',
      icon: 'fas fa-map-marker-alt',
      color: '#0891b2'
    }
  });

  // Neighborhood subcategories
  const brickell = await prisma.category.create({
    data: {
      name: 'Brickell',
      description: 'Properties in the Brickell neighborhood',
      icon: 'fas fa-building',
      color: '#6366f1',
      parentId: neighborhoods.id
    }
  });

  const edgewater = await prisma.category.create({
    data: {
      name: 'Edgewater',
      description: 'Properties in the Edgewater neighborhood',
      icon: 'fas fa-water',
      color: '#6366f1',
      parentId: neighborhoods.id
    }
  });

  const coconutGrove = await prisma.category.create({
    data: {
      name: 'Coconut Grove',
      description: 'Properties in the Coconut Grove neighborhood',
      icon: 'fas fa-tree',
      color: '#6366f1',
      parentId: neighborhoods.id
    }
  });

  const theRoads = await prisma.category.create({
    data: {
      name: 'The Roads',
      description: 'Properties in The Roads neighborhood',
      icon: 'fas fa-road',
      color: '#6366f1',
      parentId: neighborhoods.id
    }
  });

  console.log('✅ Categories created!');
  
  return {
    newDevelopments,
    singleFamilyHomes,
    luxuryCondos,
    neighborhoods,
    brickell,
    edgewater,
    coconutGrove,
    theRoads
  };
}

async function createAmenitiesAndFeatures() {
  console.log('🏢 Creating amenities and features...');

  // Amenities
  const amenities = [
    { name: 'Swimming Pool', category: 'Recreation', icon: '🏊' },
    { name: 'Fitness Center', category: 'Recreation', icon: '💪' },
    { name: 'Concierge', category: 'Service', icon: '🛎️' },
    { name: 'Valet Parking', category: 'Service', icon: '🚗' },
    { name: '24/7 Security', category: 'Security', icon: '🛡️' },
    { name: 'Spa', category: 'Wellness', icon: '🧘' },
    { name: 'Tennis Court', category: 'Recreation', icon: '🎾' },
    { name: 'Business Center', category: 'Business', icon: '💼' },
    { name: 'Rooftop Terrace', category: 'Common Area', icon: '🏢' },
    { name: 'Marina', category: 'Recreation', icon: '⛵' },
    { name: 'Golf Course', category: 'Recreation', icon: '⛳' },
    { name: 'Club Room', category: 'Common Area', icon: '🥂' },
    { name: 'Children Playground', category: 'Family', icon: '🛝' },
    { name: 'Dog Park', category: 'Pet', icon: '🐕' },
    { name: 'Beach Access', category: 'Location', icon: '🏖️' }
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
    { name: 'Smart Home Technology', category: 'Technology' },
    { name: 'Storage Unit', category: 'Storage' },
    { name: 'Laundry Room', category: 'Utility' },
    { name: 'Wine Cooler', category: 'Kitchen' }
  ];

  for (const feature of features) {
    await prisma.feature.create({ data: feature });
  }

  console.log('✅ Amenities and features created!');
}

async function createSampleProperties(categories, users) {
  console.log('🏠 Creating sample properties...');

  const sampleProperties = [
    // New Developments (3 properties)
    {
      title: 'Echo Brickell - Brand New Luxury Tower',
      description: 'Experience the pinnacle of luxury living in this brand new development in the heart of Brickell. Features floor-to-ceiling windows, premium finishes, and world-class amenities including infinity pool, spa, and fitness center.',
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
      neighborhood: 'Brickell',
      subdivision: 'Echo Brickell',
      listingDate: new Date(),
      daysOnMarket: 5,
      userId: users.adminUser.id,
      categories: [categories.newDevelopments.id, categories.luxuryCondos.id, categories.brickell.id]
    },
    {
      title: 'Aston Martin Residences - Ultra Luxury',
      description: 'Exclusive new development featuring Aston Martin designed interiors and amenities. This is luxury redefined with private elevators, butler service, and breathtaking ocean views.',
      address: '300 Biscayne Blvd Way #4501',
      city: 'Miami',
      state: 'FL',
      zipCode: '33131',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Ultra-Luxury Condo',
      status: 'ACTIVE',
      price: 4500000.00,
      pricePerSqft: 1200.00,
      bedrooms: 3,
      bathrooms: 3.5,
      sqft: 3750,
      yearBuilt: 2024,
      parking: 3,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7753,
      longitude: -80.1878,
      neighborhood: 'Downtown',
      subdivision: 'Aston Martin Residences',
      listingDate: new Date(),
      daysOnMarket: 12,
      userId: users.adminUser.id,
      categories: [categories.newDevelopments.id, categories.luxuryCondos.id]
    },
    {
      title: 'Paramount Miami Worldcenter - New Launch',
      description: 'Brand new luxury residence in the heart of downtown Miami. Features state-of-the-art amenities, premium finishes, and spectacular city views.',
      address: '851 NE 1st Ave #5201',
      city: 'Miami',
      state: 'FL',
      zipCode: '33132',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Luxury Condo',
      status: 'ACTIVE',
      price: 2200000.00,
      pricePerSqft: 1050.00,
      bedrooms: 2,
      bathrooms: 2.5,
      sqft: 2095,
      yearBuilt: 2024,
      parking: 2,
      pool: true,
      waterfront: false,
      furnished: false,
      petFriendly: true,
      latitude: 25.7831,
      longitude: -80.1918,
      neighborhood: 'Downtown',
      subdivision: 'Paramount Miami Worldcenter',
      listingDate: new Date(),
      daysOnMarket: 8,
      userId: users.adminUser.id,
      categories: [categories.newDevelopments.id, categories.luxuryCondos.id]
    },

    // Single Family Homes (3 properties)
    {
      title: 'Stunning Coral Gables Estate',
      description: 'Magnificent single family home in prestigious Coral Gables. Features 6 bedrooms, gourmet kitchen, pool, and lush landscaping on oversized lot.',
      address: '1234 Coral Way',
      city: 'Coral Gables',
      state: 'FL',
      zipCode: '33134',
      country: 'USA',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Estate',
      status: 'ACTIVE',
      price: 2800000.00,
      pricePerSqft: 650.00,
      bedrooms: 6,
      bathrooms: 5.5,
      sqft: 4308,
      yearBuilt: 2015,
      garage: 3,
      parking: 4,
      pool: true,
      waterfront: false,
      furnished: false,
      petFriendly: true,
      latitude: 25.7463,
      longitude: -80.2581,
      neighborhood: 'Coral Gables',
      subdivision: 'Coral Gables Estates',
      listingDate: new Date(),
      daysOnMarket: 18,
      userId: users.adminUser.id,
      categories: [categories.singleFamilyHomes.id]
    },
    {
      title: 'Modern Coconut Grove Family Home',
      description: 'Contemporary single family home in desirable Coconut Grove. Open floor plan, chef kitchen, and beautiful outdoor entertaining area.',
      address: '3456 Main Hwy',
      city: 'Coconut Grove',
      state: 'FL',
      zipCode: '33133',
      country: 'USA',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Modern Home',
      status: 'ACTIVE',
      price: 1950000.00,
      pricePerSqft: 750.00,
      bedrooms: 4,
      bathrooms: 3.5,
      sqft: 2600,
      yearBuilt: 2019,
      garage: 2,
      parking: 3,
      pool: true,
      waterfront: false,
      furnished: false,
      petFriendly: true,
      latitude: 25.7285,
      longitude: -80.2436,
      neighborhood: 'Coconut Grove',
      subdivision: 'Grove Estates',
      listingDate: new Date(),
      daysOnMarket: 32,
      userId: users.adminUser.id,
      categories: [categories.singleFamilyHomes.id, categories.coconutGrove.id]
    },
    {
      title: 'Venetian Islands Waterfront Mansion',
      description: 'Spectacular waterfront mansion with 100 feet of water frontage, private dock, and stunning bay views. Perfect for boating enthusiasts.',
      address: '46 S Venetian Way',
      city: 'Miami Beach',
      state: 'FL',
      zipCode: '33139',
      country: 'USA',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Waterfront Mansion',
      status: 'ACTIVE',
      price: 6500000.00,
      pricePerSqft: 1300.00,
      bedrooms: 5,
      bathrooms: 6,
      sqft: 5000,
      yearBuilt: 2020,
      garage: 3,
      parking: 5,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7663,
      longitude: -80.1510,
      neighborhood: 'Venetian Islands',
      subdivision: 'Venetian Islands',
      listingDate: new Date(),
      daysOnMarket: 45,
      userId: users.adminUser.id,
      categories: [categories.singleFamilyHomes.id]
    },

    // Luxury Condos (3 properties)
    {
      title: 'Four Seasons Residences Miami',
      description: 'Prestigious Four Seasons branded residence with unparalleled service and amenities. Features marble floors, chef kitchen, and panoramic bay views.',
      address: '1425 Brickell Ave #62A',
      city: 'Miami',
      state: 'FL',
      zipCode: '33131',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Luxury Condo',
      status: 'ACTIVE',
      price: 3200000.00,
      pricePerSqft: 1100.00,
      bedrooms: 3,
      bathrooms: 3.5,
      sqft: 2910,
      yearBuilt: 2018,
      parking: 2,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7612,
      longitude: -80.1915,
      neighborhood: 'Brickell',
      subdivision: 'Four Seasons Residences',
      listingDate: new Date(),
      daysOnMarket: 25,
      userId: users.adminUser.id,
      categories: [categories.luxuryCondos.id, categories.brickell.id]
    },
    {
      title: 'St. Regis Bal Harbour Resort Residences',
      description: 'Ultra-luxury oceanfront residence with full-service resort amenities. Features panoramic ocean views and world-class service.',
      address: '9703 Collins Ave #1201',
      city: 'Bal Harbour',
      state: 'FL',
      zipCode: '33154',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Resort Residence',
      status: 'ACTIVE',
      price: 4800000.00,
      pricePerSqft: 1350.00,
      bedrooms: 3,
      bathrooms: 4,
      sqft: 3555,
      yearBuilt: 2017,
      parking: 2,
      pool: true,
      waterfront: true,
      furnished: true,
      petFriendly: true,
      latitude: 25.8906,
      longitude: -80.1214,
      neighborhood: 'Bal Harbour',
      subdivision: 'St. Regis Bal Harbour',
      listingDate: new Date(),
      daysOnMarket: 38,
      userId: users.adminUser.id,
      categories: [categories.luxuryCondos.id]
    },
    {
      title: 'Porsche Design Tower',
      description: 'Revolutionary luxury tower where you can park your car next to your living room. Features unique car elevator and ocean views.',
      address: '18555 Collins Ave #1801',
      city: 'Sunny Isles Beach',
      state: 'FL',
      zipCode: '33160',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Ultra-Luxury Condo',
      status: 'ACTIVE',
      price: 5200000.00,
      pricePerSqft: 1400.00,
      bedrooms: 4,
      bathrooms: 4.5,
      sqft: 3714,
      yearBuilt: 2017,
      parking: 4,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.9428,
      longitude: -80.1209,
      neighborhood: 'Sunny Isles Beach',
      subdivision: 'Porsche Design Tower',
      listingDate: new Date(),
      daysOnMarket: 22,
      userId: users.adminUser.id,
      categories: [categories.luxuryCondos.id]
    },

    // Brickell Properties (3 properties)
    {
      title: 'RISE Brickell City Centre',
      description: 'Modern high-rise living in the heart of Brickell with direct access to Brickell City Centre shopping and dining.',
      address: '88 SW 7th St #3201',
      city: 'Miami',
      state: 'FL',
      zipCode: '33130',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'High-Rise Condo',
      status: 'ACTIVE',
      price: 1250000.00,
      pricePerSqft: 850.00,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1470,
      yearBuilt: 2020,
      parking: 1,
      pool: true,
      waterfront: false,
      furnished: false,
      petFriendly: true,
      latitude: 25.7656,
      longitude: -80.1937,
      neighborhood: 'Brickell',
      subdivision: 'RISE Brickell City Centre',
      listingDate: new Date(),
      daysOnMarket: 15,
      userId: users.adminUser.id,
      categories: [categories.brickell.id, categories.luxuryCondos.id]
    },
    {
      title: 'Brickell Heights East Tower',
      description: 'Luxury residence in prestigious Brickell Heights with amazing city and bay views. Building features world-class amenities.',
      address: '55 SE 6th St #4201',
      city: 'Miami',
      state: 'FL',
      zipCode: '33131',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Luxury Condo',
      status: 'ACTIVE',
      price: 1850000.00,
      pricePerSqft: 950.00,
      bedrooms: 3,
      bathrooms: 3,
      sqft: 1947,
      yearBuilt: 2021,
      parking: 2,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7687,
      longitude: -80.1918,
      neighborhood: 'Brickell',
      subdivision: 'Brickell Heights',
      listingDate: new Date(),
      daysOnMarket: 28,
      userId: users.adminUser.id,
      categories: [categories.brickell.id, categories.luxuryCondos.id]
    },
    {
      title: 'SLS Brickell Residence',
      description: 'Sophisticated residence in the iconic SLS Brickell tower. Features Philippe Starck designed interiors and premium amenities.',
      address: '1300 Brickell Bay Dr #2901',
      city: 'Miami',
      state: 'FL',
      zipCode: '33131',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Designer Condo',
      status: 'ACTIVE',
      price: 2100000.00,
      pricePerSqft: 1000.00,
      bedrooms: 2,
      bathrooms: 2.5,
      sqft: 2100,
      yearBuilt: 2016,
      parking: 2,
      pool: true,
      waterfront: true,
      furnished: true,
      petFriendly: true,
      latitude: 25.7598,
      longitude: -80.1889,
      neighborhood: 'Brickell',
      subdivision: 'SLS Brickell',
      listingDate: new Date(),
      daysOnMarket: 35,
      userId: users.adminUser.id,
      categories: [categories.brickell.id, categories.luxuryCondos.id]
    },

    // Edgewater Properties (3 properties)
    {
      title: 'Edgewater Modern High-Rise',
      description: 'Stunning high-rise condo in trendy Edgewater with panoramic bay views. Features modern finishes and building amenities.',
      address: '788 NE 23rd St #1205',
      city: 'Miami',
      state: 'FL',
      zipCode: '33137',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'High-Rise Condo',
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
      neighborhood: 'Edgewater',
      subdivision: 'Edgewater Square',
      listingDate: new Date(),
      daysOnMarket: 15,
      userId: users.adminUser.id,
      categories: [categories.edgewater.id]
    },
    {
      title: 'Aria on the Bay',
      description: 'Sophisticated waterfront living in Edgewater with breathtaking bay and city views. Premium building amenities included.',
      address: '488 NE 18th St #2401',
      city: 'Miami',
      state: 'FL',
      zipCode: '33132',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Waterfront Condo',
      status: 'ACTIVE',
      price: 1150000.00,
      pricePerSqft: 820.00,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1402,
      yearBuilt: 2018,
      parking: 1,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7896,
      longitude: -80.1859,
      neighborhood: 'Edgewater',
      subdivision: 'Aria on the Bay',
      listingDate: new Date(),
      daysOnMarket: 21,
      userId: users.adminUser.id,
      categories: [categories.edgewater.id]
    },
    {
      title: 'Missoni Baia',
      description: 'Artistically designed residence by fashion house Missoni. Features unique design elements and waterfront lifestyle.',
      address: '777 NE 26th Ter #1201',
      city: 'Miami',
      state: 'FL',
      zipCode: '33137',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Designer Condo',
      status: 'ACTIVE',
      price: 1650000.00,
      pricePerSqft: 950.00,
      bedrooms: 3,
      bathrooms: 3,
      sqft: 1737,
      yearBuilt: 2020,
      parking: 2,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7987,
      longitude: -80.1834,
      neighborhood: 'Edgewater',
      subdivision: 'Missoni Baia',
      listingDate: new Date(),
      daysOnMarket: 42,
      userId: users.adminUser.id,
      categories: [categories.edgewater.id, categories.luxuryCondos.id]
    },

    // Coconut Grove Properties (3 properties)
    {
      title: 'Grove at Grand Bay South Tower',
      description: 'Architectural masterpiece in Coconut Grove designed by BIG architects. Features twisted tower design and bay views.',
      address: '2669 S Bayshore Dr #901S',
      city: 'Coconut Grove',
      state: 'FL',
      zipCode: '33133',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Architectural Condo',
      status: 'ACTIVE',
      price: 2450000.00,
      pricePerSqft: 1100.00,
      bedrooms: 3,
      bathrooms: 3.5,
      sqft: 2227,
      yearBuilt: 2017,
      parking: 2,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7285,
      longitude: -80.2389,
      neighborhood: 'Coconut Grove',
      subdivision: 'Grove at Grand Bay',
      listingDate: new Date(),
      daysOnMarket: 33,
      userId: users.adminUser.id,
      categories: [categories.coconutGrove.id, categories.luxuryCondos.id]
    },
    {
      title: 'Park Grove Tower Three',
      description: 'Ultra-luxury residence in the newest tower of Park Grove. Features OMA designed architecture and lush landscaping.',
      address: '4250 Biscayne Blvd #1401',
      city: 'Coconut Grove',
      state: 'FL',
      zipCode: '33133',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Ultra-Luxury Condo',
      status: 'ACTIVE',
      price: 3800000.00,
      pricePerSqft: 1250.00,
      bedrooms: 4,
      bathrooms: 4.5,
      sqft: 3040,
      yearBuilt: 2022,
      parking: 3,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7298,
      longitude: -80.2345,
      neighborhood: 'Coconut Grove',
      subdivision: 'Park Grove',
      listingDate: new Date(),
      daysOnMarket: 19,
      userId: users.adminUser.id,
      categories: [categories.coconutGrove.id, categories.luxuryCondos.id]
    },
    {
      title: 'Coconut Grove Bayfront Home',
      description: 'Charming bayfront home in the heart of Coconut Grove. Features private dock, lush gardens, and old Florida charm.',
      address: '3240 Devon Ct',
      city: 'Coconut Grove',
      state: 'FL',
      zipCode: '33133',
      country: 'USA',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Bayfront Home',
      status: 'ACTIVE',
      price: 4200000.00,
      pricePerSqft: 1200.00,
      bedrooms: 4,
      bathrooms: 4,
      sqft: 3500,
      yearBuilt: 1995,
      garage: 2,
      parking: 4,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7267,
      longitude: -80.2298,
      neighborhood: 'Coconut Grove',
      subdivision: 'Coconut Grove Bayfront',
      listingDate: new Date(),
      daysOnMarket: 26,
      userId: users.adminUser.id,
      categories: [categories.coconutGrove.id, categories.singleFamilyHomes.id]
    },

    // The Roads Properties (3 properties)
    {
      title: 'Historic The Roads Charmer',
      description: 'Beautifully restored historic home in The Roads. Features original architectural details with modern updates.',
      address: '1357 SW 22nd Ave',
      city: 'Miami',
      state: 'FL',
      zipCode: '33145',
      country: 'USA',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Historic Home',
      status: 'ACTIVE',
      price: 1250000.00,
      pricePerSqft: 625.00,
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 2000,
      yearBuilt: 1925,
      garage: 2,
      parking: 2,
      pool: true,
      waterfront: false,
      furnished: false,
      petFriendly: true,
      latitude: 25.7543,
      longitude: -80.2234,
      neighborhood: 'The Roads',
      subdivision: 'The Roads Historic District',
      listingDate: new Date(),
      daysOnMarket: 22,
      userId: users.adminUser.id,
      categories: [categories.theRoads.id, categories.singleFamilyHomes.id]
    },
    {
      title: 'The Roads Mediterranean Revival',
      description: 'Stunning Mediterranean Revival home with period details and modern amenities. Features courtyard, pool, and mature landscaping.',
      address: '2468 SW 21st Ter',
      city: 'Miami',
      state: 'FL',
      zipCode: '33145',
      country: 'USA',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Mediterranean Home',
      status: 'ACTIVE',
      price: 1850000.00,
      pricePerSqft: 750.00,
      bedrooms: 4,
      bathrooms: 3.5,
      sqft: 2467,
      yearBuilt: 1928,
      garage: 2,
      parking: 3,
      pool: true,
      waterfront: false,
      furnished: false,
      petFriendly: true,
      latitude: 25.7523,
      longitude: -80.2267,
      neighborhood: 'The Roads',
      subdivision: 'The Roads Historic District',
      listingDate: new Date(),
      daysOnMarket: 31,
      userId: users.adminUser.id,
      categories: [categories.theRoads.id, categories.singleFamilyHomes.id]
    },
    {
      title: 'The Roads Modern Renovation',
      description: 'Completely renovated home in The Roads combining historic charm with contemporary luxury. Features open floor plan and designer finishes.',
      address: '1975 SW 20th St',
      city: 'Miami',
      state: 'FL',
      zipCode: '33145',
      country: 'USA',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Renovated Home',
      status: 'ACTIVE',
      price: 2200000.00,
      pricePerSqft: 880.00,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 2500,
      yearBuilt: 1924,
      garage: 2,
      parking: 4,
      pool: true,
      waterfront: false,
      furnished: false,
      petFriendly: true,
      latitude: 25.7534,
      longitude: -80.2245,
      neighborhood: 'The Roads',
      subdivision: 'The Roads Historic District',
      listingDate: new Date(),
      daysOnMarket: 17,
      userId: users.adminUser.id,
      categories: [categories.theRoads.id, categories.singleFamilyHomes.id]
    }
  ];

  // Create properties and associate with categories
  for (const propertyData of sampleProperties) {
    const { categories: categoryIds, ...propertyWithoutCategories } = propertyData;

    const property = await prisma.property.create({
      data: propertyWithoutCategories
    });

    // Associate with categories
    for (const categoryId of categoryIds) {
      await prisma.propertyCategory.create({
        data: {
          propertyId: property.id,
          categoryId: categoryId
        }
      });
    }

    console.log(`✓ Created property: ${property.title}`);
  }

  console.log('✅ Sample properties created!');
}

async function main() {
  console.log('🌱 Starting complete database setup...');
  
  const answer = await askQuestion('⚠️  This will delete ALL existing data and create new sample data. Continue? (Y/N): ');
  
  if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
    console.log('❌ Setup cancelled.');
    rl.close();
    return;
  }

  try {
    // Clear existing data
    await clearDatabase();

    // Create users
    const users = await createUsers();

    // Create categories
    const categories = await createCategories();

    // Create amenities and features
    await createAmenitiesAndFeatures();

    // Create sample properties
    await createSampleProperties(categories, users);

    console.log('🎉 Complete database setup finished successfully!');
    console.log('');
    console.log('📊 Summary:');
    console.log('- Categories: Main categories + neighborhood subcategories');
    console.log('- Properties: 21 sample properties across all categories');
    console.log('- Users: Admin and Agent users created');
    console.log('- Amenities & Features: Complete set for property details');
    console.log('');
    console.log('🔑 Login credentials:');
    console.log('Admin: admin@dayannecosta.com / admin123');
    console.log('Agent: dayanne@dayannecosta.com / agent123');

  } catch (error) {
    console.error('❌ Error during setup:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

main();
