/**
 * @module config
 * @description Configuration for JWT secret and MongoDB connection URI.
 * @author @Tarak1246
 * @date March 13, 2024
 * @warning Consider using environment variables or a secure configuration store for sensitive information like JWT secrets.
 */

module.exports = {
  jwtSecret: "CodeCrafters",
  mongoURI: "mongodb://127.0.0.1:27017/test",
};
