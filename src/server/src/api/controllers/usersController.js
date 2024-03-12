const usersService = require('../../services/usersService');


//update user privileges
const updateUserPrivileges = async(req,res) => {
  const userData = req?.body;
  const { id } = req?.params;
  const updateUserPrivilegesResponse = await usersService.updateUserPrivileges(id,userData);
  res.json(updateUserPrivilegesResponse);
};

module.exports = {
    updateUserPrivileges
};