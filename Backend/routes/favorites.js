const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Get user favorites
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        property: {
          include: {
            images: {
              where: { isPrimary: true }
            }
          }
        }
      }
    });

    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// Add favorite
router.post('/', async (req, res) => {
  try {
    const { userId, propertyId } = req.body;

    const favorite = await prisma.favorite.create({
      data: { userId, propertyId }
    });

    res.status(201).json(favorite);
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

// Remove favorite
router.delete('/:userId/:propertyId', async (req, res) => {
  try {
    const { userId, propertyId } = req.params;

    await prisma.favorite.deleteMany({
      where: { userId, propertyId }
    });

    res.json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
});

module.exports = router;