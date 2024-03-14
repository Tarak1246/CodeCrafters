/**
 * @file userSettingsController.js
 * @description Handles user settings requests: retrieving logged-in user data and updating user data.
 * @author @Tarak1246
 * @date March 13, 2024
 */
const userSettingsService = require("../../services/userSettingsService");
/**
 * Retrieves logged-in user data based on username from request parameters.
 * @param {express.Request} req The incoming request object.
 * @param {express.Response} res The outgoing response object.
 * @returns {Promise<void>} Resolves after sending the user data response.
 * @throws {Error} If there's an error retrieving user data from the service.
 */
const getLoggedinUserData = async (req, res) => {
  try {
    // Extract username from request parameters
    const getLoggedinUser = req?.params?.username;
    // Retrieve logged-in user data using the user settings service
    const getLoggedinUserDataResponse =
      await userSettingsService.getLoggedinUserData(getLoggedinUser);
    // Send the user data response back to the client
    res.json(getLoggedinUserDataResponse);
  } catch (error) {
    // Handle errors retrieving user data
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve user data" });
  }
};

/**
 * Updates user data based on provided data in the request body.
 * @param {express.Request} req The incoming request object containing user data in the body.
 * @param {express.Response} res The outgoing response object.
 * @returns {Promise<void>} Resolves after sending the update response.
 * @throws {Error} If there's an error updating user data from the service.
 */
const updateUserData = async (req, res) => {
  try {
    // Extract user data from the request body
    const userData = req?.body;

    // Update user data using the user settings service
    const updateUserDataResponse = await userSettingsService.updateUserData(
      userData
    );

    // Send the update response back to the client
    res.json(updateUserDataResponse);
  } catch (error) {
    // Handle errors updating user data
    console.error(error);
    res.status(500).json({ message: "Failed to update user data" });
  }
};

module.exports = {
  getLoggedinUserData,
  updateUserData,
};
