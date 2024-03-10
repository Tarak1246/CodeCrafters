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

//check admin user email format
const checkEmailFormat = async (email) => {
  return emailRegex.test(email);
};
//check password format
const checkPasswordFormat = async (password) => {
  return passwordRegex.test(password);
};

//check admin user api request body
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
//create admin user
const createAdminUser = async (adminUserData) => {
  try {
    const requestPayloadStatus = await validateAdminUserRequestPayload(
      adminUserData
    );
    if (requestPayloadStatus.isValid) {
      if(adminUserData.role != "admin") return { status: 400, data: { error: "Only admin role user can create using this api!" } };

      // Check if admin user already exists
      const existingAdminUser = await User.findOne({ role: "admin" });
      if (existingAdminUser) {
        return { status: 400, data: { error: "Only one user should have role as an admin!" } };
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

      if (checkEmailFormat(adminUserData.email)) {
        return {
          status: 400,
          data: { error: "Email format should be @gmail.com" },
        };
      }

      if (checkPasswordFormat(adminUserData.password)) {
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
      await mailingServer(adminUserData);

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

//get users
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

// Create a new user
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

//login user
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

// Find a user by username
const findUserByUsername = async (username) => {
  try {
    return await User.findOne({ username });
  } catch (error) {
    throw error;
  }
};

// Find a user by email
const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAdminUser,
  getUsers,
  createUser,
  loginUser,
  findUserByEmail,
};
