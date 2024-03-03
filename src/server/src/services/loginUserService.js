const User = require("../database/schemas/userSchema");
const jwt = require("../utils/jwtUtils");
const bcrypt = require("bcrypt");
const mailingServer = require("../api/middlewares/mailingMiddleware");

//login user
const loginUser = async (userData) => {
  const { username, password } = userData;

  // Find the user by username
  const user = await User.findOne({ username });
  if (!user) {
    return { status: 401, data: "Invalid credentials!" };
  }
console.log(user)
  // Compare the provided password with the stored hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return { status: 401, data: "Invalid credentials!" };
  }

  // Create a JWT token
  // const token = jwt.sign({  username: user.username }, 'your-secret-key', { expiresIn: '1h' });
  const token = await jwt.generateToken({ username: username });

  return { status: 200, data: "user login success!", token: token, user:user };
};

module.exports = {
  loginUser
};