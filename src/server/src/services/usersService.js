const User = require("../database/schemas/userSchema");

//update user data
const updateUserPrivileges = async (id,userDta) => {
  try {
    const existingItem = await User.findById(id);
    if (!existingItem) {
      return { status:404, data: 'user not found' };
    }
    const updatedDoc = await User.findByIdAndUpdate(id, userDta, { new: true });
    return { status: 200, data: updatedDoc };
  } catch (error) {
    console.error("Error updating user:", error);
    return { status: 500, data: "Error updating user!" };
  }
};

module.exports = {
    updateUserPrivileges
};