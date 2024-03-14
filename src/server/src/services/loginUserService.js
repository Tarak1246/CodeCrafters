/**
 * @file loginController.js
 * @description Handles user login requests, performs authentication, and generates JWT tokens.
 * @author @Tarak1246
 * @date March 13, 2024
 */

const User = require("../database/schemas/userSchema");
const jwt = require("../utils/jwtUtils");
const bcrypt = require("bcrypt");

/**
 * @description Login a user and generate a JWT token upon successful authentication.
 * @param {Object} userData - An object containing username and password for login.
 * @param {string} userData.username - The user's username for login.
 * @param {string} userData.password - The user's password for login.
 * @returns {Promise<Object>} An object containing status code, data message, and potentially a token and user data.
 */
const loginUser = async (userData) => {
  const { username, password } = userData;

  // Find the user by username
  const user = await User.findOne({ username });
  if (!user) {
    return { status: 401, data: "Invalid credentials!" };
  }
  // Compare the provided password with the stored hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return { status: 401, data: "Invalid credentials!" };
  }

  // Create a JWT token
  const token = await jwt.generateToken({ username: username });

  return { status: 200, data: "user login success!", token: token, user: user };
};

module.exports = {
  loginUser,
};
