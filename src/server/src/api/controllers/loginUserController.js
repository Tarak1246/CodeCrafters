/**
 * @file loginUser.js
 * @description Handles login requests by utilizing the `loginUserService`.
 * @author @Tarak1246
 * @date March 13, 2024
 */

/**
 * @description Import the loginUserService to interact with user-related operations.
 */
const loginUserService = require("../../services/loginUserService");

/**
 * @description Logs in a user and sends a response.
 * @param {express.Request} req The incoming request object containing user credentials in the body.
 * @param {express.Response} res The outgoing response object.
 * @returns {Promise<void>} Resolves after sending the login response.
 * @throws {Error} If there's an error.
 */
const loginUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const userData = req?.body;

    // Attempt login using the login service
    const loginUserResponse = await loginUserService.loginUser(userData);

    // Send the login response back to the client
    res.json(loginUserResponse);
  } catch (error) {
    // Handle any errors during the process
    console.error(error);
    res.status(500).json({ status: 500, message: "Failed to login user" });
  }
};

module.exports = {
  loginUser,
};
