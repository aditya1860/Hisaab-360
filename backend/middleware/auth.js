import jwt from 'jsonwebtoken';

if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error('FATAL: JWT_SECRET environment variable is required in production.');
}

export const JWT_SECRET = process.env.JWT_SECRET || 'hisaab360_super_secret_jwt_key_2026';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

export function isSeller(req, res, next) {
  if (req.user && req.user.role === 'seller') {
    next();
  } else {
    res.status(403).json({ error: 'Access restricted to Sellers only' });
  }
}

export function isCustomer(req, res, next) {
  if (req.user && req.user.role === 'customer') {
    next();
  } else {
    res.status(403).json({ error: 'Access restricted to Customers only' });
  }
}

export function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access restricted to Platform Administrators only' });
  }
}

export function isSellerOrAdmin(req, res, next) {
  if (req.user && (req.user.role === 'seller' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ error: 'Access restricted to Sellers or Platform Administrators' });
  }
}
