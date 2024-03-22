const addContractService = require("../../services/contractService");

//contracts
const addContract= async (req, res) => {
  const contractData = req?.body;
  const contractResponse = await addContractService.addContract(contractData);
  res.json(contractResponse);
};

const getContractData = async (req, res) => {
  const contractResponse = await addContractService.getContractData();
  res.json(contractResponse);
};

const deleteContract = async (req, res) => {
  const { id } = req?.params;
  const contractResponse = await addContractService.deleteContract(id);
  res.json(contractResponse);
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
  addContract,
  getContractData,
  deleteContract,
  updateContract
};
