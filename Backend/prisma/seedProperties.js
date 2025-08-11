
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
  await prisma.propertyImage.deleteMany();
  await prisma.propertyAmenity.deleteMany();
  await prisma.propertyFeature.deleteMany();
  await prisma.property.deleteMany();

  // Complete sample properties with all data fields
  const sampleProperties = [
    // NEW DEVELOPMENTS
    {
      title: 'Echo Brickell - Brand New Luxury Tower',
      description: 'Experience the pinnacle of luxury living in this brand new development in the heart of Brickell. Features floor-to-ceiling windows, premium finishes, and world-class amenities including infinity pool, spa, fitness center, concierge service, and private elevators. The unit boasts marble floors throughout, gourmet kitchen with top-of-the-line appliances, and breathtaking bay and city views.',
      address: '1451 Brickell Ave #3201',
      city: 'Miami',
      state: 'FL',
      zipCode: '33131',
      country: 'USA',
      subdivision: 'Echo Brickell',
      propertyType: 'CONDO',
      propertySubType: 'High-Rise Luxury Condo',
      status: 'ACTIVE',
      price: 1850000.00,
      pricePerSqft: 950.00,
      bedrooms: 2,
      bathrooms: 2.5,
      halfBaths: 1,
      sqft: 1950,
      adjustedSqft: 1950,
      lotSize: null,
      yearBuilt: 2024,
      garage: null,
      parking: 2,
      parkingSpaces: 2,
      parkingDescription: 'Two assigned covered parking spaces',
      pool: true,
      waterfront: true,
      waterfrontDescription: 'Biscayne Bay waterfront with marina access',
      furnished: false,
      petFriendly: true,
      newConstruction: true,
      latitude: 25.7617,
      longitude: -80.1918,
      listingDate: new Date(),
      daysOnMarket: 5,
      virtualTour: 'https://example.com/virtual-tour-echo-brickell',
      amenities: 'Infinity Pool, Spa, Fitness Center, Concierge, Valet Parking, Marina, Rooftop Terrace, Business Center',
      interiorFeatures: 'Floor-to-ceiling windows, Marble floors, Gourmet kitchen, Italian cabinetry, Premium appliances, Walk-in closets, Smart home automation',
      exteriorFeatures: 'Private balcony, Bay views, City views, Hurricane impact windows',
      hoaFees: 850.00,
      taxAmount: 18500.00,
      taxYear: 2024,
      listingCourtesy: 'Echo Brickell Sales Gallery',
      listingAgent: 'Maria Rodriguez',
      listingOffice: 'Compass Miami',
      shortSale: 'Regular Sale',
      mlsId: 'A12345678',
      categoria: 'NEW_DEVELOPMENTS',
      bairro: 'BRICKELL',
      userId: adminUser.id,
      images: {
        principal: {
          url: 'echo-brickell-principal.jpg',
          caption: 'Echo Brickell - Stunning Bay Views'
        },
        galeria: [
          { url: 'echo-brickell-living.jpg', caption: 'Spacious Living Room' },
          { url: 'echo-brickell-kitchen.jpg', caption: 'Gourmet Kitchen' },
          { url: 'echo-brickell-bedroom.jpg', caption: 'Master Bedroom' },
          { url: 'echo-brickell-bathroom.jpg', caption: 'Luxury Bathroom' },
          { url: 'echo-brickell-balcony.jpg', caption: 'Private Balcony' },
          { url: 'echo-brickell-amenities.jpg', caption: 'Building Amenities' }
        ]
      }
    },
    {
      title: 'Aston Martin Residences - Ultra Luxury',
      description: 'Exclusive new development featuring Aston Martin designed interiors and amenities. This ultra-luxury residence offers unparalleled sophistication with bespoke finishes, private elevator access, butler service, and breathtaking panoramic ocean views. The residence features custom millwork, premium appliances, and access to world-class amenities including a private marina, art gallery, and exclusive beach club.',
      address: '300 Biscayne Blvd Way #4501',
      city: 'Miami',
      state: 'FL',
      zipCode: '33131',
      country: 'USA',
      subdivision: 'Aston Martin Residences',
      propertyType: 'CONDO',
      propertySubType: 'Ultra-Luxury Penthouse',
      status: 'ACTIVE',
      price: 4500000.00,
      pricePerSqft: 1200.00,
      bedrooms: 3,
      bathrooms: 3.5,
      halfBaths: 1,
      sqft: 3750,
      adjustedSqft: 3750,
      lotSize: null,
      yearBuilt: 2024,
      garage: null,
      parking: 3,
      parkingSpaces: 3,
      parkingDescription: 'Three valet parking spaces',
      pool: true,
      waterfront: true,
      waterfrontDescription: 'Direct ocean access with private beach',
      furnished: true,
      petFriendly: true,
      newConstruction: true,
      latitude: 25.7753,
      longitude: -80.1878,
      listingDate: new Date(),
      daysOnMarket: 12,
      virtualTour: 'https://example.com/virtual-tour-aston-martin',
      amenities: 'Private Marina, Art Gallery, Beach Club, Spa, Butler Service, Private Elevators, Wine Cellar, Racing Simulator',
      interiorFeatures: 'Aston Martin Design, Custom Millwork, Premium Appliances, Italian Marble, Smart Home Technology, Wine Storage',
      exteriorFeatures: 'Ocean Views, Private Terraces, Hurricane Impact Windows, Floor-to-ceiling Glass',
      hoaFees: 2500.00,
      taxAmount: 45000.00,
      taxYear: 2024,
      listingCourtesy: 'Aston Martin Residences Sales',
      listingAgent: 'James Thompson',
      listingOffice: 'Douglas Elliman',
      shortSale: 'Regular Sale',
      mlsId: 'A12345679',
      categoria: 'NEW_DEVELOPMENTS',
      bairro: null,
      userId: adminUser.id,
      images: {
        principal: {
          url: 'aston-martin-principal.jpg',
          caption: 'Aston Martin Residences - Ultra Luxury Living'
        },
        galeria: [
          { url: 'aston-martin-living.jpg', caption: 'Designer Living Space' },
          { url: 'aston-martin-kitchen.jpg', caption: 'Chef Kitchen' },
          { url: 'aston-martin-master.jpg', caption: 'Master Suite' },
          { url: 'aston-martin-terrace.jpg', caption: 'Private Terrace' },
          { url: 'aston-martin-amenities.jpg', caption: 'Exclusive Amenities' }
        ]
      }
    },

    // LUXURY CONDOS
    {
      title: 'Four Seasons Residences Miami',
      description: 'Prestigious Four Seasons branded residence with unparalleled service and amenities. This sophisticated residence offers white-glove service, marble floors throughout, chef-quality kitchen with top-tier appliances, and panoramic bay views. Residents enjoy access to Five-Star Four Seasons amenities including spa services, fine dining, and personalized concierge.',
      address: '1425 Brickell Ave #62A',
      city: 'Miami',
      state: 'FL',
      zipCode: '33131',
      country: 'USA',
      subdivision: 'Four Seasons Residences',
      propertyType: 'CONDO',
      propertySubType: 'Luxury High-Rise Condo',
      status: 'ACTIVE',
      price: 3200000.00,
      pricePerSqft: 1100.00,
      bedrooms: 3,
      bathrooms: 3.5,
      halfBaths: 1,
      sqft: 2910,
      adjustedSqft: 2910,
      lotSize: null,
      yearBuilt: 2018,
      garage: null,
      parking: 2,
      parkingSpaces: 2,
      parkingDescription: 'Two assigned covered spaces',
      pool: true,
      waterfront: true,
      waterfrontDescription: 'Biscayne Bay waterfront with boat slips available',
      furnished: false,
      petFriendly: true,
      newConstruction: false,
      latitude: 25.7612,
      longitude: -80.1915,
      listingDate: new Date(),
      daysOnMarket: 25,
      virtualTour: 'https://example.com/virtual-tour-four-seasons',
      amenities: 'Four Seasons Hotel Services, Spa, Fine Dining, Concierge, Fitness Center, Pool Deck, Business Center',
      interiorFeatures: 'Marble floors, Chef kitchen, Premium appliances, Walk-in closets, Built-in storage, Crown molding',
      exteriorFeatures: 'Bay views, Private balcony, Hurricane windows, Waterfront access',
      hoaFees: 1800.00,
      taxAmount: 32000.00,
      taxYear: 2024,
      listingCourtesy: 'Four Seasons Residences',
      listingAgent: 'Isabella Chen',
      listingOffice: 'Coldwell Banker',
      shortSale: 'Regular Sale',
      mlsId: 'A12345680',
      categoria: 'LUXURY_CONDOS',
      bairro: 'BRICKELL',
      userId: adminUser.id,
      images: {
        principal: {
          url: 'four-seasons-principal.jpg',
          caption: 'Four Seasons Residences - Luxury Defined'
        },
        galeria: [
          { url: 'four-seasons-living.jpg', caption: 'Elegant Living Room' },
          { url: 'four-seasons-dining.jpg', caption: 'Formal Dining Area' },
          { url: 'four-seasons-kitchen.jpg', caption: 'Gourmet Kitchen' },
          { url: 'four-seasons-master.jpg', caption: 'Master Bedroom Suite' },
          { url: 'four-seasons-view.jpg', caption: 'Panoramic Bay Views' }
        ]
      }
    },

    // SINGLE FAMILY HOMES
    {
      title: 'Stunning Coral Gables Estate',
      description: 'Magnificent single family estate in prestigious Coral Gables. This architectural masterpiece features 6 bedrooms, 5.5 bathrooms, gourmet kitchen with butler pantry, library, wine cellar, resort-style pool with spa, outdoor summer kitchen, and lush landscaping on an oversized corner lot. The property combines classic Mediterranean architecture with modern luxury amenities.',
      address: '1234 Coral Way',
      city: 'Coral Gables',
      state: 'FL',
      zipCode: '33134',
      country: 'USA',
      subdivision: 'Coral Gables Estates',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Mediterranean Estate',
      status: 'ACTIVE',
      price: 2800000.00,
      pricePerSqft: 650.00,
      bedrooms: 6,
      bathrooms: 5.5,
      halfBaths: 1,
      sqft: 4308,
      adjustedSqft: 4308,
      lotSize: 0.45,
      yearBuilt: 2015,
      garage: 3,
      parking: 6,
      parkingSpaces: 6,
      parkingDescription: '3-car garage plus circular driveway',
      pool: true,
      waterfront: false,
      waterfrontDescription: null,
      furnished: false,
      petFriendly: true,
      newConstruction: false,
      latitude: 25.7463,
      longitude: -80.2581,
      listingDate: new Date(),
      daysOnMarket: 18,
      virtualTour: 'https://example.com/virtual-tour-coral-gables',
      amenities: 'Private pool, Wine cellar, Library, Summer kitchen, Garden, Security system',
      interiorFeatures: 'Marble floors, Crown molding, Coffered ceilings, Gourmet kitchen, Butler pantry, Master suite, Walk-in closets',
      exteriorFeatures: 'Mediterranean architecture, Tile roof, Covered terraces, Outdoor kitchen, Pool and spa, Mature landscaping',
      hoaFees: 0.00,
      taxAmount: 28000.00,
      taxYear: 2024,
      listingCourtesy: 'Coral Gables Realty',
      listingAgent: 'Carlos Mendoza',
      listingOffice: 'The Keyes Company',
      shortSale: 'Regular Sale',
      mlsId: 'A12345681',
      categoria: 'SINGLE_FAMILY_HOMES',
      bairro: null,
      userId: adminUser.id,
      images: {
        principal: {
          url: 'coral-gables-principal.jpg',
          caption: 'Coral Gables Estate - Mediterranean Elegance'
        },
        galeria: [
          { url: 'coral-gables-exterior.jpg', caption: 'Stunning Exterior' },
          { url: 'coral-gables-foyer.jpg', caption: 'Grand Foyer' },
          { url: 'coral-gables-kitchen.jpg', caption: 'Gourmet Kitchen' },
          { url: 'coral-gables-pool.jpg', caption: 'Resort-Style Pool' },
          { url: 'coral-gables-master.jpg', caption: 'Master Bedroom' },
          { url: 'coral-gables-garden.jpg', caption: 'Lush Gardens' }
        ]
      }
    },
    {
      title: 'Modern Coconut Grove Family Home',
      description: 'Contemporary single family home in desirable Coconut Grove. This modern architectural gem features an open floor plan, chef kitchen with waterfall island, floor-to-ceiling windows, rooftop terrace, and beautiful outdoor entertaining area with pool and outdoor kitchen. The home seamlessly blends indoor-outdoor living with sophisticated design elements.',
      address: '3456 Main Hwy',
      city: 'Coconut Grove',
      state: 'FL',
      zipCode: '33133',
      country: 'USA',
      subdivision: 'Grove Estates',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Modern Contemporary',
      status: 'ACTIVE',
      price: 1950000.00,
      pricePerSqft: 750.00,
      bedrooms: 4,
      bathrooms: 3.5,
      halfBaths: 1,
      sqft: 2600,
      adjustedSqft: 2600,
      lotSize: 0.25,
      yearBuilt: 2019,
      garage: 2,
      parking: 4,
      parkingSpaces: 4,
      parkingDescription: '2-car garage plus driveway',
      pool: true,
      waterfront: false,
      waterfrontDescription: null,
      furnished: false,
      petFriendly: true,
      newConstruction: false,
      latitude: 25.7285,
      longitude: -80.2436,
      listingDate: new Date(),
      daysOnMarket: 32,
      virtualTour: 'https://example.com/virtual-tour-coconut-grove',
      amenities: 'Pool, Outdoor kitchen, Rooftop terrace, Smart home system, Security cameras',
      interiorFeatures: 'Open floor plan, Floor-to-ceiling windows, Chef kitchen, Waterfall island, Smart home technology, Built-in storage',
      exteriorFeatures: 'Modern architecture, Pool deck, Outdoor kitchen, Rooftop terrace, Landscaped yard',
      hoaFees: 0.00,
      taxAmount: 19500.00,
      taxYear: 2024,
      listingCourtesy: 'Grove Properties',
      listingAgent: 'Sarah Williams',
      listingOffice: 'Engel & Völkers',
      shortSale: 'Regular Sale',
      mlsId: 'A12345682',
      categoria: 'SINGLE_FAMILY_HOMES',
      bairro: 'COCONUT_GROVE',
      userId: adminUser.id,
      images: {
        principal: {
          url: 'coconut-grove-principal.jpg',
          caption: 'Modern Coconut Grove Home'
        },
        galeria: [
          { url: 'coconut-grove-living.jpg', caption: 'Open Living Space' },
          { url: 'coconut-grove-kitchen.jpg', caption: 'Chef Kitchen' },
          { url: 'coconut-grove-pool.jpg', caption: 'Pool Area' },
          { url: 'coconut-grove-rooftop.jpg', caption: 'Rooftop Terrace' }
        ]
      }
    },

    // WATERFRONT PROPERTIES
    {
      title: 'Venetian Islands Waterfront Mansion',
      description: 'Spectacular waterfront mansion with 100 feet of water frontage on Biscayne Bay, private dock accommodating large yachts, and stunning panoramic bay and city skyline views. This architectural masterpiece features 5 bedrooms, 6 bathrooms, elevator, wine cellar, home theater, infinity pool, and outdoor entertaining areas perfect for the South Florida lifestyle.',
      address: '46 S Venetian Way',
      city: 'Miami Beach',
      state: 'FL',
      zipCode: '33139',
      country: 'USA',
      subdivision: 'Venetian Islands',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Waterfront Mansion',
      status: 'ACTIVE',
      price: 6500000.00,
      pricePerSqft: 1300.00,
      bedrooms: 5,
      bathrooms: 6,
      halfBaths: 2,
      sqft: 5000,
      adjustedSqft: 5000,
      lotSize: 0.35,
      yearBuilt: 2020,
      garage: 3,
      parking: 6,
      parkingSpaces: 6,
      parkingDescription: '3-car garage plus circular driveway',
      pool: true,
      waterfront: true,
      waterfrontDescription: '100 feet of water frontage with private dock and boat lift',
      furnished: false,
      petFriendly: true,
      newConstruction: false,
      latitude: 25.7663,
      longitude: -80.1510,
      listingDate: new Date(),
      daysOnMarket: 45,
      virtualTour: 'https://example.com/virtual-tour-venetian-islands',
      amenities: 'Private dock, Boat lift, Infinity pool, Home theater, Wine cellar, Elevator, Security system',
      interiorFeatures: 'Elevator, Wine cellar, Home theater, Gourmet kitchen, Master suite, Walk-in closets, Built-in bar',
      exteriorFeatures: 'Waterfront location, Private dock, Infinity pool, Outdoor kitchen, Bay views, Mature landscaping',
      hoaFees: 500.00,
      taxAmount: 65000.00,
      taxYear: 2024,
      listingCourtesy: 'Venetian Properties',
      listingAgent: 'Michael Davis',
      listingOffice: 'ONE Sotheby\'s International Realty',
      shortSale: 'Regular Sale',
      mlsId: 'A12345683',
      categoria: 'SINGLE_FAMILY_HOMES',
      bairro: null,
      userId: adminUser.id,
      images: {
        principal: {
          url: 'venetian-islands-principal.jpg',
          caption: 'Venetian Islands Waterfront Mansion'
        },
        galeria: [
          { url: 'venetian-islands-dock.jpg', caption: 'Private Dock' },
          { url: 'venetian-islands-pool.jpg', caption: 'Infinity Pool' },
          { url: 'venetian-islands-interior.jpg', caption: 'Luxury Interior' },
          { url: 'venetian-islands-view.jpg', caption: 'Bay Views' }
        ]
      }
    },

    // EDGEWATER PROPERTIES
    {
      title: 'Edgewater Modern High-Rise',
      description: 'Stunning high-rise condo in trendy Edgewater with panoramic bay views and modern design. This contemporary residence features floor-to-ceiling windows, open floor plan, gourmet kitchen with premium appliances, and access to resort-style amenities including rooftop pool, fitness center, and concierge services.',
      address: '788 NE 23rd St #1205',
      city: 'Miami',
      state: 'FL',
      zipCode: '33137',
      country: 'USA',
      subdivision: 'Edgewater Square',
      propertyType: 'CONDO',
      propertySubType: 'High-Rise Modern Condo',
      status: 'ACTIVE',
      price: 875000.00,
      pricePerSqft: 750.00,
      bedrooms: 2,
      bathrooms: 2,
      halfBaths: 0,
      sqft: 1167,
      adjustedSqft: 1167,
      lotSize: null,
      yearBuilt: 2021,
      garage: null,
      parking: 1,
      parkingSpaces: 1,
      parkingDescription: 'One assigned parking space',
      pool: true,
      waterfront: true,
      waterfrontDescription: 'Bay views and water access nearby',
      furnished: false,
      petFriendly: true,
      newConstruction: false,
      latitude: 25.7943,
      longitude: -80.1927,
      listingDate: new Date(),
      daysOnMarket: 15,
      virtualTour: 'https://example.com/virtual-tour-edgewater',
      amenities: 'Rooftop pool, Fitness center, Concierge, Business center, Rooftop terrace',
      interiorFeatures: 'Floor-to-ceiling windows, Open floor plan, Modern kitchen, Premium appliances, Walk-in closet',
      exteriorFeatures: 'Bay views, Private balcony, Modern architecture, Hurricane impact windows',
      hoaFees: 650.00,
      taxAmount: 8750.00,
      taxYear: 2024,
      listingCourtesy: 'Edgewater Properties',
      listingAgent: 'Jennifer Park',
      listingOffice: 'Related ISG',
      shortSale: 'Regular Sale',
      mlsId: 'A12345684',
      categoria: 'LUXURY_CONDOS',
      bairro: 'EDGEWATER',
      userId: adminUser.id,
      images: {
        principal: {
          url: 'edgewater-principal.jpg',
          caption: 'Edgewater Modern Living'
        },
        galeria: [
          { url: 'edgewater-living.jpg', caption: 'Modern Living Room' },
          { url: 'edgewater-kitchen.jpg', caption: 'Gourmet Kitchen' },
          { url: 'edgewater-bedroom.jpg', caption: 'Master Bedroom' },
          { url: 'edgewater-view.jpg', caption: 'Bay Views' }
        ]
      }
    },

    // THE ROADS PROPERTIES
    {
      title: 'Historic The Roads Charmer',
      description: 'Beautifully restored historic home in The Roads neighborhood. This charming residence features original architectural details including hardwood floors, crown molding, and decorative elements, seamlessly blended with modern updates including renovated kitchen, updated bathrooms, and smart home technology.',
      address: '1357 SW 22nd Ave',
      city: 'Miami',
      state: 'FL',
      zipCode: '33145',
      country: 'USA',
      subdivision: 'The Roads Historic District',
      propertyType: 'SINGLE_FAMILY',
      propertySubType: 'Historic Mediterranean Revival',
      status: 'ACTIVE',
      price: 1250000.00,
      pricePerSqft: 625.00,
      bedrooms: 3,
      bathrooms: 2.5,
      halfBaths: 1,
      sqft: 2000,
      adjustedSqft: 2000,
      lotSize: 0.18,
      yearBuilt: 1925,
      garage: 2,
      parking: 3,
      parkingSpaces: 3,
      parkingDescription: '2-car garage plus driveway',
      pool: true,
      waterfront: false,
      waterfrontDescription: null,
      furnished: false,
      petFriendly: true,
      newConstruction: false,
      latitude: 25.7543,
      longitude: -80.2234,
      listingDate: new Date(),
      daysOnMarket: 22,
      virtualTour: 'https://example.com/virtual-tour-the-roads',
      amenities: 'Historic charm, Updated systems, Pool, Garden, Security system',
      interiorFeatures: 'Original hardwood floors, Crown molding, Updated kitchen, Renovated bathrooms, Period details',
      exteriorFeatures: 'Historic architecture, Tile roof, Pool, Mature trees, Garden',
      hoaFees: 0.00,
      taxAmount: 12500.00,
      taxYear: 2024,
      listingCourtesy: 'The Roads Realty',
      listingAgent: 'Patricia Lopez',
      listingOffice: 'Compass',
      shortSale: 'Regular Sale',
      mlsId: 'A12345685',
      categoria: 'SINGLE_FAMILY_HOMES',
      bairro: 'THE_ROADS',
      userId: adminUser.id,
      images: {
        principal: {
          url: 'the-roads-principal.jpg',
          caption: 'Historic Roads Charmer'
        },
        galeria: [
          { url: 'the-roads-exterior.jpg', caption: 'Historic Architecture' },
          { url: 'the-roads-living.jpg', caption: 'Original Details' },
          { url: 'the-roads-kitchen.jpg', caption: 'Updated Kitchen' },
          { url: 'the-roads-pool.jpg', caption: 'Private Pool' }
        ]
      }
    }
  ];

  // Create properties
  for (const propertyData of sampleProperties) {
    const { images, ...propertyWithoutImages } = propertyData;

    const property = await prisma.property.create({
      data: propertyWithoutImages
    });

    // Create principal image
    if (images.principal) {
      await prisma.propertyImage.create({
        data: {
          propertyId: property.id,
          url: images.principal.url,
          caption: images.principal.caption,
          isPrimary: true,
          order: 0
        }
      });
    }

    // Create gallery images
    if (images.galeria && images.galeria.length > 0) {
      for (let i = 0; i < images.galeria.length; i++) {
        await prisma.propertyImage.create({
          data: {
            propertyId: property.id,
            url: images.galeria[i].url,
            caption: images.galeria[i].caption,
            isPrimary: false,
            order: i + 1
          }
        });
      }
    }

    console.log(`✓ Created property: ${property.title}`);
    console.log(`  📸 Images: 1 principal + ${images.galeria?.length || 0} galeria`);
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
