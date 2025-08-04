const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Aplicar middlewares de autenticação e admin a todas as rotas
router.use(authenticateToken);
router.use(requireAdmin);

// GET /api/admin/dashboard - Dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalProperties,
      activeProperties,
      totalContacts,
      newContacts,
      totalUsers
    ] = await Promise.all([
      prisma.property.count(),
      prisma.property.count({ where: { status: 'ACTIVE' } }),
      prisma.contact.count(),
      prisma.contact.count({ where: { status: 'NEW' } }),
      prisma.user.count({ where: { role: { not: 'ADMIN' } } })
    ]);

    res.json({
      totalProperties,
      activeProperties,
      totalContacts,
      newContacts,
      totalUsers
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// GET /api/admin/contacts - Get all contacts with pagination
router.get('/contacts', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = status ? { status } : {};

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        include: {
          user: {
            select: { name: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.contact.count({ where })
    ]);

    res.json({
      contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// PUT /api/admin/contacts/:id/status - Update contact status
router.put('/contacts/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await prisma.contact.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });

    res.json(contact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(400).json({ error: 'Failed to update contact status' });
  }
});

// GET /api/admin/users - Get all users
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: { role: { not: 'ADMIN' } },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          _count: {
            select: {
              properties: true,
              contacts: true,
              favorites: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.user.count({ where: { role: { not: 'ADMIN' } } })
    ]);

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET /api/admin/properties - Get all properties with pagination
router.get('/properties', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = status ? { status } : {};

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          user: {
            select: { name: true, email: true }
          },
          images: {
            select: { url: true, isPrimary: true }
          },
          _count: {
            select: {
              favorites: true
            }
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

// POST /api/admin/properties - Create new property
router.post('/properties', async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      city,
      state,
      zipCode,
      propertyType,
      price,
      bedrooms,
      bathrooms,
      sqft,
      userId
    } = req.body;

    const property = await prisma.property.create({
      data: {
        title,
        description,
        address,
        city,
        state,
        zipCode,
        propertyType,
        price: parseFloat(price),
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseFloat(bathrooms) : null,
        sqft: sqft ? parseInt(sqft) : null,
        userId: userId || req.user.userId,
        country: 'USA'
      },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });

    res.status(201).json(property);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Failed to create property' });
  }
});

// PUT /api/admin/properties/:id - Update property
router.put('/properties/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Convert numeric fields
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.bedrooms) updateData.bedrooms = parseInt(updateData.bedrooms);
    if (updateData.bathrooms) updateData.bathrooms = parseFloat(updateData.bathrooms);
    if (updateData.sqft) updateData.sqft = parseInt(updateData.sqft);

    const property = await prisma.property.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });

    res.json(property);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(400).json({ error: 'Failed to update property' });
  }
});

// DELETE /api/admin/properties/:id - Delete property
router.delete('/properties/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.property.delete({
      where: { id }
    });

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(400).json({ error: 'Failed to delete property' });
  }
});

module.exports = router;