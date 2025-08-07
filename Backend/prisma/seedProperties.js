
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedProperties() {
  console.log('🏠 Starting properties seed...');

  // First, ensure categories exist
  const categories = [
    { name: 'New Developments', description: 'Newly built or under construction properties' },
    { name: 'Luxury Condos', description: 'High-end condominium properties with premium amenities' },
    { name: 'Single Family Homes', description: 'Detached single family residential properties' },
    { name: 'Waterfront Properties', description: 'Properties with direct water access or water views' },
    { name: 'Golf Course Properties', description: 'Properties located near or overlooking golf courses' },
    { name: 'Private & Exclusive', description: 'Exclusive luxury properties with enhanced privacy' },
    // Neighborhoods
    { name: 'Brickell', description: 'Properties in the Brickell neighborhood' },
    { name: 'Edgewater', description: 'Properties in the Edgewater neighborhood' },
    { name: 'Coconut Grove', description: 'Properties in the Coconut Grove neighborhood' },
    { name: 'The Roads', description: 'Properties in The Roads neighborhood' }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category
    });
  }

  // Get or create admin user
  let adminUser = await prisma.user.findFirst({
    where: { role: 'ADMIN' }
  });

  if (!adminUser) {
    const bcrypt = require('bcryptjs');
    adminUser = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@dayannecosta.com',
        password: await bcrypt.hash('admin123', 12),
        role: 'ADMIN'
      }
    });
  }

  // Clear existing properties
  await prisma.propertyCategory.deleteMany();
  await prisma.propertyAmenity.deleteMany();
  await prisma.propertyFeature.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.property.deleteMany();

  // Sample properties for each category
  const sampleProperties = [
    // New Developments
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
      userId: adminUser.id,
      categories: ['New Developments', 'Luxury Condos', 'Brickell']
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
      userId: adminUser.id,
      categories: ['New Developments', 'Luxury Condos', 'Private & Exclusive']
    },
    // Luxury Condos
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
      userId: adminUser.id,
      categories: ['Luxury Condos', 'Brickell', 'Waterfront Properties']
    },
    // Single Family Homes
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
      userId: adminUser.id,
      categories: ['Single Family Homes', 'Private & Exclusive']
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
      userId: adminUser.id,
      categories: ['Single Family Homes', 'Coconut Grove']
    },
    // Waterfront Properties
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
      userId: adminUser.id,
      categories: ['Waterfront Properties', 'Single Family Homes', 'Private & Exclusive']
    },
    // Golf Course Properties
    {
      title: 'Doral Golf Course Estate',
      description: 'Magnificent estate home overlooking championship golf course. Features 5 bedrooms, gourmet kitchen, and resort-style amenities.',
      address: '9876 Golf Course Dr',
      city: 'Doral',
      state: 'FL',
      zipCode: '33178',
      country: 'USA',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Golf Course Home',
      status: 'ACTIVE',
      price: 2200000.00,
      pricePerSqft: 550.00,
      bedrooms: 5,
      bathrooms: 4.5,
      sqft: 4000,
      yearBuilt: 2017,
      garage: 3,
      parking: 4,
      pool: true,
      waterfront: false,
      furnished: false,
      petFriendly: true,
      latitude: 25.8067,
      longitude: -80.3549,
      neighborhood: 'Doral',
      subdivision: 'Doral Golf Estates',
      listingDate: new Date(),
      daysOnMarket: 28,
      userId: adminUser.id,
      categories: ['Golf Course Properties', 'Single Family Homes']
    },
    // Edgewater Properties
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
      userId: adminUser.id,
      categories: ['Edgewater', 'Luxury Condos']
    },
    // The Roads Properties
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
      userId: adminUser.id,
      categories: ['The Roads', 'Single Family Homes']
    }
  ];

  // Create properties and associate with categories
  for (const propertyData of sampleProperties) {
    const { categories: categoryNames, ...propertyWithoutCategories } = propertyData;

    const property = await prisma.property.create({
      data: propertyWithoutCategories
    });

    // Associate with categories
    for (const categoryName of categoryNames) {
      const category = await prisma.category.findFirst({
        where: { name: categoryName }
      });

      if (category) {
        await prisma.propertyCategory.create({
          data: {
            propertyId: property.id,
            categoryId: category.id
          }
        });
      }
    }

    console.log(`✓ Created property: ${property.title}`);
  }

  console.log('✅ Properties seed completed!');
}

seedProperties()
  .catch((e) => {
    console.error('❌ Error during properties seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

module.exports = seedProperties;
