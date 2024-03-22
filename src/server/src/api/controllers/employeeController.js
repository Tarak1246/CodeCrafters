const addEmployeeService = require("../../services/employeeService");

//addEmployee
const addEmployee= async (req, res) => {
  const employeeData = req?.body;
  const employeeResponse = await addEmployeeService.addEmployee(employeeData);
  res.json(employeeResponse);
};

const getEmployees = async (req, res) => {
  const employeeResponse = await addEmployeeService.getEmployees();
  res.json(employeeResponse);
};

const deleteEmployee = async (req, res) => {
  const { id } = req?.params;
  const employeeResponse = await addEmployeeService.deleteEmployee(id);
  res.json(employeeResponse);
};

const updateContract= async (req, res) => {
  try {
    const contractData = req?.body;
    const { id } = req?.params;

    const updatecontractResponse = await addContractService.updateContract(
      id,
      contractData
    );

    res.json(updatecontractResponse);
  } catch (error) {
    res.status(500).json({ message: "Failed to update contract" });
  }
};


module.exports = {
    addEmployee,
    getEmployees,
    deleteEmployee,
  updateContract
};
