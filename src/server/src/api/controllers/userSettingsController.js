const userSettingsService = require('../../services/userSettingsService');
// get logged in user data
const getLoggedinUserData = async (req, res) => {
  const getLoggedinUser = req?.params?.username;
  const getLoggedinUserDataResponse = await userSettingsService.getLoggedinUserData(getLoggedinUser);
  res.json(getLoggedinUserDataResponse);
};

//update the user data
const updateUserData = async(req, res) => {
  const userData = req?.body;
  const updateUserDataResponse = await userSettingsService.updateUserData(userData);
  res.json(updateUserDataResponse);
};


module.exports = {
    getLoggedinUserData,
    updateUserData
};