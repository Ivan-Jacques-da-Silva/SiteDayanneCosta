
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/properties-by-category - Get properties by category name  
router.get('/', async (req, res) => {
  try {
    const { category, categoryName, sortBy = 'price-desc', ...otherFilters } = req.query;

    console.log('Fetching properties by category:', { category, categoryName, sortBy, otherFilters });

    let whereClause = {
      status: 'ACTIVE'
    };

    // Use either 'category' or 'categoryName' parameter
    const searchCategory = category || categoryName;
    
    if (searchCategory) {
      console.log('Searching for category:', searchCategory);
      
      whereClause.categories = {
        some: {
          category: {
            name: {
              equals: searchCategory,
              mode: 'insensitive'
            }
          }
        }
      };
    }

    // Add other filters
    if (otherFilters.minPrice) {
      whereClause.price = {
        ...whereClause.price,
        gte: parseFloat(otherFilters.minPrice)
      };
    }

    if (otherFilters.maxPrice) {
      whereClause.price = {
        ...whereClause.price,
        lte: parseFloat(otherFilters.maxPrice)
      };
    }

    if (otherFilters.bedrooms) {
      whereClause.bedrooms = {
        gte: parseInt(otherFilters.bedrooms)
      };
    }

    if (otherFilters.bathrooms) {
      whereClause.bathrooms = {
        gte: parseFloat(otherFilters.bathrooms)
      };
    }

    if (otherFilters.cidade) {
      whereClause.city = {
        contains: otherFilters.cidade,
        mode: 'insensitive'
      };
    }

    // Configure sorting
    let orderBy = { createdAt: 'desc' };
    switch (sortBy) {
      case 'price-asc':
        orderBy = { price: 'asc' };
        break;
      case 'price-desc':
        orderBy = { price: 'desc' };
        break;
      case 'sqft-desc':
        orderBy = { sqft: 'desc' };
        break;
      case 'bedrooms-desc':
        orderBy = { bedrooms: 'desc' };
        break;
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'oldest':
        orderBy = { createdAt: 'asc' };
        break;
      default:
        orderBy = { price: 'desc' };
    }

    console.log('Where clause:', JSON.stringify(whereClause, null, 2));

    const properties = await prisma.property.findMany({
      where: whereClause,
      include: {
        images: {
          orderBy: { order: 'asc' }
        },
        propertyAmenities: {
          include: { 
            amenity: true 
          }
        },
        features: {
          include: { 
            feature: true 
          }
        },
        categories: {
          include: { 
            category: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        }
      },
      orderBy
    });

    console.log(`Found ${properties.length} properties for category: ${searchCategory}`);

    // Return array directly for compatibility with PropertyListing component
    res.json(properties);
  } catch (error) {
    console.error('Error fetching properties by category:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to fetch properties',
      details: error.message,
      category: req.query.category || req.query.categoryName
    });
  }
});

// GET /api/properties-by-category/debug - Debug endpoint to check categories
router.get('/debug', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            properties: true
          }
        }
      }
    });

    const propertiesWithCategories = await prisma.property.findMany({
      where: { status: 'ACTIVE' },
      include: {
        categories: {
          include: {
            category: true
          }
        }
      },
      take: 5
    });

    res.json({
      availableCategories: categories,
      samplePropertiesWithCategories: propertiesWithCategories
    });
  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
