const express = require('express');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const prisma = new PrismaClient();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/properties/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// GET /api/properties - List all properties with pagination and filters
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      propertyType, 
      status, 
      minPrice, 
      maxPrice,
      bedrooms,
      bathrooms,
      city,
      state
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
          { city: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(propertyType && { propertyType }),
      ...(status && { status }),
      ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
      ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
      ...(bedrooms && { bedrooms: parseInt(bedrooms) }),
      ...(bathrooms && { bathrooms: parseFloat(bathrooms) }),
      ...(city && { city: { contains: city, mode: 'insensitive' } }),
      ...(state && { state: { contains: state, mode: 'insensitive' } })
    };

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          images: {
            orderBy: { order: 'asc' }
          },
          amenities: {
            include: { amenity: true }
          },
          features: {
            include: { feature: true }
          },
          user: {
            select: { id: true, name: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.property.count({ where })
    ]);

    res.json({
      properties,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// GET /api/properties/:id - Get single property
router.get('/:id', async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
      include: {
        images: {
          orderBy: { order: 'asc' }
        },
        videos: true,
        documents: true,
        amenities: {
          include: { amenity: true }
        },
        features: {
          include: { feature: true }
        },
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

// POST /api/properties - Create new property
router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      city,
      state,
      zipCode,
      country = 'USA',
      propertyType,
      propertySubType,
      status = 'ACTIVE',
      price,
      pricePerSqft,
      bedrooms,
      bathrooms,
      halfBaths,
      sqft,
      lotSize,
      yearBuilt,
      garage,
      parking,
      pool,
      waterfront,
      furnished,
      petFriendly,
      latitude,
      longitude,
      neighborhood,
      subdivision,
      listingDate,
      daysOnMarket,
      virtualTour,
      userId,
      amenities,
      features
    } = req.body;

    // Create property
    const property = await prisma.property.create({
      data: {
        title,
        description,
        address,
        city,
        state,
        zipCode,
        country,
        propertyType,
        propertySubType,
        status,
        price: parseFloat(price),
        pricePerSqft: pricePerSqft ? parseFloat(pricePerSqft) : null,
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseFloat(bathrooms) : null,
        halfBaths: halfBaths ? parseInt(halfBaths) : null,
        sqft: sqft ? parseInt(sqft) : null,
        lotSize: lotSize ? parseFloat(lotSize) : null,
        yearBuilt: yearBuilt ? parseInt(yearBuilt) : null,
        garage: garage ? parseInt(garage) : null,
        parking: parking ? parseInt(parking) : null,
        pool: pool === 'true',
        waterfront: waterfront === 'true',
        furnished: furnished === 'true',
        petFriendly: petFriendly === 'true',
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        neighborhood,
        subdivision,
        listingDate: listingDate ? new Date(listingDate) : null,
        daysOnMarket: daysOnMarket ? parseInt(daysOnMarket) : null,
        virtualTour,
        userId
      }
    });

    // Add images if uploaded
    if (req.files && req.files.length > 0) {
      const imageData = req.files.map((file, index) => ({
        url: `/uploads/properties/${file.filename}`,
        order: index,
        isPrimary: index === 0,
        propertyId: property.id
      }));

      await prisma.propertyImage.createMany({
        data: imageData
      });
    }

    // Add amenities if provided
    if (amenities && amenities.length > 0) {
      const amenityIds = JSON.parse(amenities);
      const amenityData = amenityIds.map(id => ({
        propertyId: property.id,
        amenityId: id
      }));

      await prisma.propertyAmenity.createMany({
        data: amenityData
      });
    }

    // Add features if provided
    if (features && features.length > 0) {
      const featuresList = JSON.parse(features);
      const featureData = featuresList.map(feature => ({
        propertyId: property.id,
        featureId: feature.id,
        value: feature.value || null
      }));

      await prisma.propertyFeature.createMany({
        data: featureData
      });
    }

    // Fetch the complete property data
    const completeProperty = await prisma.property.findUnique({
      where: { id: property.id },
      include: {
        images: true,
        amenities: {
          include: { amenity: true }
        },
        features: {
          include: { feature: true }
        }
      }
    });

    res.status(201).json(completeProperty);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(400).json({ error: 'Failed to create property' });
  }
});

