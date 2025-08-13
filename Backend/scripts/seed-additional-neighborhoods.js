
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ===== IMAGES VARIABLES FOR NEW NEIGHBORHOODS =====
// Principal Images
const principalImages = {
  brickellNew: {
    url: '/img/brickell-new-principal.jpg',
    caption: 'Brickell - Modern Urban Living'
  },
  coconutGroveNew: {
    url: '/img/coconut-grove-new-principal.jpg',
    caption: 'Coconut Grove - Tropical Luxury'
  },
  miamiBeach: {
    url: '/img/miami-beach-principal.jpg',
    caption: 'Miami Beach - Ocean Paradise'
  },
  downtown: {
    url: '/img/downtown-principal.jpg',
    caption: 'Downtown Miami - City Center'
  }
};

// Gallery Images
const galleryImages = {
  brickellNew: [
    { url: '/img/brickell-new-living.jpg', caption: 'Modern Living Space' },
    { url: '/img/brickell-new-kitchen.jpg', caption: 'Designer Kitchen' },
    { url: '/img/brickell-new-bedroom.jpg', caption: 'Master Bedroom' },
    { url: '/img/brickell-new-view.jpg', caption: 'City Views' },
    { url: '/img/brickell-new-amenities.jpg', caption: 'Building Amenities' }
  ],
  coconutGroveNew: [
    { url: '/img/coconut-grove-new-exterior.jpg', caption: 'Beautiful Exterior' },
    { url: '/img/coconut-grove-new-interior.jpg', caption: 'Elegant Interior' },
    { url: '/img/coconut-grove-new-pool.jpg', caption: 'Private Pool' },
    { url: '/img/coconut-grove-new-garden.jpg', caption: 'Lush Gardens' }
  ],
  miamiBeach: [
    { url: '/img/miami-beach-ocean.jpg', caption: 'Ocean Views' },
    { url: '/img/miami-beach-living.jpg', caption: 'Beachfront Living' },
    { url: '/img/miami-beach-balcony.jpg', caption: 'Private Balcony' },
    { url: '/img/miami-beach-amenities.jpg', caption: 'Resort Amenities' },
    { url: '/img/miami-beach-bedroom.jpg', caption: 'Ocean View Bedroom' }
  ],
  downtown: [
    { url: '/img/downtown-skyline.jpg', caption: 'Skyline Views' },
    { url: '/img/downtown-loft.jpg', caption: 'Urban Loft Style' },
    { url: '/img/downtown-rooftop.jpg', caption: 'Rooftop Terrace' },
    { url: '/img/downtown-lobby.jpg', caption: 'Modern Lobby' }
  ]
};

