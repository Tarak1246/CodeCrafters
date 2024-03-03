const User = require("../database/schemas/userSchema");
const jwt = require("../utils/jwtUtils");
const bcrypt = require("bcrypt");
const mailingServer = require("../api/middlewares/mailingMiddleware");

//get logged in user data
const getLoggedinUserData = async (userData) => {
  const { username } = userData;

  // Find the user by username
  const user = await User.findOne({ username });
  if (!user) {
    return { status: 401, data: "Invalid user!" };
  }

  try {
    const loggedinUserData = await User.findOne({ username }, { username: 1, email: 1, firstname: 1, lastname: 1, status: 0, role: 1, _id: 0 });
    return { status: 200, data: loggedinUserData };
  } catch (error) {
    console.log(error);
    return { status: 500, data: "Error while fetching loggedin user!" };
  }
};

module.exports = {
    getLoggedinUserData
};