const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
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

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
const propertiesDir = path.join(uploadsDir, 'properties');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(propertiesDir)) {
  fs.mkdirSync(propertiesDir, { recursive: true });
}

// Add middleware to log image requests for debugging
app.use('/uploads', (req, res, next) => {
  console.log(`Image request: ${req.method} ${req.originalUrl}`);
  console.log(`File path: ${path.join(__dirname, 'uploads', req.path)}`);
  console.log(`File exists: ${fs.existsSync(path.join(__dirname, 'uploads', req.path))}`);
  
  // Add CORS headers for images
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  next();
});

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../dist')));

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
app.use('/api/properties-by-category', require('./routes/properties-by-category'));
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/amenities', amenityRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/categories', require('./routes/categories'));
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
  const indexPath = path.join(__dirname, '../dist/index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'Frontend not built. Run npm run build first.' });
  }
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
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  testConnection();
});

module.exports = app;