async function seedAdditionalNeighborhoods() {
  console.log('🏠 Starting additional neighborhoods seed...');

  try {
    // Connect to database
    await prisma.$connect();

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

    // New properties for the additional neighborhoods
    const additionalProperties = [
      // BRICKELL PROPERTIES
      {
        title: 'Brickell Heights Luxury Tower',
        description: 'Experience sophisticated urban living in this stunning Brickell Heights residence. Features panoramic city and bay views, floor-to-ceiling windows, premium finishes, and access to world-class amenities including infinity pool, fitness center, and concierge services.',
        address: '1300 Brickell Bay Dr #2903',
        city: 'Miami',
        state: 'FL',
        zipCode: '33131',
        country: 'USA',
        subdivision: 'Brickell Heights',
        propertyType: 'CONDO',
        propertySubType: 'High-Rise Luxury Condo',
        status: 'ACTIVE',
        price: 1650000.00,
        pricePerSqft: 900.00,
        bedrooms: 2,
        bathrooms: 2.5,
        halfBaths: 1,
        sqft: 1833,
        adjustedSqft: 1833,
        lotSize: null,
        yearBuilt: 2023,
        garage: null,
        parking: 2,
        parkingSpaces: 2,
        parkingDescription: 'Two assigned covered parking spaces',
        pool: true,
        waterfront: true,
        waterfrontDescription: 'Biscayne Bay waterfront with marina access',
        furnished: false,
        petFriendly: true,
        newConstruction: false,
        latitude: 25.7617,
        longitude: -80.1918,
        listingDate: new Date(),
        daysOnMarket: 8,
        virtualTour: 'https://example.com/virtual-tour-brickell-heights',
        amenities: 'Infinity Pool, Spa, Fitness Center, Concierge, Rooftop Terrace, Business Center, Valet Parking',
        interiorFeatures: 'Floor-to-ceiling windows, Italian marble floors, Gourmet kitchen, Premium appliances, Walk-in closets, Smart home system',
        exteriorFeatures: 'Private balcony, Bay and city views, Hurricane impact windows',
        hoaFees: 780.00,
        taxAmount: 16500.00,
        taxYear: 2024,
        listingCourtesy: 'Brickell Properties',
        listingAgent: 'Amanda Silva',
        listingOffice: 'Compass Miami',
        shortSale: 'Regular Sale',
        mlsId: 'A12345700',
        categoria: 'NEIGHBORHOODS',
        bairro: 'BRICKELL',
        userId: adminUser.id,
        images: {
          principal: principalImages.brickellNew,
          galeria: galleryImages.brickellNew
        }
      },
      {
        title: 'Brickell City Centre Penthouse',
        description: 'Spectacular penthouse in the heart of Brickell City Centre. This exclusive residence features 3 bedrooms, 3.5 bathrooms, private elevator access, wraparound terraces, and unobstructed views of the city and bay.',
        address: '68 SE 6th St #PH4201',
        city: 'Miami',
        state: 'FL',
        zipCode: '33131',
        country: 'USA',
        subdivision: 'Brickell City Centre',
        propertyType: 'CONDO',
        propertySubType: 'Penthouse',
        status: 'ACTIVE',
        price: 3200000.00,
        pricePerSqft: 1150.00,
        bedrooms: 3,
        bathrooms: 3.5,
        halfBaths: 1,
        sqft: 2783,
        adjustedSqft: 2783,
        lotSize: null,
        yearBuilt: 2022,
        garage: null,
        parking: 3,
        parkingSpaces: 3,
        parkingDescription: 'Three valet parking spaces',
        pool: true,
        waterfront: true,
        waterfrontDescription: 'Bay views from wraparound terraces',
        furnished: false,
        petFriendly: true,
        newConstruction: false,
        latitude: 25.7645,
        longitude: -80.1920,
        listingDate: new Date(),
        daysOnMarket: 12,
        virtualTour: 'https://example.com/virtual-tour-brickell-penthouse',
        amenities: 'Private elevator, Rooftop pool, Spa, Fitness center, Concierge, Shopping mall access',
        interiorFeatures: 'Private elevator access, Marble floors, Gourmet kitchen, Premium appliances, Master suite, Built-in bar',
        exteriorFeatures: 'Wraparound terraces, City and bay views, Hurricane windows',
        hoaFees: 1200.00,
        taxAmount: 32000.00,
        taxYear: 2024,
        listingCourtesy: 'City Centre Realty',
        listingAgent: 'Roberto Martinez',
        listingOffice: 'Douglas Elliman',
        shortSale: 'Regular Sale',
        mlsId: 'A12345701',
        categoria: 'LUXURY_CONDOS',
        bairro: 'BRICKELL',
        userId: adminUser.id,
        images: {
          principal: principalImages.brickellNew,
          galeria: galleryImages.brickellNew
        }
      },

      // COCONUT GROVE PROPERTIES
      {
        title: 'Grove Bayfront Estate',
        description: 'Magnificent waterfront estate in prestigious Coconut Grove. This architectural masterpiece features 5 bedrooms, 4.5 bathrooms, infinity pool, private dock, and panoramic bay views with direct access to Biscayne Bay.',
        address: '3400 Pan American Dr',
        city: 'Coconut Grove',
        state: 'FL',
        zipCode: '33133',
        country: 'USA',
        subdivision: 'Grove Bay Estates',
        propertyType: 'SINGLE_FAMILY',
        propertySubType: 'Waterfront Estate',
        status: 'ACTIVE',
        price: 4800000.00,
        pricePerSqft: 1200.00,
        bedrooms: 5,
        bathrooms: 4.5,
        halfBaths: 1,
        sqft: 4000,
        adjustedSqft: 4000,
        lotSize: 0.5,
        yearBuilt: 2021,
        garage: 3,
        parking: 6,
        parkingSpaces: 6,
        parkingDescription: '3-car garage plus circular driveway',
        pool: true,
        waterfront: true,
        waterfrontDescription: 'Direct bay access with private dock and boat lift',
        furnished: false,
        petFriendly: true,
        newConstruction: false,
        latitude: 25.7285,
        longitude: -80.2436,
        listingDate: new Date(),
        daysOnMarket: 20,
        virtualTour: 'https://example.com/virtual-tour-grove-estate',
        amenities: 'Private dock, Boat lift, Infinity pool, Wine cellar, Home theater, Summer kitchen',
        interiorFeatures: 'Open floor plan, Marble floors, Gourmet kitchen, Wine cellar, Master suite, Built-in entertainment center',
        exteriorFeatures: 'Waterfront location, Private dock, Infinity pool, Outdoor kitchen, Bay views, Mature landscaping',
        hoaFees: 0.00,
        taxAmount: 48000.00,
        taxYear: 2024,
        listingCourtesy: 'Grove Waterfront Properties',
        listingAgent: 'Isabella Rodriguez',
        listingOffice: 'ONE Sotheby\'s International Realty',
        shortSale: 'Regular Sale',
        mlsId: 'A12345702',
        categoria: 'SINGLE_FAMILY_HOMES',
        bairro: 'COCONUT_GROVE',
        userId: adminUser.id,
        images: {
          principal: principalImages.coconutGroveNew,
          galeria: galleryImages.coconutGroveNew
        }
      },
      {
        title: 'Contemporary Grove Villa',
        description: 'Stunning contemporary villa in the heart of Coconut Grove. This modern home features 4 bedrooms, 3.5 bathrooms, open floor plan, chef kitchen, and beautiful outdoor entertaining area with pool and tropical landscaping.',
        address: '3620 Main Hwy',
        city: 'Coconut Grove',
        state: 'FL',
        zipCode: '33133',
        country: 'USA',
        subdivision: 'Grove Villas',
        propertyType: 'SINGLE_FAMILY',
        propertySubType: 'Contemporary Villa',
        status: 'ACTIVE',
        price: 2750000.00,
        pricePerSqft: 850.00,
        bedrooms: 4,
        bathrooms: 3.5,
        halfBaths: 1,
        sqft: 3235,
        adjustedSqft: 3235,
        lotSize: 0.3,
        yearBuilt: 2020,
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
        latitude: 25.7250,
        longitude: -80.2400,
        listingDate: new Date(),
        daysOnMarket: 15,
        virtualTour: 'https://example.com/virtual-tour-grove-villa',
        amenities: 'Pool, Outdoor kitchen, Smart home system, Security cameras, Tropical landscaping',
        interiorFeatures: 'Open floor plan, Floor-to-ceiling windows, Chef kitchen, Premium appliances, Master suite, Built-in storage',
        exteriorFeatures: 'Contemporary architecture, Pool deck, Outdoor kitchen, Tropical gardens',
        hoaFees: 0.00,
        taxAmount: 27500.00,
        taxYear: 2024,
        listingCourtesy: 'Grove Contemporary Homes',
        listingAgent: 'Maria Santos',
        listingOffice: 'Coldwell Banker',
        shortSale: 'Regular Sale',
        mlsId: 'A12345703',
        categoria: 'SINGLE_FAMILY_HOMES',
        bairro: 'COCONUT_GROVE',
        userId: adminUser.id,
        images: {
          principal: principalImages.coconutGroveNew,
          galeria: galleryImages.coconutGroveNew
        }
      },

      // MIAMI BEACH PROPERTIES
      {
        title: 'South Beach Ocean Tower',
        description: 'Luxurious oceanfront condo in iconic South Beach. This stunning residence features direct ocean views, floor-to-ceiling windows, marble floors, gourmet kitchen, and access to 5-star amenities including beach service and spa.',
        address: '101 20th St #3405',
        city: 'Miami Beach',
        state: 'FL',
        zipCode: '33139',
        country: 'USA',
        subdivision: 'South Beach Oceanfront',
        propertyType: 'CONDO',
        propertySubType: 'Oceanfront Luxury Condo',
        status: 'ACTIVE',
        price: 2900000.00,
        pricePerSqft: 1400.00,
        bedrooms: 3,
        bathrooms: 3.5,
        halfBaths: 1,
        sqft: 2071,
        adjustedSqft: 2071,
        lotSize: null,
        yearBuilt: 2019,
        garage: null,
        parking: 2,
        parkingSpaces: 2,
        parkingDescription: 'Two valet parking spaces',
        pool: true,
        waterfront: true,
        waterfrontDescription: 'Direct ocean access with private beach',
        furnished: false,
        petFriendly: true,
        newConstruction: false,
        latitude: 25.7907,
        longitude: -80.1300,
        listingDate: new Date(),
        daysOnMarket: 18,
        virtualTour: 'https://example.com/virtual-tour-south-beach',
        amenities: 'Private beach, Ocean-view pool, Spa, Fitness center, Beach service, Concierge',
        interiorFeatures: 'Ocean views, Marble floors, Gourmet kitchen, Premium appliances, Master suite, Walk-in closets',
        exteriorFeatures: 'Direct ocean views, Private balcony, Hurricane windows',
        hoaFees: 1500.00,
        taxAmount: 29000.00,
        taxYear: 2024,
        listingCourtesy: 'South Beach Luxury',
        listingAgent: 'Alexandra Costa',
        listingOffice: 'The Keyes Company',
        shortSale: 'Regular Sale',
        mlsId: 'A12345704',
        categoria: 'LUXURY_CONDOS',
        bairro: null,
        userId: adminUser.id,
        images: {
          principal: principalImages.miamiBeach,
          galeria: galleryImages.miamiBeach
        }
      },
      {
        title: 'Mid Beach Modern Penthouse',
        description: 'Spectacular penthouse in prestigious Mid Beach with panoramic ocean and city views. Features 4 bedrooms, 4.5 bathrooms, private rooftop terrace, infinity-edge pool, and premium finishes throughout.',
        address: '6801 Collins Ave #PH1201',
        city: 'Miami Beach',
        state: 'FL',
        zipCode: '33141',
        country: 'USA',
        subdivision: 'Mid Beach Towers',
        propertyType: 'CONDO',
        propertySubType: 'Oceanfront Penthouse',
        status: 'ACTIVE',
        price: 5200000.00,
        pricePerSqft: 1600.00,
        bedrooms: 4,
        bathrooms: 4.5,
        halfBaths: 1,
        sqft: 3250,
        adjustedSqft: 3250,
        lotSize: null,
        yearBuilt: 2018,
        garage: null,
        parking: 3,
        parkingSpaces: 3,
        parkingDescription: 'Three valet parking spaces',
        pool: true,
        waterfront: true,
        waterfrontDescription: 'Direct oceanfront with private beach access',
        furnished: true,
        petFriendly: true,
        newConstruction: false,
        latitude: 25.8276,
        longitude: -80.1246,
        listingDate: new Date(),
        daysOnMarket: 25,
        virtualTour: 'https://example.com/virtual-tour-mid-beach-penthouse',
        amenities: 'Private beach, Rooftop pool, Spa, Fitness center, Tennis court, Marina',
        interiorFeatures: 'Panoramic views, Italian marble, Gourmet kitchen, Wine cellar, Master suite, Designer furnishings',
        exteriorFeatures: 'Private rooftop terrace, Infinity pool, Ocean views, Hurricane windows',
        hoaFees: 2200.00,
        taxAmount: 52000.00,
        taxYear: 2024,
        listingCourtesy: 'Mid Beach Luxury Properties',
        listingAgent: 'Carlos Mendoza',
        listingOffice: 'Engel & Völkers',
        shortSale: 'Regular Sale',
        mlsId: 'A12345705',
        categoria: 'LUXURY_CONDOS',
        bairro: null,
        userId: adminUser.id,
        images: {
          principal: principalImages.miamiBeach,
          galeria: galleryImages.miamiBeach
        }
      },

      // DOWNTOWN MIAMI PROPERTIES
      {
        title: 'Downtown Miami Skyline Tower',
        description: 'Modern high-rise condo in the heart of Downtown Miami with stunning skyline views. Features contemporary design, floor-to-ceiling windows, gourmet kitchen, and access to rooftop amenities.',
        address: '200 Biscayne Blvd Way #4501',
        city: 'Miami',
        state: 'FL',
        zipCode: '33131',
        country: 'USA',
        subdivision: 'Downtown Core',
        propertyType: 'CONDO',
        propertySubType: 'High-Rise Urban Condo',
        status: 'ACTIVE',
        price: 1450000.00,
        pricePerSqft: 850.00,
        bedrooms: 2,
        bathrooms: 2.5,
        halfBaths: 1,
        sqft: 1706,
        adjustedSqft: 1706,
        lotSize: null,
        yearBuilt: 2022,
        garage: null,
        parking: 2,
        parkingSpaces: 2,
        parkingDescription: 'Two assigned covered parking spaces',
        pool: true,
        waterfront: false,
        waterfrontDescription: null,
        furnished: false,
        petFriendly: true,
        newConstruction: false,
        latitude: 25.7753,
        longitude: -80.1878,
        listingDate: new Date(),
        daysOnMarket: 10,
        virtualTour: 'https://example.com/virtual-tour-downtown-tower',
        amenities: 'Rooftop pool, Fitness center, Business center, Concierge, Sky lounge',
        interiorFeatures: 'Floor-to-ceiling windows, Open floor plan, Gourmet kitchen, Premium appliances, Walk-in closets',
        exteriorFeatures: 'City skyline views, Private balcony, Modern architecture',
        hoaFees: 720.00,
        taxAmount: 14500.00,
        taxYear: 2024,
        listingCourtesy: 'Downtown Properties',
        listingAgent: 'Jennifer Park',
        listingOffice: 'Related ISG',
        shortSale: 'Regular Sale',
        mlsId: 'A12345706',
        categoria: 'LUXURY_CONDOS',
        bairro: null,
        userId: adminUser.id,
        images: {
          principal: principalImages.downtown,
          galeria: galleryImages.downtown
        }
      },
      {
        title: 'Downtown Loft Collection',
        description: 'Industrial chic loft in converted warehouse building in Downtown Miami. Features exposed brick walls, high ceilings, concrete floors, modern kitchen, and rooftop terrace with city views.',
        address: '133 NE 2nd Ave #801',
        city: 'Miami',
        state: 'FL',
        zipCode: '33132',
        country: 'USA',
        subdivision: 'Downtown Lofts',
        propertyType: 'CONDO',
        propertySubType: 'Industrial Loft',
        status: 'ACTIVE',
        price: 975000.00,
        pricePerSqft: 650.00,
        bedrooms: 2,
        bathrooms: 2,
        halfBaths: 0,
        sqft: 1500,
        adjustedSqft: 1500,
        lotSize: null,
        yearBuilt: 2020,
        garage: null,
        parking: 1,
        parkingSpaces: 1,
        parkingDescription: 'One assigned parking space',
        pool: false,
        waterfront: false,
        waterfrontDescription: null,
        furnished: false,
        petFriendly: true,
        newConstruction: false,
        latitude: 25.7768,
        longitude: -80.1918,
        listingDate: new Date(),
        daysOnMarket: 22,
        virtualTour: 'https://example.com/virtual-tour-downtown-loft',
        amenities: 'Rooftop terrace, Fitness area, Art studio, Bike storage',
        interiorFeatures: 'Exposed brick walls, High ceilings, Concrete floors, Modern kitchen, Industrial design',
        exteriorFeatures: 'Rooftop access, City views, Historic building character',
        hoaFees: 450.00,
        taxAmount: 9750.00,
        taxYear: 2024,
        listingCourtesy: 'Downtown Loft Specialists',
        listingAgent: 'Michael Davis',
        listingOffice: 'Compass',
        shortSale: 'Regular Sale',
        mlsId: 'A12345707',
        categoria: 'NEIGHBORHOODS',
        bairro: null,
        userId: adminUser.id,
        images: {
          principal: principalImages.downtown,
          galeria: galleryImages.downtown
        }
      }
    ];

    // Create properties
    for (const propertyData of additionalProperties) {
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

    console.log('✅ Additional neighborhoods properties seed completed!');
    console.log(`📊 Total properties added: ${additionalProperties.length}`);
    console.log('🏘️ Neighborhoods covered: Brickell, Coconut Grove, Miami Beach, Downtown');

  } catch (error) {
    console.error('❌ Error during additional neighborhoods seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Execute if run directly
if (require.main === module) {
  seedAdditionalNeighborhoods()
    .catch((e) => {
      console.error('❌ Error during additional neighborhoods seed:', e);
      process.exit(1);
    });
}

module.exports = seedAdditionalNeighborhoods;
