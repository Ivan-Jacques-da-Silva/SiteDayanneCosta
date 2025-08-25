const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = status ? { status } : {};

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        skip,
        take: parseInt(limit),
        include: {
          user: {
            select: { name: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' }
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

// Create contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, type, source, formData, propertyId } = req.body;

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        message,
        type: type || 'INQUIRY',
        source,
        propertyId,
        metadata: formData ? JSON.stringify(formData) : null
      }
    });

    // Send email notification
    if (type === 'BUY_SELL_FORM') {
      try {
        const { sendEmail } = require('../config/email');
        await sendEmail('buySellForm', {
          firstName: name.split(' ')[0] || name,
          lastName: name.split(' ').slice(1).join(' ') || '',
          email,
          phone,
          message: message || 'No additional comments',
          formData
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }
    }

    res.status(201).json(contact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

module.exports = router;