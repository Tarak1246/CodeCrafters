/**
 * @file jwtUtils.js
 * @description Provides utility functions for generating and verifying JWT tokens.
 * @author @Tarak1246
 * @date March 13, 2024
 */

const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

/**
 * @description Generates a JWT token for a user.
 * @param {Object} user - An object containing user data to be included in the token.
 * @returns {Promise<string>} A promise that resolves with the generated JWT token.
 */
const generateToken = async (user) => {
  return jwt.sign(user, jwtSecret, { expiresIn: "1h" });
};

/**
 * @description Verifies the validity of a JWT token.
 * @param {string} token - The JWT token to verify.
 * @returns {Promise<Object>} A promise that resolves with the decoded payload of the token if valid, or rejects with an error if invalid.
 */
const verifyToken = async (token) => {
  console.log(jwt.verify(token, jwtSecret));
  return jwt.verify(token, jwtSecret);
};

module.exports = {
  generateToken,
  verifyToken,
};
