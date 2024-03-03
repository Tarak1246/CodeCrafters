const userSettingsService = require('../../services/userSettingsService');
// create admin users
const getLoggedinUserData = async (req, res) => {
  const getLoggedinUserData = req?.body;
  const getLoggedinUserDataResponse = await userSettingsService.getLoggedinUserData(getLoggedinUserData);
  res.json(getLoggedinUserDataResponse);
};

module.exports = {
    getLoggedinUserData
};