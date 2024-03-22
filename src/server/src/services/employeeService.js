const Employee = require("../database/schemas/employeeSchema");

const addEmployee = async (employeeData) => {
  try {    
    const addEmployeeData = new Employee(employeeData);
    await addEmployeeData.save(); 
    return { status: 201, data: "Added employee successfully" };
  } catch (error) {
    console.error("Error adding employee info:", error);
    return { status: 500, data: "Error adding employee info" };
  }
};

const getEmployees = async() => {
  try {
    const employeeData = await Employee.find({}, { _id: 0, __v: 0}); 
    return { status: 200, data: employeeData };
  } catch (error) {
    console.error("Error retrieving employee info:", error);
    return { status: 500, data: "Internal Server Error" };
  }
}

const deleteEmployee = async(id) =>{
  try {
    const employeeData = await Employee.deleteOne({"id": id});  
    return { status: 200, data: "Employee deleted successfully" };
  } catch (error) {
    console.error("Error retrieving employee info:", error);
    return { status: 500, data: "Internal Server Error" };
  }
}

const updateContract = async(id,data)=>{
  try {
    const existingItem = await Contract.find({id:id});
    if (!existingItem) {
      return { status: 404, data: "contract not found" };
    }
    const updatedDoc = await Contract.updateOne({id:id}, {$set:data}, { new: true });
    return { status: 200, data: "contract updated successfully" };
  } catch (error) {
    console.error("Error updating contract:", error);
    return { status: 500, data: "Error updating contract!" };
  }
}

module.exports = {
    addEmployee,
    getEmployees,
    deleteEmployee,
    updateContract
};