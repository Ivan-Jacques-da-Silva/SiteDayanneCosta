const express = require('express');
const { sendEmail, testConnection } = require('../config/email');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();

let prisma;
try {
  // Check if DATABASE_URL exists, if not, construct it from individual variables
  let databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    // Construct DATABASE_URL from individual environment variables
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '5432';
    const database = process.env.DB_NAME || 'real_estate_db';
    const username = process.env.DB_USER || 'postgres';
    const password = process.env.DB_PASSWORD || 'admin';

    databaseUrl = `postgresql://${username}:${password}@${host}:${port}/${database}`;
    process.env.DATABASE_URL = databaseUrl;
  }

  prisma = new PrismaClient({
    errorFormat: 'pretty',
    log: ['error', 'warn'],
  });

  console.log('✅ Prisma Client initialized successfully in emails.js');
} catch (error) {
  console.error('❌ Failed to initialize Prisma Client in emails.js:', error.message);
  prisma = null;
}

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
        message: 'All required fields must be filled in'
      });
    }

    // Save to database
    if (prisma) {
      try {
        await prisma.contact.create({
          data: {
            name: `${firstName} ${lastName}`,
            email,
            phone,
            message: message || '',
            type: 'INQUIRY',
            source: 'CONTACT_PAGE',
            status: 'NEW',
            userId: null // Explicitly set as null for anonymous contacts
          }
        });
        console.log('Contact saved to database successfully');
      } catch (dbError) {
        console.error('Error saving contact to database:', dbError);
        return res.status(500).json({
          success: false,
          message: 'Failed to save contact to database',
          error: dbError.message
        });
      }
    } else {
      console.error('Database not available');
      return res.status(500).json({
        success: false,
        message: '**Failed** - Database connection not available'
      });
    }

    // Send email
    const emailResult = await sendEmail('contactForm', {
      firstName,
      lastName,
      email,
      phone,
      message: message || 'No additional message'
    });

    if (emailResult.success) {
      res.json({
        success: true,
        message: 'Message sent successfully!'
      });
    } else {
      res.status(500).json({
        success: false,
        message: '**Failed** to send email',
        error: emailResult.error
      });
    }
  } catch (error) {
    console.error('Error in contact route:', error);
    res.status(500).json({
      success: false,
      message: '**Failed** - Internal server error',
      error: error.message
    });
  }
});

// Send buy/sell form email
router.post('/buy-sell-form', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message, formData } = req.body;

    console.log('Buy-sell form received data:', { firstName, lastName, email, phone, message, formData });

    // Validate required fields
    if (!firstName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled in'
      });
    }

    // Save to database
    if (prisma) {
      try {
        // Create a formatted metadata string
        const metadataString = formData ? Object.entries(formData)
          .map(([key, value]) => `${key}: ${value || 'Not specified'}`)
          .join(', ') : '';

        console.log('Formatted metadata:', metadataString);

        await prisma.contact.create({
          data: {
            name: `${firstName} ${lastName || ''}`.trim(),
            email,
            phone,
            message: message || 'No additional comments',
            type: 'BUY_SELL_FORM',
            source: 'BUY_SELL_FORM',
            status: 'NEW',
            metadata: JSON.stringify(formData || {}),
            userId: null // Explicitly set as null for anonymous contacts
          }
        });
        console.log('Buy/Sell quiz saved to database successfully');
      } catch (dbError) {
        console.error('Error saving buy/sell quiz to database:', dbError);
        return res.status(500).json({
          success: false,
          message: 'Failed to save quiz to database',
          error: dbError.message
        });
      }
    } else {
      console.error('Database not available');
      return res.status(500).json({
        success: false,
        message: '**Failed** - Database connection not available'
      });
    }

    // Send email
    const emailResult = await sendEmail('buySellForm', {
      firstName,
      lastName: lastName || '',
      email,
      phone,
      message: message || 'No additional comments',
      formData
    });

    if (emailResult.success) {
      res.json({
        success: true,
        message: 'Buy/Sell quiz submission sent successfully!'
      });
    } else {
      res.status(500).json({
        success: false,
        message: '**Failed** to send email notification',
        error: emailResult.error
      });
    }
  } catch (error) {
    console.error('Error in buy-sell form route:', error);
    res.status(500).json({
      success: false,
      message: '**Failed** - Internal server error',
      error: error.message
    });
  }
});

