/**
 * @file loginRouter.js
 * @description Defines routes for user login functionality.
 * @author @Tarak1246
 * @date March 13, 2024
 */
const express = require("express");
const router = express.Router();
const loggingMiddleware = require("../middlewares/loggingMiddleware");
const loginController = require("../controllers/loginUserController");

/**
 * Logs request information and attempts user login.
 * @route POST /login
 * @param {express.Request} req The incoming login request object with potentially username and password in the body.
 * @param {express.Response} res The outgoing response object.
 * @param {Function} next The next middleware function in the chain (likely not used here).
 * @returns {Promise<void>} Resolves after sending the login response.
 */
router.post("/login", loggingMiddleware, loginController.loginUser);

module.exports = router;