// PUT /api/properties/:id - Update property
router.put('/:id', upload.array('images', 10), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Convert string values to appropriate types
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.pricePerSqft) updateData.pricePerSqft = parseFloat(updateData.pricePerSqft);
    if (updateData.bedrooms) updateData.bedrooms = parseInt(updateData.bedrooms);
    if (updateData.bathrooms) updateData.bathrooms = parseFloat(updateData.bathrooms);
    if (updateData.pool) updateData.pool = updateData.pool === 'true';
    if (updateData.waterfront) updateData.waterfront = updateData.waterfront === 'true';

    const property = await prisma.property.update({
      where: { id },
      data: updateData,
      include: {
        images: true,
        amenities: {
          include: { amenity: true }
        },
        features: {
          include: { feature: true }
        }
      }
    });

    res.json(property);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(400).json({ error: 'Failed to update property' });
  }
});

// DELETE /api/properties/:id - Delete property
router.delete('/:id', async (req, res) => {
  try {
    await prisma.property.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(400).json({ error: 'Failed to delete property' });
  }
});

// GET /api/properties/:id/similar - Get similar properties
router.get('/:id/similar', async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
      select: { propertyType: true, city: true, price: true }
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    const priceRange = property.price * 0.2; // 20% price range

    const similarProperties = await prisma.property.findMany({
      where: {
        id: { not: req.params.id },
        propertyType: property.propertyType,
        city: property.city,
        price: {
          gte: property.price - priceRange,
          lte: property.price + priceRange
        }
      },
      include: {
        images: {
          where: { isPrimary: true }
        }
      },
      take: 6
    });

    res.json(similarProperties);
  } catch (error) {
    console.error('Error fetching similar properties:', error);
    res.status(500).json({ error: 'Failed to fetch similar properties' });
  }
});

// Get property statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const [
      totalProperties,
      activeProperties,
      soldProperties,
      averagePrice,
      propertyTypeStats
    ] = await Promise.all([
      prisma.property.count(),
      prisma.property.count({ where: { status: 'ACTIVE' } }),
      prisma.property.count({ where: { status: 'SOLD' } }),
      prisma.property.aggregate({
        _avg: { price: true },
        where: { status: 'ACTIVE' }
      }),
      prisma.property.groupBy({
        by: ['propertyType'],
        _count: { propertyType: true }
      })
    ]);

    res.json({
      totalProperties,
      activeProperties,
      soldProperties,
      averagePrice: averagePrice._avg.price,
      propertyTypeStats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// POST /api/properties/category - Associate property with category
router.post('/category', async (req, res) => {
  try {
    const { propertyId, categoryId } = req.body;

    if (!propertyId || !categoryId) {
      return res.status(400).json({ error: 'Property ID and Category ID are required' });
    }

    // Check if association already exists
    const existingAssociation = await prisma.propertyCategory.findFirst({
      where: {
        propertyId: propertyId,
        categoryId: categoryId
      }
    });

    if (existingAssociation) {
      return res.json({ message: 'Association already exists' });
    }

    // Create the association
    const association = await prisma.propertyCategory.create({
      data: {
        propertyId: propertyId,
        categoryId: categoryId
      }
    });

    res.status(201).json(association);
  } catch (error) {
    console.error('Error associating property with category:', error);
    res.status(500).json({ error: 'Failed to associate property with category' });
  }
});

// GET /api/properties-by-category - Get properties by category name  
router.get('-by-category', async (req, res) => {
  try {
    const { categoryName, page = 1, limit = 12 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let whereClause = {
      status: 'ACTIVE'
    };

    // If category name is provided, filter by category
    if (categoryName) {
      whereClause.categories = {
        some: {
          category: {
            name: {
              equals: categoryName,
              mode: 'insensitive'
            }
          }
        }
      };
    }

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where: whereClause,
        include: {
          images: {
            orderBy: { order: 'asc' },
            take: 1
          },
          amenities: {
            include: { amenity: true }
          },
          features: {
            include: { feature: true }
          },
          categories: {
            include: { 
              category: {
                include: {
                  parent: true
                }
              } 
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
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.property.count({ where: whereClause })
    ]);

    res.json({
      properties,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching properties by category:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

module.exports = router;