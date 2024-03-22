const Project = require("../database/schemas/projectSchema");
const Contract = require("../database/schemas/contractSchema");
const User = require("../database/schemas/userSchema");
const Employee = require("../database/schemas/employeeSchema");

const getDashboardData = async () => {
    const table1Data = await Project.aggregate([
        {
          $group: {
            _id: "$status", // Group by the "status" field
            count: { $sum: 1 } // Count the number of documents in each group
          }
        }
      ]);
    const table2Data = await Contract.aggregate([
        {
          $group: {
            _id: "$status", // Group by the "status" field
            count: { $sum: 1 } // Count the number of documents in each group
          }
        }
      ]);
    const table3Data = await User.aggregate([
        {
          $group: {
            _id: "$status", // Group by the "status" field
            count: { $sum: 1 } // Count the number of documents in each group
          }
        }
      ]);
      const table4Data = await Employee.aggregate([
        {
          $group: {
            _id: "$type", // Group by the "type" field
            count: { $sum: 1 } // Count the number of documents in each group
          }
        }
      ]);

      const combinedData = {
        "projects": table1Data,
        "contracts": table2Data,
        "users": table3Data,
        "employees":table4Data
      };

  return { status: 200, data: combinedData };
};

module.exports = {
    getDashboardData,
};
