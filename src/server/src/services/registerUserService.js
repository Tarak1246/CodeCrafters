const User = require("../database/schemas/userSchema");
const jwt = require("../utils/jwtUtils");
const bcrypt = require("bcrypt");
const mailingServer = require("../api/middlewares/mailingMiddleware");
//create admin user
const createAdminUser = async (adminUserData) => {
  try {
    // Check if admin user already exists
    const existingAdminUser = await User.findOne({ role: "admin" });
    if (existingAdminUser) {
      return { status: 400, data: { error: "Admin user already exists" } };
    }
    adminUserData.status = 'active';
    // Create admin user
    const adminUser = new User(adminUserData);
    await adminUser.save();

    // Call mail server after admin user creation
    await mailingServer(adminUserData);

    // If mail sending is successful, return success response
    return { status: 201, data: "Admin user created successfully" };
  } catch (error) {
    console.error("Error creating admin user:", error);
    return { status: 500, data: "Internal Server Error" };
  }
};

//get users
const getUsers = async () => {
  try {
    const users = await User.find({}, { username: 1, email: 1, status: 1, role: 1, _id: 0 });
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
