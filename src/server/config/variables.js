/**
 * @file config.js
 * @description Loads and exports environment variables from a .env file.
 * @author @Tarak1246
 * @date March 13, 2024
 */

const path = require("path"); // Module for working with file paths
require("dotenv-safe").config({
  /**
   * @description Load environment variables from the specified .env file.
   * If the file doesn't exist, try loading from .env.example.
   */
  path: path.join(__dirname, "../.env"),
  sample: path.join(__dirname, "../.env.example"),
});

/**
 * @description Exports frequently used environment variables.
 */
module.exports = {
  env: process.env.NODE_ENV, // Application environment (e.g., development, production)
  port: process.env.PORT, // Server port
  jwtSecret: process.env.jwtSecret, //jwtSecret
  mongoURI: process.env.mongoURI, //mongoURI
  passportUsername: process.env.passportUsername,
  passportPassword: process.env.passportPassword
};
