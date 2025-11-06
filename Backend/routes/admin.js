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
    // Ensure the uploads directory exists
    const dir = path.join(__dirname, '..', 'uploads', 'properties');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unico = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const prefixo = file.fieldname === 'primaryImage' ? 'primary' : file.fieldname === 'pricingPdf' ? 'pricing' : file.fieldname === 'factSheetPdf' ? 'factsheet' : file.fieldname === 'brochurePdf' ? 'brochure' : 'gallery';
    cb(null, `${prefixo}-${unico}${path.extname(file.originalname)}`);
  }

});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760 // 10MB for PDFs
  },
  fileFilter: (req, file, cb) => {
    console.log('📁 Processing file:', {
      fieldname: file.fieldname,
      mimetype: file.mimetype,
      originalname: file.originalname
    });

    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const allowedPdfTypes = ['application/pdf'];

    if (allowedImageTypes.includes(file.mimetype) || allowedPdfTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      console.log('❌ File rejected - Invalid type:', file.mimetype);
      cb(new Error(`Invalid file type: ${file.mimetype}. Only JPEG, PNG, WebP images and PDF documents are allowed.`), false);
    }
  }
});

// Define upload fields including PDF documents
const uploadFields = upload.fields([
  { name: 'primaryImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 50 },
  { name: 'pricingPdf', maxCount: 1 },
  { name: 'factSheetPdf', maxCount: 1 },
  { name: 'brochurePdf', maxCount: 1 }
]);


// Apply authentication and admin middleware to all routes
router.use(authenticateToken);
router.use(requireAdmin);

router.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.originalUrl}`);
  next();
});


// GET /api/admin/dashboard - Dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalProperties,
      activeProperties,
      totalContacts,
      newContacts,
      totalUsers,
      totalFavorites
    ] = await Promise.all([
      prisma.property.count(),
      prisma.property.count({ where: { status: 'ACTIVE' } }),
      prisma.contact.count(),
      prisma.contact.count({ where: { status: 'NEW' } }),
      prisma.user.count({ where: { role: { not: 'ADMIN' } } }),
      prisma.favorite.count()
    ]);

    res.json({
      totalProperties,
      activeProperties,
      totalContacts,
      newContacts,
      totalUsers,
      totalFavorites
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// GET /api/admin/recent-activity - Recent activity feed
router.get('/recent-activity', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    // Get recent activities from different sources
    const [recentContacts, recentUsers, recentProperties, recentFavorites] = await Promise.all([
      prisma.contact.findMany({
        select: {
          id: true,
          name: true,
          type: true,
          createdAt: true,
          property: {
            select: { title: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 5
      }),
      prisma.user.findMany({
        where: { role: { not: 'ADMIN' } },
        select: {
          id: true,
          name: true,
          role: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' },
        take: 3
      }),
      prisma.property.findMany({
        select: {
          id: true,
          title: true,
          status: true,
          createdAt: true,
          user: {
            select: { name: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 3
      }),
      prisma.favorite.findMany({
        select: {
          id: true,
          createdAt: true,
          user: {
            select: { name: true }
          },
          property: {
            select: { title: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 3
      })
    ]);

    // Combine and format activities
    const activities = [];
    
    // Add contact activities
    recentContacts.forEach(contact => {
      activities.push({
        id: `contact-${contact.id}`,
        type: 'contact',
        icon: 'fas fa-envelope',
        text: `New ${contact.type.toLowerCase()} from ${contact.name}${contact.property ? ` for ${contact.property.title}` : ''}`,
        timestamp: contact.createdAt
      });
    });

    // Add user activities
    recentUsers.forEach(user => {
      activities.push({
        id: `user-${user.id}`,
        type: 'user',
        icon: 'fas fa-user-plus',
        text: `New ${user.role.toLowerCase()} registered: ${user.name}`,
        timestamp: user.createdAt
      });
    });

    // Add property activities
    recentProperties.forEach(property => {
      activities.push({
        id: `property-${property.id}`,
        type: 'property',
        icon: 'fas fa-home',
        text: `Property "${property.title}" was added by ${property.user.name}`,
        timestamp: property.createdAt
      });
    });

    // Add favorite activities
    recentFavorites.forEach(favorite => {
      activities.push({
        id: `favorite-${favorite.id}`,
        type: 'favorite',
        icon: 'fas fa-heart',
        text: `${favorite.user.name} favorited "${favorite.property.title}"`,
        timestamp: favorite.createdAt
      });
    });

    // Sort by timestamp and limit
    const sortedActivities = activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);

    res.json({ activities: sortedActivities });
  } catch (error) {
    console.error('Recent activity error:', error);
    res.status(500).json({ error: 'Failed to fetch recent activity' });
  }
});

// GET /api/admin/contacts - Get all contacts with pagination and property details
router.get('/contacts', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, type } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (status) where.status = status;
    if (type) where.type = type;

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        include: {
          user: {
            select: { name: true, email: true }
          },
          property: {
            select: {
              id: true,
              title: true,
              address: true,
              city: true,
              state: true,
              zipCode: true,
              price: true,
              bedrooms: true,
              bathrooms: true,
              sqft: true
            }
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

// PUT /api/admin/contacts/:id - Update contact status
router.put('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await prisma.contact.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: { name: true, email: true }
        },
        property: {
          select: {
            id: true,
            title: true,
            address: true,
            city: true,
            state: true,
            zipCode: true,
            price: true
          }
        }
      }
    });

    res.json(contact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(400).json({ error: 'Failed to update contact status' });
  }
});

// DELETE /api/admin/contacts/:id - Delete contact
router.delete('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.contact.delete({
      where: { id }
    });

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(400).json({ error: 'Failed to delete contact' });
  }
});

// GET /api/admin/users - Get all users
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build dynamic where clause
    const where = {};
    if (role) where.role = role; // ADMIN | AGENT | CLIENT
    if (search) {
      where.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { email: { contains: String(search), mode: 'insensitive' } }
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
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
      prisma.user.count({ where })
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

// PUT /api/admin/users/:id - Update user (name, email, role, password)
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    const data = {};
    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email;
    if (role !== undefined) data.role = role; // 'ADMIN' | 'AGENT' | 'CLIENT'
    if (password && String(password).trim() !== '') {
      data.password = await bcrypt.hash(password, 12);
    }

    const user = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email already in use' });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE /api/admin/users/:id - Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Optional safety: prevent deleting current logged admin
    if (req.user && req.user.id === id) {
      return res.status(400).json({ error: 'Cannot delete the currently logged-in user' });
    }

    await prisma.user.delete({ where: { id } });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// GET /api/admin/properties - Get all properties with optional pagination
router.get('/properties', async (req, res) => {
  try {
    const { page, limit, search, status, categoria, bairro } = req.query;

    // Only apply pagination if both page and limit are provided
    const shouldPaginate = page && limit;
    const skip = shouldPaginate ? (parseInt(page) - 1) * parseInt(limit) : undefined;
    const take = shouldPaginate ? parseInt(limit) : undefined;

    // Build where clause for filtering
    const where = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { mlsId: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (status) {
      where.status = status;
    }

    if (categoria) {
      where.categoria = categoria;
    }

    if (bairro) {
      where.bairro = bairro;
    }

    const queryOptions = {
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
      orderBy: { createdAt: 'desc' }
    };

    // Add pagination only if specified
    if (shouldPaginate) {
      queryOptions.skip = skip;
      queryOptions.take = take;
    }

    const [properties, total] = await Promise.all([
      prisma.property.findMany(queryOptions),
      prisma.property.count({ where })
    ]);

    const response = {
      properties,
      total
    };

    // Include pagination info only if pagination was applied
    if (shouldPaginate) {
      response.pagination = {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      };
    }

    res.json(response);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// POST /api/admin/properties - Create new property
router.post('/properties', uploadFields, (req, res, next) => {

  // Debug middleware para verificar campos recebidos
  console.log('🔍 POST Request Debug:');
  console.log('📁 Files received:', req.files ? Object.keys(req.files) : 'none');
  console.log('📝 Body fields:', Object.keys(req.body));
  if (req.files) {
    Object.keys(req.files).forEach(field => {
      console.log(`   - ${field}: ${req.files[field].length} file(s)`);
    });
  }
  next();
}, async (req, res) => {
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
      userId,
      isFeatured // Added isFeatured to destructuring
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
        bairro: (bairro && bairro !== "") ? bairro : null,
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
        subdivision,
        virtualTour,
        amenities,
        listingCourtesy,
        listingAgent,
        listingOffice,
        shortSale: shortSale || 'Regular Sale',
        newConstruction: newConstruction === 'true' || newConstruction === true,
        petFriendly: petFriendly === 'true' || petFriendly === true,
        isFeatured: isFeatured === 'true' || isFeatured === true, // Handle isFeatured boolean
        userId: userId || req.user.id,
        country: 'USA',
        images: {
          create: [
            ...(req.files?.primaryImage ? [{
              url: `/uploads/properties/${req.files.primaryImage[0].filename}`,
              isPrimary: true,
              order: 0
            }] : []),
            ...(req.files?.galleryImages ? req.files.galleryImages.map((file, i) => ({
              url: `/uploads/properties/${file.filename}`,
              isPrimary: false,
              order: i + 1
            })) : [])
          ]
        },
        pricingPdf: req.files?.pricingPdf ? `/uploads/properties/${req.files.pricingPdf[0].filename}` : null,
        factSheetPdf: req.files?.factSheetPdf ? `/uploads/properties/${req.files.factSheetPdf[0].filename}` : null,
        brochurePdf: req.files?.brochurePdf ? `/uploads/properties/${req.files.brochurePdf[0].filename}` : null,
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
router.put('/properties/:id', uploadFields, (req, res, next) => {

  // Debug middleware para verificar campos recebidos
  console.log('🔍 PUT Request Debug:');
  console.log('📁 Files received:', req.files ? Object.keys(req.files) : 'none');
  console.log('📝 Body fields:', Object.keys(req.body));
  if (req.files) {
    Object.keys(req.files).forEach(field => {
      console.log(`   - ${field}: ${req.files[field].length} file(s)`);
    });
  }
  next();
}, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    const existingProperty = await prisma.property.findUnique({
      where: { id },
      include: { images: true } // Include images to check for existing ones
    });

    if (!existingProperty) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Handle image updates
    if (req.files && Object.keys(req.files).length > 0) {
      // Handle primary image update - check all possible field names
      const primaryImageFile = req.files?.primaryImage?.[0] || null;

      if (primaryImageFile) {
        const existente = existingProperty.images.find(img => img.isPrimary);

        if (existente) {
          const oldPath = path.resolve(process.cwd(), existente.url.replace(/^\//, ''));
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

          await prisma.propertyImage.update({
            where: { id: existente.id },
            data: {
              url: `/uploads/properties/${primaryImageFile.filename}`,
              order: 0
            }
          });
        } else {
          await prisma.propertyImage.create({
            data: {
              propertyId: id,
              url: `/uploads/properties/${primaryImageFile.filename}`,
              isPrimary: true,
              order: 0
            }
          });
        }
      }
      // Handle gallery images - check all possible field names
      const galleryImageFiles = req.files?.galleryImages || [];

      if (galleryImageFiles.length > 0) {
        const antigas = existingProperty.images.filter(img => !img.isPrimary);
        for (const img of antigas) {
          const oldPath = path.resolve(process.cwd(), img.url.replace(/^\//, ''));
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        await prisma.propertyImage.deleteMany({
          where: { propertyId: id, isPrimary: false }
        });

        await prisma.propertyImage.createMany({
          data: galleryImageFiles.map((file, i) => ({
            propertyId: id,
            url: `/uploads/properties/${file.filename}`,
            isPrimary: false,
            order: i + 1
          }))
        });
      }

      // Handle PDF document updates
      if (req.files?.pricingPdf) {
        // Remove old pricing PDF if exists
        if (existingProperty.pricingPdf) {
          const oldPath = path.resolve(process.cwd(), existingProperty.pricingPdf.replace(/^\//, ''));
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        updateData.pricingPdf = `/uploads/properties/${req.files.pricingPdf[0].filename}`;
      }

      if (req.files?.factSheetPdf) {
        // Remove old fact sheet PDF if exists
        if (existingProperty.factSheetPdf) {
          const oldPath = path.resolve(process.cwd(), existingProperty.factSheetPdf.replace(/^\//, ''));
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        updateData.factSheetPdf = `/uploads/properties/${req.files.factSheetPdf[0].filename}`;
      }

      if (req.files?.brochurePdf) {
        // Remove old brochure PDF if exists
        if (existingProperty.brochurePdf) {
          const oldPath = path.resolve(process.cwd(), existingProperty.brochurePdf.replace(/^\//, ''));
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        updateData.brochurePdf = `/uploads/properties/${req.files.brochurePdf[0].filename}`;
      }

      // Handle PDF removal flags
      if (req.body.removePricingPdf === 'true') {
        if (existingProperty.pricingPdf) {
          const oldPath = path.resolve(process.cwd(), existingProperty.pricingPdf.replace(/^\//, ''));
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        updateData.pricingPdf = null;
      }

      if (req.body.removeFactSheetPdf === 'true') {
        if (existingProperty.factSheetPdf) {
          const oldPath = path.resolve(process.cwd(), existingProperty.factSheetPdf.replace(/^\//, ''));
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        updateData.factSheetPdf = null;
      }

      if (req.body.removeBrochurePdf === 'true') {
        if (existingProperty.brochurePdf) {
          const oldPath = path.resolve(process.cwd(), existingProperty.brochurePdf.replace(/^\//, ''));
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        updateData.brochurePdf = null;
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
    if (updateData.lotSize) updateData.lotSize = parseFloat(updateData.lotSize);
    if (updateData.yearBuilt) updateData.yearBuilt = parseInt(updateData.yearBuilt);
    if (updateData.garage) updateData.garage = parseInt(updateData.garage);
    if (updateData.daysOnMarket) updateData.daysOnMarket = parseInt(updateData.daysOnMarket);
    if (updateData.parkingSpaces) updateData.parkingSpaces = parseInt(updateData.parkingSpaces);
    if (updateData.hoaFees) updateData.hoaFees = parseFloat(updateData.hoaFees);
    if (updateData.taxAmount) updateData.taxAmount = parseFloat(updateData.taxAmount);
    if (updateData.taxYear) updateData.taxYear = parseInt(updateData.taxYear);
    if (updateData.latitude) updateData.latitude = parseFloat(updateData.latitude);
    if (updateData.longitude) updateData.longitude = parseFloat(updateData.longitude);

    // Convert boolean fields
    // Convert string booleans to actual booleans
        ['pool', 'waterfront', 'furnished', 'petFriendly', 'newConstruction'].forEach(field => {
          if (updateData[field] !== undefined) {
            updateData[field] = updateData[field] === 'true' || updateData[field] === true;
          }
        });

    // Convert string booleans to actual booleans
        ['pool', 'waterfront', 'furnished', 'petFriendly', 'newConstruction', 'isFeatured'].forEach(field => {
          if (updateData[field] !== undefined) {
            updateData[field] = updateData[field] === 'true' || updateData[field] === true;
          }
        });

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

    // Handle enum fields - convert empty strings to null
    if (updateData.bairro === "" || updateData.bairro === null || updateData.bairro === undefined) {
      updateData.bairro = null;
    }

    // Remove fields that don't exist in the database schema or are handled separately
    delete updateData.halfBathrooms;
    delete updateData.dateListed;
    delete updateData.primaryImage;
    delete updateData.galleryImages;
    delete updateData.pricingPdf;
    delete updateData.factSheetPdf;
    delete updateData.brochurePdf;
    delete updateData.userId;
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.updatedAt;
    delete updateData.images;
    delete updateData.user;
    delete updateData._count;
    delete updateData.waterfrontDescription;

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

    // Find the property to get its images and documents
    const property = await prisma.property.findUnique({
      where: { id },
      include: { images: true } // Assuming images are related, you might need to include documents too if they are structured similarly
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Delete associated image files from the server
    for (const image of property.images) {
      const imagePath = path.resolve(process.cwd(), image.url.replace(/^\//, ''));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete associated PDF documents from the server
    if (property.pricingPdf) {
      const pricingPdfPath = path.resolve(process.cwd(), property.pricingPdf.replace(/^\//, ''));
      if (fs.existsSync(pricingPdfPath)) fs.unlinkSync(pricingPdfPath);
    }
    if (property.factSheetPdf) {
      const factSheetPdfPath = path.resolve(process.cwd(), property.factSheetPdf.replace(/^\//, ''));
      if (fs.existsSync(factSheetPdfPath)) fs.unlinkSync(factSheetPdfPath);
    }
    if (property.brochurePdf) {
      const brochurePdfPath = path.resolve(process.cwd(), property.brochurePdf.replace(/^\//, ''));
      if (fs.existsSync(brochurePdfPath)) fs.unlinkSync(brochurePdfPath);
    }

    // Delete the property and its associated data from the database
    await prisma.property.delete({
      where: { id }
    });

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(400).json({ error: 'Failed to delete property', details: error.message });
  }
});

// Get all favorites with user and property data
router.get('/favorites', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const userId = req.query.userId;

    let whereCondition = {};
    if (userId) {
      whereCondition.userId = userId;
    }

    const [favorites, totalCount] = await Promise.all([
      prisma.favorite.findMany({
        where: whereCondition,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          property: {
            include: {
              images: {
                where: { isPrimary: true },
                take: 1
              }
            }
          }
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.favorite.count({ where: whereCondition })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      favorites,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCount,
        pages: totalPages
      }
    });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// Delete favorite
router.delete('/favorites/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.favorite.delete({
      where: { id }
    });

    res.json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
});



// Dashboard stats
router.get('/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    const [
      totalProperties,
      totalContacts,
      totalUsers,
      totalFavorites
    ] = await Promise.all([
      prisma.property.count(),
      prisma.contact.count(),
      prisma.user.count(),
      prisma.favorite.count()
    ]);

    res.json({
      totalProperties,
      totalContacts,
      totalUsers,
      totalFavorites
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});


module.exports = router;
