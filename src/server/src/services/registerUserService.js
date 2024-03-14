/**
 * @file userController.js
 * @description Handles user registration, login, retrieval, and admin user creation functionalities.
 * @author @Tarak1246
 * @date March 13, 2024
 */
const User = require("../database/schemas/userSchema");
const jwt = require("../utils/jwtUtils");
const bcrypt = require("bcrypt");
const mailingServer = require("../api/middlewares/mailingMiddleware");
const emailRegex = /^[\w\d._%+-]+@gmail\.com$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$*]).{8,}$/;
const requiredKeys = [
  "username",
  "email",
  "password",
  "firstname",
  "lastname",
  "role",
];

/**
 * @description Checks if the provided email address matches a valid email format.
 * @param {string} email - The email address to validate.
 * @returns {Promise<boolean>} Resolves to true if the email format is valid, false otherwise.
 */
const checkEmailFormat = async (email) => {
  return emailRegex.test(email);
};
/**
 * @description Checks if the provided password matches a specific format.
 * @param {string} password - The password to validate.
 * @returns {Promise<boolean>} Resolves to true if the password matches the format, false otherwise.
 */
const checkPasswordFormat = async (password) => {
  return passwordRegex.test(password);
};

/**
 * @description Validates the request payload for creating a new admin user.
 * @param {Object} requestPayload - The object containing user data for admin creation.
 * @param {string} requestPayload.username - The username for the new admin user.
 * @param {string} requestPayload.email - The email address for the new admin user.
 * @param {string} requestPayload.password - The password for the new admin user.
 * @param {string} [requestPayload.firstname] - The first name for the new admin user (optional).
 * @param {string} [requestPayload.lastname] - The last name for the new admin user (optional).
 * @param {string} [requestPayload.role] - The role for the new admin user (defaults to "admin").
 * @returns {Promise<Object>} An object containing validation results.
 * @property {boolean} hasRequiredKeys - True if all required keys are present in the request payload, false otherwise.
 * @property {boolean} hasEmptyValues - True if any of the request payload values are empty, false otherwise.
 * @property {boolean} isValid - True if the request payload is valid (all required keys present and no empty values), false otherwise.
 */
const validateAdminUserRequestPayload = async (requestPayload) => {
  // 1. Check for required keys:
  const hasRequiredKeys = requiredKeys.every((key) => key in requestPayload);

  // 2. Check for empty values:
  const hasEmptyValues = Object.values(requestPayload).some(
    (value) => value === null || value === undefined || value === ""
  );

  // Combine results:
  return {
    hasRequiredKeys,
    hasEmptyValues,
    isValid: hasRequiredKeys && !hasEmptyValues,
  };
};
/**
 * @description Creates a new admin user.
 * @param {Object} adminUserData - An object containing user data for admin creation.
 * @returns {Promise<Object>} An object containing status code and data message.
 */
