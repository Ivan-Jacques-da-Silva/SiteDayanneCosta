
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkCategories() {
  try {
    console.log('🔍 Checking categories in database...\n');

    // Get all categories
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            properties: true
          }
        },
        subcategories: {
          include: {
            _count: {
              select: {
                properties: true
              }
            }
          }
        }
      },
      orderBy: { name: 'asc' }
    });

    console.log('📋 Available Categories:');
    categories.forEach(category => {
      console.log(`  ✓ ${category.name} (${category._count.properties} properties)`);
      if (category.subcategories.length > 0) {
        category.subcategories.forEach(sub => {
          console.log(`    └─ ${sub.name} (${sub._count.properties} properties)`);
        });
      }
    });

    // Get sample properties with categories
    console.log('\n🏠 Sample Properties with Categories:');
    const propertiesWithCategories = await prisma.property.findMany({
      take: 5,
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    });

    propertiesWithCategories.forEach(property => {
      const categoryNames = property.categories.map(pc => pc.category.name).join(', ');
      console.log(`  📍 ${property.title} - Categories: [${categoryNames}]`);
    });

    // Test specific category queries
    console.log('\n🔍 Testing specific category queries:');
    const testCategories = ['New Developments', 'Luxury Condos', 'Single Family Homes'];
    
    for (const categoryName of testCategories) {
      const properties = await prisma.property.findMany({
        where: {
          status: 'ACTIVE',
          categories: {
            some: {
              category: {
                name: {
                  equals: categoryName,
                  mode: 'insensitive'
                }
              }
            }
          }
        }
      });
      console.log(`  🏷️  "${categoryName}": ${properties.length} properties found`);
    }

  } catch (error) {
    console.error('❌ Error checking categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCategories();
