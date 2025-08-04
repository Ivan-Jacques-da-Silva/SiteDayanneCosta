
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Middleware para verificar se o usuário está autenticado
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar usuário no banco
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true, role: true }
    });

    if (!user) {
      return res.status(403).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Middleware para verificar se o usuário é admin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Middleware para verificar se o usuário é um usuário comum (não admin)
const requireUser = (req, res, next) => {
  if (req.user.role === 'ADMIN') {
    // Admins also have access to user features
    return next();
  }
  
  if (req.user.role !== 'AGENT' && req.user.role !== 'CLIENT') {
    return res.status(403).json({ error: 'User access required' });
  }
  next();
};

// Middleware para verificar se o usuário pode acessar seus próprios recursos
const requireOwnershipOrAdmin = (req, res, next) => {
  const resourceUserId = req.params.userId || req.body.userId;
  
  if (req.user.role === 'ADMIN' || req.user.userId === resourceUserId) {
    return next();
  }
  
  return res.status(403).json({ error: 'Access denied: insufficient permissions' });
};

module.exports = {
  authenticateToken,
  requireAdmin,
  requireUser,
  requireOwnershipOrAdmin
};
