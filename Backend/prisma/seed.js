
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@dayannecosta.com',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('👤 Admin user created:', adminUser.email);

  // Create agent user
  const agentUser = await prisma.user.create({
    data: {
      name: 'Dayanne Costa',
      email: 'dayanne@dayannecosta.com',
      password: await bcrypt.hash('agent123', 12),
      role: 'AGENT'
    }
  });

  console.log('👤 Agent user created:', agentUser.email);

  // Create amenities
  const amenities = [
    { name: 'Swimming Pool', category: 'Recreation', icon: '🏊' },
    { name: 'Fitness Center', category: 'Recreation', icon: '💪' },
    { name: 'Marina', category: 'Recreation', icon: '⛵' },
    { name: 'Tennis Court', category: 'Recreation', icon: '🎾' },
    { name: 'Golf Course', category: 'Recreation', icon: '⛳' },
    { name: 'Spa', category: 'Wellness', icon: '🧘' },
    { name: 'Concierge', category: 'Service', icon: '🛎️' },
    { name: 'Valet Parking', category: 'Service', icon: '🚗' },
    { name: '24/7 Security', category: 'Security', icon: '🛡️' },
    { name: 'Business Center', category: 'Business', icon: '💼' },
    { name: 'Rooftop Terrace', category: 'Common Area', icon: '🏢' },
    { name: 'Club Room', category: 'Common Area', icon: '🥂' },
    { name: 'Children Playground', category: 'Family', icon: '🛝' },
    { name: 'Dog Park', category: 'Pet', icon: '🐕' },
    { name: 'Beach Access', category: 'Location', icon: '🏖️' },
    { name: 'Bay View', category: 'View', icon: '🌊' },
    { name: 'City View', category: 'View', icon: '🏙️' },
    { name: 'Ocean View', category: 'View', icon: '🌊' }
  ];

  for (const amenity of amenities) {
    await prisma.amenity.create({ data: amenity });
  }

  console.log('🏢 Amenities created:', amenities.length);

  // Create features
  const features = [
    { name: 'Marble Floors', category: 'Flooring' },
    { name: 'Hardwood Floors', category: 'Flooring' },
    { name: 'Tile Floors', category: 'Flooring' },
    { name: 'Granite Countertops', category: 'Kitchen' },
    { name: 'Stainless Steel Appliances', category: 'Kitchen' },
    { name: 'Wine Cooler', category: 'Kitchen' },
    { name: 'Walk-in Closet', category: 'Bedroom' },
    { name: 'Master Suite', category: 'Bedroom' },
    { name: 'En-suite Bathroom', category: 'Bathroom' },
    { name: 'Jacuzzi Tub', category: 'Bathroom' },
    { name: 'Double Vanity', category: 'Bathroom' },
    { name: 'Floor-to-Ceiling Windows', category: 'Windows' },
    { name: 'Impact Windows', category: 'Windows' },
    { name: 'Private Balcony', category: 'Outdoor' },
    { name: 'Terrace', category: 'Outdoor' },
    { name: 'Central Air Conditioning', category: 'HVAC' },
    { name: 'Smart Home Technology', category: 'Technology' },
    { name: 'High-Speed Internet', category: 'Technology' },
    { name: 'Storage Unit', category: 'Storage' },
    { name: 'Laundry Room', category: 'Utility' }
  ];

  for (const feature of features) {
    await prisma.feature.create({ data: feature });
  }

  console.log('✨ Features created:', features.length);

  // Create sample property
  const sampleProperty = await prisma.property.create({
    data: {
      title: 'Luxurious Brickell Condo with Bay Views',
      description: 'Discover Unit 1412 at Brickell Place, a stunningly renovated and spacious residence in the heart of Miami\'s vibrant Brickell neighborhood. This elegant unit features exquisite marble floors throughout, an open and airy layout, and high-end finishes that create a sophisticated living space. The modern kitchen boasts sleek cabinetry and ample storage. Enjoy breathtaking city and bay views from your private balcony, perfect for relaxing or entertaining.',
      address: '1915 Brickell Ave #C1412',
      city: 'Miami',
      state: 'FL',
      zipCode: '33129',
      country: 'USA',
      propertyType: 'LUXURY_CONDO',
      propertySubType: 'High-Rise Condo',
      status: 'ACTIVE',
      price: 1250000.00,
      pricePerSqft: 850.50,
      bedrooms: 3,
      bathrooms: 2.5,
      halfBaths: 1,
      sqft: 1470,
      yearBuilt: 2020,
      garage: 2,
      parking: 2,
      pool: true,
      waterfront: true,
      furnished: false,
      petFriendly: true,
      latitude: 25.7617,
      longitude: -80.1918,
      neighborhood: 'Brickell',
      subdivision: 'Brickell Place',
      listingDate: new Date(),
      daysOnMarket: 15,
      virtualTour: 'https://example.com/virtual-tour',
      userId: agentUser.id
    }
  });

  console.log('🏠 Sample property created:', sampleProperty.title);

  console.log('✅ Database seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
