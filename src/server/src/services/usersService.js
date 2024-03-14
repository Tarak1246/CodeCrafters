/**
 * @file userPrivilegeController.js
 * @description Handles functionalities related to updating user privileges in the system.
 * @author @Tarak1246
 * @date March 13, 2024
 */
const User = require("../database/schemas/userSchema");

/**
 * @description Updates user privileges in the database.
 *
 * This function simulates updating user privileges in a database. In a real application, you would likely connect to a database and perform the update operation there.
 *
 * @param {string} id - The ID of the user to update privileges for.
 * @param {Object} userDta - An object containing the updated user privilege data.
 * @returns {Promise<Object>} An object containing status code and data message.
 *  * @property {number} status - HTTP status code (200 on success, 404 on user not found, 500 on error).
 *  * @property {string} data - Message indicating success ("user updated successfully") or error details ("user not found" or "Error updating user!").
 *  * @property {Object} [data] - The updated user data document (on success, empty on error).
 */
const updateUserPrivileges = async (id, userDta) => {
  try {
    const existingItem = await User.findById(id);
    if (!existingItem) {
      return { status: 404, data: "user not found" };
    }
    const updatedDoc = await User.findByIdAndUpdate(id, userDta, { new: true });
    return { status: 200, data: updatedDoc };
  } catch (error) {
    console.error("Error updating user:", error);
    return { status: 500, data: "Error updating user!" };
  }
};

module.exports = {
  updateUserPrivileges,
};
