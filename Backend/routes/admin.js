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
      mlsId,
      title,
      description,
      propertyType,
      status,
      categories,
      address,
      city,
      state,
      zipCode,
      neighborhood,
      subdivision,
      price,
      pricePerSqft,
      bedrooms,
      bathrooms,
      halfBathrooms,
      sqft,
      adjustedSqft,
      yearBuilt,
      daysOnMarket,
      dateListed,
      furnished,
      waterfront,
      waterfrontDescription,
      pool,
      parking,
      parkingSpaces,
      parkingDescription,
      interiorFeatures,
      exteriorFeatures,
      hoaFees,
      taxAmount,
      taxYear,
      latitude,
      longitude,
      virtualTour,
      amenities,
      listingCourtesy,
      listingAgent,
      listingOffice,
      shortSale,
      newConstruction,
      petFriendly,
      userId
    } = req.body;

    const property = await prisma.property.create({
      data: {
        mlsId,
        title,
        description,
        address,
        city,
        state,
        zipCode,
        propertyType,
        status: status || 'ACTIVE',
        price: price ? parseFloat(price) : null,
        pricePerSqft: pricePerSqft ? parseFloat(pricePerSqft) : null,
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseFloat(bathrooms) : null,
        halfBaths: halfBathrooms ? parseInt(halfBathrooms) : null,
        sqft: sqft ? parseInt(sqft) : null,
        adjustedSqft: adjustedSqft ? parseInt(adjustedSqft) : null,
        yearBuilt: yearBuilt ? parseInt(yearBuilt) : null,
        daysOnMarket: daysOnMarket ? parseInt(daysOnMarket) : null,
        listingDate: dateListed ? new Date(dateListed) : null,
        furnished: furnished === 'true' || furnished === true,
        waterfront: waterfront === 'true' || waterfront === true,
        waterfrontDescription,
        pool: pool === 'true' || pool === true,
        parking: parking === 'true' || parking === true,
        parkingSpaces: parkingSpaces ? parseInt(parkingSpaces) : null,
        parkingDescription,
        interiorFeatures,
        exteriorFeatures,
        hoaFees: hoaFees ? parseFloat(hoaFees) : null,
        taxAmount: taxAmount ? parseFloat(taxAmount) : null,
        taxYear: taxYear ? parseInt(taxYear) : null,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        neighborhood,
        subdivision,
        virtualTour,
        amenities,
        listingCourtesy,
        listingAgent,
        listingOffice,
        shortSale: shortSale || 'Regular Sale',
        newConstruction: newConstruction === 'true' || newConstruction === true,
        petFriendly: petFriendly === 'true' || petFriendly === true,
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
    const updateData = { ...req.body };

    // Convert numeric fields
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.pricePerSqft) updateData.pricePerSqft = parseFloat(updateData.pricePerSqft);
    if (updateData.bedrooms) updateData.bedrooms = parseInt(updateData.bedrooms);
    if (updateData.bathrooms) updateData.bathrooms = parseFloat(updateData.bathrooms);
    if (updateData.halfBathrooms) updateData.halfBaths = parseInt(updateData.halfBathrooms);
    if (updateData.sqft) updateData.sqft = parseInt(updateData.sqft);
    if (updateData.adjustedSqft) updateData.adjustedSqft = parseInt(updateData.adjustedSqft);
    if (updateData.yearBuilt) updateData.yearBuilt = parseInt(updateData.yearBuilt);
    if (updateData.daysOnMarket) updateData.daysOnMarket = parseInt(updateData.daysOnMarket);
    if (updateData.parkingSpaces) updateData.parkingSpaces = parseInt(updateData.parkingSpaces);
    if (updateData.hoaFees) updateData.hoaFees = parseFloat(updateData.hoaFees);
    if (updateData.taxAmount) updateData.taxAmount = parseFloat(updateData.taxAmount);
    if (updateData.taxYear) updateData.taxYear = parseInt(updateData.taxYear);
    if (updateData.latitude) updateData.latitude = parseFloat(updateData.latitude);
    if (updateData.longitude) updateData.longitude = parseFloat(updateData.longitude);

    // Convert boolean fields
    if (updateData.furnished !== undefined) updateData.furnished = updateData.furnished === 'true' || updateData.furnished === true;
    if (updateData.waterfront !== undefined) updateData.waterfront = updateData.waterfront === 'true' || updateData.waterfront === true;
    if (updateData.pool !== undefined) updateData.pool = updateData.pool === 'true' || updateData.pool === true;
    if (updateData.parking !== undefined) updateData.parking = updateData.parking === 'true' || updateData.parking === true;
    if (updateData.newConstruction !== undefined) updateData.newConstruction = updateData.newConstruction === 'true' || updateData.newConstruction === true;
    if (updateData.petFriendly !== undefined) updateData.petFriendly = updateData.petFriendly === 'true' || updateData.petFriendly === true;

    // Convert date fields
    if (updateData.dateListed) updateData.listingDate = new Date(updateData.dateListed);

    // Remove fields that don't exist in the database schema
    delete updateData.halfBathrooms;
    delete updateData.dateListed;

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