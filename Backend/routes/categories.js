const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/categories - List all categories with subcategories
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { parentId: null },
      orderBy: { name: 'asc' },
      include: {
        subcategories: {
          orderBy: { name: 'asc' },
          include: {
            _count: {
              select: { properties: true }
            }
          }
        },
        _count: {
          select: { properties: true }
        }
      }
    });

    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// POST /api/categories - Create new category or subcategory
router.post('/', async (req, res) => {
  try {
    const { name, description, icon, color, parentId } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    // Format name: first letter uppercase, rest lowercase
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    // Check if category already exists
    const existingCategory = await prisma.category.findFirst({
      where: { name: { equals: formattedName, mode: 'insensitive' } }
    });

    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const category = await prisma.category.create({
      data: {
        name: formattedName,
        description,
        icon,
        color: color || '#3b82f6',
        parentId
      }
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(400).json({ error: 'Failed to create category' });
  }
});

// PUT /api/categories/:id - Update category
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon, color } = req.body;

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        description,
        icon,
        color
      }
    });

    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(400).json({ error: 'Failed to update category' });
  }
});

// DELETE /api/categories/:id - Delete category
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category is being used by any properties
    const propertyCount = await prisma.propertyCategory.count({
      where: { categoryId: id }
    });

    if (propertyCount > 0) {
      return res.status(400).json({ 
        error: `Cannot delete category. It is being used by ${propertyCount} properties.` 
      });
    }

    await prisma.category.delete({
      where: { id }
    });

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(400).json({ error: 'Failed to delete category' });
  }
});

// GET /api/categories/all - Get all categories and subcategories for forms
router.get('/all', async (req, res) => {
  try {
    const allCategories = await prisma.category.findMany({
      orderBy: {
        name: "asc"
      },
      include: {
        _count: {
          select: {
            properties: true
          }
        }
      }
    });

    res.json(allCategories);
  } catch (error) {
    console.error('Error fetching all categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// POST /api/categories/subcategory - Create new subcategory
router.post('/subcategory', async (req, res) => {
  try {
    const { name, parentId, description } = req.body;

    if (!name || !parentId) {
      return res.status(400).json({ error: 'Name and parent category are required' });
    }

    // Format name: first letter uppercase, rest lowercase
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    // Check if subcategory already exists
    const existingSubcategory = await prisma.category.findFirst({
      where: { 
        name: { equals: formattedName, mode: 'insensitive' },
        parentId: parentId
      }
    });

    if (existingSubcategory) {
      return res.status(400).json({ error: 'Subcategory already exists in this category' });
    }

    const subcategory = await prisma.category.create({
      data: {
        name: formattedName,
        description,
        parentId,
        color: '#6366f1'
      }
    });

    res.status(201).json(subcategory);
  } catch (error) {
    console.error('Error creating subcategory:', error);
    res.status(400).json({ error: 'Failed to create subcategory' });
  }
});

module.exports = router;