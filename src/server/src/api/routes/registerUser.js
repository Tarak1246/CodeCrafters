/**
 * @file userRouter.js
 * @description Defines routes for user registration and login functionalities.
 * @author @Tarak1246
 * @date March 13, 2024
 */
const express = require("express");
const router = express.Router();
const registerUserController = require("../controllers/registerUserController");
const loggingMiddleware = require("../middlewares/loggingMiddleware");
const passport = require('passport');

/**
 * Registers a new admin user account.
 * @route POST /adminUser
 * @param {express.Request} req The incoming registration request object with user data in the body.
 * @param {express.Response} res The outgoing response object.
 * @param {Function} next The next middleware function in the chain .
 * @returns {Promise<void>} Resolves after sending the admin user registration response.
 */
router.post(
  "/adminUser",
  loggingMiddleware,
  passport.authenticate('basic', { session: false }),
  registerUserController.createAdminUser
);
/**
 * Get users from database.
 * @route GET /getUsers
 * @param {express.Response} res The outgoing response object.
 * @param {Function} next The next middleware function in the chain .
 * @returns {Promise<void>} Resolves after sending the get users response.
 */
router.get("/getUsers", loggingMiddleware, registerUserController.getUsers);
/**
 * Registers a new user account.
 * @route POST /register
 * @param {express.Request} req The incoming registration request object with user data in the body.
 * @param {express.Response} res The outgoing response object.
 * @param {Function} next The next middleware function in the chain .
 * @returns {Promise<void>} Resolves after sending the registration response.
 */
router.post(
  "/register",
  loggingMiddleware,
  registerUserController.registerUser
);
/**
 * Logs in a user and attempts to authenticate credentials.
 * @route POST /login
 * @param {express.Request} req The incoming login request object with potentially username and password in the body.
 * @param {express.Response} res The outgoing response object.
 * @param {Function} next The next middleware function in the chain .
 * @returns {Promise<void>} Resolves after sending the login response.
 */
router.post("/login", loggingMiddleware, registerUserController.loginUser);

module.exports = router;