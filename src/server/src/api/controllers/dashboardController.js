const dashboardService = require("../../services/dashboardService");

const getDashboardData = async (req, res) => {
  try {
    const getDashboardDataResponse = await dashboardService.getDashboardData();
    // Send the update response back to the client
    res.json(getDashboardDataResponse);
  } catch (error) {
    // Handle any errors during the update process
    console.error(error);
    res.status(500).json({ message: "Failed to get data" });
  }
};

module.exports = {
  getDashboardData,
};
