const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Import routes
const propertyRoutes = require('./routes/properties');
const userRoutes = require('./routes/users');
const contactRoutes = require('./routes/contacts');
const favoriteRoutes = require('./routes/favorites');
const amenityRoutes = require('./routes/amenities');
const featureRoutes = require('./routes/features');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
const corsConfig = require('./config/cors');

// Log das origins permitidas
corsConfig.logAllowedOrigins();

app.use(cors(corsConfig.corsOptions));

// Set JWT_SECRET if not provided
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'your-super-secret-jwt-key-for-development';
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan('combined'));

// Custom request logging for debugging
app.use((req, res, next) => {
  console.log(`\n=== INCOMING REQUEST ===`);
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log(`========================\n`);
  next();
});

// Serve static files
app.use('/uploads', express.static('uploads'));

// Serve frontend static files
app.use(express.static('../dist'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// API Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/amenities', amenityRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  if (err.code === 'P2002') {
    return res.status(400).json({
      error: 'Duplicate entry',
      message: 'A record with this information already exists'
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      error: 'Not found',
      message: 'The requested record was not found'
    });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Serve React app for non-API routes
app.use('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).json({ error: 'Route not found' });
  }
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Test database connection
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Check if admin user exists
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    console.log('Admin user exists:', !!adminUser);
    if (adminUser) {
      console.log('Admin email:', adminUser.email);
    }

  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

app.listen(PORT, 'localhost', () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`📅 Started at: ${new Date().toISOString()}`);
  console.log(`🌐 Configured for local development`);
  console.log(`🔗 Frontend proxy: http://localhost:3000 -> http://localhost:${PORT}`);
  testConnection();
});

module.exports = app;