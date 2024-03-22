const Contract = require("../database/schemas/contractSchema");

const addContract = async (contractData) => {
  try {    
    const addContractData = new Contract(contractData);
    await addContractData.save(); 
    return { status: 201, data: "Added contract successfully" };
  } catch (error) {
    console.error("Error adding contract info:", error);
    return { status: 500, data: "Error adding contract info" };
  }
};

const getContractData = async() =>{
  try {
    const contractData = await Contract.find({}, { _id: 0, __v: 0}); 
    console.log(contractData)
    return { status: 200, data: contractData };
  } catch (error) {
    console.error("Error retrieving contract info:", error);
    return { status: 500, data: "Internal Server Error" };
  }
}

const deleteContract = async(id) =>{
  try {
    const contractData = await Contract.deleteOne({"id": id});  
    return { status: 200, data: "Contract deleted successfully" };
  } catch (error) {
    console.error("Error retrieving contract info:", error);
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
    addContract,
    getContractData,
    deleteContract,
    updateContract
};