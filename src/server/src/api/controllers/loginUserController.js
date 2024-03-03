const loginUserService = require('../../services/loginUserService');

//login user
const loginUser = async (req, res) => {
  const userData = req?.body;
  const loginUserResponse = await loginUserService.loginUser(userData);
  if(loginUserResponse.status == 200){
    res.cookie('jwt', loginUserResponse.token, { httpOnly: true, secure: true });
  }
  res.json(loginUserResponse);
};

module.exports = {
  loginUser
};