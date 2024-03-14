/**
 * @file userSchema.js
 * @description Defines the Mongoose schema for user data.
 * @author @Tarak1246
 * @date March 13, 2024
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
/**
 * @typedef {Object} User
 * @property {string} username - The user's username. (Consider adding validation for minimum length and format)
 * @property {string} email - The user's email address. (Consider using a validation library for format check)
 * @property {string} password - The user's hashed password.
 * @property {string} firstname - The user's first name (optional).
 * @property {string} lastname - The user's last name (optional).
 * @property {string} role - The user's role (admin, manager, team_leader, or employee).
 * @property {string} status - The user's account status (active or inactive).
 * @property {boolean} adminPrivilege - Whether the user has admin privileges (consider using boolean type).
 */

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  firstname: {
    type: String,
    required: false,
    default: "",
  },
  lastname: {
    type: String,
    required: false,
    default: "",
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "manager", "team_leader", "employee"], // Enumerated list of allowed roles
    default: "employee", // Default role for new users
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  adminPrivilege: {
    type: String,
    required: false,
    enum: ["true", "false"],
    default: false,
  },
});
/**
 * @memberof User
 * @description Hashes the user's password before saving the document to the database.
 * @param {Function} next - The next middleware function in the chain.
 */
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * @memberof User
 * @description Compares a provided password with the user's hashed password.
 * @param {string} password - The password to compare.
 * @returns {Promise<boolean>} Resolves to true if passwords match, false otherwise.
 */
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
