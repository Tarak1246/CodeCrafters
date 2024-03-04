const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

// Create a JWT token
const generateToken = async (user) => {
  return jwt.sign(user, jwtSecret, { expiresIn: '1h' });
};

// Verify a JWT token
const verifyToken = async (token) => {
  console.log(jwt.verify(token, jwtSecret))
  return jwt.verify(token, jwtSecret);
};

module.exports = {
  generateToken,
  verifyToken,
};