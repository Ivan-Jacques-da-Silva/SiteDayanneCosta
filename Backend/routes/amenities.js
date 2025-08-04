
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/amenities - List all amenities
router.get('/', async (req, res) => {
  try {
    const amenities = await prisma.amenity.findMany({
      orderBy: { name: 'asc' }
    });

    res.json(amenities);
  } catch (error) {
    console.error('Error fetching amenities:', error);
    res.status(500).json({ error: 'Failed to fetch amenities' });
  }
});

// POST /api/amenities - Create new amenity
router.post('/', async (req, res) => {
  try {
    const amenity = await prisma.amenity.create({
      data: req.body
    });

    res.status(201).json(amenity);
  } catch (error) {
    console.error('Error creating amenity:', error);
    res.status(400).json({ error: 'Failed to create amenity' });
  }
});

module.exports = router;
