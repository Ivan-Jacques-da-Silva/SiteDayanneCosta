
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/properties-by-category - Get properties filtered by category
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      neighborhood,
      page = 1, 
      limit = 12,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      propertyType,
      search
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build where clause based on new category structure
    let where = {
      status: 'ACTIVE'
    };

    // Handle main categories
    if (category) {
      switch (category.toLowerCase()) {
        case 'new developments':
        case 'new_developments':
          where.categoria = 'NEW_DEVELOPMENTS';
          break;
        case 'single family homes':
        case 'single_family_homes':
          where.categoria = 'SINGLE_FAMILY_HOMES';
          break;
        case 'luxury condos':
        case 'luxury_condos':
          where.categoria = 'LUXURY_CONDOS';
          break;
        case 'neighborhoods':
          where.categoria = 'NEIGHBORHOODS';
          break;
        case 'brickell':
          where.categoria = 'NEIGHBORHOODS';
          where.bairro = 'BRICKELL';
          break;
        case 'edgewater':
          where.categoria = 'NEIGHBORHOODS';
          where.bairro = 'EDGEWATER';
          break;
        case 'coconut grove':
        case 'coconut_grove':
          where.categoria = 'NEIGHBORHOODS';
          where.bairro = 'COCONUT_GROVE';
          break;
        case 'the roads':
        case 'the_roads':
          where.categoria = 'NEIGHBORHOODS';
          where.bairro = 'THE_ROADS';
          break;
      }
    }

    // Handle neighborhood filter
    if (neighborhood) {
      where.categoria = 'NEIGHBORHOODS';
      switch (neighborhood.toLowerCase()) {
        case 'brickell':
          where.bairro = 'BRICKELL';
          break;
        case 'edgewater':
          where.bairro = 'EDGEWATER';
          break;
        case 'coconut grove':
        case 'coconut_grove':
          where.bairro = 'COCONUT_GROVE';
          break;
        case 'the roads':
        case 'the_roads':
          where.bairro = 'THE_ROADS';
          break;
      }
    }

    // Apply other filters
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (propertyType) where.propertyType = propertyType;
    if (minPrice) where.price = { ...where.price, gte: parseFloat(minPrice) };
    if (maxPrice) where.price = { ...where.price, lte: parseFloat(maxPrice) };
    if (bedrooms) where.bedrooms = parseInt(bedrooms);
    if (bathrooms) where.bathrooms = parseFloat(bathrooms);

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          images: {
            select: { url: true, isPrimary: true },
            orderBy: { order: 'asc' }
          },
          user: {
            select: { name: true, email: true }
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
    console.error('Error fetching properties by category:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

module.exports = router;
