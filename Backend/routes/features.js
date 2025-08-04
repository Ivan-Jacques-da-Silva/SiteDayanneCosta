
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/features - List all features
router.get('/', async (req, res) => {
  try {
    const features = await prisma.feature.findMany({
      orderBy: { name: 'asc' }
    });

    res.json(features);
  } catch (error) {
    console.error('Error fetching features:', error);
    res.status(500).json({ error: 'Failed to fetch features' });
  }
});

// POST /api/features - Create new feature
router.post('/', async (req, res) => {
  try {
    const feature = await prisma.feature.create({
      data: req.body
    });

    res.status(201).json(feature);
  } catch (error) {
    console.error('Error creating feature:', error);
    res.status(400).json({ error: 'Failed to create feature' });
  }
});

module.exports = router;
