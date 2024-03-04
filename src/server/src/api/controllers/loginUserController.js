const loginUserService = require('../../services/loginUserService');

//login user
const loginUser = async (req, res) => {
  const userData = req?.body;
  const loginUserResponse = await loginUserService.loginUser(userData);
  res.json(loginUserResponse);
};

module.exports = {
  loginUser
};