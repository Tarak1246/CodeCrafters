const express = require('express');
const app = express();
const settingsController = require('../controllers/userSettingsController');
const usersController = require('../controllers/usersController');
const projectController = require('../controllers/projectController')
//user settings
app.get('/getLoggedinUserData/:username', settingsController.getLoggedinUserData);

//update user data
app.post('/updateUserData',settingsController.updateUserData);

// Get item by ID
// router.get('/:id', authorizeMiddleware, loggingMiddleware, itemsController.getItemById);

// // Create a new item
// router.post('/', authorizeMiddleware, loggingMiddleware, itemsController.createItem);

// Update user privileges
app.put('/updateUserPrivileges/:id', usersController.updateUserPrivileges);

// Add project details
app.post('/addProject', projectController.addProject);

//Pulling DB to front
app.get('/getProjects', projectController.getProjectData);

// // Delete item by ID
// router.delete('/:id', authorizeMiddleware, loggingMiddleware, itemsController.deleteItem);

module.exports = app;