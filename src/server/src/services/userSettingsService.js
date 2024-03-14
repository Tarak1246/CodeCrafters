/**
 * @file userController.js
 * @description Handles user management operations including registration, login, retrieval, and admin user creation functionalities.
 * @author @Tarak1246
 * @date March 13, 2024
 */

const User = require("../database/schemas/userSchema");

/**
 * @description Retrieves data for a logged-in user.
 * @param {string} username - The username of the logged-in user.
 * @returns {Promise<Object>} An object containing status code and user data.
 * @property {number} status - HTTP status code (200 on success, 401 on invalid user, 500 on error).
 * @property {Object} [data] - User data on success, or an error message on failure.
 * @property {string} data.username - Username of the user.
 * @property {string} data.email - Email address of the user.
 * @property {string} data.firstname - First name of the user.
 * @property {string} data.lastname - Last name of the user.
 * @property {string} data.status - Account status of the user (e.g., "active", "inactive").
 * @property {string} data.role - User's assigned role.
 */
const getLoggedinUserData = async (username) => {
  try {
    const loggedinUserData = await User.findOne(
      { username },
      {
        username: 1,
        email: 1,
        firstname: 1,
        lastname: 1,
        status: 1,
        role: 1,
        _id: 0,
      }
    );
    if (!loggedinUserData) {
      return { status: 401, data: "Invalid user!" };
    }
    return { status: 200, data: loggedinUserData };
  } catch (error) {
    console.log(error);
    return { status: 500, data: "Error while fetching loggedin user!" };
  }
};

/**
 * @description Updates user data in the database.
 * @param {Object} userDta - An object containing updated user data.
 * @returns {Promise<Object>} An object containing status code and message.
 * @property {number} status - HTTP status code (200 on success, 500 on error).
 * @property {string} data - Message indicating success or error.
 */
const updateUserData = async (userDta) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: userDta.username },
      { $set: userDta },
      { new: true } // Return the updated document
    );

    if (user) {
      console.log("User updated successfully:", user);
      return { status: 200, data: "User updated successfully" };
    } else {
      console.error("User not found with username:", username);
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return { status: 500, data: "Error updating user!" };
  }
};

module.exports = {
  getLoggedinUserData,
  updateUserData,
};
