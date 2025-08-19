
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/featured-listings - Get featured properties
router.get('/', async (req, res) => {
  try {
    const { limit = 6 } = req.query;
    
    const featuredProperties = await prisma.property.findMany({
      where: {
        isFeatured: true,
        status: 'ACTIVE'
      },
      include: {
        images: {
          orderBy: {
            order: 'asc'
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
      orderBy: {
        createdAt: 'desc'
      },
      take: parseInt(limit)
    });

    res.json({
      properties: featuredProperties,
      total: featuredProperties.length
    });
  } catch (error) {
    console.error('Error fetching featured listings:', error);
    res.status(500).json({ error: 'Failed to fetch featured listings' });
  }
});

module.exports = router;