const createAdminUser = async (adminUserData) => {
  try {
    const requestPayloadStatus = await validateAdminUserRequestPayload(
      adminUserData
    );
    if (requestPayloadStatus.isValid) {
      if (adminUserData.role != "admin")
        return {
          status: 400,
          data: { error: "Only admin role user can create using this api!" },
        };

      // Check if admin user already exists
      const existingAdminUser = await User.findOne({ role: "admin" });
      if (existingAdminUser) {
        return {
          status: 400,
          data: { error: "Only one user should have role as an admin!" },
        };
      }

      // Check if username already exists
      const existingAdminUsername = await User.findOne({
        username: adminUserData.username,
      });
      if (existingAdminUsername) {
        return { status: 400, data: { error: "username already exists" } };
      }

      // Check if admin user mailid already exists
      const existingAdminUserMail = await User.findOne({
        email: adminUserData.email,
      });
      if (existingAdminUserMail) {
        return {
          status: 400,
          data: { error: "Email already exists" },
        };
      }
      const emailFormatStatus = await checkEmailFormat(adminUserData.email);
      if (!emailFormatStatus) {
        return {
          status: 400,
          data: { error: "Email format should be @gmail.com" },
        };
      }
      const passwordFormatStatus = await checkPasswordFormat(
        adminUserData.password
      );
      if (!passwordFormatStatus) {
        return {
          status: 400,
          data: {
            error:
              "Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol, and be at least 8 characters long",
          },
        };
      }

      adminUserData.status = "active";
      adminUserData.adminPrivilege = "true";
      // Create admin user
      const adminUser = new User(adminUserData);
      await adminUser.save();

      // Call mail server after admin user creation
      // await mailingServer(adminUserData);

      // If mail sending is successful, return success response
      return { status: 201, data: "Admin user created successfully" };
    } else {
      return { status: 500, data: "request body invalid" };
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
    return { status: 500, data: "Internal Server Error" };
  }
};

/**
 * @description Retrieves a list of users from the database.
 * @returns {Promise<Object>} An object containing status code and user data.
 * @property {number} status - HTTP status code (200 on success, 500 on error).
 * @property {Array<Object>} [data] - Array of user objects on success, or empty on error.
 * @property {string} data[].username - Username of the user.
 * @property {string} data[].email - Email address of the user.
 * @property {string} data[].role - User's role (e.g., "admin", "manager", "employee").
 * @property {string} data[].status - User's account status (e.g., "active", "inactive").
 * @property {string} [data[].adminPrivilege] - Whether the user has admin privilege (optional, masked for security).
 */
const getUsers = async () => {
  try {
    const users = await User.aggregate([
      {
        $match: { _id: { $exists: true } },
      },
      {
        $project: {
          "admin privilege": "$adminPrivilege", //{ $toString:"$adminPrivilege"}
          username: 1,
          email: 1,
          role: 1,
          status: 1,
          id: "$_id",
          _id: 0,
        },
      },
    ]);
    // const users = await User.find({}, { username: 1, email: 1, status: 1, role: 1, adminPrivilege: 1, _id: 0 });
    return { status: 200, data: users };
  } catch (error) {
    console.log(error);
    return { status: 500, data: "Error while fetching users!" };
  }
};

/**
 * @description Creates a new user in the database.
 * @param {Object} userData - An object containing user registration data.
 * @param {string} userData.username - The username for the new user.
 * @param {string} userData.email - The email address for the new user.
 * @param {string} userData.password - The password for the new user (hashed before saving).
 * @param {string} [userData.firstname] - The first name for the new user (optional).
 * @param {string} [userData.lastname] - The last name for the new user (optional).
 * @param {string} [userData.role] - The role for the new user (defaults to a non-privileged role).
 * @returns {Promise<Object>} An object containing status code and message.
 * @property {number} status - HTTP status code (201 on success, 409 on conflict, 500 on error).
 * @property {string} data - Message indicating success ("user registration success!") or error details.
 */
const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return { status: 201, data: "user registration success!" };
  } catch (error) {
    if (error.code == 11000) {
      return Object.keys(error.keyPattern)[0] == "username"
        ? { status: 409, data: "username already exist!" }
        : { status: 409, data: "email already exist!" };
    } else {
      return { status: 500, data: "user registration failed!" };
    }
  }
};

/**
 * @description Logs in a user and generates a JWT token upon successful authentication.
 * @param {Object} userData - An object containing login credentials.
 * @param {string} userData.username - The username for login.
 * @param {string} userData.password - The password for login.
 * @returns {Promise<Object>} An object containing status code, data message, and potentially a token.
 * @property {number} status - HTTP status code (200 on success, 401 on invalid credentials).
 * @property {string} data - Message indicating success ("user login successful!") or error ("Invalid credentials!").
 * @property {string} [token] - JWT token for authorized access upon successful login (optional).
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
  // const token = jwt.sign({  username: user.username }, 'your-secret-key', { expiresIn: '1h' });
  const token = await jwt.generateToken({ username: username });

  return { status: 200, data: "user login success!", token: token };
};

module.exports = {
  createAdminUser,
  getUsers,
  createUser,
  loginUser,
};
