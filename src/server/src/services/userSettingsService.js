const User = require("../database/schemas/userSchema");
const jwt = require("../utils/jwtUtils");
const bcrypt = require("bcrypt");
const mailingServer = require("../api/middlewares/mailingMiddleware");

//get logged in user data
const getLoggedinUserData = async (username) => {
  try {
    const loggedinUserData = await User.findOne({ username }, { username: 1, email: 1, firstname: 1, lastname: 1, status: 1, role: 1, _id: 0 });
    if (!loggedinUserData) {
      return { status: 401, data: "Invalid user!" };
    }
    return { status: 200, data: loggedinUserData };
  } catch (error) {
    console.log(error);
    return { status: 500, data: "Error while fetching loggedin user!" };
  }
};

//update user data
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
    updateUserData
};