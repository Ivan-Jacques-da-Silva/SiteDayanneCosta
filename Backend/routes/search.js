
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const {
      search = '',
      propertyType,
      saleType,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      location,
      page = 1,
      limit = 12,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Construir filtros
    const where = {};

    // Busca textual
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { state: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Filtros específicos
    if (propertyType && propertyType !== 'All') {
      where.propertyType = propertyType;
    }

    if (saleType && saleType !== 'All') {
      if (saleType === 'For Sale') {
        where.saleType = 'SALE';
      } else if (saleType === 'For Rent') {
        where.saleType = 'RENT';
      }
    }

    if (minPrice) {
      where.price = { ...where.price, gte: parseFloat(minPrice) };
    }

    if (maxPrice) {
      where.price = { ...where.price, lte: parseFloat(maxPrice) };
    }

    if (bedrooms && bedrooms !== 'Any') {
      const bedroomCount = bedrooms.includes('+') ? 
        parseInt(bedrooms.replace('+', '')) : 
        parseInt(bedrooms);
      
      if (bedrooms.includes('+')) {
        where.bedrooms = { gte: bedroomCount };
      } else {
        where.bedrooms = bedroomCount;
      }
    }

    if (bathrooms && bathrooms !== 'Any') {
      const bathroomCount = bathrooms.includes('+') ? 
        parseFloat(bathrooms.replace('+', '')) : 
        parseFloat(bathrooms);
      
      if (bathrooms.includes('+')) {
        where.bathrooms = { gte: bathroomCount };
      } else {
        where.bathrooms = bathroomCount;
      }
    }

    if (location) {
      where.OR = [
        ...(where.OR || []),
        { city: { contains: location, mode: 'insensitive' } },
        { state: { contains: location, mode: 'insensitive' } },
        { address: { contains: location, mode: 'insensitive' } }
      ];
    }

    // Buscar propriedades
    const [properties, totalCount] = await Promise.all([
      prisma.property.findMany({
        where,
        skip,
        take,
        orderBy: {
          [sortBy]: sortOrder
        },
        include: {
          images: true,
          features: true
        }
      }),
      prisma.property.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / take);

    res.json({
      properties,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNextPage: parseInt(page) < totalPages,
        hasPreviousPage: parseInt(page) > 1
      },
      filters: {
        search,
        propertyType,
        saleType,
        minPrice,
        maxPrice,
        bedrooms,
        bathrooms,
        location
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      message: 'Erro interno do servidor ao realizar busca',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
