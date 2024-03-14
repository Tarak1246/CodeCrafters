/**
 * @file errorHandlerMiddleware.js
 * @description Middleware for handling errors in the Express application.
 * @author @Tarak1246
 * @date March 13, 2024
 */

/**
 * Middleware function to handle errors and send a generic error response.
 * @param {Error} err The error object.
 * @param {Function} next The next middleware function in the chain.
 */
const errorHandlerMiddleware = (err, res) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({ message: "Internal Server Error" }); // Send a generic error response
};

module.exports = errorHandlerMiddleware; // Export the middleware for use in the app
