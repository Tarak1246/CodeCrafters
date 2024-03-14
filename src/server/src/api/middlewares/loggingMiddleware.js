/**
 * @file loggingMiddleware.js
 * @description Middleware for basic request logging using console output.
 * (Consider pino for more advanced logging with custom formatting and destinations.)
 * @author @Tarak1246
 * @date March 13, 2024
 */

/**
 * Logs basic request information (method, URL, timestamp) to the console.
 * @param {express.Request} req The incoming request object.
 * @param {express.Response} res The outgoing response object.
 * @param {Function} next The next middleware function in the chain.
 * @returns {void}
 */
const loggingMiddleware = (req, res, next) => {
  // Log request method, URL, and timestamp
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  // Move on to the next middleware in the chain
  next();
};

// **Commented-out code for potential future pino logging implementation:**

// /**
//  * Creates a pino logger instance with a writable stream to a log file.
//  * (Uncomment and configure if desired for more advanced logging.)
//  */
// // const pino = require('pino');
// // const fs = require('fs');
// //
// // let logger; // Declare logger variable for potential initialization
// //
// // // (Function to create and configure the pino logger)
// // function createPinoLogger() {
// //   const logFile = fs.createWriteStream('../../../logs/logfile.log', { flags: 'a' });
// //   logger = pino({ level: 'info' }, logFile);
// // }

module.exports = loggingMiddleware;
