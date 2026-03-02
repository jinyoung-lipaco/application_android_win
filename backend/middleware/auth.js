const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'sohaengsung-jwt-secret-dev-2024';

function generateToken(user) {
  return jwt.sign(
    { id: user.id, nickname: user.nickname },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: '인증이 필요합니다' });
  }
  try {
    const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: '유효하지 않은 토큰입니다' });
  }
}

function authOptional(req, res, next) {
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    try {
      req.user = jwt.verify(header.split(' ')[1], JWT_SECRET);
    } catch { /* ignore */ }
  }
  next();
}

module.exports = { generateToken, authRequired, authOptional };
