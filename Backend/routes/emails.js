
const express = require('express');
const { sendEmail, testConnection } = require('../config/email');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Test email configuration
router.get('/test', async (req, res) => {
  try {
    const isConnected = await testConnection();
    if (isConnected) {
      res.json({ success: true, message: 'Email configuration is working' });
    } else {
      res.status(500).json({ success: false, message: 'Email configuration failed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Send contact form email
router.post('/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Todos os campos obrigatórios devem ser preenchidos' 
      });
    }

    // Save to database (optional)
    try {
      await prisma.contact.create({
        data: {
          name: `${firstName} ${lastName}`,
          email,
          phone,
          message: message || '',
          source: 'CONTACT_PAGE',
          status: 'NEW',
          userId: 'system' // ou usar um ID padrão
        }
      });
    } catch (dbError) {
      console.error('Error saving contact to database:', dbError);
      // Continue even if DB save fails
    }

    // Send email
    const emailResult = await sendEmail('contactForm', {
      firstName,
      lastName,
      email,
      phone,
      message: message || 'Nenhuma mensagem adicional'
    });

    if (emailResult.success) {
      res.json({ 
        success: true, 
        message: 'Mensagem enviada com sucesso!' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Erro ao enviar email', 
        error: emailResult.error 
      });
    }
  } catch (error) {
    console.error('Error in contact route:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

// Send property inquiry email
router.post('/property-inquiry', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message, propertyId } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !propertyId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Todos os campos obrigatórios devem ser preenchidos' 
      });
    }

    // Get property details
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        images: {
          select: { url: true, isPrimary: true },
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!property) {
      return res.status(404).json({ 
        success: false, 
        message: 'Propriedade não encontrada' 
      });
    }

    // Save to database (optional)
    try {
      await prisma.contact.create({
        data: {
          name: `${firstName} ${lastName}`,
          email,
          phone,
          message: message || '',
          source: 'PROPERTY_INQUIRY',
          status: 'NEW',
          propertyId: propertyId,
          userId: 'system' // ou usar um ID padrão
        }
      });
    } catch (dbError) {
      console.error('Error saving property inquiry to database:', dbError);
      // Continue even if DB save fails
    }

    // Send email
    const emailResult = await sendEmail('propertyInquiry', {
      firstName,
      lastName,
      email,
      phone,
      message: message || 'Interesse na propriedade'
    }, property);

    if (emailResult.success) {
      res.json({ 
        success: true, 
        message: 'Interesse enviado com sucesso!' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Erro ao enviar email', 
        error: emailResult.error 
      });
    }
  } catch (error) {
    console.error('Error in property inquiry route:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

module.exports = router;
