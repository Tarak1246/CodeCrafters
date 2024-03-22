/**
 * @file server.js (or main.js)
 * @description Entry point for the Express server, defining routes and middleware.
 * @author @Tarak1246
 * @date March 13, 2024
 */
const express = require("express");
const app = express();
// Import controllers for user-related and project-related routes
const settingsController = require("../controllers/userSettingsController");
const usersController = require("../controllers/usersController");
const projectController = require("../controllers/projectController");
const contractController = require("../controllers/contractController");
const dashboardController = require("../controllers/dashboardController");
const employeeController = require("../controllers/employeeController");
// User Settings Routes
/**
 * @route GET /getLoggedinUserData/:username
 * @description Retrieves logged-in user data based on username.
 * @access Private
 */
app.get(
  "/getLoggedinUserData/:username",
  settingsController.getLoggedinUserData
);

/**
 * @route POST /updateUserData
 * @description Updates user data based on provided data in the request body.
 * @access Private
 */
app.post("/updateUserData", settingsController.updateUserData);

// User Management Routes
/**
 * @route PUT /updateUserPrivileges/:id
 * @description Updates user privileges (requires admin access).
 * @access Admin
 */
app.put("/updateUserPrivileges/:id", usersController.updateUserPrivileges);
// Project Management Routes
/**
 * @route POST /addProject
 * @description Adds new project details.
 * @access Private (or adjust based on access control logic)
 */
app.post("/addProject", projectController.addProject);

//Pulling DB to front
app.get("/getProjects", projectController.getProjectData);

//Deleting the project record using unique project name
app.get("/deleteProject/:id", projectController.deleteProject);

//updating project data
app.put("/updateProject/:id", projectController.updateProject);

//add a contract
app.post("/addContract", contractController.addContract);

//Pulling DB to front
app.get("/getContracts", contractController.getContractData);

//Deleting the project record using unique project name
app.get("/deleteContract/:id", contractController.deleteContract);

//updating contract data
app.put("/updateContract/:id", contractController.updateContract);

//get dashboard
app.get("/getDashboardData", dashboardController.getDashboardData);

app.post("/addEmployee", employeeController.addEmployee);

app.get("/getEmployees", employeeController.getEmployees);

app.get("/deleteEmployee/:id", employeeController.deleteEmployee);

module.exports = app;
