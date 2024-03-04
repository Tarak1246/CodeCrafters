const express = require('express');
const app = express();
const settingsController = require('../controllers/userSettingsController');

//user settings
app.get('/getLoggedinUserData/:username', settingsController.getLoggedinUserData);

//update user data
app.post('/updateUserData',settingsController.updateUserData);

// Get item by ID
// router.get('/:id', authorizeMiddleware, loggingMiddleware, itemsController.getItemById);

// // Create a new item
// router.post('/', authorizeMiddleware, loggingMiddleware, itemsController.createItem);

// // Update item by ID
// router.put('/:id', authorizeMiddleware, loggingMiddleware, itemsController.updateItem);

// // Delete item by ID
// router.delete('/:id', authorizeMiddleware, loggingMiddleware, itemsController.deleteItem);

module.exports = app;