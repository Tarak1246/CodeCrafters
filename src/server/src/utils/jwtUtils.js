const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

// Create a JWT token
const generateToken = async (user) => {
  return jwt.sign(user, jwtSecret, { expiresIn: '1h' });
};

// Verify a JWT token
const verifyToken = async (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = {
  generateToken,
  verifyToken,
};