const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const prisma = new PrismaClient();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/properties/';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG and WebP images are allowed'), false);
    }
  }
});


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
    const { page = 1, limit = 12, search, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build where clause for filtering
    const where = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (status) {
      where.status = status;
    }

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
router.post('/properties', upload.fields([{ name: 'primaryImage', maxCount: 1 }, { name: 'galleryImages', maxCount: 10 }]), async (req, res) => {
  try {
    const {
      mlsId,
      title,
      description,
      propertyType,
      status,
      categoria,
      bairro,
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
        propertyType: propertyType || 'CONDO',
        status: status || 'ACTIVE',
        categoria: categoria || 'LUXURY_CONDOS',
        bairro: bairro || null,
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
        parking: parkingSpaces ? parseInt(parkingSpaces) : null,
        parkingSpaces: parkingSpaces ? parseInt(parkingSpaces) : null,
        parkingDescription,
        interiorFeatures,
        exteriorFeatures,
        hoaFees: hoaFees ? parseFloat(hoaFees) : null,
        taxAmount: taxAmount ? parseFloat(taxAmount) : null,
        taxYear: taxYear ? parseInt(taxYear) : null,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        neighborhood: neighborhood || bairro,
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
        country: 'USA',
        images: {
          create: [
            ...(req.files?.primaryImage ? [{ url: `uploads/properties/${req.files.primaryImage[0].filename}`, isPrimary: true, order: 0 }] : []),
            ...(req.files?.galleryImages ? req.files.galleryImages.map((file, index) => ({ url: `uploads/properties/${file.filename}`, isPrimary: false, order: index + 1 })) : [])
          ]
        }
      },
      include: {
        user: {
          select: { name: true, email: true }
        },
        images: {
          orderBy: { order: 'asc' }
        }
      }
    });

    res.status(201).json(property);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Failed to create property', details: error.message });
  }
});

// PUT /api/admin/properties/:id - Update property
router.put('/properties/:id', upload.fields([{ name: 'primaryImage', maxCount: 1 }, { name: 'galleryImages', maxCount: 10 }]), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    const existingProperty = await prisma.property.findUnique({ 
      where: { id }, 
      include: { images: true } 
    });

    if (!existingProperty) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Handle image updates
    if (req.files && (req.files.primaryImage || req.files.galleryImages)) {
      // Handle primary image update
      if (req.files.primaryImage && req.files.primaryImage.length > 0) {
        const primaryImageFile = req.files.primaryImage[0];
        const existingPrimaryImage = existingProperty.images.find(img => img.isPrimary);
        
        if (existingPrimaryImage) {
          // Delete old primary image file if it exists
          const oldImagePath = path.join(__dirname, '..', existingPrimaryImage.url);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
          
          // Update existing primary image record
          await prisma.propertyImage.update({
            where: { id: existingPrimaryImage.id },
            data: { 
              url: `uploads/properties/${primaryImageFile.filename}`,
              order: 0 
            }
          });
        } else {
          // Create new primary image record
          await prisma.propertyImage.create({
            data: {
              propertyId: id,
              url: `uploads/properties/${primaryImageFile.filename}`,
              isPrimary: true,
              order: 0
            }
          });
        }
      }

      // Handle gallery images
      if (req.files.galleryImages && req.files.galleryImages.length > 0) {
        // Delete old gallery images
        const oldGalleryImages = existingProperty.images.filter(img => !img.isPrimary);
        for (const oldImage of oldGalleryImages) {
          const oldImagePath = path.join(__dirname, '..', oldImage.url);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        
        // Delete old gallery image records
        await prisma.propertyImage.deleteMany({
          where: {
            propertyId: id,
            isPrimary: false
          }
        });

        // Create new gallery image records
        const galleryImageData = req.files.galleryImages.map((file, index) => ({
          propertyId: id,
          url: `uploads/properties/${file.filename}`,
          isPrimary: false,
          order: index + 1
        }));

        await prisma.propertyImage.createMany({
          data: galleryImageData
        });
      }
    }

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
    if (updateData.newConstruction !== undefined) updateData.newConstruction = updateData.newConstruction === 'true' || updateData.newConstruction === true;
    if (updateData.petFriendly !== undefined) updateData.petFriendly = updateData.petFriendly === 'true' || updateData.petFriendly === true;

    // Convert parking to Int - parking field expects an integer, not boolean
    if (updateData.parking !== undefined) {
      if (updateData.parkingSpaces) {
        updateData.parking = parseInt(updateData.parkingSpaces);
      } else {
        updateData.parking = updateData.parking === 'true' || updateData.parking === true ? 1 : null;
      }
    }

    // Convert date fields
    if (updateData.dateListed) updateData.listingDate = new Date(updateData.dateListed);

    // Remove fields that don't exist in the database schema or are handled separately
    delete updateData.halfBathrooms;
    delete updateData.dateListed;
    delete updateData.primaryImage;
    delete updateData.galleryImages;
    delete updateData.userId;
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.updatedAt;
    delete updateData.images;
    delete updateData.user;
    delete updateData._count;

    // Update the property
    const property = await prisma.property.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: { name: true, email: true }
        },
        images: {
          orderBy: { order: 'asc' }
        }
      }
    });

    res.json(property);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(400).json({ error: 'Failed to update property', details: error.message });
  }
});

// DELETE /api/admin/properties/:id - Delete property
router.delete('/properties/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the property to get its images
    const property = await prisma.property.findUnique({
      where: { id },
      include: { images: true }
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Delete associated image files from the server
    for (const image of property.images) {
      const imagePath = path.join(__dirname, '..', '..', image.url); // Adjust path as necessary
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete the property and its associated images from the database
    await prisma.property.delete({
      where: { id }
    });

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(400).json({ error: 'Failed to delete property', details: error.message });
  }
});

module.exports = router;