// Send welcome email
router.post('/welcome', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    console.log('Welcome email request:', { firstName, lastName, email });

    // Validate required fields
    if (!firstName || !email) {
      return res.status(400).json({
        success: false,
        message: 'First name and email are required'
      });
    }

    // Send welcome email
    const emailResult = await sendEmail('welcomeEmail', {
      firstName,
      lastName: lastName || '',
      email
    });

    if (emailResult.success) {
      res.json({
        success: true,
        message: 'Welcome email sent successfully!'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send welcome email',
        error: emailResult.error
      });
    }
  } catch (error) {
    console.error('Error in welcome email route:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Send property inquiry email
// Send sell registration email
router.post('/sell-registration', async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ 
        success: false, 
        message: 'Address is required' 
      });
    }

    // Send email notification
    const emailResult = await sendEmail('sellRegistration', { address });

    if (emailResult.success) {
      res.json({ 
        success: true, 
        message: 'Sell registration email sent successfully' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send sell registration email',
        error: emailResult.error 
      });
    }
  } catch (error) {
    console.error('Error in sell registration:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

router.post('/property-inquiry', async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      message, 
      propertyId, 
      idxPropertyId,
      propertyUrl,
      source,
      propertySummary
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled in'
      });
    }

    let property = null;

    // Handle IDX property
    if (source === 'IDX' && idxPropertyId) {
      property = propertySummary || {
        id: idxPropertyId,
        address: 'IDX Property',
        city: 'Miami',
        state: 'FL',
        zipCode: 'N/A',
        price: null,
        beds: 'N/A',
        baths: 'N/A',
        sqft: null,
        mlsId: idxPropertyId
      };
      console.log('Processing IDX property inquiry:', idxPropertyId);
    } 
    // Handle local database property
    else if (propertyId && prisma) {
      try {
        property = await prisma.property.findUnique({
          where: { id: propertyId },
          include: {
            images: {
              select: { url: true, isPrimary: true },
              orderBy: { order: 'asc' }
            }
          }
        });
      } catch (dbError) {
        console.error('Error fetching property from database:', dbError);
      }

      if (!property) {
        property = {
          id: propertyId,
          address: 'Property Address Not Available',
          city: 'Miami',
          state: 'FL',
          zipCode: 'N/A',
          price: null,
          beds: 'N/A',
          baths: 'N/A',
          sqft: null,
          mlsId: null
        };
        console.warn('Property not found in database, using fallback data');
      }
    }

    // Save to database (only for local properties)
    if (prisma && source !== 'IDX' && propertyId) {
      try {
        await prisma.contact.create({
          data: {
            name: `${firstName} ${lastName}`,
            email,
            phone,
            message: message || '',
            type: 'PROPERTY_INQUIRY',
            source: 'PROPERTY_INQUIRY',
            status: 'NEW',
            propertyId: propertyId,
            userId: null
          }
        });
        console.log('Property inquiry saved to database successfully');
      } catch (dbError) {
        console.error('Error saving property inquiry to database:', dbError);
      }
    } else if (prisma && source === 'IDX') {
      try {
        await prisma.contact.create({
          data: {
            name: `${firstName} ${lastName}`,
            email,
            phone,
            message: message || '',
            type: 'IDX_PROPERTY_INQUIRY',
            source: 'IDX_PROPERTY',
            status: 'NEW',
            metadata: JSON.stringify({ idxPropertyId, propertySummary }),
            userId: null
          }
        });
        console.log('IDX property inquiry saved to database successfully');
      } catch (dbError) {
        console.error('Error saving IDX inquiry to database:', dbError);
      }
    }

    // Send email
    const emailResult = await sendEmail('propertyInquiry', {
      firstName,
      lastName,
      email,
      phone,
      message: message || 'Interest in property',
      propertyUrl,
      isIDX: source === 'IDX'
    }, property);

    if (emailResult.success) {
      res.json({
        success: true,
        message: 'Inquiry sent successfully!'
      });
    } else {
      res.status(500).json({
        success: false,
        message: '**Failed** to send email',
        error: emailResult.error
      });
    }
  } catch (error) {
    console.error('Error in property inquiry route:', error);
    res.status(500).json({
      success: false,
      message: '**Failed** - Internal server error',
      error: error.message
    });
  }
});

// Graceful cleanup
process.on('beforeExit', async () => {
  if (prisma) {
    try {
      await prisma.$disconnect();
    } catch (error) {
      console.error('Error disconnecting Prisma:', error);
    }
  }
});

module.exports = router;