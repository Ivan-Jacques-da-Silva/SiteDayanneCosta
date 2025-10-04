const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Debug environment variables
console.log('🔍 Environment Variables Check:');
console.log('   DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Missing');
console.log('   NODE_ENV:', process.env.NODE_ENV || 'undefined');
console.log('   PORT:', process.env.PORT || 'undefined');

const { PrismaClient } = require('@prisma/client');

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
    console.log('🔧 Constructed DATABASE_URL from individual variables');
  }

  console.log('🔗 Attempting to initialize Prisma Client...');
  prisma = new PrismaClient({
    log: ['error', 'warn'],
    errorFormat: 'pretty',
  });
  console.log('✅ Prisma Client initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Prisma Client:', error.message);
  console.error('💡 Check your database configuration variables');
  prisma = null;
}

// Import routes
const propertyRoutes = require('./routes/properties');
const userRoutes = require('./routes/users');
const contactRoutes = require('./routes/contacts');
const favoriteRoutes = require('./routes/favorites');
const amenityRoutes = require('./routes/amenities');
const featureRoutes = require('./routes/features');
const adminRoutes = require('./routes/admin');
const featuredListingsRoutes = require('./routes/featured-listings');
const searchRoutes = require('./routes/search');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // libera images/css/js para outras origins (ex: 5173 -> 5000)
  })
);


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

// CORS específico para /uploads
app.use('/uploads', cors());

// Add middleware to log image requests for debugging
app.use('/uploads', (req, res, next) => {
  const filePath = path.join(__dirname, 'uploads', req.path);
  console.log(`📸 Image request: ${req.method} ${req.originalUrl}`);
  console.log(`📁 File path: ${filePath}`);
  console.log(`✅ File exists: ${fs.existsSync(filePath)}`);

  // List files in uploads directory for debugging
  const uploadsPath = path.join(__dirname, 'uploads', 'properties');
  if (fs.existsSync(uploadsPath)) {
    const files = fs.readdirSync(uploadsPath);
    console.log(`📂 Files in uploads/properties:`, files.slice(0, 5)); // Show first 5 files
  }

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

// Simple test route
app.get('/test', (req, res) => {
  res.send('OK - Backend está funcionando!');
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
app.use('/api/emails', require('./routes/emails'));
app.use('/api/search', searchRoutes);
app.use('/api/featured-listings', featuredListingsRoutes);

// Rota IDX Broker
const token = "E2zacX5HZjIrbp1SeiZ0i@";
const base = "https://api.idxbroker.com";

if (!token) {
  console.warn('⚠️  IDX_API_KEY não configurada. As rotas IDX não funcionarão corretamente.');
}

async function chamarIDXFeatured(parametros = {}) {
  const qs = new URLSearchParams(parametros);
  const url = `${base}/clients/featured${qs.toString() ? "?" + qs.toString() : ""}`;

  const r = await fetch(url, {
    method: "GET",
    headers: { accesskey: token, outputtype: "json" }
  });

  const texto = await r.text();
  if (!r.ok) throw new Error(`HTTP ${r.status} – ${texto.slice(0, 300)}`);

  try { return JSON.parse(texto); } catch { return texto; }
}

app.get("/api/idx/clients/featured", async (req, res) => {
  try {
    const count = req.query.count || 25;
    const dados = await chamarIDXFeatured({ count });
    res.json(dados);
  } catch (e) {
    res.status(500).json({ erro: e.message });
  }
});

// Rota para buscar detalhes de uma propriedade IDX específica
app.get("/api/idx/properties/:idxID", async (req, res) => {
  try {
    const { idxID } = req.params;
    const url = `${base}/clients/properties/${idxID}`;
    
    const r = await fetch(url, {
      method: "GET",
      headers: { accesskey: token, outputtype: "json" }
    });

    const texto = await r.text();
    if (!r.ok) throw new Error(`HTTP ${r.status} – ${texto.slice(0, 300)}`);

    try {
      const data = JSON.parse(texto);
      res.json(data);
    } catch {
      res.json(texto);
    }
  } catch (e) {
    res.status(500).json({ erro: e.message });
  }
});

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
  if (prisma) {
    try {
      await prisma.$disconnect();
    } catch (error) {
      console.error('Error disconnecting Prisma:', error);
    }
  }
  process.exit(0);
});

// Test database connection
async function testConnection() {
  if (!prisma) {
    console.log('⚠️  Database client not initialized - running without database');
    return;
  }

  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('💡 The application will continue without database functionality');
  }
}

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Server accessible at: http://0.0.0.0:${PORT}`);
  testConnection();
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
    server.listen(PORT + 1, '0.0.0.0');
  } else {
    console.error('Server error:', err);
  }
});

module.exports = app;