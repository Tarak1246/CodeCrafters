/**
 * @file registerUser.js
 * @description Handles user registration, login, and potentially admin user management (depends on implementation).
 * @author @Tarak1246
 * @date March 13, 2024
 */

/**
 * @description Import the registerUserService to interact with user-related operations.
 */
const registerUserService = require("../../services/registerUserService");
/**
 * @description Creates a new admin user and sends a response.
 * @param {express.Request} req The incoming request object containing admin user data in the body.
 * @param {express.Response} res The outgoing response object.
 * @returns {Promise<void>} Resolves after sending the admin user creation response.
 * @throws {Error} If there's an error.
 */
const createAdminUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const adminUserData = req?.body;
    //call the user register service to create the admin user
    const createAdminUsersResponse = await registerUserService.createAdminUser(
      adminUserData
    );
    // Send the create admin response back to the client
    res.json(createAdminUsersResponse);
  } catch (error) {
    // Handle any errors during the process
    console.error(error);
    res
      .status(500)
      .json({ status: 500, message: "Failed to create admin user" });
  }
};
/**
 * @description Retrieves all users and sends a response.
 * @param {express.Request} req The incoming request object.
 * @param {express.Response} res The outgoing response object.
 * @returns {Promise<void>} Resolves after sending the get users response.
 * @throws {Error} If there's an error.
 */
const getUsers = async (req, res) => {
  try {
    //Attempt users fteching using the user service
    const getUsersResponse = await registerUserService.getUsers();
    // Send the user response back to the client
    res.json(getUsersResponse);
  } catch (error) {
    // Handle any errors during the process
    console.error(error);
    res.status(500).json({ status: 500, message: "Failed to fetch users" });
  }
};

/**
 * @description Registers a new user and sends a response.
 * @param {express.Request} req The incoming request object containing user data in the body.
 * @param {express.Response} res The outgoing response object.
 * @returns {Promise<void>} Resolves after sending the registration response.
 * @throws {Error} If there's an error.
 */
const registerUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const userData = req?.body;
    // Attempt user registration using the user service
    const createUserResponse = await registerUserService.createUser(userData);
    // Send the registration response back to the client
    res.json(createUserResponse);
  } catch (error) {
    // Handle any errors during the process
    console.error(error);
    res.status(500).json({ status: 500, message: "Failed to create user" });
  }
};

/**
 * @description Logs in a user and sends a response.
 * @param {express.Request} req The incoming request object containing login credentials in the body.
 * @param {express.Response} res The outgoing response object.
 * @returns {Promise<void>} Resolves after sending the login response.
 * @throws {Error} If there's an error.
 */
const loginUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const userData = req?.body;
    // Attempt login using the user service
    const loginUserResponse = await registerUserService.loginUser(userData);
    // Send the login response back to the client
    res.json(loginUserResponse);
  } catch (error) {
    // Handle any errors during the process
    console.error(error);
    res.status(500).json({ status: 500, message: "Failed to login user" });
  }
};

module.exports = {
  createAdminUser,
  getUsers,
  registerUser,
  loginUser,
};
