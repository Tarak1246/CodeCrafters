/**
 * @file updateUserPrivileges.js
 * @description Handles requests to update user privileges.
 * @author @Tarak1246
 * @date March 13, 2024
 */

/**
 * @description Import the usersService to interact with user-related operations.
 */
const usersService = require("../../services/usersService");

/**
 * @description Updates a user's privileges and sends a response.
 * @param {express.Request} req The incoming request object with user data in the body and ID in the params.
 * @param {express.Response} res The outgoing response object.
 * @returns {Promise<void>} Resolves after sending the update response.
 * @throws {Error} If there's an error.
 */
const updateUserPrivileges = async (req, res) => {
  try {
    // Extract user data and ID
    const userData = req?.body;
    const { id } = req?.params;

    // Attempt update using the users service
    const updateUserPrivilegesResponse =
      await usersService.updateUserPrivileges(id, userData);

    // Send the update response back to the client
    res.json(updateUserPrivilegesResponse);
  } catch (error) {
    // Handle any errors during the update process
    console.error(error);
    res.status(500).json({ message: "Failed to update user privileges" });
  }
};

module.exports = {
  updateUserPrivileges,
};
