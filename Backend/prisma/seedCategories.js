
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedCategories() {
  const categories = [
    {
      name: 'New Developments',
      description: 'Newly built or under construction properties',
      icon: 'fas fa-building',
      color: '#059669'
    },
    {
      name: 'Luxury Condos',
      description: 'High-end condominium properties with premium amenities',
      icon: 'fas fa-crown',
      color: '#7c3aed'
    },
    {
      name: 'Single Family Homes',
      description: 'Detached single family residential properties',
      icon: 'fas fa-home',
      color: '#dc2626'
    },
    {
      name: 'Waterfront Properties',
      description: 'Properties with direct water access or water views',
      icon: 'fas fa-water',
      color: '#0891b2'
    },
    {
      name: 'Golf Course Properties',
      description: 'Properties located near or overlooking golf courses',
      icon: 'fas fa-golf-ball',
      color: '#16a34a'
    },
    {
      name: 'Private & Exclusive',
      description: 'Exclusive luxury properties with enhanced privacy',
      icon: 'fas fa-lock',
      color: '#ea580c'
    }
  ];

  for (const category of categories) {
    try {
      await prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: category
      });
      console.log(`✓ Category "${category.name}" created/updated`);
    } catch (error) {
      console.error(`Error creating category "${category.name}":`, error);
    }
  }
}

seedCategories()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

module.exports = seedCategories;
