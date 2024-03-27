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
const passport = require('passport');
const { passportUsername, passportPassword } = require("../../../config/variables");
const BasicStrategy = require('passport-http').BasicStrategy;
// const LocalStrategy = require("passport-local").Strategy;
passport.use(
  new BasicStrategy(
    async (username, password, done) => {
      try {
        // Retrieve user from env file
        console.log(username, password);
        console.log(passportUsername, passportPassword);
        return username == passportUsername && password == passportPassword
          ? done(null, true)
          : done(null, false, { message: "Invalid username or password" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
// Initialize Passport
app.use(passport.initialize());
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
