/**
 * @file index.js
 * @description Main entry point for the Express application, defining routes and middleware.
 * @author @Tarak1246
 * @date March 13, 2024
 */

// Required modules
const express = require("express");
const app = express(); // Create an Express application instance
// Import middleware
const authorizeMiddleware = require("../middlewares/authorizeMiddleware");
const loggingMiddleware = require("../middlewares/loggingMiddleware");
// Import routes
const registerRouter = require("./registerUser");
const loginRouter = require("./loginUser");
const authRoutes = require("./authRoutes");

/**
 * Main route handler.
 * @param {express.Request} req The incoming request object.
 * @param {express.Response} res The outgoing response object.
 */
app.get("/", loggingMiddleware, (req, res) => {
  res.send("Hello, this is project tracker API!");
});

/**
 * @description Registration routes.
 */
app.use("/v", loggingMiddleware, registerRouter);

/**
 * @description Login routes.
 */
app.use("/v1", loggingMiddleware, loginRouter);

/**
 * @description User settings routes, protected by authorization middleware.
 */
app.use("/v2", authorizeMiddleware, loggingMiddleware, authRoutes);

module.exports = app; // Export the Express application for use in other modules
