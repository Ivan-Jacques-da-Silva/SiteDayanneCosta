const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Setting up complete database...\n');

  try {
    // Clean existing data
    await cleanDatabase();

    // Ensure uploads directory exists
    await ensureUploadsDirectory();

    // Create users
    const users = await createUsers();

    // Create amenities and features
    await createAmenitiesAndFeatures();

    // Create sample properties with correct categories and images
    await createSampleProperties(users);

    console.log('\n✅ Database setup completed successfully!');
    console.log('\n👤 Admin Login:');
    console.log('   Email: admin@dayannecosta.com');
    console.log('   Password: admin123');
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  }
}

async function cleanDatabase() {
  console.log('🧹 Cleaning existing database...');

  // Delete all data in correct order to avoid foreign key constraints
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

  // Clean uploads directory
  const uploadsDir = path.join(__dirname, '..', 'uploads', 'properties');
  if (fs.existsSync(uploadsDir)) {
    const files = fs.readdirSync(uploadsDir);
    for (const file of files) {
      const filePath = path.join(uploadsDir, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    console.log('🗑️ Cleaned uploads directory');
  }

  console.log('✅ Database cleaned!');
}

async function ensureUploadsDirectory() {
  console.log('📁 Ensuring uploads directory exists...');

  const uploadsDir = path.join(__dirname, '..', 'uploads', 'properties');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('✅ Created uploads directory');
  }

  // Copy sample image to uploads directory if it exists
  const sampleImageSrc = path.join(__dirname, '..', '..', 'src', 'assets', 'img', 'testesImagens.jpeg');
  const sampleImageDest = path.join(uploadsDir, 'sample-property.jpeg');

  if (fs.existsSync(sampleImageSrc)) {
    fs.copyFileSync(sampleImageSrc, sampleImageDest);
    console.log('✅ Sample image copied to uploads');
  } else {
    console.log('⚠️ Sample image not found, properties will be created without images');
  }
}

async function createUsers() {
  console.log('👥 Creating users...');

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@dayannecosta.com',
      name: 'Admin User',
      password: await bcrypt.hash('admin123', 12),
      phone: '+1-305-555-0001',
      role: 'ADMIN'
    }
  });

  const agentUser = await prisma.user.create({
    data: {
      email: 'agent@dayannecosta.com',
      name: 'Dayanne Costa',
      password: await bcrypt.hash('agent123', 12),
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

  // Check if sample image exists
  const sampleImagePath = path.join(__dirname, '..', 'uploads', 'properties', 'sample-property.jpeg');
  const hasImage = fs.existsSync(sampleImagePath);

  const sampleProperties = [
    // 1. NEW DEVELOPMENTS - 4 properties
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
    {
      title: 'Aston Martin Residences - Ultra Luxury',
      description: 'Exclusive new development featuring Aston Martin designed interiors and breathtaking ocean views.',
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
      subdivision: 'Aston Martin Residences',
      listingDate: new Date(),
      daysOnMarket: 12,
      userId: users.adminUser.id,
      categoria: 'NEW_DEVELOPMENTS'
    },
    {
      title: 'Waldorf Astoria Residences Miami',
      description: 'New luxury development with world-class amenities and service in downtown Miami.',
      address: '300 Biscayne Blvd #2801',
      city: 'Miami',
      state: 'FL',
      zipCode: '33131',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Luxury High-Rise',
      status: 'ACTIVE',
      price: 3200000.00,
      pricePerSqft: 1100.00,
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2909,
      yearBuilt: 2024,
      parking: 2,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7751,
      longitude: -80.1876,
      subdivision: 'Waldorf Astoria Residences',
      listingDate: new Date(),
      daysOnMarket: 8,
      userId: users.adminUser.id,
      categoria: 'NEW_DEVELOPMENTS'
    },
    {
      title: 'Una Residences - Modern Architecture',
      description: 'Contemporary new development featuring cutting-edge design and premium finishes.',
      address: '175 SE 25th Rd #1801',
      city: 'Miami',
      state: 'FL',
      zipCode: '33129',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Modern High-Rise',
      status: 'ACTIVE',
      price: 2800000.00,
      pricePerSqft: 1050.00,
      bedrooms: 2,
      bathrooms: 2.5,
      sqft: 2667,
      yearBuilt: 2024,
      parking: 2,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7598,
      longitude: -80.1889,
      subdivision: 'Una Residences',
      listingDate: new Date(),
      daysOnMarket: 15,
      userId: users.adminUser.id,
      categoria: 'NEW_DEVELOPMENTS'
    },

    // 2. SINGLE FAMILY HOMES - 4 properties
    {
      title: 'Waterfront Estate in Coral Gables',
      description: 'Magnificent waterfront estate with private dock and panoramic bay views.',
      address: '3210 Bay Shore Dr',
      city: 'Coral Gables',
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
      subdivision: 'Bay Shore Estates',
      listingDate: new Date(),
      daysOnMarket: 12,
      userId: users.adminUser.id,
      categoria: 'SINGLE_FAMILY_HOMES'
    },
    {
      title: 'Modern Family Home in Pinecrest',
      description: 'Contemporary single family home with open floor plan and beautiful outdoor entertaining area.',
      address: '8765 SW 125th St',
      city: 'Pinecrest',
      state: 'FL',
      zipCode: '33156',
      country: 'USA',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Modern Home',
      status: 'ACTIVE',
      price: 2200000.00,
      pricePerSqft: 650.00,
      bedrooms: 4,
      bathrooms: 3.5,
      sqft: 3385,
      yearBuilt: 2019,
      parking: 2,
      pool: true,
      waterfront: false,
      furnished: false,
      petFriendly: true,
      latitude: 25.6687,
      longitude: -80.3048,
      subdivision: 'Pinecrest Estates',
      listingDate: new Date(),
      daysOnMarket: 22,
      userId: users.adminUser.id,
      categoria: 'SINGLE_FAMILY_HOMES'
    },
    {
      title: 'Luxury Villa in Palmetto Bay',
      description: 'Stunning villa with Mediterranean architecture and lush landscaping on oversized lot.',
      address: '15420 Old Cutler Rd',
      city: 'Palmetto Bay',
      state: 'FL',
      zipCode: '33157',
      country: 'USA',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Villa',
      status: 'ACTIVE',
      price: 3100000.00,
      pricePerSqft: 700.00,
      bedrooms: 6,
      bathrooms: 5,
      sqft: 4429,
      yearBuilt: 2018,
      parking: 3,
      pool: true,
      waterfront: false,
      furnished: false,
      petFriendly: true,
      latitude: 25.6218,
      longitude: -80.3235,
      subdivision: 'Old Cutler Estates',
      listingDate: new Date(),
      daysOnMarket: 18,
      userId: users.adminUser.id,
      categoria: 'SINGLE_FAMILY_HOMES'
    },
    {
      title: 'Contemporary Home in Doral',
      description: 'Sleek contemporary home with golf course views and resort-style amenities.',
      address: '9876 NW 75th St',
      city: 'Doral',
      state: 'FL',
      zipCode: '33178',
      country: 'USA',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Contemporary Home',
      status: 'ACTIVE',
      price: 1850000.00,
      pricePerSqft: 600.00,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3083,
      yearBuilt: 2021,
      parking: 2,
      pool: true,
      waterfront: false,
      furnished: false,
      petFriendly: true,
      latitude: 25.8067,
      longitude: -80.3549,
      subdivision: 'Doral Estates',
      listingDate: new Date(),
      daysOnMarket: 25,
      userId: users.adminUser.id,
      categoria: 'SINGLE_FAMILY_HOMES'
    },

    // 3. LUXURY CONDOS - 4 properties
    {
      title: 'Four Seasons Residences Miami',
      description: 'Prestigious Four Seasons branded residence with unparalleled service and panoramic views.',
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
      subdivision: 'Four Seasons Residences',
      listingDate: new Date(),
      daysOnMarket: 25,
      userId: users.adminUser.id,
      categoria: 'LUXURY_CONDOS'
    },
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
      price: 5200000.00,
      pricePerSqft: 1300.00,
      bedrooms: 4,
      bathrooms: 4.5,
      sqft: 4000,
      yearBuilt: 2017,
      parking: 3,
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
    {
      title: 'St. Regis Residences Bal Harbour',
      description: 'Exquisite luxury residence with world-class amenities and beachfront location.',
      address: '9703 Collins Ave #1201',
      city: 'Bal Harbour',
      state: 'FL',
      zipCode: '33154',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Beachfront Luxury',
      status: 'ACTIVE',
      price: 4800000.00,
      pricePerSqft: 1250.00,
      bedrooms: 3,
      bathrooms: 3.5,
      sqft: 3840,
      yearBuilt: 2019,
      parking: 2,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.8926,
      longitude: -80.1229,
      subdivision: 'St. Regis Residences',
      listingDate: new Date(),
      daysOnMarket: 14,
      userId: users.adminUser.id,
      categoria: 'LUXURY_CONDOS'
    },
    {
      title: 'Ritz-Carlton Residences Miami Beach',
      description: 'Sophisticated luxury living with Ritz-Carlton service and pristine beachfront access.',
      address: '4701 N Meridian Ave #319',
      city: 'Miami Beach',
      state: 'FL',
      zipCode: '33140',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Luxury Beachfront',
      status: 'ACTIVE',
      price: 2950000.00,
      pricePerSqft: 1150.00,
      bedrooms: 2,
      bathrooms: 2.5,
      sqft: 2565,
      yearBuilt: 2020,
      parking: 2,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.8169,
      longitude: -80.1278,
      subdivision: 'Ritz-Carlton Residences',
      listingDate: new Date(),
      daysOnMarket: 30,
      userId: users.adminUser.id,
      categoria: 'LUXURY_CONDOS'
    },

    // 4. NEIGHBORHOODS > Brickell - 4 properties
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
    {
      title: 'Brickell Heights East Tower',
      description: 'Contemporary condo with stunning city views in prestigious Brickell Heights.',
      address: '55 SW 9th St #2403',
      city: 'Miami',
      state: 'FL',
      zipCode: '33130',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'High-Rise Condo',
      status: 'ACTIVE',
      price: 980000.00,
      pricePerSqft: 780.00,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1256,
      yearBuilt: 2017,
      parking: 1,
      pool: true,
      waterfront: false,
      furnished: false,
      petFriendly: true,
      latitude: 25.7656,
      longitude: -80.1958,
      subdivision: 'Brickell Heights',
      listingDate: new Date(),
      daysOnMarket: 28,
      userId: users.adminUser.id,
      categoria: 'NEIGHBORHOODS',
      bairro: 'BRICKELL'
    },
    {
      title: 'Icon Brickell Tower 1',
      description: 'Luxury high-rise living with world-class amenities and bay views.',
      address: '465 Brickell Ave #4501',
      city: 'Miami',
      state: 'FL',
      zipCode: '33131',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Luxury High-Rise',
      status: 'ACTIVE',
      price: 1650000.00,
      pricePerSqft: 950.00,
      bedrooms: 2,
      bathrooms: 2.5,
      sqft: 1737,
      yearBuilt: 2008,
      parking: 2,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7634,
      longitude: -80.1901,
      subdivision: 'Icon Brickell',
      listingDate: new Date(),
      daysOnMarket: 16,
      userId: users.adminUser.id,
      categoria: 'NEIGHBORHOODS',
      bairro: 'BRICKELL'
    },
    {
      title: 'SLS Brickell Residences',
      description: 'Sophisticated living with Philippe Starck design and premium amenities.',
      address: '1300 S Miami Ave #1508',
      city: 'Miami',
      state: 'FL',
      zipCode: '33130',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Designer Condo',
      status: 'ACTIVE',
      price: 1450000.00,
      pricePerSqft: 900.00,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1611,
      yearBuilt: 2014,
      parking: 1,
      pool: true,
      waterfront: false,
      furnished: false,
      petFriendly: true,
      latitude: 25.7598,
      longitude: -80.1901,
      subdivision: 'SLS Brickell',
      listingDate: new Date(),
      daysOnMarket: 22,
      userId: users.adminUser.id,
      categoria: 'NEIGHBORHOODS',
      bairro: 'BRICKELL'
    },

    // 5. NEIGHBORHOODS > Edgewater - 4 properties
    {
      title: 'Edgewater Square Modern Residence',
      description: 'Stunning modern residence in trendy Edgewater with panoramic bay views.',
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
    {
      title: 'Paraiso Bay Luxury Tower',
      description: 'Ultra-modern luxury tower with resort-style amenities and bay access.',
      address: '600 NE 27th St #1801',
      city: 'Miami',
      state: 'FL',
      zipCode: '33137',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Luxury High-Rise',
      status: 'ACTIVE',
      price: 1280000.00,
      pricePerSqft: 820.00,
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 1561,
      yearBuilt: 2019,
      parking: 2,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7987,
      longitude: -80.1854,
      subdivision: 'Paraiso Bay',
      listingDate: new Date(),
      daysOnMarket: 12,
      userId: users.adminUser.id,
      categoria: 'NEIGHBORHOODS',
      bairro: 'EDGEWATER'
    },
    {
      title: 'Bay House Miami',
      description: 'Contemporary waterfront living with private marina and bay views.',
      address: '600 NE 27th St #904',
      city: 'Miami',
      state: 'FL',
      zipCode: '33137',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Waterfront Condo',
      status: 'ACTIVE',
      price: 950000.00,
      pricePerSqft: 800.00,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1188,
      yearBuilt: 2018,
      parking: 1,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7985,
      longitude: -80.1856,
      subdivision: 'Bay House',
      listingDate: new Date(),
      daysOnMarket: 19,
      userId: users.adminUser.id,
      categoria: 'NEIGHBORHOODS',
      bairro: 'EDGEWATER'
    },
    {
      title: 'Missoni Baia Edgewater',
      description: 'Luxury residence with Italian design and bayfront location.',
      address: '777 NE 26th Ter #503',
      city: 'Miami',
      state: 'FL',
      zipCode: '33137',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Designer Luxury',
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
      latitude: 25.7976,
      longitude: -80.1865,
      subdivision: 'Missoni Baia',
      listingDate: new Date(),
      daysOnMarket: 26,
      userId: users.adminUser.id,
      categoria: 'NEIGHBORHOODS',
      bairro: 'EDGEWATER'
    },

    // 6. NEIGHBORHOODS > Coconut Grove - 4 properties
    {
      title: 'Grove at Grand Bay Luxury',
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
    {
      title: 'Park Grove Tower Residence',
      description: 'Modern luxury tower with lush landscaping and bayfront location.',
      address: '2821 S Bayshore Dr #12C',
      city: 'Miami',
      state: 'FL',
      zipCode: '33133',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'High-Rise Condo',
      status: 'ACTIVE',
      price: 1850000.00,
      pricePerSqft: 850.00,
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2176,
      yearBuilt: 2017,
      parking: 2,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7156,
      longitude: -80.2387,
      subdivision: 'Park Grove',
      listingDate: new Date(),
      daysOnMarket: 24,
      userId: users.adminUser.id,
      categoria: 'NEIGHBORHOODS',
      bairro: 'COCONUT_GROVE'
    },
    {
      title: 'Vita at Grove Isle',
      description: 'Exclusive island living with marina access and tropical surroundings.',
      address: '4 Grove Isle Dr #A406',
      city: 'Miami',
      state: 'FL',
      zipCode: '33133',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Island Residence',
      status: 'ACTIVE',
      price: 1320000.00,
      pricePerSqft: 780.00,
      bedrooms: 2,
      bathrooms: 2.5,
      sqft: 1692,
      yearBuilt: 2006,
      parking: 2,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7098,
      longitude: -80.2456,
      subdivision: 'Vita at Grove Isle',
      listingDate: new Date(),
      daysOnMarket: 32,
      userId: users.adminUser.id,
      categoria: 'NEIGHBORHOODS',
      bairro: 'COCONUT_GROVE'
    },
    {
      title: 'Mutiny Park Coconut Grove',
      description: 'Boutique building with European charm and Grove lifestyle.',
      address: '2951 S Bayshore Dr #8B',
      city: 'Miami',
      state: 'FL',
      zipCode: '33133',
      country: 'USA',
      propertyType: 'CONDO',
      propertySubType: 'Boutique Condo',
      status: 'ACTIVE',
      price: 980000.00,
      pricePerSqft: 720.00,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1361,
      yearBuilt: 2005,
      parking: 1,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7134,
      longitude: -80.2398,
      subdivision: 'Mutiny Park',
      listingDate: new Date(),
      daysOnMarket: 28,
      userId: users.adminUser.id,
      categoria: 'NEIGHBORHOODS',
      bairro: 'COCONUT_GROVE'
    },

    // 7. NEIGHBORHOODS > The Roads - 4 properties
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
      subdivision: 'The Roads Historic',
      listingDate: new Date(),
      daysOnMarket: 25,
      userId: users.adminUser.id,
      categoria: 'NEIGHBORHOODS',
      bairro: 'THE_ROADS'
    },
    {
      title: 'Renovated Art Deco Home',
      description: 'Completely renovated Art Deco home with modern amenities and period charm.',
      address: '1545 SW 23rd St',
      city: 'Miami',
      state: 'FL',
      zipCode: '33145',
      country: 'USA',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Art Deco',
      status: 'ACTIVE',
      price: 1650000.00,
      pricePerSqft: 700.00,
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2357,
      yearBuilt: 1940,
      parking: 2,
      pool: true,
      waterfront: false,
      furnished: false,
      petFriendly: true,
      latitude: 25.7521,
      longitude: -80.2189,
      subdivision: 'The Roads',
      listingDate: new Date(),
      daysOnMarket: 18,
      userId: users.adminUser.id,
      categoria: 'NEIGHBORHOODS',
      bairro: 'THE_ROADS'
    },
    {
      title: 'Colonial Revival Masterpiece',
      description: 'Stunning Colonial Revival home with original details and modern updates.',
      address: '2210 SW 21st Ave',
      city: 'Miami',
      state: 'FL',
      zipCode: '33145',
      country: 'USA',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Colonial Revival',
      status: 'ACTIVE',
      price: 2200000.00,
      pricePerSqft: 750.00,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 2933,
      yearBuilt: 1928,
      parking: 3,
      pool: true,
      waterfront: false,
      furnished: false,
      petFriendly: true,
      latitude: 25.7565,
      longitude: -80.2178,
      subdivision: 'The Roads Estate',
      listingDate: new Date(),
      daysOnMarket: 35,
      userId: users.adminUser.id,
      categoria: 'NEIGHBORHOODS',
      bairro: 'THE_ROADS'
    },
    {
      title: 'Modern Roads Residence',
      description: 'Contemporary home blending modern design with neighborhood character.',
      address: '1890 SW 24th Ter',
      city: 'Miami',
      state: 'FL',
      zipCode: '33145',
      country: 'USA',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Modern',
      status: 'ACTIVE',
      price: 1450000.00,
      pricePerSqft: 650.00,
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 2231,
      yearBuilt: 2019,
      parking: 2,
      pool: true,
      waterfront: false,
      furnished: false,
      petFriendly: true,
      latitude: 25.7498,
      longitude: -80.2201,
      subdivision: 'The Roads Modern',
      listingDate: new Date(),
      daysOnMarket: 20,
      userId: users.adminUser.id,
      categoria: 'NEIGHBORHOODS',
      bairro: 'THE_ROADS'
    }
  ];

  for (const propertyData of sampleProperties) {
    try {
      const property = await prisma.property.create({
        data: propertyData
      });

      // Add sample image if available
      if (hasImage) {
        await prisma.propertyImage.create({
          data: {
            propertyId: property.id,
            url: '/uploads/properties/sample-property.jpeg',
            caption: 'Property Image',
            isPrimary: true,
            order: 1
          }
        });
      }

      console.log(`✓ Created: ${property.title}`);
    } catch (error) {
      console.error(`❌ Error creating property ${propertyData.title}:`, error.message);
    }
  }

  console.log('✅ Sample properties created with correct categories and images!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });